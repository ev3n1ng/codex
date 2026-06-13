const fs = require("fs");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const LISTING_URL =
  "https://www.johnlewis.com/browse/electricals/televisions/lg/oled/televisions/_/N-alkZ1z13wsdZ1z0rgkwZ1yzz00g";
const PAGE_DIR = "/tmp/john-lewis-pages";
const PRODUCT_DATA_JSON = "john-lewis-product-pages.json";
const LISTING_FILES = [
  "johnlewis-lg-oled.html",
  "band1.html",
  "band2.html",
  "band3.html",
  "band4.html",
  "band5.html",
];
const RANGE_LABELS = new Set(["B56", "B6", "C5", "C6", "G5", "G6", "W6", "M4", "M5"]);
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const args = new Set(process.argv.slice(2));
const cacheOnly = args.has("--cache-only");
const push = args.has("--push");
const verbose = args.has("--verbose");
const minLiveProducts = Number(process.env.JL_MIN_LIVE_PRODUCTS || 20);

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${commandArgs.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  if (options.stdio !== "inherit" && verbose && result.stdout) process.stdout.write(result.stdout);
  return result.stdout || "";
}

function fetchListing() {
  if (cacheOnly) {
    if (!fs.existsSync("johnlewis-lg-oled.html")) throw new Error("Missing cached John Lewis listing");
    return;
  }

  fs.mkdirSync(PAGE_DIR, { recursive: true });
  fetchUrl(LISTING_URL, "johnlewis-lg-oled.html");

  // The base PLP currently embeds only the first chunk of products. Series-filter
  // PLPs are official John Lewis pages and expose the complete model set per range.
  const ranges = rangeFacetUrls("johnlewis-lg-oled.html");
  for (const { label, url } of ranges) {
    fetchUrl(url, rangeFile(label));
  }

  // The older parser reads band files too, so mirror the fresh listing to avoid stale band data.
  for (const file of LISTING_FILES.slice(1)) fs.copyFileSync("johnlewis-lg-oled.html", file);
}

function fetchUrl(url, file) {
  run("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "-A",
    USER_AGENT,
    url,
    "-o",
    file,
    "--max-time",
    "90",
  ]);
}

function extractProducts(file) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) return [];
  return JSON.parse(match[1]).props.pageProps.productListingData?.products || [];
}

function listingProducts() {
  const byId = new Map();
  for (const file of listingFiles()) {
    if (!fs.existsSync(file)) continue;
    for (const product of extractProducts(file)) byId.set(product.productId, product);
  }
  return [...byId.values()];
}

function rangeFile(label) {
  return `${PAGE_DIR}/johnlewis-range-${label}.html`;
}

function listingFiles() {
  return [
    ...LISTING_FILES,
    ...[...RANGE_LABELS].map(rangeFile),
  ];
}

function rangeFacetUrls(file) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) return [];
  const data = JSON.parse(match[1]);
  const facets = data.props?.pageProps?.productListingData?.facets || [];
  const rangeFacet = facets.find((facet) => facet.dimensionName === "range");
  return (rangeFacet?.details || [])
    .filter((detail) => RANGE_LABELS.has(detail.label) && detail.facetUrl)
    .map((detail) => ({
      label: detail.label,
      url: `https://www.johnlewis.com${detail.facetUrl}`,
    }));
}

function publish() {
  fs.cpSync(`${ROOT}/john-lewis/index.html`, `${ROOT}/github-codex/john-lewis/index.html`);
  fs.cpSync(
    `${ROOT}/john-lewis/retailer-info/index.html`,
    `${ROOT}/github-codex/john-lewis/retailer-info/index.html`,
  );
  fs.cpSync(`${ROOT}/retailer-info.html`, `${ROOT}/github-codex/retailer-info.html`);
  fs.cpSync(`${ROOT}/retailer-info/index.html`, `${ROOT}/github-codex/retailer-info/index.html`);
  run("git", [
    "-C",
    "github-codex",
    "add",
    "john-lewis/index.html",
    "john-lewis/retailer-info/index.html",
    "retailer-info.html",
    "retailer-info/index.html",
  ]);
  const status = run("git", ["-C", "github-codex", "status", "--short"]);
  if (!status.trim()) {
    console.log("No website changes to push.");
    return;
  }
  run("git", ["-C", "github-codex", "commit", "-m", "Refresh John Lewis LG OLED pricing"], {
    stdio: "inherit",
  });
  run("git", ["-C", "github-codex", "push", "origin", "main"], { stdio: "inherit" });
  console.log(run("git", ["-C", "github-codex", "log", "-1", "--oneline"]).trim());
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

function flatProducts(report) {
  return report.groups.flatMap((group) => group.products);
}

function clean(value = "") {
  return String(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function money(value) {
  const amount = Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount)) return "";
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function loadBaselineProducts() {
  if (fs.existsSync("john-lewis/index.html")) return flatProducts(extractReportData("john-lewis/index.html"));
  return listingProducts().map((product) => ({
    id: product.productId,
    model: product.title.match(/LG\s+([A-Z0-9]+)/i)?.[1] || product.productId,
    title: product.title,
    year: product.title.match(/\((\d{4})\)/)?.[1] || "",
    size: Number(product.title.match(/(\d+) inch/)?.[1] || 0),
    price: product.variantPriceRange?.display?.min || "",
    availability: product.outOfStock ? "Out of stock" : product.isAvailableToOrder ? "Available to order" : "Availability unclear",
    offers: [],
    url: `https://www.johnlewis.com${product.url}`,
  }));
}

function fetchProductPage(product) {
  fs.mkdirSync(PAGE_DIR, { recursive: true });
  const file = `${PAGE_DIR}/${product.model}.html`;
  const tmp = `${file}.tmp`;

  run("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "-A",
    USER_AGENT,
    product.url,
    "-o",
    tmp,
    "--max-time",
    "90",
  ]);

  const html = fs.readFileSync(tmp, "utf8");
  if (!html.includes("__NEXT_DATA__")) {
    fs.rmSync(tmp, { force: true });
    if (fs.existsSync(file)) return file;
    throw new Error(`John Lewis page did not contain expected product data for ${product.model}`);
  }

  fs.renameSync(tmp, file);
  return file;
}

function parseNextData(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) throw new Error("Missing __NEXT_DATA__ payload");
  return JSON.parse(match[1]);
}

function productJsonLd(html) {
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1].trim());
      if (data?.["@type"] === "Product") return data;
    } catch {
      // Ignore malformed non-product blocks.
    }
  }
  return null;
}

function hasFreeWallInstall(service) {
  const title = service?.title || "";
  const value = String(service?.price?.value ?? "");
  const display = String(service?.price?.display ?? "");
  return /Free Wall Mount Installation,\s*TV Set up & Demo/i.test(title)
    && (value === "0" || display === "£0.00" || display === "GBP 0.00");
}

function normaliseOffer(offer) {
  const text = clean(offer)
    .replace(/ for new & existing My John Lewis members/g, "")
    .replace(/ \(via promo code, see product page for details\)/g, "")
    .replace(/ \(via redemption\)/g, "")
    .replace(/ at no extra cost/g, "");
  if (/free wall mount installation/i.test(text)) return "Free wall install (GBP 135 value)";
  let match = text.match(/Claim GBP\s*([0-9.,]+) John Lewis E-Gift Card/i);
  if (match) return `GBP ${match[1]} John Lewis e-gift card`;
  match = text.match(/Save\s+([0-9]+)% on price shown/i);
  if (match) return `${match[1]}% MyJL member discount`;
  match = text.match(/Save GBP\s*([0-9.,]+) on a LG ([A-Z0-9]+).*Soundbar/i);
  if (match) return `Soundbar saving: GBP ${match[1]} on LG ${match[2]}`;
  match = text.match(/Price matched:\s*save GBP\s*([0-9.,]+)/i);
  if (match) return `Price matched: save GBP ${match[1]}`;
  if (/Free Standard Delivery/i.test(text)) return "Free standard delivery";
  return text;
}

function parseRetailerDate(value) {
  const match = String(value || "").match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return null;
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  const month = months[match[2].toLowerCase()];
  if (month == null) return null;
  return new Date(Date.UTC(Number(match[3]), month, Number(match[1]), 23, 59, 59));
}

function promotionalMessageIsCurrent(message) {
  const text = clean(`${message.title || ""} ${message.description || ""}`);
  const purchaseWindow = text.match(/purchase this item between .*? and (\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4})/i);
  const endDate = parseRetailerDate(purchaseWindow?.[1]);
  if (!endDate) return true;
  return Date.now() <= endDate.getTime();
}

function offerRank(offer) {
  if (/wall install/i.test(offer)) return 0;
  if (/discount/i.test(offer)) return 1;
  if (/e-gift card/i.test(offer)) return 2;
  if (/Price matched/i.test(offer)) return 3;
  if (/Soundbar/i.test(offer)) return 4;
  if (/delivery/i.test(offer)) return 5;
  return 9;
}

function availabilityFromPage(html, schemaAvailability) {
  const text = clean(html);
  if (/No longer available online/i.test(text) && /unlikely to receive more stock/i.test(text)) {
    return "No longer available online";
  }
  if (/Pre-orders are now sold out/i.test(text)) return "Pre-orders are now sold out";
  if (/Currently out of stock online/i.test(text)) return "Currently out of stock online";
  if (/Coming soon/i.test(text)) return "Coming soon";
  if (/OutOfStock/i.test(schemaAvailability || "")) return "Out of stock";
  if (/InStock/i.test(schemaAvailability || "")) return "Available to order";
  return "Availability unclear";
}

function parseProductPage(product, html) {
  const nextData = parseNextData(html);
  const pageProduct = nextData.props?.pageProps?.product || {};
  const jsonLd = productJsonLd(html) || {};
  const title = clean(jsonLd.name || pageProduct.title || product.title);
  const model = title.match(/OLED\d+[A-Z0-9]+/i)?.[0] || product.model;
  const year = title.match(/\((\d{4})\)/)?.[1] || product.year || "";
  const size = Number(title.match(/(\d+)\s*inch/i)?.[1] || product.size || 0);
  const offers = [...new Set(
    (pageProduct.messaging || [])
      .filter((message) => message.type === "promotional")
      .filter(promotionalMessageIsCurrent)
      .map((message) => normaliseOffer(message.title))
      .filter(Boolean),
  )];
  const services = [
    ...(pageProduct.variants || []).flatMap((variant) => variant.services || []),
    ...(pageProduct.variantGroups || []).flatMap((group) => group.services || []),
  ];
  if (services.some(hasFreeWallInstall)) offers.unshift("Free wall install (GBP 135 value)");
  const availability = availabilityFromPage(html, jsonLd.offers?.availability);
  const parsedPrice = money(jsonLd.offers?.price);
  const price = /^£0\.00$/.test(parsedPrice) && /No longer available|out of stock|Coming soon/i.test(availability)
    ? "Not listed"
    : (parsedPrice || product.price || "Not listed");

  return {
    id: String(pageProduct.productId || jsonLd.productId || product.id || ""),
    model,
    title,
    year,
    series: model.match(/OLED\d+([A-Z])/i)?.[1] || "",
    gen: model.match(/OLED\d+[A-Z](\d)/i)?.[1] || "",
    size,
    price,
    availability,
    offers: [...new Set(offers)].sort((a, b) => offerRank(a) - offerRank(b) || a.localeCompare(b)),
    url: product.url,
  };
}

function parseListingProduct(product) {
  const title = clean(product.title);
  const model = title.match(/OLED\d+[A-Z0-9]+/i)?.[0] || product.productId;
  const year = title.match(/\((\d{4})\)/)?.[1] || "";
  const size = Number(title.match(/(\d+)\s*inch/i)?.[1] || 0);
  const offers = [...new Set(
    (product.messaging || [])
      .filter((message) => message.type === "promotional")
      .filter(promotionalMessageIsCurrent)
      .map((message) => normaliseOffer(message.title))
      .filter(Boolean),
  )].sort((a, b) => offerRank(a) - offerRank(b) || a.localeCompare(b));
  const availability = product.outOfStock
    ? "Currently out of stock online"
    : product.isAvailableToOrder ? "Available to order" : "Availability unclear";

  return {
    id: String(product.productId || ""),
    model,
    title,
    year,
    series: model.match(/OLED\d+([A-Z])/i)?.[1] || "",
    gen: model.match(/OLED\d+[A-Z](\d)/i)?.[1] || "",
    size,
    price: product.variantPriceRange?.display?.min || "Not listed",
    availability,
    offers,
    url: `https://www.johnlewis.com${product.url}`,
  };
}

function sortedOffers(product) {
  return [...(product.offers || [])].sort();
}

function sameOffers(a, b) {
  return JSON.stringify(sortedOffers(a)) === JSON.stringify(sortedOffers(b));
}

function changeReport(beforeProducts, afterProducts) {
  const beforeByModel = new Map(beforeProducts.map((product) => [product.model, product]));
  const afterByModel = new Map(afterProducts.map((product) => [product.model, product]));
  const lines = [];

  for (const product of afterProducts) {
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

  for (const product of beforeProducts) {
    if (!afterByModel.has(product.model)) lines.push(`Removed from report: ${product.model}`);
  }

  const missing = afterProducts
    .filter((product) => /not listed|retired|unclear|out of stock/i.test(product.availability))
    .map((product) => `${product.model} (${product.availability})`);
  if (missing.length) lines.push(`Missing/attention now: ${missing.join(", ")}`);

  if (lines.length) {
    console.log("Change report:");
    for (const line of lines) console.log(`- ${line}`);
  }
}

const previousReport = fs.existsSync("john-lewis/index.html")
  ? flatProducts(extractReportData("john-lewis/index.html"))
  : [];

fetchListing();
const liveProducts = listingProducts();
const listingIds = new Set(liveProducts.map((product) => product.productId));
console.log(`John Lewis listing: ${liveProducts.length} live products.`);
if (liveProducts.length < minLiveProducts) {
  throw new Error(`John Lewis listing only returned ${liveProducts.length} products; refusing to update generated data.`);
}

const baselineProducts = loadBaselineProducts();
const liveByModel = new Map(listingProducts().map(parseListingProduct).map((product) => [product.model, product]));
const pageProducts = baselineProducts.map((product, index) => {
  const parsed = liveByModel.get(product.model) || {
    ...product,
    price: product.price || "Not available",
    availability: product.availability || "Not available at the moment",
    offers: product.offers?.length ? product.offers : ["No current retailer data found for this baseline model"],
  };
  console.log(`${index + 1}/${baselineProducts.length} ${parsed.model} ${parsed.price} ${parsed.availability}`);
  return parsed;
});
fs.writeFileSync(PRODUCT_DATA_JSON, JSON.stringify(pageProducts, null, 2));
const freeInstall = pageProducts.filter((product) => product.offers.some((offer) => /wall install/i.test(offer))).length;
console.log(`John Lewis pages: ${pageProducts.length} product pages, ${freeInstall} free wall install.`);

run("node", ["generate_upload_index.js"]);
run("node", ["generate_retailer_portal.js"]);

const report = extractReportData("john-lewis/index.html");
const products = flatProducts(report);
const retained = products.filter((product) => product.id && !listingIds.has(product.id)).length;
const outOfStock = products.filter((product) => /out of stock/i.test(product.availability)).length;
changeReport(previousReport, products);
console.log(
  `John Lewis report: ${products.length} products, ${retained} retained, ${outOfStock} out of stock, ${report.runDate}.`,
);

if (push) publish();
