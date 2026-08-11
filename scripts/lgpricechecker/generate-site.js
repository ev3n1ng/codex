const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPO = path.resolve(__dirname, "../..");
const OUT = path.join(REPO, "LGpricechecker");
const BASE = "/LGpricechecker/";
const currentCatalogue = path.join(REPO, "data", "lgpricechecker", "catalogue-current.json");
const seedCatalogue = path.join(REPO, "data", "lgpricechecker", "catalogue-seed.json");
const seed = JSON.parse(fs.readFileSync(fs.existsSync(currentCatalogue) ? currentCatalogue : seedCatalogue, "utf8"));

const categories = ["OLED", "MRGB", "QNED", "LED", "Soundbars"];
const categoryRank = new Map(categories.map((category, index) => [category, index]));
const familyRanks = {
  OLED: ["W", "M", "G", "C", "B"],
  MRGB: ["MRGB96", "MRGB88", "MRGB86"],
  QNED: ["QNED9M", "QNED96", "QNED91", "QNED90", "QNED87", "QNED86", "QNED85", "QNED82", "QNED81", "QNED80", "QNED75", "QNED72", "QNED70", "LX7"],
  LED: ["STANBYME", "NANO", "UA", "UR", "NU", "LR", "LB", "LQ", "TQ"],
  Soundbars: ["S95", "USG", "US95", "US90", "US80", "US77", "US70", "US60", "US40", "US20", "USC", "SQC", "SQM", "G1"],
};
const retailerMeta = {
  Currys: {
    slug: "currys",
    short: "Currys",
    title: "Currys LG Price Checker",
    bodyClass: "currys",
    accent: "#4c12a1",
    intro: "LG TVs and soundbars currently tracked from official Currys product and listing pages.",
    source: "Official Currys website",
  },
  "John Lewis": {
    slug: "john-lewis",
    short: "John Lewis",
    title: "John Lewis LG Price Checker",
    bodyClass: "john-lewis",
    accent: "#111111",
    intro: "LG TVs and soundbars currently tracked from official John Lewis category, range and product pages.",
    source: "Official John Lewis website",
  },
};

const allProducts = [
  ...seed.currys.products,
  ...seed.johnLewis.products,
].map((product) => ({
  ...product,
  ...(!product.model ? { displayModel: modelLabel(product) } : {}),
  sourceListingUrl: (product.sourceListingUrls || [product.sourceListingUrl]).filter(Boolean).join(" | "),
})).sort(modelSort);

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function moneyValue(text) {
  const matches = String(text || "").match(/£[\d,.]+/g);
  if (!matches || !matches.length) return Number.POSITIVE_INFINITY;
  const last = matches[matches.length - 1].replace(/[£,]/g, "");
  return Number(last) || Number.POSITIVE_INFINITY;
}

function modelSort(a, b) {
  const aInfo = sortInfo(a);
  const bInfo = sortInfo(b);
  return aInfo.categoryRank - bInfo.categoryRank
    || aInfo.familyRank - bInfo.familyRank
    || bInfo.size - aInfo.size
    || bInfo.year - aInfo.year
    || aInfo.family.localeCompare(bInfo.family)
    || String(modelLabel(a) || a.title).localeCompare(String(modelLabel(b) || b.title));
}

function sortInfo(product) {
  const category = product.category || "";
  const raw = `${modelLabel(product) || ""} ${product.title || ""}`.toUpperCase();
  const family = familyKey(category, raw);
  const ranks = familyRanks[category] || [];
  return {
    categoryRank: categoryRank.has(category) ? categoryRank.get(category) : 999,
    family,
    familyRank: familyRank(category, family, ranks),
    size: screenSize(raw),
    year: Number(raw.match(/\b20\d{2}\b/)?.[0] || 0),
  };
}

function familyRank(category, family, ranks) {
  const exact = ranks.indexOf(family);
  if (exact >= 0) return exact;
  const partial = ranks.findIndex((rank) => family.startsWith(rank) || rank.startsWith(family));
  if (partial >= 0) return partial;
  if (category === "Soundbars") return 50;
  return 999;
}

function familyKey(category, raw) {
  if (category === "OLED") {
    const model = raw.match(/OLED\d{2}([A-Z])/i)?.[1] || raw.match(/\b([WMGCB])\d\b/i)?.[1] || "";
    return model;
  }
  if (category === "MRGB") {
    return raw.match(/MRGB\d+/i)?.[0] || "";
  }
  if (category === "QNED") {
    if (/\bLX7\b/i.test(raw)) return "LX7";
    return raw.match(/QNED\d+[A-Z]?/i)?.[0]?.replace(/A$|B$|C$/i, "") || "";
  }
  if (category === "LED") {
    if (/STANBYME/i.test(raw)) return "STANBYME";
    return raw.match(/NANO\d+[A-Z]?|UA\d+|UR\d+|NU\d+|LR\d+|LB\d+|LQ\d+|TQ\d+/i)?.[0]?.replace(/[A-Z]$/i, "") || "";
  }
  if (category === "Soundbars") {
    return raw.match(/\b(?:S95|USG\d+|US\d+|USC\d+|SQC\d+|SQM\d+|G1|S95TR)\b/i)?.[0]?.replace(/\d+TY$|\d+TR$|\d+T$|\d+A$/i, (match) => match) || raw.match(/\b[A-Z]{2,}\d*[A-Z]*\b/)?.[0] || "";
  }
  return raw;
}

function screenSize(raw) {
  const candidates = [...raw.matchAll(/\b(\d{2,3})(?=(?:["\s-]|INCH|”))/g)]
    .map((match) => Number(match[1]))
    .filter((size) => size >= 20 && size <= 120);
  if (!candidates.length) return 0;
  return Math.max(...candidates);
}

function modelLabel(product) {
  if (product.model) return product.model;
  const title = String(product.title || "");
  const url = String(product.directProductUrl || "");

  if (/sound suite h7/i.test(title)) return "Sound Suite H7";

  const titlePatterns = [
    /\bOLED\d{2}[A-Z0-9]+\b/i,
    /\b\d{2,3}LX\d[A-Z0-9-]*\b/i,
    /\b\d{2,3}TQ\d+[A-Z0-9]*(?:-[A-Z0-9]+)?\b/i,
    /\bS95TR\b/i,
    /\bG1\b/i,
  ];
  for (const pattern of titlePatterns) {
    const match = title.match(pattern);
    if (match) return match[0].toUpperCase();
  }

  const slug = url.split("/").pop() || "";
  const slugPatterns = [
    /\b(\d{2,3}lx\d[a-z0-9-]*)\b/i,
    /\b(\d{2,3}tq\d+[a-z0-9-]*)\b/i,
    /\b(s95tr)\b/i,
  ];
  for (const pattern of slugPatterns) {
    const match = slug.match(pattern);
    if (match) return match[1].toUpperCase();
  }

  return "Model TBC";
}

function productStats(products) {
  return {
    total: products.length,
    priced: products.filter((p) => p.priceText).length,
    offers: products.filter((p) => p.offerText || p.financeText).length,
    finance: products.filter((p) => p.financeText).length,
  };
}

function countsByCategory(products) {
  return categories.reduce((acc, category) => {
    acc[category] = products.filter((p) => p.category === category).length;
    return acc;
  }, {});
}

function css() {
  return `
:root{--lg:#a50034;--pitch:#071c12;--ink:#121613;--muted:#68716d;--line:#dfe5e2;--paper:#fff;--soft:#f6f7f4;--cream:#f0ece4;--currys:#4c12a1;--jl:#111;--good:#096b55;--warn:#8a5d00;--bad:#a3293a}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:linear-gradient(180deg,var(--pitch) 0,#f7f8f7 260px);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.45}.wrap{width:min(1280px,calc(100vw - 32px));margin:auto}.hero{position:relative;overflow:hidden;color:white;background:radial-gradient(circle at 82% 16%,#e11937 0,var(--lg) 30%,#2b050b 58%,var(--pitch) 100%);border-bottom:14px solid var(--lg)}.hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#ffffff12 1px,transparent 1px),linear-gradient(0deg,#ffffff12 1px,transparent 1px);background-size:84px 84px;mask-image:linear-gradient(180deg,#000,#0009 65%,transparent);pointer-events:none}.hero .wrap{position:relative;min-height:440px;padding:48px 0 42px;display:grid;align-content:space-between;gap:42px}.brand{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.lg-mark{width:164px;min-height:96px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--cream);padding:16px 18px;box-shadow:0 22px 54px #0008}.lg-mark img{display:block;width:126px;max-width:100%;height:auto}.brand span{min-height:36px;display:inline-flex;align-items:center;border:1px solid #ffffff45;border-radius:999px;padding:8px 12px;background:#ffffff14;color:#ffdede;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.hero-grid{display:grid;grid-template-columns:minmax(0,980px);gap:24px;align-items:end}.marker{font-size:13px;text-transform:uppercase;letter-spacing:.12em;font-weight:950;color:#ffdede}.hero h1{margin:10px 0 0;max-width:960px;font-size:clamp(42px,7vw,96px);line-height:.88;text-transform:uppercase}.copy{max-width:860px;color:var(--cream);font-size:18px}.actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:4px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;border-radius:8px;padding:12px 16px;font-size:14px;font-weight:950;text-decoration:none;border:1px solid #ffffff75;background:#ffffff;color:#111}.btn.primary{background:var(--lg);color:white}.btn.retailer{justify-content:flex-start;gap:14px;min-width:250px;min-height:76px;padding:14px 18px;border-width:2px;box-shadow:0 18px 42px #0006}.retailer-logo{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:54px;height:44px;border-radius:8px;font-size:16px;font-weight:950;letter-spacing:.02em}.retailer-copy{display:grid;gap:2px;text-align:left;line-height:1.05}.retailer-copy small{font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;opacity:.78}.retailer-copy strong{font-size:24px}.btn.john-lewis{background:#f4f1ea;color:#111;border-color:#fff}.btn.john-lewis .retailer-logo{background:#111;color:#fff}.btn.currys{background:linear-gradient(135deg,var(--currys),#2b106b 68%);color:#fff;border-color:#d7b6ff}.btn.currys .retailer-logo{background:#fff;color:var(--currys)}.retailer-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:28px 0}.retailer-card{position:relative;overflow:hidden;display:grid;gap:24px;min-height:245px;padding:24px;border-radius:8px;text-decoration:none;border:1px solid #ffffff38;box-shadow:0 24px 70px #0008}.retailer-card:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#ffffff18,transparent 44%);pointer-events:none}.retailer-card>*{position:relative}.retailer-card h2{margin:0;font-size:34px}.retailer-card p{margin:8px 0 0;max-width:560px}.retailer-card .go{align-self:end;display:inline-flex;width:max-content;min-height:40px;align-items:center;border-radius:8px;padding:9px 12px;font-size:13px;font-weight:950}.retailer-card.jl{background:linear-gradient(135deg,#f4f1ea,#fff 62%,#ded6ca);color:#111}.retailer-card.jl .go{background:#111;color:#fff}.retailer-card.currys{background:linear-gradient(135deg,var(--currys),#2b106b 55%,var(--lg));color:#fff}.retailer-card.currys .go{background:#fff;color:var(--currys)}.panel{background:var(--paper);border:1px solid var(--line);border-radius:8px;box-shadow:0 18px 44px #071c1214}.summary{padding:20px;margin:24px 0}.summary-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.chip{border:1px solid var(--line);border-radius:8px;background:#fbfcfa;padding:10px}.chip strong{display:block;font-size:22px}.chip span{font-size:12px;color:var(--muted);font-weight:900;text-transform:uppercase}.toolbar{position:sticky;top:0;z-index:5;background:#071c12f2;border-bottom:1px solid #ffffff24;backdrop-filter:blur(14px)}.toolbar .wrap{display:flex;gap:10px;align-items:center;overflow-x:auto;padding:10px 0}.toolbar a,.toolbar button{flex:0 0 auto;border:1px solid #ffffff44;background:var(--cream);color:#071c12;border-radius:8px;padding:9px 12px;font-size:13px;font-weight:950;text-decoration:none;cursor:pointer}.search{padding:18px 0 0}.searchbox{display:grid;grid-template-columns:minmax(220px,1fr) auto;gap:12px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px;box-shadow:0 12px 28px #0e12110d}.searchbox input{width:100%;min-height:44px;border:1px solid var(--line);border-radius:8px;padding:10px 12px;font:inherit;font-weight:750}.result-count{font-size:13px;color:var(--muted);font-weight:900}.section{margin:28px 0;overflow:hidden}.section[hidden],.product[hidden]{display:none}.section-head{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:18px 20px;background:linear-gradient(135deg,#071c12,#146b3a 58%,var(--lg));color:white}.currys .section-head{background:linear-gradient(135deg,var(--currys),#7b1bc5 55%,var(--lg))}.john-lewis .section-head{background:linear-gradient(135deg,#111,#26352d 68%,#a50034)}.section-head h2{margin:0;font-size:clamp(24px,3vw,38px)}.section-head p{margin:0 0 4px;color:#ffdede;font-size:12px;font-weight:950;text-transform:uppercase}.count{border:1px solid #ffffff66;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:850}.cols,.product{display:grid;grid-template-columns:minmax(240px,1.25fr) 132px minmax(320px,1.75fr);gap:16px;align-items:start}.cols{padding:12px 18px;background:#edf1ef;color:var(--muted);font-size:12px;font-weight:950;text-transform:uppercase}.product{padding:16px 18px;border-top:1px solid var(--line)}.product:nth-child(even){background:#fbfaf7}.model{margin:0;font-size:18px}.title{margin:5px 0 12px;color:var(--muted);font-size:13px}.link{color:#146b3a;font-size:13px;font-weight:950}.currys .link{color:var(--currys)}.price{font-size:21px;line-height:1.1;font-weight:950;color:var(--lg)}.offer-cell{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.finance,.offer{display:inline-flex;align-items:center;min-height:28px;border-radius:999px;padding:5px 10px;font-size:12px;font-weight:850}.finance{background:#edf4fb;color:#255b8e}.offer{background:#eef2f1}.offer.warn{background:#fff5df;color:var(--warn)}.offer.good{background:#e9f6f1;color:var(--good)}.offer.bad{background:#fdecef;color:var(--bad)}.muted{color:var(--muted)}.empty-price{color:var(--warn)}footer{border-top:1px solid var(--line);padding:26px 0 36px;color:var(--muted);font-size:13px}.note{font-size:13px;color:var(--muted);font-weight:750}@media(max-width:980px){.hero-grid{grid-template-columns:1fr}.cols{display:none}.product{grid-template-columns:1fr 1fr}.main,.offer-cell{grid-column:1/-1}.summary-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.hero .wrap{min-height:auto;padding:32px 0 36px}.hero h1{font-size:48px}.actions{display:grid;grid-template-columns:1fr;gap:12px}.btn.retailer{width:100%;min-width:0}.retailer-cards{grid-template-columns:1fr}.searchbox{grid-template-columns:1fr}.product{grid-template-columns:1fr}.summary-grid{grid-template-columns:1fr 1fr}.lg-mark{width:138px;min-height:82px}.lg-mark img{width:108px}}`;
}

function pageShell({ title, description, bodyClass = "", content, script = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<style>${css()}</style>
</head>
<body class="${esc(bodyClass)}">
${content}
${script ? `<script>${script}</script>` : ""}
</body>
</html>`;
}

function hero({ title, kicker, intro, actions }) {
  const actionHtml = actions.length ? `<div class="actions">${actions.join("")}</div>` : "";
  return `<header class="hero"><div class="wrap"><div class="brand"><div class="lg-mark"><img src="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg" alt="LG Life's Good"></div><span>${esc(kicker)}</span></div><div class="hero-grid"><div><p class="marker">Official LG price checker</p><h1>${esc(title)}</h1><p class="copy">${esc(intro)}</p>${actionHtml}</div></div></div></header>`;
}

function landingPage() {
  const currys = allProducts.filter((p) => p.retailer === "Currys");
  const johnLewis = allProducts.filter((p) => p.retailer === "John Lewis");
  const content = `${hero({
    title: "LG Price Checker",
    kicker: "TVs, soundbars, offers and finance",
    intro: "A wider LG catalogue tracker built from direct official retailer product links, split by retailer and product category.",
    actions: [],
  })}
<main class="wrap">
  <section class="retailer-cards">
    ${retailerLandingCard("John Lewis", johnLewis)}
    ${retailerLandingCard("Currys", currys)}
  </section>
</main>
<footer><div class="wrap">Generated ${esc(new Date(seed.generatedAt).toLocaleString("en-GB", { timeZone: "Europe/London" }))} from the LG retailer catalogue seed.</div></footer>`;
  return pageShell({
    title: "LG Price Checker",
    description: "LG TV and soundbar price checker split by Currys and John Lewis.",
    content,
  });
}

function retailerLandingCard(retailer, products) {
  const meta = retailerMeta[retailer];
  return `<a class="retailer-card ${meta.slug === "currys" ? "currys" : "jl"}" href="${BASE}${meta.slug}/">
    <div>
      <h2>${esc(meta.short)}</h2>
      <p>${esc(meta.intro)}</p>
    </div>
    <span class="go">Open ${esc(meta.short)} report</span>
  </a>`;
}

function retailerButton(retailer) {
  const meta = retailerMeta[retailer];
  const isCurrys = meta.slug === "currys";
  return `<a class="btn retailer ${isCurrys ? "currys" : "john-lewis"}" href="${BASE}${meta.slug}/">
    <span class="retailer-logo">${isCurrys ? "Currys" : "JL"}</span>
    <span class="retailer-copy"><small>Open retailer report</small><strong>${esc(meta.short)}</strong></span>
  </a>`;
}

function retailerPage(retailer) {
  const meta = retailerMeta[retailer];
  const products = allProducts.filter((p) => p.retailer === retailer).sort(modelSort);
  const counts = countsByCategory(products);
  const sections = categories
    .map((category) => [category, products.filter((p) => p.category === category)])
    .filter(([, rows]) => rows.length);
  const content = `${hero({
    title: meta.title,
    kicker: `${meta.short} report`,
    intro: meta.intro,
    actions: [
      `<a class="btn primary" href="${BASE}">Retailer chooser</a>`,
    ],
  })}
<nav class="toolbar"><div class="wrap">
  <a href="#top" aria-label="Top">Top</a>
  <button type="button" id="showAllModels">All models</button>
  ${sections.map(([category]) => `<a href="#${esc(category.toLowerCase())}">${esc(category)}</a>`).join("")}
</div></nav>
<section class="search"><div class="wrap"><div class="searchbox"><input id="reportSearch" type="search" autocomplete="off" value="" placeholder="Search model, category, price or offer" aria-label="Search ${esc(meta.short)} report"><span class="result-count"></span></div></div></section>
<main id="top" class="wrap">
  ${sections.map(([category, rows]) => sectionHtml(category, rows)).join("")}
</main>
<footer><div class="wrap">${esc(meta.short)} report generated from official retailer URLs. Product links open the retailer page in a new tab.</div></footer>`;
  return pageShell({
    title: meta.title,
    description: `${meta.title} for LG TVs and soundbars.`,
    bodyClass: meta.bodyClass,
    content,
    script: clientScript(products.length),
  });
}

function sectionHtml(category, rows) {
  return `<section class="section panel" id="${esc(category.toLowerCase())}">
  <div class="section-head"><div><p>Product category</p><h2>${esc(category)}</h2></div><span class="count" data-total="${rows.length}">${rows.length} rows</span></div>
  <div class="cols"><span>Product</span><span>Price</span><span>Current offers</span></div>
  ${rows.map(productHtml).join("")}
</section>`;
}

function productHtml(product) {
  const noCurrentPrice = /not_listed|discontinued|unlikely to receive|out of stock|not available|no longer available|unavailable|no current online availability/i.test(`${product.priceCheckStatus || ""} ${product.availabilityText || ""}`);
  const price = product.priceText || (noCurrentPrice ? "No current price" : "Detail update needed");
  const priceClass = product.priceText ? "price" : "price empty-price";
  const offerItems = [
    product.offerText,
    product.financeText,
    isWarningAvailability(product.availabilityText) ? product.availabilityText : "",
  ].filter(Boolean)
    .flatMap((item) => String(item).split(/\s+\|\s+/))
    .map((item) => item.trim())
    .filter(Boolean);
  const seenOffers = new Set();
  const uniqueOfferItems = offerItems.filter((item) => {
    const key = item.toLowerCase();
    if (seenOffers.has(key)) return false;
    seenOffers.add(key);
    return true;
  }).filter(shouldShowOfferItem);
  if (!uniqueOfferItems.length) uniqueOfferItems.push("No current offer listed");
  const search = [
    product.retailer,
    product.category,
    product.displayModel,
    product.model,
    product.title,
    product.priceText,
    product.financeText,
    product.offerText,
    product.availabilityText,
  ].join(" ").toLowerCase();
  return `<article class="product" data-search="${esc(search)}">
    <div class="main">
      <h3 class="model">${esc(product.displayModel || modelLabel(product))}</h3>
      <p class="title">${esc(product.title)}</p>
      <a class="link" href="${esc(product.directProductUrl)}" target="_blank" rel="noopener">Open official product page</a>
    </div>
    <div class="${priceClass}">${esc(price)}</div>
    <div class="offer-cell">${uniqueOfferItems.map((offer) => `<span class="${offerChipClass(offer)}">${esc(offer)}</span>`).join("")}</div>
  </article>`;
}

function offerChipClass(offer) {
  if (/not listed|not available|out of stock|update needed|email when available|no current online availability/i.test(offer)) return "offer warn";
  if (/interest|month|payment|credit|apr/i.test(offer)) return "finance";
  if (/free|save|cashback|exclusive|offer|price promise|guarantee|claim/i.test(offer)) return "offer good";
  return "offer";
}

function shouldShowOfferItem(offer) {
  if (offer.length > 120) return false;
  if (/^£[\d,.]+.*Save/i.test(offer)) return false;
  if (/Exclusions \(eg\. ink\)|How to request a price match|Representative example|Assumed Credit Limit|Image gallery|Viewing image|previous image|next image|Browse all electrical offers|Burberry|Calvin Klein|Joseph Joseph|West Elm|Product description|View product des|Shop all LG|Free standard delivery|Free Click & Collect|Get Free Delivery|Delivery available|Collection available|Add to basket|Price match$/i.test(offer)) return false;
  return true;
}

function isWarningAvailability(value) {
  return /not listed|not available|no longer available|out of stock|unavailable|email when available|no current online availability/i.test(String(value || ""));
}

function clientScript(total) {
  return `const input=document.querySelector("#reportSearch"),result=document.querySelector(".result-count"),showAll=document.querySelector("#showAllModels"),total=${total};input.value="";function applyFilter(){const q=input.value.trim().toLowerCase();let shown=0;document.querySelectorAll(".section").forEach(section=>{let sectionShown=0;section.querySelectorAll(".product").forEach(row=>{const ok=!q||row.dataset.search.includes(q);row.hidden=!ok;if(ok){shown++;sectionShown++;}});section.hidden=sectionShown===0;const count=section.querySelector(".count");count.textContent=(q?sectionShown:count.dataset.total)+" rows";});result.textContent=(q?shown:total)+" of "+total+" rows shown";}showAll.addEventListener("click",()=>{input.value="";applyFilter();location.hash="top";});input.addEventListener("input",applyFilter);applyFilter();`;
}

fs.mkdirSync(path.join(OUT, "john-lewis"), { recursive: true });
fs.mkdirSync(path.join(OUT, "currys"), { recursive: true });
fs.writeFileSync(path.join(OUT, "index.html"), landingPage());
fs.writeFileSync(path.join(OUT, "john-lewis", "index.html"), retailerPage("John Lewis"));
fs.writeFileSync(path.join(OUT, "currys", "index.html"), retailerPage("Currys"));
fs.writeFileSync(path.join(OUT, "catalogue.json"), JSON.stringify({
  generatedAt: seed.generatedAt,
  products: allProducts,
}, null, 2));

console.log(JSON.stringify({
  output: OUT,
  pages: ["index.html", "john-lewis/index.html", "currys/index.html"],
  products: allProducts.length,
  currys: allProducts.filter((p) => p.retailer === "Currys").length,
  johnLewis: allProducts.filter((p) => p.retailer === "John Lewis").length,
}, null, 2));
