const fs = require("fs");
const { spawnSync } = require("child_process");

const sourceFiles = [
  "johnlewis-lg-oled.html",
  "band1.html",
  "band2.html",
  "band3.html",
  "band4.html",
  "band5.html",
];

function extractProducts(file) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) return [];
  const data = JSON.parse(match[1]);
  return data.props.pageProps.productListingData?.products || [];
}

function productRows() {
  const byId = new Map();
  for (const file of sourceFiles) {
    for (const product of extractProducts(file)) byId.set(product.productId, product);
  }
  return [...byId.values()].map((product) => ({
    id: product.productId,
    title: product.title,
    model: product.title.match(/LG\s+([A-Z0-9]+)/i)?.[1] || product.productId,
    url: `https://www.johnlewis.com${product.url}`,
  }));
}

function fetchHtml(url) {
  const result = spawnSync("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "--max-time",
    "15",
    "--retry",
    "2",
    "-A",
    "Mozilla/5.0",
    url,
  ], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`curl failed for ${url}: ${result.stderr}`);
  }
  return result.stdout;
}

function extractServices(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) return [];
  const data = JSON.parse(match[1]);
  const variants = data.props.pageProps.product?.variants || [];
  const groups = data.props.pageProps.product?.variantGroups || [];
  const serviceLists = [
    ...variants.map((variant) => variant.services || []),
    ...groups.map((group) => group.services || []),
  ];
  return serviceLists.flat();
}

function hasFreeWallInstall(service) {
  const title = service?.title || "";
  const value = String(service?.price?.value ?? "");
  const display = String(service?.price?.display ?? "");
  return /Free Wall Mount Installation,\s*TV Set up & Demo/i.test(title)
    && (value === "0" || display === "£0.00" || display === "GBP 0.00");
}

const results = {};
let freeCount = 0;

for (const product of productRows()) {
  const html = fetchHtml(product.url);
  const services = extractServices(html);
  const freeWallInstall = services.some(hasFreeWallInstall);
  results[product.id] = {
    model: product.model,
    url: product.url,
    freeWallInstall,
  };
  if (freeWallInstall) freeCount += 1;
  console.log(`${freeWallInstall ? "yes" : "no "} ${product.model}`);
}

fs.writeFileSync("product-service-offers.json", JSON.stringify(results, null, 2));
console.log(`Wrote product-service-offers.json. Free wall install services: ${freeCount}.`);
