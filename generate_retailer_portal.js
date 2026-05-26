const fs = require("fs");
const path = require("path");

const runDate = new Date().toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" });
const lgLogo = "https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg";
const rickImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Rick_Astley_Dallas.jpg/1280px-Rick_Astley_Dallas.jpg";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
  console.log(`Wrote ${file} (${content.length} bytes)`);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function modelOf(title) {
  return title.match(/OLED\d+[A-Z0-9]+/i)?.[0] || title.match(/OLED[A-Z0-9]+/i)?.[0] || "LG OLED";
}

function seriesOf(model) {
  return model.match(/OLED\d*([A-Z])\d/i)?.[1] || "Other";
}

function generationOf(model) {
  return model.match(/OLED\d*[A-Z](\d)/i)?.[1] || "";
}

function category(product) {
  const series = product.series;
  const gen = product.gen;
  const year = product.year;
  if (year === "2025" && ["G", "M"].includes(series) && gen === "5") return { rank: 0, key: "2025-g5-m5", label: "2025 G5 & M5 series" };
  if (year === "2025" && series === "C" && gen === "5") return { rank: 1, key: "2025-c5", label: "2025 C5 series" };
  if (year === "2025" && series === "B" && gen === "5") return { rank: 2, key: "2025-b5", label: "2025 B5 series" };
  if (year === "2026" && ["W", "G", "M"].includes(series) && gen === "6") return { rank: 3, key: "2026-w6-g6", label: "2026 W6 & G6 series" };
  if (year === "2026" && series === "C" && gen === "6") return { rank: 4, key: "2026-c6", label: "2026 C6 series" };
  if (year === "2026" && series === "B" && gen === "6") return { rank: 5, key: "2026-b6", label: "2026 B6 series" };
  return { rank: 20, key: `${year || "other"}-${series}${gen}`, label: `${year || "Other"} ${series}${gen} series` };
}

function groupProducts(products) {
  const sorted = products
    .map((product) => ({ ...product, model: product.model || modelOf(product.title) }))
    .map((product) => ({ ...product, series: seriesOf(product.model), gen: generationOf(product.model) }))
    .sort((a, b) => category(a).rank - category(b).rank || b.size - a.size || a.model.localeCompare(b.model));
  const groups = [];
  for (const product of sorted) {
    const c = category(product);
    let group = groups.find((g) => g.key === c.key);
    if (!group) groups.push(group = { ...c, products: [] });
    group.products.push(product);
  }
  return groups;
}

let currysProducts = [
  {
    year: "2026",
    title: 'LG G6 65" OLED AI 4K HDR Smart TV (Wall Mount Version) - OLED65G64LW',
    size: 65,
    price: "£2,999.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled65g64lw-10301388.html",
  },
  {
    year: "2026",
    title: 'LG G6 65" OLED AI 4K HDR Smart TV (Stand Version) - OLED65G66LS',
    size: 65,
    price: "£3,099.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled65g66ls-10301977.html",
  },
  {
    year: "2026",
    title: 'LG G6 55" OLED AI 4K HDR Smart TV (Wall Mount Version) - OLED55G64LW',
    size: 55,
    price: "£2,199.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled55g64lw-10301338.html",
  },
  {
    year: "2026",
    title: 'LG G6 55" OLED AI 4K HDR Smart TV (Stand Version) - OLED55G66LS',
    size: 55,
    price: "£2,299.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled55g66ls-10301989.html",
  },
  {
    year: "2026",
    title: 'LG C6 55" OLED AI 4K HDR Smart TV - OLED55C64LA',
    size: 55,
    price: "£1,799.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-c6-55-oled-ai-4k-hdr-smart-tv-2026-oled55c64la-10301942.html",
  },
  {
    year: "2026",
    title: 'LG B6 65" OLED AI 4K HDR Smart TV - OLED65B6ELC',
    size: 65,
    price: "£1,799.99",
    availability: "Listed",
    offers: ["20% off marked price with code 20OFFVIS", "Free delivery"],
    url: "https://www.currys.co.uk/products/lg-b6-65-oled-ai-4k-hdr-smart-tv-2026-oled65b6elc-10301905.html",
  },
  {
    year: "2025",
    title: 'LG G5 83" OLED evo AI 4K HDR Smart TV (Wall Mount Version) - OLED83G54LW',
    size: 83,
    price: "£5,499.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-g5-83-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled83g54lw-10282103.html",
  },
  {
    year: "2025",
    title: 'LG G5 65" OLED evo AI 4K HDR Smart TV (Wall Mount Version) - OLED65G54LW',
    size: 65,
    price: "£1,999.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £500.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled65g54lw-10280771.html",
  },
  {
    year: "2025",
    title: 'LG G5 65" OLED evo AI 4K HDR Smart TV (Stand Version) - OLED65G56LS',
    size: 65,
    price: "£2,299.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £200.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled65g56ls-10282093.html",
  },
  {
    year: "2025",
    title: 'LG G5 55" OLED evo AI 4K HDR Smart TV (Wall Mount Version) - OLED55G54LW',
    size: 55,
    price: "£1,599.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £100.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled55g54lw-10280772.html",
  },
  {
    year: "2025",
    title: 'LG C5 83" OLED evo AI 4K HDR Smart TV - OLED83C54LA',
    size: 83,
    price: "£3,799.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-c5-83-oled-evo-ai-4k-hdr-smart-tv-2025-oled83c54la-10282101.html",
  },
  {
    year: "2025",
    title: 'LG C5 77" OLED evo AI 4K HDR Smart TV - OLED77C56LB',
    size: 77,
    price: "£2,599.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £300.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-c5-77-oled-evo-ai-4k-hdr-smart-tv-2025-oled77c56lb-10281778.html",
  },
  {
    year: "2025",
    title: 'LG C5 65" OLED evo AI 4K HDR Smart TV - OLED65C54LA',
    size: 65,
    price: "£1,599.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £100.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-c5-65-oled-evo-ai-4k-hdr-smart-tv-2025-oled65c54la-10281777.html",
  },
  {
    year: "2025",
    title: 'LG C5 55" OLED evo AI 4K HDR Smart TV - OLED55C54LA',
    size: 55,
    price: "£1,199.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-c5-55-oled-evo-ai-4k-hdr-smart-tv-2025-oled55c54la-10281549.html",
  },
  {
    year: "2025",
    title: 'LG C5 42" OLED evo AI 4K HDR Smart TV - OLED42C54LA',
    size: 42,
    price: "£849.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-c5-42-oled-evo-ai-4k-hdr-smart-tv-2025-oled42c54la-10281538.html",
  },
  {
    year: "2025",
    title: 'LG B5 65" OLED AI 4K HDR Smart TV - OLED65B56LA',
    size: 65,
    price: "£1,199.99",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £199.01", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-b5-65-oled-ai-4k-hdr-smart-tv-2025-oled65b56la-10281772.html",
  },
  {
    year: "2025",
    title: 'LG B5 55" OLED AI 4K HDR Smart TV - OLED55B56LA',
    size: 55,
    price: "£859.00",
    availability: "Listed",
    offers: ["10% off marked price with code TV10", "Free delivery", "Save £140.00", "Save up to 50% on selected soundbars when bought with any LG TV"],
    url: "https://www.currys.co.uk/products/lg-b5-55-oled-ai-4k-hdr-smart-tv-2025-oled55b56la-10281768.html",
  },
].map((product) => ({ ...product, model: modelOf(product.title) }));

if (fs.existsSync("currys-overrides.json")) {
  const overrides = JSON.parse(fs.readFileSync("currys-overrides.json", "utf8"));
  currysProducts = currysProducts.map((product) => {
    const override = overrides[product.model] || overrides[product.url] || {};
    return {
      ...product,
      ...override,
      offers: override.offers?.length ? override.offers : product.offers,
    };
  });
}

function reportPage({ retailer, bodyClass, accent, retailerInfoHref, homeHref = "../retailers/", groups, sourceNote }) {
  const data = JSON.stringify({ runDate, groups });
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${esc(retailer)} LG OLED Pricing</title><style>
:root{--r:${accent};--i:#151817;--m:#6d7773;--l:#dfe5e2;--p:#f7f8f7;--g:#096b55;--b:#255b8e;--a:#8a5d00;--bad:#a3293a}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--p);color:var(--i);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.45}.wrap{width:min(1280px,calc(100vw - 32px));margin:auto}.hero{background:linear-gradient(135deg,#151817 0%,#231a20 52%,color-mix(in srgb,var(--r) 32%,#151817) 100%);color:white;border-bottom:12px solid var(--r)}.hero .wrap{min-height:390px;padding:52px 0 42px;display:grid;align-content:space-between;gap:44px}.brand{display:flex;gap:30px;align-items:flex-start}.brand-logos{display:flex;align-items:center;gap:16px;flex-wrap:wrap;min-width:300px}.lg-logo{width:154px;display:flex;align-items:center}.lg-logo img{display:block;width:150px;max-width:100%;height:auto;mix-blend-mode:screen}.logo-divider{width:1px;height:54px;background:#ffffff38}.retailer-logo{display:inline-flex;align-items:center;min-height:54px;color:white;font-size:25px;font-weight:950;letter-spacing:.01em}.currys-report .retailer-logo{background:#4c12a1;border-radius:8px;padding:9px 13px;font-size:22px}.brand-tag{margin:0 0 14px;color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}h1{margin:0;max-width:900px;font-size:clamp(38px,5vw,66px);line-height:.95;text-transform:uppercase}.copy{max-width:860px;color:#e7ece9;font-size:18px}.run{margin-top:30px;font-weight:800}.source{color:#cbd2cf}.hero-actions{min-height:56px;display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap}.retailer-cta,.home-cta{display:inline-flex;align-items:center;justify-content:center;min-height:44px;text-decoration:none;border-radius:8px;padding:11px 16px;font-size:14px;font-weight:950}.retailer-cta{background:var(--r);color:white;border:1px solid #ffffff80}.home-cta{background:white;color:var(--i);border:1px solid white}.nav{position:sticky;top:0;z-index:3;background:rgba(247,248,247,.94);border-bottom:1px solid var(--l);backdrop-filter:blur(14px)}.nav .wrap{display:flex;gap:8px;overflow-x:auto;padding:10px 0}.nav a{flex:0 0 auto;text-decoration:none;background:white;border:1px solid var(--l);border-radius:8px;padding:9px 12px;font-size:13px;font-weight:850}.series{margin:28px 0;background:white;border:1px solid var(--l);border-radius:8px;overflow:hidden;box-shadow:0 18px 44px #0e121114;scroll-margin-top:74px}.head{display:flex;justify-content:space-between;gap:18px;align-items:center;background:var(--r);color:white;padding:18px 20px}.eyebrow{margin:0 0 4px;color:#ffe1eb;font-size:12px;font-weight:850;text-transform:uppercase}h2{margin:0;font-size:clamp(24px,3vw,38px)}.count{border:1px solid #ffffff66;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:850}.cols,.product{display:grid;grid-template-columns:minmax(190px,1.3fr) 78px 120px 150px minmax(280px,1.8fr);gap:14px;align-items:start}.cols{padding:12px 18px;background:#edf1ef;color:var(--m);font-size:12px;font-weight:900;text-transform:uppercase}.product{padding:16px 18px;border-top:1px solid var(--l)}h3{margin:0;font-size:18px}.pt{margin:4px 0 12px;color:var(--m);font-size:13px}.link{color:var(--r);font-size:13px;font-weight:900}.size,.price{font-size:21px;line-height:1;font-weight:950}.size span{display:block;margin-top:4px;color:var(--m);font-size:11px;text-transform:uppercase}.price{color:var(--r)}.status,.offer{display:inline-flex;align-items:center;min-height:28px;border-radius:999px;padding:5px 10px;font-size:12px;font-weight:850}.ok{background:#e9f6f1;color:var(--g)}.warn{background:#fff5df;color:var(--a)}.no{background:#fdecef;color:var(--bad)}.offers{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}.offer{background:#eef2f1}.saving{background:#fff2f5;color:var(--r)}.gift{background:#edf4fb;color:var(--b)}.bundle{background:#fff7e6;color:var(--a)}footer{border-top:1px solid var(--l);padding:26px 0 36px;color:var(--m);font-size:13px}@media(max-width:980px){.cols{display:none}.product{grid-template-columns:repeat(2,1fr)}.main,.offers{grid-column:1/-1}}@media(max-width:560px){.wrap{width:min(100vw - 20px,1280px)}.brand{flex-direction:column}.brand-logos{min-width:0}.product{grid-template-columns:1fr}.head{align-items:flex-start;flex-direction:column}.lg-logo{width:150px}.lg-logo img{width:146px}}</style></head><body class="${esc(bodyClass)}"><header class=hero><div class=wrap><div class=brand><div class=brand-logos><div class=lg-logo><img src="${lgLogo}" alt="LG Life's Good"></div><span class=logo-divider></span><div class=retailer-logo>${esc(retailer)}</div></div><div><p class=brand-tag>LG OLED retail report</p><h1>${esc(retailer)} LG OLED Pricing</h1><p class=copy>LG OLED model prices, promotional offers and availability grouped by model year and series.</p><p class=run></p><p class=source>${esc(sourceNote)}</p></div></div><div class=hero-actions><a class=home-cta href=${homeHref}>Retailer chooser</a><a class=retailer-cta href=${retailerInfoHref}>Retailer information</a></div></div></header><nav class=nav><div class=wrap></div></nav><main class=wrap></main><footer><div class=wrap>Preview report generated locally. Product links open retailer pages in a new tab.</div></footer><script>const D=${data};const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const oc=o=>/discount|Save|10%|20%/i.test(o)?"offer saving":/gift|voucher/i.test(o)?"offer gift":/bundle|accessory|soundbar/i.test(o)?"offer bundle":"offer";const sc=s=>/stock|listed/i.test(s)?"status ok":/out/i.test(s)?"status no":"status warn";document.querySelector(".run").textContent="Run: "+D.runDate+" Europe/London";document.querySelector(".nav .wrap").innerHTML=D.groups.map(g=>'<a href="#'+e(g.key)+'">'+e(g.label)+'</a>').join("");document.querySelector("main").innerHTML=D.groups.map(g=>'<section class=series id="'+e(g.key)+'"><div class=head><div><p class=eyebrow>Model category</p><h2>'+e(g.label)+'</h2></div><span class=count>'+g.products.length+' models</span></div><div class=cols><span>Model</span><span>Size</span><span>Price</span><span>Availability</span><span>Current offers</span></div>'+g.products.map(p=>'<article class=product><div class=main><h3>'+e(p.model)+'</h3><p class=pt>'+e(p.title)+'</p><a class=link href="'+e(p.url)+'" target=_blank rel=noopener>Open product page</a></div><div class=size>'+p.size+'<span>inch</span></div><div class=price>'+e(p.price)+'</div><div><span class="'+sc(p.availability)+'">'+e(p.availability)+'</span></div><ul class=offers>'+((p.offers&&p.offers.length?p.offers:["No current promotional offer listed"]).map(o=>'<li class="'+oc(o)+'">'+e(o)+'</li>').join(""))+'</ul></article>').join("")+'</section>').join("");</script></body></html>`;
}

function portfolioPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Alberto Portfolio</title><style>
:root{--bg:#030303;--crt:#8cffb7;--hot:#ff4fb8;--cyan:#63e8ff;--amber:#ffd166;--dim:#4d8f68;--line:#1a3d27}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:radial-gradient(circle at 74% 12%,#25111f 0,#070707 34%,#030303 72%);color:var(--crt);font-family:"Courier New",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;line-height:1.35;overflow-x:hidden}body:before{content:"";position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,#ffffff08 0,#ffffff08 1px,transparent 1px,transparent 4px);mix-blend-mode:screen;opacity:.32}.wrap{width:min(1120px,calc(100vw - 28px));margin:auto}.screen{min-height:100vh;padding:34px 0 58px;display:grid;align-content:center;gap:24px}.terminal{border:1px solid var(--line);background:linear-gradient(180deg,#07120bf2,#020403f2);box-shadow:0 0 0 1px #8cffb71a,0 0 42px #00ff6630,0 24px 80px #000;border-radius:8px;overflow:hidden}.bar{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid var(--line);padding:10px 14px;background:#0c1d11;color:var(--dim);font-size:13px}.leds{display:flex;gap:7px}.led{width:10px;height:10px;border-radius:50%;background:var(--hot);box-shadow:0 0 12px var(--hot)}.led:nth-child(2){background:var(--amber);box-shadow:0 0 12px var(--amber)}.led:nth-child(3){background:var(--crt);box-shadow:0 0 12px var(--crt)}.content{padding:28px}.prompt{color:var(--cyan);margin:0 0 16px}.ascii{margin:0;color:var(--hot);font-size:clamp(11px,1.55vw,18px);line-height:1.05;text-shadow:0 0 16px #ff4fb880;white-space:pre;overflow:hidden}.sub{max-width:760px;margin:26px 0 0;color:#c6ffd8;font-size:16px}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-top:26px}.panel{border:1px solid var(--line);background:#061009cc;border-radius:8px;padding:18px;box-shadow:inset 0 0 24px #00ff3c0d}.label{display:block;color:var(--amber);font-size:13px;margin-bottom:10px}.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;color:#bdfbd0}.list li:before{content:"> ";color:var(--cyan)}.project{display:grid;gap:14px;text-decoration:none;color:var(--crt);border:1px solid #ff4fb875;background:linear-gradient(135deg,#210817,#07120b);border-radius:8px;padding:18px;box-shadow:0 0 24px #ff4fb824}.project strong{color:white;font-size:24px;line-height:1}.project span{color:#ffd9ed}.button{display:inline-flex;width:max-content;align-items:center;justify-content:center;min-height:42px;border:1px solid var(--cyan);border-radius:4px;padding:10px 12px;color:#031107;background:var(--cyan);font-weight:900;text-transform:uppercase;box-shadow:0 0 18px #63e8ff55}.ticker{display:flex;gap:18px;overflow:hidden;border-top:1px solid var(--line);padding:12px 14px;color:var(--dim);font-size:13px}.ticker span{white-space:nowrap}.cursor{display:inline-block;width:10px;height:18px;background:var(--crt);box-shadow:0 0 12px var(--crt);animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}footer{color:var(--dim);font-size:12px;text-align:center;padding:0 0 20px}@media(max-width:820px){.screen{align-content:start;padding-top:20px}.content{padding:20px}.grid{grid-template-columns:1fr}.ascii{font-size:10px}.bar{flex-direction:column}.project strong{font-size:21px}}
</style></head><body><main class=screen><div class="wrap terminal"><div class=bar><div class=leds><span class=led></span><span class=led></span><span class=led></span></div><span>ALBERTO_SYS / PROJECT_ARCHIVE / 1993</span></div><div class=content><p class=prompt>C:\\PORTFOLIO&gt; boot alberto.exe <span class=cursor></span></p><pre class=ascii>+--------------------------------------------------------------------+
     ___       __       ____    ______   ____     ______   ____ 
    /   |     / /      / __ )  / ____/  / __ \\   /_  __/  / __ \\
   / /| |    / /      / __  | / __/    / /_/ /    / /    / / / /
  / ___ |   / /___   / /_/ / / /___   / _, _/    / /    / /_/ /
 /_/  |_|  /_____/  /_____/ /_____/  /_/ |_|    /_/     \\____/

        digital projects // retail tools // useful weirdness
+--------------------------------------------------------------------+</pre><p class=sub>A living collection of projects, dashboards and practical experiments. Built for fast decisions, clean sharing and a little late-night terminal glamour.</p><div class=grid><section class=panel><span class=label>[ ACTIVE PROJECTS ]</span><a class=project href=retailers/><strong>LG OLED Pricing Checker</strong><span>Retailer choice hub for John Lewis and Currys pricing, availability and offers.</span><b class=button>Open project</b></a></section><section class=panel><span class=label>[ SYSTEM NOTES ]</span><ul class=list><li>Static HTML dashboards</li><li>Retail pricing reports</li><li>Portfolio projects live here</li><li>More modules loading soon</li></ul></section></div></div><div class=ticker><span>STATUS: ONLINE</span><span>DISPLAY: CRT MODE</span><span>PROJECTS: 001</span><span>NEXT BUILD: PENDING</span></div></div></main><footer>Local preview portfolio. Nothing is pushed to GitHub until you approve it.</footer></body></html>`;
}

function splashPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>LG OLED Retailer Chooser</title><style>
:root{--lg:#a50034;--ink:#f7f2f4;--muted:#d7c8ce;--line:#ffffff24;--currys:#4c12a1;--jl:#111}*{box-sizing:border-box}body{margin:0;background:#070404;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}.hero{min-height:100vh;display:grid;align-items:center;background:radial-gradient(circle at 74% 26%,#5f1630 0,#230912 32%,#070404 72%)}.wrap{width:min(1120px,calc(100vw - 32px));margin:auto;padding:46px 0;display:grid;gap:52px}.brand{display:flex;align-items:center;gap:18px;flex-wrap:wrap}.logo{width:176px}.logo img{display:block;width:100%;mix-blend-mode:screen}.divider{width:1px;height:56px;background:#ffffff40}.brand span{color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.intro{max-width:820px}.kicker{margin:0 0 14px;color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}h1{margin:0;font-size:clamp(46px,7vw,94px);line-height:.88;text-transform:uppercase}.copy{max-width:700px;margin:22px 0 0;color:var(--muted);font-size:20px;line-height:1.5}.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:880px}.card{border-radius:8px;padding:22px;text-decoration:none;box-shadow:0 22px 56px #0008;min-height:174px;display:grid;align-content:space-between;border:1px solid var(--line)}.card strong{display:block;font-size:30px;line-height:1}.card span{display:block;margin-top:10px;font-size:14px;line-height:1.45}.card b{display:inline-flex;width:max-content;margin-top:20px;min-height:40px;align-items:center;border-radius:8px;padding:9px 12px;font-size:13px}.john{background:#fffffff4;color:#111}.john b{background:#111;color:white}.currys{background:linear-gradient(135deg,#4c12a1,#22105b);color:white}.currys b{background:white;color:var(--currys)}.home{color:#f0d5df;text-decoration:none;font-size:13px;font-weight:900}@media(max-width:740px){.wrap{padding:34px 0}.cards{grid-template-columns:1fr}.divider{display:none}h1{font-size:48px}.copy{font-size:18px}}</style></head><body><main class=hero><div class=wrap><div class=brand><div class=logo><img src="${lgLogo}" alt="LG Life's Good"></div><span class=divider></span><span>OLED pricing checker</span></div><section class=intro><p class=kicker>LG OLED retailer reports</p><h1>Choose a retailer</h1><p class=copy>Open current LG OLED pricing, availability and retailer offers.</p></section><div class=cards><a class="card john" href=../john-lewis/><div><strong>John Lewis</strong><span>LG OLED prices, availability and offer report.</span></div><b>Open report</b></a><a class="card currys" href=../currys/><div><strong>Currys</strong><span>LG OLED prices, availability and offer report.</span></div><b>Open report</b></a></div><a class=home href=../>Back to portfolio</a></div></main></body></html>`;
}

function currysInfoPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Currys Retailer Information</title><style>
:root{--r:#4c12a1;--i:#151817;--m:#6d7773;--l:#dfe5e2;--p:#f7f8f7}*{box-sizing:border-box}body{margin:0;background:var(--p);color:var(--i);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.5}.wrap{width:min(1120px,calc(100vw - 32px));margin:auto}.hero{background:var(--i);color:white;border-bottom:10px solid var(--r)}.hero .wrap{min-height:300px;padding:48px 0 32px;display:grid;align-content:space-between;gap:32px}.brand{display:flex;gap:22px;align-items:flex-start}.logo{width:82px;height:82px;border-radius:8px;display:grid;place-items:center;background:var(--r);font-size:22px;font-weight:950}h1{margin:0;max-width:840px;font-size:clamp(36px,5vw,62px);line-height:.98;text-transform:uppercase}.copy{max-width:780px;color:#e7ece9;font-size:18px}.toplinks{display:flex;gap:10px;flex-wrap:wrap}.toplinks a{display:inline-flex;align-items:center;min-height:38px;text-decoration:none;background:white;color:var(--i);border:1px solid var(--l);border-radius:8px;padding:8px 12px;font-size:13px;font-weight:900}.toplinks a:first-child{background:var(--r);border-color:var(--r);color:white}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:28px 0}.card{background:white;border:1px solid var(--l);border-radius:8px;padding:20px;box-shadow:0 16px 36px #0e12110f}h2{margin:0 0 10px;font-size:24px}.kicker{margin:0 0 8px;color:var(--r);font-size:12px;font-weight:950;text-transform:uppercase}.links{display:grid;gap:8px;margin-top:14px}.links a{color:var(--r);font-weight:900}.address{font-size:20px;font-weight:900}.note{background:#eef2f1;border-left:5px solid var(--r);padding:16px 18px;margin:28px 0;border-radius:8px}.small{font-size:13px;color:var(--m)}footer{border-top:1px solid var(--l);padding:26px 0 36px;color:var(--m);font-size:13px}@media(max-width:760px){.grid{grid-template-columns:1fr}.brand{flex-direction:column}}</style></head><body><header class=hero><div class=wrap><div class=brand><div class=logo>Currys</div><div><h1>Currys Retailer Information</h1><p class=copy>Useful Currys links for contact, support, price match, delivery, returns and guarantee information.</p></div></div><div class=toplinks><a href=../>Back to Currys report</a><a href=https://www.currys.co.uk/services/contact-us.html target=_blank rel=noopener>Contact Currys</a><a href=https://www.currys.co.uk/services/shopping-with-us/price-promise.html target=_blank rel=noopener>Price promise</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repairs and support</a></div></div></header><main class=wrap><section class=note><strong>Last checked:</strong> ${runDate} Europe/London. Please confirm policy details on the linked Currys pages before customer-facing use.</section><div class=grid><article class=card><p class=kicker>Customer support</p><h2>Contact and help</h2><p>Currys provides support routes for orders, repairs, returns, delivery, installation and product advice.</p><div class=links><a href=https://www.currys.co.uk/services/contact-us.html target=_blank rel=noopener>Contact Currys</a><a href=https://www.currys.co.uk/services/help-and-services.html target=_blank rel=noopener>Help and services</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repair and support</a><a href=https://www.currys.co.uk/store-finder target=_blank rel=noopener>Store finder</a></div></article><article class=card><p class=kicker>Company details</p><h2>Head office</h2><p class=address>Currys Group Limited<br>1 Portal Way<br>London W3 6RS</p><p class=small>Company number 00504877.</p><div class=links><a href=https://find-and-update.company-information.service.gov.uk/company/00504877 target=_blank rel=noopener>Companies House profile</a><a href=https://www.currysplc.com target=_blank rel=noopener>Currys plc</a></div></article><article class=card><p class=kicker>Pricing policy</p><h2>Price promise</h2><p>Currys product pages state that if a customer finds the same product cheaper at another UK retailer online or in-store, Currys can match it, subject to exclusions and conditions.</p><div class=links><a href=https://www.currys.co.uk/services/shopping-with-us/price-promise.html target=_blank rel=noopener>Price promise details</a></div></article><article class=card><p class=kicker>Delivery and services</p><h2>Delivery, installation and returns</h2><p>Useful operational links for checking delivery, installation and aftercare policy around TV purchases.</p><div class=links><a href=https://www.currys.co.uk/services/delivery-installation.html target=_blank rel=noopener>Delivery and installation</a><a href=https://www.currys.co.uk/services/shopping-with-us/returns-refunds.html target=_blank rel=noopener>Returns and refunds</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repairs and support</a></div></article></div></main><footer><div class=wrap>Created as a secondary page for the Currys LG OLED pricing report.</div></footer></body></html>`;
}

const johnLewisReport = read("upload-index.html");
const johnLewisInfo = read("retailer-info/index.html");
const currysGroups = groupProducts(currysProducts);

write("index.html", portfolioPage());
write("retailers/index.html", splashPage());
write("john-lewis/index.html", johnLewisReport);
write("john-lewis/retailer-info/index.html", johnLewisInfo);
write("currys/index.html", reportPage({
  retailer: "Currys",
  bodyClass: "currys-report",
  accent: "#4c12a1",
  retailerInfoHref: "retailer-info/",
  groups: currysGroups,
  sourceNote: "Source: Currys consumer product pages and indexed commercial product snippets. Currys pages can block direct automated fetching, so please review the live product pages before publishing.",
}));
write("currys/retailer-info/index.html", currysInfoPage());
