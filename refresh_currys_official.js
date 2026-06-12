const fs = require("fs");
const { execFileSync, spawnSync } = require("child_process");

const ROOT = __dirname;
const GENERATOR = `${ROOT}/generate_retailer_portal.js`;
const PAGE_DIR = "/tmp/currys-pages";
const OUT_JSON = "/tmp/currys-products-refreshed-official-fixed.json";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const args = new Set(process.argv.slice(2));
const cacheOnly = args.has("--cache-only");
const generate = args.has("--generate") || args.has("--push");
const push = args.has("--push");
const verbose = args.has("--verbose");
const maxNotListed = Number(process.env.CURRYS_MAX_NOT_LISTED || 5);

const ignoredOffers = /screen cleaner|tv accessories|price match|apple music/i;

function readCurrysProducts() {
  if (fs.existsSync(`${ROOT}/currys/index.html`)) {
    return extractReportData(`${ROOT}/currys/index.html`).groups.flatMap((group) => group.products);
  }

  const source = fs.readFileSync(GENERATOR, "utf8");
  const match = source.match(
    /const currysProducts = (\[[\s\S]*?\n\])\.map\(\(product\) => \(\{ \.\.\.product, model: modelOf\(product\.title\) \}\)\);/,
  );
  if (!match) throw new Error("Could not find currysProducts in generate_retailer_portal.js");
  return JSON.parse(match[1]).map((product) => ({
    ...product,
    model: product.model || product.title.match(/OLED\d+[A-Z0-9]+/i)?.[0] || "",
  }));
}

function decode(value = "") {
  return String(value)
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&pound;/g, "GBP ")
    .replace(/&nbsp;/g, " ")
    .replace(/\\"/g, "\"");
}

function clean(value = "") {
  return decode(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function money(value) {
  return `£${Number(String(value).replace(/,/g, "")).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function productIdFromUrl(url) {
  return url.match(/-(\d+)\.html/)?.[1] || "";
}

function collectJsonObjects(value, out = []) {
  if (!value || typeof value !== "object") return out;
  if (value.name || value.sku || value.offers) out.push(value);
  for (const child of Object.values(value)) {
    if (Array.isArray(child)) child.forEach((item) => collectJsonObjects(item, out));
    else collectJsonObjects(child, out);
  }
  return out;
}

function jsonLdObjects(html) {
  const objects = [];
  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      collectJsonObjects(JSON.parse(match[1].trim()), objects);
    } catch {
      // Currys pages occasionally include non-product JSON-LD. Ignore malformed blocks.
    }
  }
  return objects;
}

function extractReportData(file) {
  const html = fs.readFileSync(file, "utf8");
  const marker = "const D=";
  const start = html.indexOf(marker) + marker.length;
  let end = html.indexOf(";\nconst ", start);
  if (end < 0) end = html.indexOf(";const ", start);
  if (start < marker.length || end < 0) throw new Error(`Could not parse report data from ${file}`);
  return JSON.parse(html.slice(start, end));
}

function isSearchUrl(url) {
  return /\/search\?/i.test(url);
}

function isBlockedHtml(html) {
  return /Attention Required! \| Cloudflare|Sorry, you have been blocked|enable cookies/i.test(html);
}

function looksLikeProductPage(html, product) {
  return !isBlockedHtml(html)
    && /application\/ld\+json/i.test(html)
    && (html.includes(product.model) || html.includes(productIdFromUrl(product.url)));
}

function fetchProductPage(product) {
  fs.mkdirSync(PAGE_DIR, { recursive: true });
  const file = `${PAGE_DIR}/${product.model}.html`;
  if (cacheOnly && fs.existsSync(file)) return file;
  if (cacheOnly) throw new Error(`Missing cached page for ${product.model}`);
  if (isSearchUrl(product.url)) throw new Error(`Search URL is not acceptable as a direct product page for ${product.model}`);

  const tmp = `${file}.tmp`;

  execFileSync(
    "curl",
    [
      "--http1.1",
      "-L",
      "--compressed",
      "-A",
      USER_AGENT,
      product.url,
      "-o",
      tmp,
      "--max-time",
      "45",
    ],
    { stdio: verbose ? "inherit" : "ignore" },
  );

  const html = fs.readFileSync(tmp, "utf8");
  if (looksLikeProductPage(html, product)) {
    fs.renameSync(tmp, file);
    return file;
  }

  fs.rmSync(tmp, { force: true });
  if (fs.existsSync(file)) return file;
  throw new Error(`Currys returned a blocked or non-product page for ${product.model}`);
}

function parseProduct(product, html) {
  const text = clean(html);
  const id = productIdFromUrl(product.url);
  const objects = jsonLdObjects(html);
  const exact =
    objects.find((object) => String(object.sku || "") === id && String(object.name || "").includes(product.model)) ||
    objects.find((object) => String(object.name || "").includes(product.model) && object.offers?.price) ||
    objects.find((object) => String(object.sku || "") === id && object.offers?.price) ||
    objects.find((object) => String(object.name || "").includes(product.model)) ||
    objects.find((object) => object.offers?.price);

  if (!exact) {
    return {
      ...product,
      price: "Not listed",
      availability: "Product page redirected",
      offers: ["Official Currys product page did not expose matching model data during this update"],
    };
  }

  const price = exact.offers?.price ? money(exact.offers.price) : product.price;
  const idIndex = html.indexOf(`&quot;parentProductId&quot;:&quot;${id}&quot;`);
  const modelIndex = html.indexOf(product.model);
  const start = idIndex >= 0 ? idIndex : modelIndex;
  const area = decode(html.slice(Math.max(0, start - 20000), start + 140000));
  const offers = [];

  const priceDrop =
    area.match(/"id":"price drop"[\s\S]{0,240}?"offerReduction":([0-9.]+)/i) ||
    area.match(/&quot;id&quot;:&quot;price drop&quot;[\s\S]{0,240}?&quot;offerReduction&quot;:([0-9.]+)/i);
  if (priceDrop && Number(priceDrop[1]) > 0) offers.push(`Save ${money(priceDrop[1])}`);

  for (const match of area.matchAll(/"name":"([^"]+)"|&quot;name&quot;:&quot;([^&]+)&quot;/gi)) {
    const name = clean(match[1] || match[2]);
    const promo =
      name.match(/Get\s+(\d+%\s+off\s+marked\s+price).*?code\s+([A-Z0-9]+)\s+at checkout/i) ||
      name.match(/(\d+%\s+off\s+marked\s+price).*?code\s+([A-Z0-9]+)/i);
    if (promo) offers.push(`${promo[1].replace(/\s+/g, " ")} with code ${promo[2]}`);
    else if (/selected LG soundbars/i.test(name)) {
      offers.push("Save up to 50% on selected soundbars when bought with any LG TV");
    } else if (/free standard delivery/i.test(name)) {
      offers.push("Free delivery");
    }
  }
  if (/Free standard delivery on orders over GBP 40/i.test(text)) offers.push("Free delivery");

  const filteredOffers = [...new Set(offers.map(clean).filter(Boolean))].filter(
    (offer) => !ignoredOffers.test(offer),
  );
  const availability = /out of stock|currently unavailable|sold out/i.test(area)
    || /OutOfStock/i.test(String(exact.offers?.availability || ""))
    ? "Out of stock"
    : "Listed";
  const next = {
    ...product,
    baselineMissing: undefined,
    title: clean(exact.name || product.title),
    price,
    availability,
    offers: filteredOffers.length ? filteredOffers : ["No current offer shown on official Currys product page"],
  };

  if (product.price && product.price !== price && !/not (listed|available)/i.test(product.price)) {
    next.previousPrice = product.price;
  }
  else if (product.previousPrice && product.previousPrice !== price) next.previousPrice = product.previousPrice;
  else delete next.previousPrice;
  return next;
}

function replaceCurrysProducts(products) {
  const source = fs.readFileSync(GENERATOR, "utf8");
  const start = source.indexOf("const currysProducts = ");
  const end = source.indexOf("\nconst currysWatchlistModels =", start);
  if (start < 0 || end < 0) throw new Error("Could not locate currysProducts block");
  const replacement = `const currysProducts = ${JSON.stringify(products, null, 2)}.map((product) => ({ ...product, model: modelOf(product.title) }));\n`;
  const updated = source.slice(0, start) + replacement + source.slice(end + 1);
  fs.writeFileSync(GENERATOR, updated);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: "utf8", ...options });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  if (options.stdio !== "inherit" && verbose && result.stdout) process.stdout.write(result.stdout);
  return result.stdout || "";
}

function publish() {
  fs.cpSync(`${ROOT}/currys/index.html`, `${ROOT}/github-codex/currys/index.html`);
  fs.cpSync(`${ROOT}/currys/retailer-info/index.html`, `${ROOT}/github-codex/currys/retailer-info/index.html`);
  run("git", ["-C", "github-codex", "add", "currys/index.html", "currys/retailer-info/index.html"]);
  const status = run("git", ["-C", "github-codex", "status", "--short"]);
  if (!status.trim()) {
    console.log("No website changes to push.");
    return;
  }
  run("git", ["-C", "github-codex", "commit", "-m", "Refresh Currys LG OLED pricing"], { stdio: "inherit" });
  run("git", ["-C", "github-codex", "push", "origin", "main"], { stdio: "inherit" });
  console.log(run("git", ["-C", "github-codex", "log", "-1", "--oneline"]).trim());
}

function sortedOffers(product) {
  return [...(product.offers || [])].sort();
}

function sameOffers(a, b) {
  return JSON.stringify(sortedOffers(a)) === JSON.stringify(sortedOffers(b));
}

function changeReport(before, after) {
  const beforeByModel = new Map(before.map((product) => [product.model, product]));
  const afterByModel = new Map(after.map((product) => [product.model, product]));
  const lines = [];

  for (const product of after) {
    const previous = beforeByModel.get(product.model);
    if (!previous) {
      lines.push(`New model: ${product.model} ${product.price} (${product.availability})`);
      continue;
    }
    const bits = [];
    if (previous.price !== product.price) bits.push(`price ${previous.price} -> ${product.price}`);
    if (previous.availability !== product.availability) {
      bits.push(`availability ${previous.availability} -> ${product.availability}`);
    }
    if (!sameOffers(previous, product)) {
      const added = sortedOffers(product).filter((offer) => !sortedOffers(previous).includes(offer));
      const removed = sortedOffers(previous).filter((offer) => !sortedOffers(product).includes(offer));
      if (added.length) bits.push(`offers added: ${added.join(" | ")}`);
      if (removed.length) bits.push(`offers removed: ${removed.join(" | ")}`);
    }
    if (bits.length) lines.push(`${product.model}: ${bits.join("; ")}`);
  }

  for (const product of before) {
    if (!afterByModel.has(product.model)) lines.push(`Removed from report: ${product.model}`);
  }

  const missing = after
    .filter((product) => /not listed|redirected|refresh failed/i.test(product.availability))
    .map((product) => product.model);
  if (missing.length) lines.push(`Missing/not listed now: ${missing.join(", ")}`);

  if (lines.length) {
    console.log("Change report:");
    for (const line of lines) console.log(`- ${line}`);
  }
}

const products = readCurrysProducts();
const refreshed = products.map((product, index) => {
  try {
    const html = fs.readFileSync(fetchProductPage(product), "utf8");
    const parsed = parseProduct(product, html);
    console.log(`${index + 1}/${products.length} ${parsed.model} ${parsed.price} ${parsed.availability}`);
    return parsed;
  } catch (error) {
    console.log(`${index + 1}/${products.length} ${product.model} refresh failed`);
    return {
      ...product,
      availability: /not available/i.test(product.availability || "") ? product.availability : "Refresh failed; previous listing retained",
      offers: /No current retailer data found/i.test((product.offers || []).join(" "))
        ? product.offers
        : ["Official Currys product page could not be read during this update"],
    };
  }
});

const notListed = refreshed.filter(
  (product) => !isSearchUrl(product.url) && /not listed|redirected/i.test(product.availability),
).length;
const failed = refreshed.filter((product) => /refresh failed/i.test(product.availability)).length;
if (failed > 0) {
  throw new Error(`Currys refresh had ${failed} failed product reads; refusing to update generated data.`);
}
if (notListed > maxNotListed) {
  throw new Error(`Currys refresh had ${notListed} not-listed products; refusing to update generated data.`);
}
fs.writeFileSync(OUT_JSON, JSON.stringify(refreshed, null, 2));
changeReport(products, refreshed);
replaceCurrysProducts(refreshed);
console.log(`Currys refreshed: ${refreshed.length} products, ${notListed} not listed, ${failed} failed.`);

if (generate) {
  run("node", ["--check", "generate_retailer_portal.js"]);
  run("node", ["generate_retailer_portal.js"], { stdio: verbose ? "inherit" : "pipe" });
  console.log("Generated Currys website files.");
}

if (push) publish();
