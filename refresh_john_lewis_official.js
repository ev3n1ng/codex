const fs = require("fs");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const LISTING_URL =
  "https://www.johnlewis.com/browse/electricals/televisions/lg/oled/televisions/_/N-alkZ1z13wsdZ1z0rgkwZ1yzz00g";
const LISTING_FILES = [
  "johnlewis-lg-oled.html",
  "band1.html",
  "band2.html",
  "band3.html",
  "band4.html",
  "band5.html",
];
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

  run("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "-A",
    USER_AGENT,
    LISTING_URL,
    "-o",
    "johnlewis-lg-oled.html",
    "--max-time",
    "90",
  ]);

  // The current official listing exposes the full LG OLED set in one page.
  // The older parser reads band files too, so mirror the fresh listing to avoid stale band data.
  for (const file of LISTING_FILES.slice(1)) fs.copyFileSync("johnlewis-lg-oled.html", file);
}

function extractProducts(file) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) return [];
  return JSON.parse(match[1]).props.pageProps.productListingData?.products || [];
}

function listingProducts() {
  const byId = new Map();
  for (const file of LISTING_FILES) {
    if (!fs.existsSync(file)) continue;
    for (const product of extractProducts(file)) byId.set(product.productId, product);
  }
  return [...byId.values()];
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

if (cacheOnly && fs.existsSync("product-service-offers.json")) {
  console.log("John Lewis services: using cached product-service-offers.json.");
} else {
  run("node", ["fetch_product_service_offers.js"]);
}
const services = JSON.parse(fs.readFileSync("product-service-offers.json", "utf8"));
const freeInstall = Object.values(services).filter((service) => service.freeWallInstall).length;
console.log(`John Lewis services: ${freeInstall} free wall install.`);

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
