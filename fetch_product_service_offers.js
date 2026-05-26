const fs = require("fs");
const { execFile } = require("child_process");

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
  return new Promise((resolve, reject) => {
    execFile("curl", [
      "--http1.1",
      "-L",
      "--compressed",
      "--max-time",
      "10",
      "-A",
      "Mozilla/5.0",
      url,
    ], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      timeout: 12000,
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`curl failed for ${url}: ${stderr || error.message}`));
        return;
      }
      resolve(stdout);
    });
  });
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

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function checkProduct(product) {
  try {
    const html = await fetchHtml(product.url);
    const services = extractServices(html);
    const freeWallInstall = services.some(hasFreeWallInstall);
    console.log(`${freeWallInstall ? "yes" : "no "} ${product.model}`);
    return {
      id: product.id,
      data: {
        model: product.model,
        url: product.url,
        freeWallInstall,
      },
    };
  } catch (error) {
    console.log(`err ${product.model}: ${error.message}`);
    return {
      id: product.id,
      data: {
        model: product.model,
        url: product.url,
        freeWallInstall: false,
        error: error.message,
      },
    };
  }
}

(async () => {
  const rows = productRows();
  const checked = await mapLimit(rows, 8, checkProduct);
  const results = {};
  let freeCount = 0;

  for (const row of checked) {
    results[row.id] = row.data;
    if (row.data.freeWallInstall) freeCount += 1;
  }

  fs.writeFileSync("product-service-offers.json", JSON.stringify(results, null, 2));
  console.log(`Wrote product-service-offers.json. Free wall install services: ${freeCount}.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
