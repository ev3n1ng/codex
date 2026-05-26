const fs = require("fs");
const { spawnSync } = require("child_process");

const forbiddenOffers = /price match|screen cleaner|selected tv accessories|apple music/i;

function loadProducts() {
  const html = fs.readFileSync("currys/index.html", "utf8");
  const match = html.match(/const D=(\{.*?\});/);
  if (!match) throw new Error("Could not read Currys report data from currys/index.html");
  return JSON.parse(match[1]).groups.flatMap((group) => group.products);
}

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function fetchWithCurl(url) {
  const result = spawnSync("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "--max-time",
    "8",
    "-A",
    "Mozilla/5.0",
    url,
  ], {
    encoding: "utf8",
    maxBuffer: 15 * 1024 * 1024,
  });

  if (result.status !== 0 || /Sorry, you have been blocked|Access denied|cf-error/i.test(result.stdout)) {
    return "";
  }

  return result.stdout;
}

function priceFromText(text) {
  const price = clean(text).match(/£\s*[\d,]+(?:\.\d{2})?/);
  return price ? price[0].replace(/\s+/g, "") : "";
}

function offersFromText(text) {
  const offers = new Set();
  const cleaned = clean(text);
  const patterns = [
    /(?:10|20)% off marked price(?: with code [A-Z0-9]+)?/ig,
    /Free delivery/ig,
    /Save £\s*[\d,.]+/ig,
    /Save up to 50% on selected soundbars when bought with any LG TV/ig,
  ];

  for (const pattern of patterns) {
    for (const match of cleaned.matchAll(pattern)) {
      const offer = clean(match[0]).replace(/£\s+/g, "£");
      if (!forbiddenOffers.test(offer)) offers.add(offer);
    }
  }

  return [...offers];
}

function parseDirectPage(html) {
  if (!html) return {};
  const title = clean(html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || "");
  const price = priceFromText(html);
  const offers = offersFromText(html);
  return { title, price, offers };
}

async function fetchSerpApi(product) {
  if (!process.env.SERPAPI_KEY) return {};

  const query = [
    "site:currys.co.uk/products",
    product.model,
    "Currys price offer free delivery",
  ].join(" ");
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("google_domain", "google.co.uk");
  url.searchParams.set("gl", "uk");
  url.searchParams.set("hl", "en");
  url.searchParams.set("num", "5");
  url.searchParams.set("api_key", process.env.SERPAPI_KEY);
  url.searchParams.set("q", query);

  const response = await fetch(url);
  if (!response.ok) {
    console.log(`SerpApi failed for ${product.model}: ${response.status}`);
    return {};
  }

  const data = await response.json();
  const snippets = (data.organic_results || [])
    .filter((result) => /currys\.co\.uk\/products/i.test(result.link || ""))
    .map((result) => [result.title, result.snippet, result.rich_snippet?.top?.detected_extensions?.price].filter(Boolean).join(" "))
    .join(" ");

  return {
    price: priceFromText(snippets),
    offers: offersFromText(snippets),
  };
}

async function refresh() {
  const products = loadProducts();
  const overrides = {};
  let directUpdates = 0;
  let searchUpdates = 0;
  let directBlocked = false;

  for (const product of products) {
    let update = {};
    if (!directBlocked) {
      const html = fetchWithCurl(product.url);
      update = parseDirectPage(html);
      if (update.price) {
        directUpdates += 1;
      } else if (!html) {
        directBlocked = true;
        console.log("Currys direct consumer fetch appears blocked; skipping direct fetch for remaining models.");
      }
    }

    if (!update.price && process.env.SERPAPI_KEY) {
      update = await fetchSerpApi(product);
      if (update.price || update.offers?.length) searchUpdates += 1;
    }

    const next = {};
    if (update.price) next.price = update.price;
    if (update.offers?.length) next.offers = update.offers;
    if (Object.keys(next).length) overrides[product.model] = next;

    console.log(`${next.price ? "yes" : "no "} ${product.model}${next.price ? ` ${next.price}` : ""}`);
  }

  if (Object.keys(overrides).length) {
    fs.writeFileSync("currys-overrides.json", JSON.stringify(overrides, null, 2));
    console.log(`Wrote currys-overrides.json (${Object.keys(overrides).length} models). Direct: ${directUpdates}. Search: ${searchUpdates}.`);
  } else {
    console.log("No fresh Currys override data found; the report will retain the current Currys data.");
  }
}

refresh().catch((error) => {
  console.error(error);
  process.exit(1);
});
