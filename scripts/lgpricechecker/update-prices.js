const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const REPO = path.resolve(__dirname, "../..");
const DATA = path.join(REPO, "data", "lgpricechecker", "catalogue-current.json");
const SEED = path.join(REPO, "data", "lgpricechecker", "catalogue-seed.json");
const SNAPSHOT_DIR = path.join(REPO, "data", "lgpricechecker", "snapshots");
const TODAY = new Date().toISOString().slice(0, 10);

const REQUEST_TIMEOUT_MS = Number(process.env.LG_PRICECHECK_TIMEOUT_MS || 25000);
const DELAY_MIN_MS = Number(process.env.LG_PRICECHECK_DELAY_MIN_MS || 9000);
const DELAY_MAX_MS = Number(process.env.LG_PRICECHECK_DELAY_MAX_MS || 15000);
const MAX_FETCH_FAILURE_RATE = Number(process.env.LG_PRICECHECK_MAX_FETCH_FAILURE_RATE || 0.25);
const MAX_BLANK_PRICE_INCREASE = Number(process.env.LG_PRICECHECK_MAX_BLANK_PRICE_INCREASE || 12);
const DRY_RUN = process.argv.includes("--dry-run");

const allowedHosts = new Map([
  ["Currys", /(^|\.)currys\.co\.uk$/i],
  ["John Lewis", /(^|\.)johnlewis\.com$/i],
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jitterDelay() {
  return DELAY_MIN_MS + Math.floor(Math.random() * Math.max(1, DELAY_MAX_MS - DELAY_MIN_MS));
}

function cleanText(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values) {
  const seen = new Set();
  return values.map(cleanText).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function money(value) {
  return String(value || "").match(/£\s?\d[\d,]*(?:\.\d{2})?/g) || [];
}

function officialUrl(product) {
  if (!product.directProductUrl) return false;
  let parsed;
  try {
    parsed = new URL(product.directProductUrl);
  } catch {
    return false;
  }
  const hostRule = allowedHosts.get(product.retailer);
  return Boolean(hostRule && hostRule.test(parsed.hostname));
}

function request(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "http:" ? http : https;
    const req = client.request(parsed, {
      method: "GET",
      timeout: REQUEST_TIMEOUT_MS,
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-GB,en;q=0.9",
        "cache-control": "no-cache",
        "user-agent": "Mozilla/5.0 (compatible; LGPriceChecker/1.0; +https://albertoscott.co.uk/LGpricechecker/)",
      },
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectCount < 5) {
        res.resume();
        resolve(request(new URL(res.headers.location, url).toString(), redirectCount + 1));
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        resolve({ body, finalUrl: url, statusCode: res.statusCode });
      });
    });
    req.on("timeout", () => req.destroy(new Error(`Timeout after ${REQUEST_TIMEOUT_MS}ms`)));
    req.on("error", reject);
    req.end();
  });
}

async function fetchOfficial(product) {
  if (!officialUrl(product)) throw new Error("Non-official or invalid product URL");
  try {
    return await request(product.directProductUrl);
  } catch (error) {
    await sleep(3000);
    return request(product.directProductUrl);
  }
}

function jsonLdProducts(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim());
  const found = [];
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block);
      const stack = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (stack.length) {
        const item = stack.shift();
        if (!item || typeof item !== "object") continue;
        const type = Array.isArray(item["@type"]) ? item["@type"].join(" ") : item["@type"];
        if (/Product/i.test(String(type || ""))) found.push(item);
        for (const value of Object.values(item)) {
          if (Array.isArray(value)) stack.push(...value);
          else if (value && typeof value === "object") stack.push(value);
        }
      }
    } catch {
      // Retailer pages sometimes contain invalid JSON-LD. Text fallback handles those pages.
    }
  }
  return found;
}

function priceFromJsonLd(html) {
  for (const product of jsonLdProducts(html)) {
    const offers = Array.isArray(product.offers) ? product.offers : [product.offers].filter(Boolean);
    for (const offer of offers) {
      const value = offer && (offer.price || offer.lowPrice || offer.highPrice);
      if (value) return `£${String(value).replace(/^£/, "")}`;
    }
  }
  return "";
}

function nextData(html) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function collectStrings(value, out = []) {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, out));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

function textWindow(text, regex, before = 80, after = 180) {
  const match = regex.exec(text);
  if (!match) return "";
  return cleanText(text.slice(Math.max(0, match.index - before), match.index + match[0].length + after));
}

function firstPattern(text, patterns) {
  for (const regex of patterns) {
    const match = text.match(regex);
    if (match) return cleanText(match[0]);
  }
  return "";
}

function offerPatterns(text, patterns) {
  return uniq(patterns.flatMap((regex) => [...text.matchAll(regex)].map((match) => match[0]))).slice(0, 4);
}

function storedOfferItems(text) {
  return String(text || "")
    .split(/\s+\|\s+/)
    .map(cleanText)
    .filter(Boolean)
    .filter((item) => item.length <= 140)
    .filter((item) => !/For full terms|Claim Claims|How to claim|Terms and conditions|promotional Claim/i.test(item));
}

function parseCommon(html, product) {
  const text = cleanText(html);
  const strings = collectStrings(nextData(html) || {}).map(cleanText);
  const joined = uniq([text, ...strings]).join(" ");
  const jsonPrice = priceFromJsonLd(html);
  const firstPrice = jsonPrice || money(joined)[0] || product.priceText || "";
  const finance = uniq([
    firstPattern(joined, [
      /From £[\d,.]+ per month for \d+ months\*?/i,
      /£[\d,.]+ per month for \d+ months, interest free\*?/i,
      /Pay £[\d,.]+ interest free over \d+ months/i,
      /Pay £[\d,.]+ per month over \d+ months at [\d.]+% APR/i,
      /Buy now, pay later/i,
    ]),
    product.financeText,
  ]).slice(0, 2).join(" | ");
  const availability = firstPattern(joined, [
    /Currently in stock online/i,
    /Currently out of stock online/i,
    /No longer available online/i,
    /Email when available/i,
    /Delivery available/i,
    /Collection available/i,
    /Add to basket/i,
    /Currently unavailable/i,
    /Out of stock/i,
  ]) || product.availabilityText || "";
  return { firstPrice, finance, availability, joined };
}

function parseCurrys(html, product) {
  const common = parseCommon(html, product);
  const offers = uniq([
    ...offerPatterns(common.joined, [
      /Save £[\d,.]+/gi,
      /Was £[\d,.]+/gi,
      /Get Free Delivery/gi,
      /Price match/gi,
      /Save up to \d+% on the purchase of selected LG soundbars/gi,
      /Save up to \d+% off selected TV accessories/gi,
      /When Bought With any LG TV/gi,
    ]),
    ...storedOfferItems(product.offerText),
  ]).slice(0, 4).join(" | ");
  return {
    priceText: common.firstPrice,
    financeText: common.finance,
    offerText: offers,
    availabilityText: common.availability,
  };
}

function parseJohnLewis(html, product) {
  const common = parseCommon(html, product);
  const offers = uniq([
    ...offerPatterns(common.joined, [
      /Price promise/gi,
      /\d+ year guarantee included/gi,
      /Free standard delivery/gi,
      /Free Click & Collect/gi,
      /Up to \d+% cashback on LG TVs/gi,
      /Claim \d+% cashback(?: \(Via Redemption\))?/gi,
      /Reduced to clear/gi,
      /Save £[\d,.]+/gi,
    ]),
    ...storedOfferItems(product.offerText),
  ]).slice(0, 4).join(" | ");
  const guarantee = firstPattern(common.joined, [/\d+\s+year guarantee included/i]);
  return {
    priceText: common.firstPrice,
    financeText: common.finance,
    offerText: offers,
    availabilityText: common.availability,
    guaranteeText: guarantee || product.guaranteeText || "",
  };
}

function validate(previous, next) {
  const previousProducts = [...previous.currys.products, ...previous.johnLewis.products];
  const nextProducts = [...next.currys.products, ...next.johnLewis.products];
  const errors = [];
  if (previousProducts.length !== nextProducts.length) errors.push(`Product count changed ${previousProducts.length} -> ${nextProducts.length}`);
  for (const retailer of ["currys", "johnLewis"]) {
    if (previous[retailer].products.length !== next[retailer].products.length) {
      errors.push(`${retailer} count changed ${previous[retailer].products.length} -> ${next[retailer].products.length}`);
    }
  }
  const failed = nextProducts.filter((product) => product.priceCheckStatus === "fetch_failed").length;
  if (failed / Math.max(1, nextProducts.length) > MAX_FETCH_FAILURE_RATE) {
    errors.push(`Fetch failure rate too high: ${failed}/${nextProducts.length}`);
  }
  const previousBlank = previousProducts.filter((product) => !product.priceText).length;
  const nextBlank = nextProducts.filter((product) => !product.priceText).length;
  if (nextBlank - previousBlank > MAX_BLANK_PRICE_INCREASE) {
    errors.push(`Blank price increase too high: ${previousBlank} -> ${nextBlank}`);
  }
  const nonOfficial = nextProducts.filter((product) => !officialUrl(product));
  if (nonOfficial.length) errors.push(`Non-official URLs found: ${nonOfficial.length}`);
  if (nextProducts.some((product) => /Model TBC/i.test(product.model || product.displayModel || ""))) {
    errors.push("Model TBC row found");
  }
  return errors;
}

async function main() {
  const sourcePath = fs.existsSync(DATA) ? DATA : SEED;
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const products = [...source.currys.products, ...source.johnLewis.products];
  console.log(`[lgpricechecker] ${products.length} products, direct official URLs, delay ${DELAY_MIN_MS}-${DELAY_MAX_MS}ms`);

  const refreshed = [];
  const started = Date.now();
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    try {
      const { body, finalUrl, statusCode } = await fetchOfficial(product);
      const parsed = product.retailer === "Currys" ? parseCurrys(body, product) : parseJohnLewis(body, product);
      refreshed.push({
        ...product,
        ...parsed,
        directProductUrl: finalUrl || product.directProductUrl,
        priceCheckStatus: parsed.priceText ? "checked" : "checked_price_not_found",
        priceCheckedAt: new Date().toISOString(),
        httpStatus: statusCode,
      });
    } catch (error) {
      refreshed.push({
        ...product,
        priceCheckStatus: "fetch_failed",
        priceCheckError: error.message.slice(0, 300),
        priceCheckedAt: new Date().toISOString(),
      });
    }
    const done = index + 1;
    if (done % 10 === 0 || done === products.length) {
      console.log(`[lgpricechecker] ${done}/${products.length} complete after ${Math.round((Date.now() - started) / 1000)}s`);
    }
    if (done < products.length) await sleep(jitterDelay());
  }

  const next = {
    ...source,
    generatedAt: new Date().toISOString(),
    priceCheckedAt: new Date().toISOString(),
    currys: { ...source.currys, products: refreshed.filter((product) => product.retailer === "Currys") },
    johnLewis: { ...source.johnLewis, products: refreshed.filter((product) => product.retailer === "John Lewis") },
  };

  const errors = validate(source, next);
  const summary = {
    total: refreshed.length,
    currys: next.currys.products.length,
    johnLewis: next.johnLewis.products.length,
    priced: refreshed.filter((product) => product.priceText).length,
    fetchFailed: refreshed.filter((product) => product.priceCheckStatus === "fetch_failed").length,
    checkedPriceNotFound: refreshed.filter((product) => product.priceCheckStatus === "checked_price_not_found").length,
    errors,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (errors.length) {
    process.exitCode = 1;
    return;
  }
  if (DRY_RUN) return;

  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  fs.writeFileSync(path.join(SNAPSHOT_DIR, `${TODAY}.json`), JSON.stringify(next, null, 2));
  fs.writeFileSync(DATA, JSON.stringify(next, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
