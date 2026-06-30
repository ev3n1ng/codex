const fs = require("fs");
const path = require("path");

const runDate = new Date().toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" });
const manualBaselineMode = process.env.DATA_REFRESH_MODE === "manual-baseline";
const lgLogo = "https://cdn.prod.website-files.com/69d4b36a4667cc9872d9e016/69e1ecce1fc97b717bbde740_5e246bd41ada001f5e6e0fcfad0e37e4_LGE_Logo_Mono_White_RGB.svg";
const oldLgLogo = "https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg";
const rickImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Rick_Astley_Dallas.jpg/1280px-Rick_Astley_Dallas.jpg";
const worldComesHomeLogo = "https://cdn.prod.website-files.com/69d4b36a4667cc9872d9e016/69f322ad0bd78aa47530e599_f30a82b44d542931405145138dac4556_THE%20WORLD%20COMES%20HOME.svg";
const worldComesHomeWhiteLogo = "https://cdn.prod.website-files.com/69d4b36a4667cc9872d9e016/6a04b644accb3d9f65eb1646_8f4b820b08d105ca47f0b79c0bb98673_THE%20WORLD%20COMES%20HOME2-white.svg";
const worldCupPin = "https://cdn.prod.website-files.com/69d4b36a4667cc9872d9e016/69e661e3f4a408cdc817d33d_Pin_graphic.png";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extractReportDataFromHtml(html) {
  const marker = "const D=";
  const start = html.indexOf(marker) + marker.length;
  let end = html.indexOf(";\nconst ", start);
  if (end < 0) end = html.indexOf(";const ", start);
  if (start < marker.length || end < 0) return null;
  return JSON.parse(html.slice(start, end));
}

function existingReportMeta(file) {
  if (!fs.existsSync(file)) return {};
  const report = extractReportDataFromHtml(read(file));
  if (!report) return {};
  return {
    productDataDate: report.productDataDate || report.runDate,
  };
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
  console.log(`Wrote ${file} (${content.length} bytes)`);
}

function footballReportTheme(html, retailer) {
  const campaign = `<div class=campaign-lockup><img src="${worldComesHomeWhiteLogo}" alt="The World Comes Home"><span>${esc(retailer)} price check</span></div>`;
  const bodyClass = retailer === "John Lewis" ? "john-lewis-report" : "currys-report";
  const sharedCss = `.campaign-lockup{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin:0 0 18px}.campaign-lockup img{width:min(330px,70vw);height:auto;filter:drop-shadow(0 12px 28px #0008)}.campaign-lockup span{display:inline-flex;align-items:center;min-height:32px;border:1px solid #ffffff42;border-radius:999px;padding:6px 12px;background:#ffffff14;color:#fff;font-size:12px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.hero{position:relative;overflow:hidden;background:radial-gradient(circle at 82% 18%,#ca0311 0,#560410 28%,#071c12 68%,#03130c 100%)!important;border-bottom:12px solid #ca0311!important}.hero:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#ffffff10 1px,transparent 1px),linear-gradient(0deg,#ffffff10 1px,transparent 1px),radial-gradient(circle at 18% 86%,#f0ece426 0 2px,transparent 3px);background-size:84px 84px,84px 84px,22px 22px;mask-image:linear-gradient(180deg,#000 0,#0009 55%,transparent 100%)}.hero .wrap{position:relative}.brand{justify-items:start;text-align:left}.brand-tag,.eyebrow{color:#ffdede!important}.copy,.disclaimer,.source{color:#f0ece4!important}.run{color:white}.lg-mark img,.lg-logo img{filter:brightness(0) invert(1);mix-blend-mode:normal!important}.retailer-logo{color:white!important;text-shadow:0 2px 14px #0009}.hero-actions{min-height:56px!important;display:flex!important;align-items:flex-start!important;gap:10px!important;flex-wrap:wrap!important}.home-cta{background:#f0ece4!important;color:#111!important;border-color:#f0ece4!important}.retailer-cta,.home-cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:48px!important;border-radius:8px!important;padding:12px 18px!important;font-size:14px!important;font-weight:950!important;line-height:1!important;text-decoration:none!important}.nav{background:#071c12f2!important;border-bottom-color:#ffffff24!important}.nav a{background:#f0ece4!important;color:#071c12!important;border-color:#ffffff44!important}.tools{background:linear-gradient(180deg,#071c12,#f7f8f7 72%)}.searchbox{border-color:#ca031133!important;box-shadow:0 18px 44px #5604101f!important}.series{border-color:#ca03112b!important;box-shadow:0 18px 44px #071c121a!important}.head{background:linear-gradient(135deg,#071c12,#146b3a 58%,#ca0311)!important;border-left:0!important}.price{color:#ca0311!important}.link{color:#146b3a!important}.retailer-cta{background:#ca0311!important;border-color:#ffb3b8!important;color:white!important}.offer.saving{background:#fff0f1!important;color:#ca0311!important}.offer.gift{background:#f4f8ec!important;color:#146b3a!important}.offer.bundle{background:#fff7df!important;color:#8a5d00!important}.status.ok{background:#e9f6f1!important;color:#096b55!important}body{background:linear-gradient(180deg,#071c12 0,#f7f8f7 220px)!important}@media(min-width:900px){.hero .wrap{min-height:520px!important;padding-top:58px!important;padding-bottom:44px!important}.brand{display:grid!important;grid-template-columns:minmax(250px,320px) minmax(0,1fr)!important;column-gap:48px!important;row-gap:20px!important;align-items:start!important;max-width:none!important}.brand-logos,.brand-lockup{grid-column:1!important;grid-row:1!important}.brand>div:last-child{grid-column:2!important;grid-row:1 / span 2!important;max-width:980px!important}.hero-actions{grid-column:1!important;grid-row:2!important;position:relative!important;top:auto!important;right:auto!important;left:auto!important;justify-content:flex-start!important;max-width:320px!important;margin-top:18px!important}.currys-report .source{max-width:900px!important}}@media(max-width:560px){.campaign-lockup{gap:12px}.campaign-lockup img{width:min(260px,82vw)}}@media print{.campaign-lockup img{filter:none}}`;
  const johnLewisCss = `.john-lewis-report .hero{background:radial-gradient(circle at 82% 18%,#ca0311 0,#560410 26%,#18241d 62%,#050807 100%)!important;border-bottom-color:#111!important}.john-lewis-report .hero:before{background:linear-gradient(90deg,#ffffff0f 1px,transparent 1px),linear-gradient(0deg,#ffffff0f 1px,transparent 1px),linear-gradient(135deg,transparent 0 46%,#f0ece41f 47% 49%,transparent 50%);background-size:88px 88px,88px 88px,36px 36px}.john-lewis-report h1{color:#f4f1ea!important}.john-lewis-report .retailer-logo,.john-lewis-report .jl-wordmark{color:#fff!important;text-shadow:none!important;letter-spacing:.03em}.john-lewis-report .brand-tag,.john-lewis-report .eyebrow{color:#efe7dc!important}.john-lewis-report .retailer-cta{background:#111!important;border-color:#f0ece4!important;color:#f0ece4!important}.john-lewis-report .head{background:linear-gradient(135deg,#111 0,#26352d 68%,#a50034 100%)!important}.john-lewis-report .price{color:#111!important}.john-lewis-report .link{color:#26352d!important}.john-lewis-report .nav{background:#111f!important}.john-lewis-report .nav a{background:#f4f1ea!important;color:#111!important}.john-lewis-report .series{border-color:#d8d1c6!important}.john-lewis-report .searchbox{border-color:#d8d1c6!important}.john-lewis-report .offer.member{background:#dcefe3!important;color:#0f5a35!important}.john-lewis-report .offer.saving{background:#f7eceb!important;color:#8f111f!important}.john-lewis-report .offer.gift{background:#edf4ee!important;color:#254f37!important}.john-lewis-report .status.ok{background:#edf4ee!important;color:#254f37!important}.john-lewis-report{background:linear-gradient(180deg,#111 0,#f4f1ea 230px)!important}`;
  const currysCss = `.currys-report .hero{background:radial-gradient(circle at 84% 16%,#ca0311 0,#4c12a1 31%,#071c12 68%,#050807 100%)!important;border-bottom-color:#4c12a1!important}.currys-report .hero:before{background:linear-gradient(90deg,#ffffff12 1px,transparent 1px),linear-gradient(0deg,#ffffff12 1px,transparent 1px),radial-gradient(circle at 20% 80%,#ffdd0040 0 2px,transparent 3px);background-size:78px 78px,78px 78px,24px 24px}.currys-report .retailer-logo{background:#4c12a1!important;border:2px solid #fff!important;border-radius:10px!important;padding:9px 15px!important;box-shadow:0 0 0 1px #fff5,0 18px 36px #0005!important;color:#fff!important;text-shadow:none!important}.currys-report .retailer-cta{background:#4c12a1!important;border-color:#fff!important;color:#fff!important}.currys-report .head{background:linear-gradient(135deg,#4c12a1 0,#7b1bc5 55%,#ca0311 100%)!important}.currys-report .price{color:#4c12a1!important}.currys-report .link{color:#4c12a1!important}.currys-report .nav{background:#210951f2!important}.currys-report .nav a{background:#fff!important;color:#4c12a1!important}.currys-report .searchbox{border-color:#4c12a133!important;box-shadow:0 18px 44px #4c12a11f!important}.currys-report .series{border-color:#4c12a126!important}.currys-report .offer.saving{background:#f1e8ff!important;color:#4c12a1!important}.currys-report .offer.gift{background:#fff9dc!important;color:#745600!important}.currys-report .status.ok{background:#eaf7ef!important;color:#146b3a!important}.currys-report{background:linear-gradient(180deg,#210951 0,#f7f8f7 230px)!important}`;
  return html
    .replace("</style>", `${sharedCss}${johnLewisCss}${currysCss}</style>`)
    .replaceAll(oldLgLogo, lgLogo)
    .replace(/<body(?![^>]*class=)>/, `<body class="${bodyClass}">`)
    .replace(/<a class=home-cta href=\.\.\/retailers\/>Retailer chooser<\/a>/g, "")
    .replace(/<p class=brand-tag>LG OLED retail report<\/p>/g, campaign);
}

function footballChooserTheme(html) {
  return html
    .replace("</style>", `.hero{position:relative;overflow:hidden;background:radial-gradient(circle at 78% 18%,#ca0311 0,#560410 28%,#071c12 64%,#03130c 100%)!important}.hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#ffffff12 1px,transparent 1px),linear-gradient(0deg,#ffffff12 1px,transparent 1px);background-size:86px 86px;opacity:.8}.hero:after{content:"";position:absolute;right:-100px;bottom:-130px;width:360px;height:360px;border:2px solid #ffffff2c;border-radius:50%;box-shadow:inset 0 0 0 70px #ffffff08}.wrap{position:relative}.campaign-crest{display:grid;gap:18px}.campaign-crest img{width:min(430px,82vw);height:auto;filter:drop-shadow(0 18px 42px #0009)}.brand .logo img{filter:brightness(0) invert(1);mix-blend-mode:normal}.brand span,.kicker{color:#ffdede!important}.copy{color:#f0ece4!important}.cards{max-width:980px}.card{position:relative;overflow:hidden;border-color:#ffffff38!important;box-shadow:0 24px 70px #0009!important}.card:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#ffffff16,transparent 45%);pointer-events:none}.john{background:linear-gradient(135deg,#f4f1ea 0,#fff 62%,#e8e0d4 100%)!important;color:#111!important;border-color:#111!important}.john:after{content:"";position:absolute;left:0;right:0;bottom:0;height:7px;background:#111}.john b{background:#111!important;color:white!important;border-color:#111!important}.john p{color:#2f3834!important}.currys{background:linear-gradient(135deg,#4c12a1 0,#2b106b 55%,#ca0311 100%)!important;border-color:#fff8!important;color:#fff!important}.currys:after{content:"";position:absolute;left:0;right:0;bottom:0;height:7px;background:#ffdd00}.currys b{background:#fff!important;color:#4c12a1!important;border-color:#fff!important}.currys p{color:#f0ece4!important}.home{color:#f0ece4!important}</style>`)
    .replace('<section class=intro><p class=kicker>LG OLED retailer reports</p><h1>Choose a retailer</h1><p class=copy>Open current LG OLED pricing, availability and retailer offers.</p></section>', `<section class="intro campaign-crest"><img src="${worldComesHomeWhiteLogo}" alt="The World Comes Home"><div><p class=kicker>LG OLED matchday pricing</p><h1>Choose a retailer</h1><p class=copy>Track current LG OLED pricing, availability and offers as the World Cup comes home to the big screen.</p></div></section>`);
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

const baselineModelFamilies = [
  { family: "B5", models: ["OLED48B56LA", "OLED55B56LA", "OLED65B56LA", "OLED77B56LA", "OLED83B56LA"] },
  {
    family: "C5",
    models: [
      "OLED42C54LA",
      "OLED48C54LA",
      "OLED55C54LA",
      "OLED65C54LA",
      "OLED77C54LA",
      "OLED83C54LA",
      "OLED48C56LB",
      "OLED55C56LB",
      "OLED65C56LB",
      "OLED77C56LB",
    ],
  },
  {
    family: "G5",
    models: [
      "OLED48G56LS",
      "OLED55G56LS",
      "OLED65G56LS",
      "OLED55G54LW",
      "OLED65G54LW",
      "OLED77G54LW",
      "OLED83G54LW",
    ],
  },
  { family: "B6", models: ["OLED48B65LA", "OLED55B65LA", "OLED65B65LA", "OLED77B65LA", "OLED83B65LA"] },
  {
    family: "C6",
    models: ["OLED42C64LA", "OLED48C64LA", "OLED55C64LA", "OLED65C64LA", "OLED77C64LA", "OLED83C64LA"],
  },
  {
    family: "G6",
    models: [
      "OLED48G66LS",
      "OLED55G66LS",
      "OLED65G66LS",
      "OLED55G64LW",
      "OLED65G64LW",
      "OLED77G64LW",
      "OLED83G64LW",
    ],
  },
  { family: "M5", models: ["OLED65M59LA"] },
  { family: "M4", models: ["OLED65M49LA"] },
  { family: "W6", models: ["OLED77W69LA", "OLED83W69LA"] },
];

const baselineModels = baselineModelFamilies.flatMap((family) => family.models);

const knownBaselineUrls = {
  "John Lewis": {
    OLED48B56LA:
      "https://www.johnlewis.com/lg-oled48b56la-2025-oled-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-umber-brown/p113525052",
    OLED55B56LA:
      "https://www.johnlewis.com/lg-oled55b56la-2025-oled-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-umber-brown/p113530627",
    OLED65B56LA:
      "https://www.johnlewis.com/lg-oled65b56la-2025-oled-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-umber-brown/p113530628",
    OLED77B56LA:
      "https://www.johnlewis.com/lg-oled77b56la-2025-oled-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-umber-brown/p113536858",
    OLED83B56LA:
      "https://www.johnlewis.com/lg-oled83b56la-2025-oled-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-umber-brown/p113513354",
    OLED42C54LA:
      "https://www.johnlewis.com/lg-oled42c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-42-inch-with-dolby-atmos-dark-titan-silver/p113530622",
    OLED48C54LA:
      "https://www.johnlewis.com/lg-oled48c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-black/p113513363",
    OLED55C54LA:
      "https://www.johnlewis.com/lg-oled55c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-dark-titan-silver/p113530623",
    OLED65C54LA:
      "https://www.johnlewis.com/lg-oled65c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-dark-titan-silver/p113530624",
    OLED77C54LA:
      "https://www.johnlewis.com/lg-oled77c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-dark-titan-silver/p113530625",
    OLED83C54LA:
      "https://www.johnlewis.com/lg-oled83c54la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-dark-titan-silver/p113678676",
    OLED48C56LB:
      "https://www.johnlewis.com/lg-oled48c56lb-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-umber-brown/p113744965",
    OLED55C56LB:
      "https://www.johnlewis.com/lg-oled55c56lb-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-umber-brown/p113744966",
    OLED65C56LB:
      "https://www.johnlewis.com/lg-oled65c56lb-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-umber-brown/p113744967",
    OLED77C56LB:
      "https://www.johnlewis.com/lg-oled77c56lb-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-umber-brown/p113742830",
    OLED48G56LS:
      "https://www.johnlewis.com/lg-oled48g56ls-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-stand-version-black/p113460227",
    OLED55G56LS:
      "https://www.johnlewis.com/lg-oled55g56ls-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-stand-version-satin-silver/p113362525",
    OLED65G56LS:
      "https://www.johnlewis.com/lg-oled65g56ls-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-stand-version-satin-silver/p113362528",
    OLED55G54LW:
      "https://www.johnlewis.com/lg-oled55g54lw-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-one-wall-design-satin-silver/p113362526",
    OLED65G54LW:
      "https://www.johnlewis.com/lg-oled65g54lw-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-one-wall-design-satin-silver/p113362527",
    OLED77G54LW:
      "https://www.johnlewis.com/lg-oled77g54lw-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-one-wall-design-satin-silver/p113362529",
    OLED83G54LW:
      "https://www.johnlewis.com/lg-oled83g54lw-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-one-wall-design-light-satin-silver/p113362530",
    OLED48B65LA:
      "https://www.johnlewis.com/lg-oled48b65la-2026-oled-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-umber-brown/p115232088",
    OLED55B65LA:
      "https://www.johnlewis.com/lg-oled55b65la-2026-oled-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-umber-brown/p115232122",
    OLED65B65LA:
      "https://www.johnlewis.com/lg-oled65b65la-2026-oled-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-umber-brown/p115232147",
    OLED77B65LA:
      "https://www.johnlewis.com/lg-oled77b65la-2026-oled-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-umber-brown/p115232495",
    OLED83B65LA:
      "https://www.johnlewis.com/lg-oled83b65la-2026-oled-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-umber-brown/p115308528",
    OLED42C64LA:
      "https://www.johnlewis.com/lg-oled42c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-42-inch-with-dolby-atmos-dark-titan-silver/p115239735",
    OLED48C64LA:
      "https://www.johnlewis.com/lg-oled48c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-black/p115239963",
    OLED55C64LA:
      "https://www.johnlewis.com/lg-oled55c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-dark-titan-silver/p115240000",
    OLED65C64LA:
      "https://www.johnlewis.com/lg-oled65c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-dark-titan-silver/p115240023",
    OLED77C64LA:
      "https://www.johnlewis.com/lg-oled77c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-dark-titan-silver/p115240028",
    OLED83C64LA:
      "https://www.johnlewis.com/lg-oled83c64la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-dark-titan-silver/p115240037",
    OLED48G66LS:
      "https://www.johnlewis.com/lg-oled48g66ls-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-48-inch-with-dolby-atmos-stand-version-black/p115239985",
    OLED55G66LS:
      "https://www.johnlewis.com/lg-oled55g66ls-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-stand-version-satin-silver/p115240018",
    OLED65G66LS:
      "https://www.johnlewis.com/lg-oled65g66ls-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-stand-version-satin-silver/p115240027",
    OLED55G64LW:
      "https://www.johnlewis.com/lg-oled55g64lw-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-one-wall-design-satin-silver/p115240002",
    OLED65G64LW:
      "https://www.johnlewis.com/lg-oled65g64lw-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-one-wall-design-satin-silver/p115240026",
    OLED77G64LW:
      "https://www.johnlewis.com/lg-oled77g64lw-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-one-wall-design-satin-silver/p115240031",
    OLED83G64LW:
      "https://www.johnlewis.com/lg-oled83g64lw-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-one-wall-design-light-satin-silver/p115240040",
    OLED65M59LA:
      "https://www.johnlewis.com/lg-oled65m59la-2025-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-one-wall-design-zero-connect-box-satin-silver/p113905725",
    OLED65M49LA:
      "https://www.johnlewis.com/lg-oled65m49la-2024-oled-hdr-4k-ultra-hd-smart-tv-65-inch-with-freeview-play-freesat-hd-dolby-atmos-one-wall-design-wireless-4k-connectivity-light-satin-silver/p112024111",
    OLED77W69LA:
      "https://www.johnlewis.com/lg-oled77w69la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-77-inch-with-dolby-atmos-wallpaper-design-zero-connect-box-umber-brown/p115281106",
    OLED83W69LA:
      "https://www.johnlewis.com/lg-oled83w69la-2026-oled-evo-hdr-4k-ultra-hd-smart-ai-tv-83-inch-with-dolby-atmos-wallpaper-design-zero-connect-box-umber-brown/p115301780",
  },
  Currys: {
    OLED48B56LA: "https://www.currys.co.uk/products/lg-b5-48-oled-ai-4k-hdr-smart-tv-2025-oled48b56la-10282097.html",
    OLED55B56LA: "https://www.currys.co.uk/search?q=OLED55B56LA",
    OLED65B56LA: "https://www.currys.co.uk/products/lg-b5-65-oled-ai-4k-hdr-smart-tv-2025-oled65b56la-10281772.html",
    OLED77B56LA: "https://www.currys.co.uk/products/lg-b5-77-oled-ai-4k-hdr-smart-tv-2025-oled77b56la-10281774.html",
    OLED83B56LA:
      "https://www.currys.co.uk/products/lg-b5-83-oled-ai-4k-ultra-hd-hdr-smart-tv-2025-oled83b56la-10282099.html",
    OLED42C54LA: "https://www.currys.co.uk/products/lg-c5-42-oled-evo-ai-4k-hdr-smart-tv-2025-oled42c54la-10281538.html",
    OLED48C54LA: "https://www.currys.co.uk/products/lg-c5-48-oled-evo-ai-4k-hdr-smart-tv-2025-oled48c54la-10281782.html",
    OLED55C54LA: "https://www.currys.co.uk/products/lg-c5-55-oled-evo-ai-4k-hdr-smart-tv-2025-oled55c54la-10281549.html",
    OLED65C54LA: "https://www.currys.co.uk/products/lg-c5-65-oled-evo-ai-4k-hdr-smart-tv-2025-oled65c54la-10281777.html",
    OLED77C54LA: "https://www.currys.co.uk/products/lg-c5-77-oled-evo-ai-4k-hdr-smart-tv-2025-oled77c54la-10281779.html",
    OLED83C54LA: "https://www.currys.co.uk/products/lg-c5-83-oled-evo-ai-4k-hdr-smart-tv-2025-oled83c54la-10282101.html",
    OLED48C56LB: "https://www.currys.co.uk/products/lg-c5-48-oled-evo-ai-4k-hdr-smart-tv-2025-oled48c56lb-10282100.html",
    OLED55C56LB: "https://www.currys.co.uk/products/lg-c5-55-oled-evo-ai-4k-hdr-smart-tv-2025-oled55c56lb-10281769.html",
    OLED65C56LB: "https://www.currys.co.uk/products/lg-c5-65-oled-evo-ai-4k-hdr-smart-tv-2025-oled65c56lb-10281775.html",
    OLED77C56LB: "https://www.currys.co.uk/products/lg-c5-77-oled-evo-ai-4k-hdr-smart-tv-2025-oled77c56lb-10281778.html",
    OLED48G56LS:
      "https://www.currys.co.uk/products/lg-g5-48-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled48g56ls-10281558.html",
    OLED55G56LS:
      "https://www.currys.co.uk/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled55g56ls-10282094.html",
    OLED65G56LS:
      "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled65g56ls-10282093.html",
    OLED55G54LW:
      "https://www.currys.co.uk/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled55g54lw-10280772.html",
    OLED65G54LW:
      "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled65g54lw-10280771.html",
    OLED77G54LW:
      "https://www.currys.co.uk/products/lg-g5-77-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled77g54lw-10280777.html",
    OLED83G54LW:
      "https://www.currys.co.uk/products/lg-g5-83-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled83g54lw-10282103.html",
    OLED65M49LA: "https://www.currys.co.uk/search?q=OLED65M49LA",
    OLED48B65LA: "https://www.currys.co.uk/search?q=OLED48B65LA",
    OLED55B65LA: "https://www.currys.co.uk/products/lg-b6-55-oled-ai-4k-hdr-smart-tv-2026-oled55b65la-10301871.html",
    OLED65B65LA: "https://www.currys.co.uk/search?q=OLED65B65LA",
    OLED77B65LA: "https://www.currys.co.uk/search?q=OLED77B65LA",
    OLED83B65LA: "https://www.currys.co.uk/search?q=OLED83B65LA",
    OLED42C64LA: "https://www.currys.co.uk/search?q=OLED42C64LA",
    OLED48C64LA: "https://www.currys.co.uk/products/lg-c6-48-oled-ai-4k-hdr-smart-tv-2026-oled48c64la-10301976.html",
    OLED55C64LA: "https://www.currys.co.uk/products/lg-c6-55-oled-ai-4k-hdr-smart-tv-2026-oled55c64la-10301942.html",
    OLED65C64LA: "https://www.currys.co.uk/products/lg-c6-65-oled-ai-4k-hdr-smart-tv-2026-oled65c64la-10301788.html",
    OLED77C64LA: "https://www.currys.co.uk/products/lg-c6-77-oled-ai-4k-hdr-smart-tv-2026-oled77c64la-10302008.html",
    OLED83C64LA: "https://www.currys.co.uk/search?q=OLED83C64LA",
    OLED48G66LS: "https://www.currys.co.uk/search?q=OLED48G66LS",
    OLED55G66LS:
      "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled55g66ls-10301989.html",
    OLED65G66LS:
      "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled65g66ls-10301977.html",
    OLED55G64LW:
      "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled55g64lw-10301338.html",
    OLED65G64LW:
      "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled65g64lw-10301388.html",
    OLED77G64LW: "https://www.currys.co.uk/search?q=OLED77G64LW",
    OLED83G64LW: "https://www.currys.co.uk/search?q=OLED83G64LW",
    OLED65M59LA:
      "https://www.currys.co.uk/products/lg-m5-65-oled-evo-ai-4k-hdr-true-wireless-smart-tv-2025-oled65m59la-10282096.html",
    OLED77W69LA: "https://www.currys.co.uk/search?q=OLED77W69LA",
    OLED83W69LA: "https://www.currys.co.uk/search?q=OLED83W69LA",
  },
};

function baselineFamilyOf(model) {
  return baselineModelFamilies.find((family) => family.models.includes(model))?.family || "";
}

function sizeOf(model) {
  return Number(model.match(/^OLED(\d+)/i)?.[1] || 0);
}

function seriesLabel(family) {
  const series = family[0];
  if (series === "M") return "M5 True Wireless";
  if (series === "W") return "W6 Wallpaper";
  return `${family} series`;
}

function titleForModel(model) {
  const family = baselineFamilyOf(model);
  const year = family.endsWith("6") ? "2026" : "2025";
  return `LG ${seriesLabel(family)} ${sizeOf(model)}" OLED TV ${year} - ${model}`;
}

function retailerSearchUrl(retailer, model) {
  const query = encodeURIComponent(model);
  if (retailer === "Currys") return `https://www.currys.co.uk/search?q=${query}`;
  return `https://www.johnlewis.com/search?search-term=${query}`;
}

function unavailableProduct(model, retailer) {
  const family = baselineFamilyOf(model);
  return {
    year: family.endsWith("6") ? "2026" : "2025",
    title: titleForModel(model),
    size: sizeOf(model),
    price: "Not available",
    availability: "Not available at the moment",
    offers: ["No current retailer data found for this baseline model"],
    url: knownBaselineUrls[retailer]?.[model] || retailerSearchUrl(retailer, model),
    model,
    baselineMissing: true,
  };
}

function normalizeToBaseline(products, retailer) {
  const byModel = new Map();
  for (const product of products) {
    const model = product.model || modelOf(product.title);
    if (baselineModels.includes(model) && !byModel.has(model)) {
      byModel.set(model, { ...product, model, size: product.size || sizeOf(model) });
    }
  }
  return baselineModels.map((model) => byModel.get(model) || unavailableProduct(model, retailer));
}

function normalizeReportHtml(html, retailer, options = {}) {
  const marker = "const D=";
  const start = html.indexOf(marker) + marker.length;
  let end = html.indexOf(";\nconst ", start);
  if (end < 0) end = html.indexOf(";const ", start);
  if (start < marker.length || end < 0) return html;

  const report = JSON.parse(html.slice(start, end));
  const products = normalizeToBaseline(report.groups.flatMap((group) => group.products), retailer);
  const productDataDate = options.cached ? report.productDataDate || report.runDate : runDate;
  const dataStatus = options.cached
    ? "Manual baseline data - prices shown from the last manual update"
    : "Manual live data collected during this update";
  const normalized = JSON.stringify({ ...report, runDate, productDataDate, dataStatus, groups: groupProducts(products) });
  return html.slice(0, start) + normalized + html.slice(end);
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

const currysProducts = [
  {
    "year": "2025",
    "title": "LG G5 83\" OLED evo AI 4K HDR Smart TV 2025 (Wall Mount Version) - OLED83G54LW",
    "size": 83,
    "price": "£5,499.00",
    "availability": "Listed",
    "offers": [
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-83-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled83g54lw-10282103.html",
    "model": "OLED83G54LW",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG G5 77\" OLED evo AI 4K HDR Smart TV 2025 (Wall Mount Version) - OLED77G54LW",
    "size": 77,
    "price": "£3,599.00",
    "availability": "Listed",
    "offers": [
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-77-oled-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled77g54lw-10280777.html",
    "model": "OLED77G54LW",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG G5 65\" OLED evo AI 4K HDR Smart TV 2025 (Wall Mount Version) - OLED65G54LW",
    "size": 65,
    "price": "£1,999.00",
    "availability": "Listed",
    "offers": [
      "Save £500.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled65g54lw-10280771.html",
    "model": "OLED65G54LW",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG G5 65\" OLED evo AI 4K HDR Smart TV 2025 (Stand Version) - OLED65G56LS",
    "size": 65,
    "price": "£1,999.00",
    "availability": "Listed",
    "offers": [
      "Save £500.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-65-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled65g56ls-10282093.html",
    "model": "OLED65G56LS",
    "previousPrice": "£2,299.00",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG M5 65\" OLED evo AI 4K HDR True Wireless Smart TV 2025 - OLED65M59LA",
    "size": 65,
    "price": "£2,299.00",
    "availability": "Listed",
    "offers": [
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-m5-65-oled-evo-ai-4k-hdr-true-wireless-smart-tv-2025-oled65m59la-10282096.html",
    "model": "OLED65M59LA",
    "series": "M",
    "gen": "5",
    "previousPrice": "Not available"
  },
  {
    "year": "2025",
    "title": "LG G5 55\" OLED evo AI 4K HDR Smart TV 2025 (Wall Mount Version) - OLED55G54LW",
    "size": 55,
    "price": "£1,499.99",
    "availability": "Listed",
    "offers": [
      "Save £199.01",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled55g54lw-10280772.html",
    "model": "OLED55G54LW",
    "previousPrice": "£1,599.00",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG G5 55\" OLED evo AI 4K HDR Smart TV 2025 (Stand Version) - OLED55G56LS",
    "size": 55,
    "price": "£1,499.99",
    "availability": "Listed",
    "offers": [
      "Save £299.01",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled55g56ls-10282094.html",
    "model": "OLED55G56LS",
    "previousPrice": "£1,599.00",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG G5 48\" OLED evo AI 4K HDR Smart TV 2025 (Stand Version) - OLED48G56LS",
    "size": 48,
    "price": "£1,099.99",
    "availability": "Listed",
    "offers": [
      "10% off marked price with code TV10",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g5-48-oled-evo-ai-4k-hdr-smart-tv-2025-stand-version-oled48g56ls-10281558.html",
    "model": "OLED48G56LS",
    "previousPrice": "£1,099.00",
    "series": "G",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 83\" OLED evo AI 4K HDR Smart TV 2025 - OLED83C54LA",
    "size": 83,
    "price": "£2,734.00",
    "availability": "Out of stock",
    "offers": [
      "Save £1,065.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-83-oled-evo-ai-4k-hdr-smart-tv-2025-oled83c54la-10282101.html",
    "model": "OLED83C54LA",
    "previousPrice": "£3,499.99",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 77\" OLED evo AI 4K HDR Smart TV 2025 - OLED77C54LA",
    "size": 77,
    "price": "£2,199.00",
    "availability": "Listed",
    "offers": [
      "Save £400.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-77-oled-evo-ai-4k-hdr-smart-tv-2025-oled77c54la-10281779.html",
    "model": "OLED77C54LA",
    "series": "C",
    "gen": "5",
    "previousPrice": "£2,399.99"
  },
  {
    "year": "2025",
    "title": "LG C5 77\" OLED evo AI 4K HDR Smart TV 2025 - OLED77C56LB",
    "size": 77,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-77-oled-evo-ai-4k-hdr-smart-tv-2025-oled77c56lb-10281778.html",
    "model": "OLED77C56LB",
    "previousPrice": "£2,599.00",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 65\" OLED evo AI 4K HDR Smart TV 2025 - OLED65C54LA",
    "size": 65,
    "price": "£1,499.00",
    "availability": "Listed",
    "offers": [
      "Save £100.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-65-oled-evo-ai-4k-hdr-smart-tv-2025-oled65c54la-10281777.html",
    "model": "OLED65C54LA",
    "series": "C",
    "gen": "5",
    "previousPrice": "£1,599.00"
  },
  {
    "year": "2025",
    "title": "LG C5 65\" OLED evo AI 4K HDR Smart TV 2025 - OLED65C56LB",
    "size": 65,
    "price": "£1,499.99",
    "availability": "Listed",
    "offers": [
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-65-oled-evo-ai-4k-hdr-smart-tv-2025-oled65c56lb-10281775.html",
    "model": "OLED65C56LB",
    "series": "C",
    "gen": "5",
    "previousPrice": "£1,499.00"
  },
  {
    "year": "2025",
    "title": "LG C5 55\" OLED evo AI 4K HDR Smart TV 2025 - OLED55C54LA",
    "size": 55,
    "price": "£999.00",
    "availability": "Listed",
    "offers": [
      "Save £100.99",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-55-oled-evo-ai-4k-hdr-smart-tv-2025-oled55c54la-10281549.html",
    "model": "OLED55C54LA",
    "previousPrice": "£1,099.99",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 55\" OLED evo AI 4K HDR Smart TV 2025 - OLED55C56LB",
    "size": 55,
    "price": "£999.99",
    "availability": "Out of stock",
    "offers": [
      "Save £100.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-55-oled-evo-ai-4k-hdr-smart-tv-2025-oled55c56lb-10281769.html",
    "model": "OLED55C56LB",
    "previousPrice": "£1,099.99",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 48\" OLED evo AI 4K HDR Smart TV 2025 - OLED48C54LA",
    "size": 48,
    "price": "£949.00",
    "availability": "Listed",
    "offers": [
      "10% off marked price with code TV10",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-48-oled-evo-ai-4k-hdr-smart-tv-2025-oled48c54la-10281782.html",
    "model": "OLED48C54LA",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 48\" OLED evo AI 4K HDR Smart TV 2025 - OLED48C56LB",
    "size": 48,
    "price": "£949.00",
    "availability": "Listed",
    "offers": [
      "Save £70.00",
      "10% off marked price with code TV10",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-48-oled-evo-ai-4k-hdr-smart-tv-2025-oled48c56lb-10282100.html",
    "model": "OLED48C56LB",
    "previousPrice": "£849.00",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG C5 42\" OLED evo AI 4K HDR Smart TV 2025 - OLED42C54LA",
    "size": 42,
    "price": "£729.00",
    "availability": "Listed",
    "offers": [
      "Save £120.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c5-42-oled-evo-ai-4k-hdr-smart-tv-2025-oled42c54la-10281538.html",
    "model": "OLED42C54LA",
    "previousPrice": "£849.00",
    "series": "C",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG B5 series 83\" OLED TV 2025 - OLED83B56LA",
    "size": 83,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/products/lg-b5-83-oled-ai-4k-ultra-hd-hdr-smart-tv-2025-oled83b56la-10282099.html",
    "model": "OLED83B56LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG B5 77\" OLED AI 4K HDR Smart TV 2025 - OLED77B56LA",
    "size": 77,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/products/lg-b5-77-oled-ai-4k-hdr-smart-tv-2025-oled77b56la-10281774.html",
    "model": "OLED77B56LA",
    "previousPrice": "£1,799.00",
    "series": "B",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG B5 65\" OLED AI 4K HDR Smart TV 2025 - OLED65B56LA",
    "size": 65,
    "price": "£1,099.00",
    "availability": "Listed",
    "offers": [
      "Save £300.00",
      "10% off marked price with code TV10",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-b5-65-oled-ai-4k-hdr-smart-tv-2025-oled65b56la-10281772.html",
    "model": "OLED65B56LA",
    "series": "B",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG B5 series 55\" OLED TV 2025 - OLED55B56LA",
    "size": 55,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED55B56LA",
    "model": "OLED55B56LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "5"
  },
  {
    "year": "2025",
    "title": "LG B5 48\" OLED AI 4K HDR Smart TV 2025 - OLED48B56LA",
    "size": 48,
    "price": "£679.00",
    "availability": "Listed",
    "offers": [
      "Save £120.00",
      "10% off marked price with code TV10",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-b5-48-oled-ai-4k-hdr-smart-tv-2025-oled48b56la-10282097.html",
    "model": "OLED48B56LA",
    "series": "B",
    "gen": "5"
  },
  {
    "year": "2026",
    "title": "LG G6 series 83\" OLED TV 2026 - OLED83G64LW",
    "size": 83,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED83G64LW",
    "model": "OLED83G64LW",
    "baselineMissing": true,
    "series": "G",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG W6 Wallpaper 83\" OLED TV 2026 - OLED83W69LA",
    "size": 83,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED83W69LA",
    "model": "OLED83W69LA",
    "baselineMissing": true,
    "series": "W",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG G6 series 77\" OLED TV 2026 - OLED77G64LW",
    "size": 77,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED77G64LW",
    "model": "OLED77G64LW",
    "baselineMissing": true,
    "series": "G",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG W6 Wallpaper 77\" OLED TV 2026 - OLED77W69LA",
    "size": 77,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED77W69LA",
    "model": "OLED77W69LA",
    "baselineMissing": true,
    "series": "W",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG G6 65\" OLED AI 4K HDR Smart TV 2026 (Wall Mount Version) - OLED65G64LW",
    "size": 65,
    "price": "£2,699.99",
    "availability": "Out of stock",
    "offers": [
      "Save £400.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled65g64lw-10301388.html",
    "model": "OLED65G64LW",
    "series": "G",
    "gen": "6",
    "previousPrice": "£3,099.99"
  },
  {
    "year": "2026",
    "title": "LG G6 65\" OLED AI 4K HDR Smart TV 2026 (Stand Version) - OLED65G66LS",
    "size": 65,
    "price": "£2,699.99",
    "availability": "Out of stock",
    "offers": [
      "Save £400.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g6-65-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled65g66ls-10301977.html",
    "model": "OLED65G66LS",
    "series": "G",
    "gen": "6",
    "previousPrice": "£3,099.99"
  },
  {
    "year": "2026",
    "title": "LG G6 55\" OLED AI 4K HDR Smart TV 2026 (Wall Mount Version) - OLED55G64LW",
    "size": 55,
    "price": "£2,099.99",
    "availability": "Out of stock",
    "offers": [
      "Save £200.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-wall-mount-version-oled55g64lw-10301338.html",
    "model": "OLED55G64LW",
    "series": "G",
    "gen": "6",
    "previousPrice": "£2,299.99"
  },
  {
    "year": "2026",
    "title": "LG G6 55\" OLED AI 4K HDR Smart TV 2026 (Stand Version) - OLED55G66LS",
    "size": 55,
    "price": "£2,099.99",
    "availability": "Out of stock",
    "offers": [
      "Save £200.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-g6-55-oled-ai-4k-hdr-smart-tv-2026-stand-version-oled55g66ls-10301989.html",
    "model": "OLED55G66LS",
    "series": "G",
    "gen": "6",
    "previousPrice": "£2,299.99"
  },
  {
    "year": "2026",
    "title": "LG G6 series 48\" OLED TV 2026 - OLED48G66LS",
    "size": 48,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED48G66LS",
    "model": "OLED48G66LS",
    "baselineMissing": true,
    "series": "G",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG C6 series 83\" OLED TV 2026 - OLED83C64LA",
    "size": 83,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED83C64LA",
    "model": "OLED83C64LA",
    "baselineMissing": true,
    "series": "C",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG C6 77\" OLED AI 4K HDR Smart TV 2026 - OLED77C64LA",
    "size": 77,
    "price": "£2,899.99",
    "availability": "Listed",
    "offers": [
      "Save £700.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c6-77-oled-ai-4k-hdr-smart-tv-2026-oled77c64la-10302008.html",
    "model": "OLED77C64LA",
    "series": "C",
    "gen": "6",
    "previousPrice": "£3,599.99"
  },
  {
    "year": "2026",
    "title": "LG C6 65\" OLED AI 4K HDR Smart TV 2026 - OLED65C64LA",
    "size": 65,
    "price": "£2,099.99",
    "availability": "Listed",
    "offers": [
      "Save £500.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c6-65-oled-ai-4k-hdr-smart-tv-2026-oled65c64la-10301788.html",
    "model": "OLED65C64LA",
    "series": "C",
    "gen": "6",
    "previousPrice": "£2,599.99"
  },
  {
    "year": "2026",
    "title": "LG C6 55\" OLED AI 4K HDR Smart TV 2026 - OLED55C64LA",
    "size": 55,
    "price": "£1,499.99",
    "availability": "Listed",
    "offers": [
      "Save £300.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c6-55-oled-ai-4k-hdr-smart-tv-2026-oled55c64la-10301942.html",
    "model": "OLED55C64LA",
    "series": "C",
    "gen": "6",
    "previousPrice": "£1,799.99"
  },
  {
    "year": "2026",
    "title": "LG C6 48\" OLED AI 4K HDR Smart TV 2026 - OLED48C64LA",
    "size": 48,
    "price": "£1,199.99",
    "availability": "Listed",
    "offers": [
      "Save £200.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-c6-48-oled-ai-4k-hdr-smart-tv-2026-oled48c64la-10301976.html",
    "model": "OLED48C64LA",
    "series": "C",
    "gen": "6",
    "previousPrice": "£1,399.99"
  },
  {
    "year": "2026",
    "title": "LG C6 series 42\" OLED TV 2026 - OLED42C64LA",
    "size": 42,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED42C64LA",
    "model": "OLED42C64LA",
    "baselineMissing": true,
    "series": "C",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG B6 series 83\" OLED TV 2026 - OLED83B65LA",
    "size": 83,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED83B65LA",
    "model": "OLED83B65LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG B6 series 77\" OLED TV 2026 - OLED77B65LA",
    "size": 77,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED77B65LA",
    "model": "OLED77B65LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG B6 series 65\" OLED TV 2026 - OLED65B65LA",
    "size": 65,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED65B65LA",
    "model": "OLED65B65LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "6"
  },
  {
    "year": "2026",
    "title": "LG B6 55\" OLED AI 4K HDR Smart TV 2026 - OLED55B65LA",
    "size": 55,
    "price": "£1,299.99",
    "availability": "Listed",
    "offers": [
      "Save £300.00",
      "Save up to 50% on selected soundbars when bought with any LG TV",
      "Free delivery"
    ],
    "url": "https://www.currys.co.uk/products/lg-b6-55-oled-ai-4k-hdr-smart-tv-2026-oled55b65la-10301871.html",
    "model": "OLED55B65LA",
    "series": "B",
    "gen": "6",
    "previousPrice": "£1,599.99"
  },
  {
    "year": "2026",
    "title": "LG B6 series 48\" OLED TV 2026 - OLED48B65LA",
    "size": 48,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED48B65LA",
    "model": "OLED48B65LA",
    "baselineMissing": true,
    "series": "B",
    "gen": "6"
  },
  {
    "year": "2025",
    "title": "LG M5 True Wireless 65\" OLED TV 2025 - OLED65M49LA",
    "size": 65,
    "price": "Not listed",
    "availability": "Product page redirected",
    "offers": [
      "Official Currys product page did not expose matching model data during this update"
    ],
    "url": "https://www.currys.co.uk/search?q=OLED65M49LA",
    "model": "OLED65M49LA",
    "baselineMissing": true,
    "series": "M",
    "gen": "4"
  }
].map((product) => ({ ...product, model: modelOf(product.title) }));
const currysWatchlistModels = [
  ...baselineModels,
];

function assertWatchlistPresent(products, watchlist, retailer) {
  const present = new Set(products.map((product) => product.model));
  const missing = watchlist.filter((model) => !present.has(model));
  if (missing.length) {
    throw new Error(`${retailer} report is missing watchlist models: ${missing.join(", ")}`);
  }
}

function reportPage({
  retailer,
  bodyClass,
  accent,
  retailerInfoHref,
  homeHref = "../retailers/",
  groups,
  sourceNote,
  productDataDate = runDate,
  dataStatus = "Manual live data collected during this update",
}) {
  const data = JSON.stringify({ runDate, productDataDate, dataStatus, groups });
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${esc(retailer)} LG OLED Pricing</title><style>
:root{--r:${accent};--i:#151817;--m:#6d7773;--l:#dfe5e2;--p:#f7f8f7;--g:#096b55;--b:#255b8e;--a:#8a5d00;--bad:#a3293a}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--p);color:var(--i);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.45}.wrap{width:min(1280px,calc(100vw - 32px));margin:auto}.hero{background:linear-gradient(135deg,#151817 0%,#231a20 52%,color-mix(in srgb,var(--r) 32%,#151817) 100%);color:white;border-bottom:12px solid var(--r)}.hero .wrap{min-height:390px;padding:52px 0 42px;display:grid;align-content:space-between;gap:44px}.brand{display:grid;gap:28px;align-items:start}.brand-logos{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.lg-logo{width:154px;display:flex;align-items:center}.lg-logo img{display:block;width:150px;max-width:100%;height:auto;mix-blend-mode:screen}.logo-divider{width:1px;height:54px;background:#ffffff38}.retailer-logo{display:inline-flex;align-items:center;min-height:54px;color:white;font-size:25px;font-weight:950;letter-spacing:.01em}.currys-report .retailer-logo{background:#4c12a1;border-radius:8px;padding:9px 13px;font-size:22px}.brand-tag{margin:0 0 14px;color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}h1{margin:0;max-width:900px;font-size:clamp(38px,5vw,66px);line-height:.95;text-transform:uppercase}.copy{max-width:860px;color:#e7ece9;font-size:18px}.run{margin-top:30px;font-weight:800}.freshness{margin:8px 0 0;display:grid;gap:4px;color:#f4f1ea;font-size:13px;font-weight:800}.freshness span{display:block}.freshness b{font-weight:950}.disclaimer{margin:10px 0 0;color:#d8dfdc;font-size:13px;font-weight:750}.source{color:#cbd2cf}.hero-actions{min-height:56px;display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap}.retailer-cta,.home-cta{display:inline-flex;align-items:center;justify-content:center;min-height:44px;text-decoration:none;border-radius:8px;padding:11px 16px;font-size:14px;font-weight:950}.retailer-cta{background:var(--r);color:white;border:1px solid #ffffff80}.home-cta{background:white;color:var(--i);border:1px solid white}.nav{position:sticky;top:0;z-index:3;background:rgba(247,248,247,.94);border-bottom:1px solid var(--l);backdrop-filter:blur(14px)}.nav .wrap{display:flex;gap:8px;overflow-x:auto;padding:10px 0}.nav a{flex:0 0 auto;text-decoration:none;background:white;border:1px solid var(--l);border-radius:8px;padding:9px 12px;font-size:13px;font-weight:850}.tools{padding:18px 0 0}.searchbox{display:grid;grid-template-columns:minmax(220px,1fr) auto;gap:12px;align-items:center;background:white;border:1px solid var(--l);border-radius:8px;padding:14px;box-shadow:0 12px 28px #0e12110d}.searchbox input{width:100%;min-height:44px;border:1px solid var(--l);border-radius:8px;padding:10px 12px;font:inherit;font-weight:750}.searchbox input:focus{outline:3px solid color-mix(in srgb,var(--r) 24%,transparent);border-color:var(--r)}.result-count{color:var(--m);font-size:13px;font-weight:850;white-space:nowrap}.series{margin:28px 0;background:white;border:1px solid var(--l);border-radius:8px;overflow:hidden;box-shadow:0 18px 44px #0e121114;scroll-margin-top:74px}.series[hidden],.product[hidden]{display:none}.head{display:flex;justify-content:space-between;gap:18px;align-items:center;background:var(--r);color:white;padding:18px 20px}.eyebrow{margin:0 0 4px;color:#ffe1eb;font-size:12px;font-weight:850;text-transform:uppercase}h2{margin:0;font-size:clamp(24px,3vw,38px)}.count{border:1px solid #ffffff66;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:850}.cols,.product{display:grid;grid-template-columns:minmax(190px,1.3fr) 78px 120px 150px minmax(280px,1.8fr);gap:14px;align-items:start}.cols{padding:12px 18px;background:#edf1ef;color:var(--m);font-size:12px;font-weight:900;text-transform:uppercase}.product{padding:16px 18px;border-top:1px solid var(--l)}h3{margin:0;font-size:18px}.pt{margin:4px 0 12px;color:var(--m);font-size:13px}.link{color:var(--r);font-size:13px;font-weight:900}.size,.price{font-size:21px;line-height:1;font-weight:950}.size span{display:block;margin-top:4px;color:var(--m);font-size:11px;text-transform:uppercase}.price{color:var(--r)}.was{display:block;margin-top:7px;color:var(--m);font-size:12px;font-weight:850;line-height:1.2}.was b{color:var(--i);font-weight:950}.status,.offer{display:inline-flex;align-items:center;min-height:28px;border-radius:999px;padding:5px 10px;font-size:12px;font-weight:850}.ok{background:#e9f6f1;color:var(--g)}.warn{background:#fff5df;color:var(--a)}.no{background:#fdecef;color:var(--bad)}.offers{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}.offer{background:#eef2f1}.saving{background:#fff2f5;color:var(--r)}.gift{background:#edf4fb;color:var(--b)}.bundle{background:#fff7e6;color:var(--a)}footer{border-top:1px solid var(--l);padding:26px 0 36px;color:var(--m);font-size:13px}@media(max-width:980px){.cols{display:none}.product{grid-template-columns:repeat(2,1fr)}.main,.offers{grid-column:1/-1}}@media(max-width:560px){.wrap{width:min(100vw - 20px,1280px)}.brand-logos{align-items:flex-start}.logo-divider{display:none}.searchbox{grid-template-columns:1fr}.result-count{white-space:normal}.product{grid-template-columns:1fr}.head{align-items:flex-start;flex-direction:column}.lg-logo{width:150px}.lg-logo img{width:146px}}</style></head><body class="${esc(bodyClass)}"><header class=hero><div class=wrap><div class=brand><div class=brand-logos><div class=lg-logo><img src="${lgLogo}" alt="LG Life's Good"></div><span class=logo-divider></span><div class=retailer-logo>${esc(retailer)}</div></div><div><p class=brand-tag>LG OLED retail report</p><h1>${esc(retailer)} LG OLED Pricing</h1><p class=copy>LG OLED model prices, promotional offers and availability grouped by model year and series.</p><p class=run></p><p class=freshness></p><p class=disclaimer>Please double check the live retailer website before relying on prices, as prices and offers can change at any time at the retailer's discretion.</p><p class=source>${esc(sourceNote)}</p></div></div><div class=hero-actions><a class=home-cta href=${homeHref}>Retailer chooser</a><a class=retailer-cta href=${retailerInfoHref}>Retailer information</a></div></div></header><nav class=nav><div class=wrap></div></nav><section class=tools><div class=wrap><div class=searchbox><input id=reportSearch type=search placeholder="Search by model, size, price, availability or offer" aria-label="Search report"><span class=result-count></span></div></div></section><main class=wrap></main><footer><div class=wrap>Preview report generated locally. Product links open retailer pages in a new tab.</div></footer><script>const D=${data};const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const oc=o=>/discount|Save|10%|20%/i.test(o)?"offer saving":/gift|voucher/i.test(o)?"offer gift":/bundle|accessory|soundbar/i.test(o)?"offer bundle":"offer";const sc=s=>/stock|listed/i.test(s)?"status ok":/out/i.test(s)?"status no":"status warn";const total=D.groups.reduce((n,g)=>n+g.products.length,0);document.querySelector(".run").textContent="Run date: "+D.runDate+" Europe/London";document.querySelector(".freshness").innerHTML='<span><b>Product data shown from:</b> '+e(D.productDataDate||D.runDate)+' Europe/London</span><span><b>Data status:</b> '+e(D.dataStatus||"Live retailer data collected during this run")+'</span>';document.querySelector(".nav .wrap").innerHTML=D.groups.map(g=>'<a href="#'+e(g.key)+'">'+e(g.label)+'</a>').join("");document.querySelector("main").innerHTML=D.groups.map(g=>'<section class=series id="'+e(g.key)+'"><div class=head><div><p class=eyebrow>Model category</p><h2>'+e(g.label)+'</h2></div><span class=count data-total="'+g.products.length+'">'+g.products.length+' models</span></div><div class=cols><span>Model</span><span>Size</span><span>Price</span><span>Availability</span><span>Current offers</span></div>'+g.products.map(p=>'<article class=product data-search="'+e([p.model,p.title,p.size+' inch',p.price,p.previousPrice||'',p.availability,(p.offers||[]).join(' ')].join(' ').toLowerCase())+'"><div class=main><h3>'+e(p.model)+'</h3><p class=pt>'+e(p.title)+'</p><a class=link href="'+e(p.url)+'" target=_blank rel=noopener>Open product page</a></div><div class=size>'+p.size+'<span>inch</span></div><div class=price>'+e(p.price)+(p.previousPrice?'<span class=was>Previous <b>'+e(p.previousPrice)+'</b></span>':'')+'</div><div><span class="'+sc(p.availability)+'">'+e(p.availability)+'</span></div><ul class=offers>'+((p.offers&&p.offers.length?p.offers:["No current promotional offer listed"]).map(o=>'<li class="'+oc(o)+'">'+e(o)+'</li>').join(""))+'</ul></article>').join("")+'</section>').join("");const input=document.querySelector("#reportSearch"),result=document.querySelector(".result-count");function applyFilter(){const q=input.value.trim().toLowerCase();let shown=0;document.querySelectorAll(".series").forEach(section=>{let sectionShown=0;section.querySelectorAll(".product").forEach(row=>{const ok=!q||row.dataset.search.includes(q);row.hidden=!ok;if(ok){shown++;sectionShown++;}});section.hidden=sectionShown===0;const count=section.querySelector(".count");count.textContent=(q?sectionShown:count.dataset.total)+" models";});result.textContent=(q?shown:total)+" of "+total+" models shown";}input.addEventListener("input",applyFilter);applyFilter();</script></body></html>`;
}

function portfolioPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Alberto Portfolio</title><style>
:root{--bg:#030303;--crt:#8cffb7;--hot:#ff4fb8;--cyan:#63e8ff;--amber:#ffd166;--dim:#4d8f68;--line:#1a3d27}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:radial-gradient(circle at 74% 12%,#25111f 0,#070707 34%,#030303 72%);color:var(--crt);font-family:"Courier New",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;line-height:1.35;overflow-x:hidden}body:before{content:"";position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,#ffffff08 0,#ffffff08 1px,transparent 1px,transparent 4px);mix-blend-mode:screen;opacity:.32}.wrap{width:min(1120px,calc(100vw - 28px));margin:auto}.screen{min-height:100vh;padding:34px 0 58px;display:grid;align-content:center;gap:24px}.terminal{border:1px solid var(--line);background:linear-gradient(180deg,#07120bf2,#020403f2);box-shadow:0 0 0 1px #8cffb71a,0 0 42px #00ff6630,0 24px 80px #000;border-radius:8px;overflow:hidden}.bar{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid var(--line);padding:10px 14px;background:#0c1d11;color:var(--dim);font-size:13px}.leds{display:flex;gap:7px}.led{width:10px;height:10px;border-radius:50%;background:var(--hot);box-shadow:0 0 12px var(--hot)}.led:nth-child(2){background:var(--amber);box-shadow:0 0 12px var(--amber)}.led:nth-child(3){background:var(--crt);box-shadow:0 0 12px var(--crt)}.content{padding:28px}.prompt{color:var(--cyan);margin:0 0 16px}.ascii{margin:0;color:var(--hot);font-size:clamp(11px,1.55vw,18px);line-height:1.05;text-shadow:0 0 16px #ff4fb880;white-space:pre;overflow:hidden}.sub{max-width:760px;margin:26px 0 0;color:#c6ffd8;font-size:16px}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-top:26px}.panel{border:1px solid var(--line);background:#061009cc;border-radius:8px;padding:18px;box-shadow:inset 0 0 24px #00ff3c0d}.label{display:block;color:var(--amber);font-size:13px;margin-bottom:10px}.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;color:#bdfbd0}.list li:before{content:"> ";color:var(--cyan)}.project{display:grid;gap:14px;text-decoration:none;color:var(--crt);border:1px solid #ff4fb875;background:linear-gradient(135deg,#210817,#07120b);border-radius:8px;padding:18px;box-shadow:0 0 24px #ff4fb824}.project+.project{margin-top:14px}.project strong{color:white;font-size:24px;line-height:1}.project span{color:#ffd9ed}.button{display:inline-flex;width:max-content;align-items:center;justify-content:center;min-height:42px;border:1px solid var(--cyan);border-radius:4px;padding:10px 12px;color:#031107;background:var(--cyan);font-weight:900;text-transform:uppercase;box-shadow:0 0 18px #63e8ff55}.ticker{display:flex;gap:18px;overflow:hidden;border-top:1px solid var(--line);padding:12px 14px;color:var(--dim);font-size:13px}.ticker span{white-space:nowrap}.cursor{display:inline-block;width:10px;height:18px;background:var(--crt);box-shadow:0 0 12px var(--crt);animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}footer{color:var(--dim);font-size:12px;text-align:center;padding:0 0 20px}@media(max-width:820px){.screen{align-content:start;padding-top:20px}.content{padding:20px}.grid{grid-template-columns:1fr}.ascii{font-size:10px}.bar{flex-direction:column}.project strong{font-size:21px}}
</style></head><body><main class=screen><div class="wrap terminal"><div class=bar><div class=leds><span class=led></span><span class=led></span><span class=led></span></div><span>ALBERTO_SYS / PROJECT_ARCHIVE / 1993</span></div><div class=content><p class=prompt>C:\\PORTFOLIO&gt; boot alberto.exe <span class=cursor></span></p><pre class=ascii>+--------------------------------------------------------------------+
     ___       __       ____    ______   ____     ______   ____ 
    /   |     / /      / __ )  / ____/  / __ \\   /_  __/  / __ \\
   / /| |    / /      / __  | / __/    / /_/ /    / /    / / / /
  / ___ |   / /___   / /_/ / / /___   / _, _/    / /    / /_/ /
 /_/  |_|  /_____/  /_____/ /_____/  /_/ |_|    /_/     \\____/

        digital projects // retail tools // useful weirdness
+--------------------------------------------------------------------+</pre><p class=sub>A living collection of projects, dashboards and practical experiments. Built for fast decisions, clean sharing and a little late-night terminal glamour.</p><div class=grid><section class=panel><span class=label>[ ACTIVE PROJECTS ]</span><a class=project href=retailers/><strong>LG OLED Pricing Checker</strong><span>Retailer choice hub for John Lewis and Currys pricing, availability and offers.</span><b class=button>Open project</b></a><a class=project href=wordplay/><strong>Wordplay</strong><span>A quiet word discovery app with levels, saved words and a soft reading-focused interface.</span><b class=button>Open app</b></a></section><section class=panel><span class=label>[ SYSTEM NOTES ]</span><ul class=list><li>Static HTML dashboards</li><li>Retail pricing reports</li><li>Portfolio projects live here</li><li>More modules loading soon</li></ul></section></div></div><div class=ticker><span>STATUS: ONLINE</span><span>DISPLAY: CRT MODE</span><span>PROJECTS: 002</span><span>NEXT BUILD: PENDING</span></div></div></main><footer>Local preview portfolio. Nothing is pushed to GitHub until you approve it.</footer></body></html>`;
}

function splashPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>LG OLED Retailer Chooser</title><style>
:root{--lg:#a50034;--ink:#f7f2f4;--muted:#d7c8ce;--line:#ffffff24;--currys:#4c12a1;--jl:#111}*{box-sizing:border-box}body{margin:0;background:#070404;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}.hero{min-height:100vh;display:grid;align-items:center;background:radial-gradient(circle at 74% 26%,#5f1630 0,#230912 32%,#070404 72%)}.wrap{width:min(1120px,calc(100vw - 32px));margin:auto;padding:46px 0;display:grid;gap:52px}.brand{display:flex;align-items:center;gap:18px;flex-wrap:wrap}.logo{width:176px}.logo img{display:block;width:100%;mix-blend-mode:screen}.divider{width:1px;height:56px;background:#ffffff40}.brand span{color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.intro{max-width:820px}.kicker{margin:0 0 14px;color:#ffcad9;font-size:13px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}h1{margin:0;font-size:clamp(46px,7vw,94px);line-height:.88;text-transform:uppercase}.copy{max-width:700px;margin:22px 0 0;color:var(--muted);font-size:20px;line-height:1.5}.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:880px}.card{border-radius:8px;padding:22px;text-decoration:none;box-shadow:0 22px 56px #0008;min-height:174px;display:grid;align-content:space-between;border:1px solid var(--line)}.card strong{display:block;font-size:30px;line-height:1}.card span{display:block;margin-top:10px;font-size:14px;line-height:1.45}.card b{display:inline-flex;width:max-content;margin-top:20px;min-height:40px;align-items:center;border-radius:8px;padding:9px 12px;font-size:13px}.john{background:#fffffff4;color:#111}.john b{background:#111;color:white}.currys{background:linear-gradient(135deg,#4c12a1,#22105b);color:white}.currys b{background:white;color:var(--currys)}.home{color:#f0d5df;text-decoration:none;font-size:13px;font-weight:900}@media(max-width:740px){.wrap{padding:34px 0}.cards{grid-template-columns:1fr}.divider{display:none}h1{font-size:48px}.copy{font-size:18px}}</style></head><body><main class=hero><div class=wrap><div class=brand><div class=logo><img src="${lgLogo}" alt="LG Life's Good"></div><span class=divider></span><span>OLED pricing checker</span></div><section class=intro><p class=kicker>LG OLED retailer reports</p><h1>Choose a retailer</h1><p class=copy>Open current LG OLED pricing, availability and retailer offers.</p></section><div class=cards><a class="card john" href=../john-lewis/><div><strong>John Lewis</strong><span>LG OLED prices, availability and offer report.</span></div><b>Open report</b></a><a class="card currys" href=../currys/><div><strong>Currys</strong><span>LG OLED prices, availability and offer report.</span></div><b>Open report</b></a></div><a class=home href=../>Back to portfolio</a></div></main></body></html>`;
}

function currysInfoPage() {
  return `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Currys Retailer Information</title><style>
:root{--r:#4c12a1;--i:#151817;--m:#6d7773;--l:#dfe5e2;--p:#f7f8f7}*{box-sizing:border-box}body{margin:0;background:var(--p);color:var(--i);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.5}.wrap{width:min(1120px,calc(100vw - 32px));margin:auto}.hero{background:var(--i);color:white;border-bottom:10px solid var(--r)}.hero .wrap{min-height:300px;padding:48px 0 32px;display:grid;align-content:space-between;gap:32px}.brand{display:grid;gap:22px;align-items:flex-start}.logo{width:82px;height:82px;border-radius:8px;display:grid;place-items:center;background:var(--r);font-size:22px;font-weight:950}h1{margin:0;max-width:840px;font-size:clamp(36px,5vw,62px);line-height:.98;text-transform:uppercase}.copy{max-width:780px;color:#e7ece9;font-size:18px}.toplinks{display:flex;gap:10px;flex-wrap:wrap}.toplinks a{display:inline-flex;align-items:center;min-height:38px;text-decoration:none;background:white;color:var(--i);border:1px solid var(--l);border-radius:8px;padding:8px 12px;font-size:13px;font-weight:900}.toplinks a:first-child{background:var(--r);border-color:var(--r);color:white}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:28px 0}.card{background:white;border:1px solid var(--l);border-radius:8px;padding:20px;box-shadow:0 16px 36px #0e12110f}h2{margin:0 0 10px;font-size:24px}.kicker{margin:0 0 8px;color:var(--r);font-size:12px;font-weight:950;text-transform:uppercase}.links{display:grid;gap:8px;margin-top:14px}.links a{color:var(--r);font-weight:900}.address{font-size:20px;font-weight:900}.note{background:#eef2f1;border-left:5px solid var(--r);padding:16px 18px;margin:28px 0;border-radius:8px}.small{font-size:13px;color:var(--m)}footer{border-top:1px solid var(--l);padding:26px 0 36px;color:var(--m);font-size:13px}@media(max-width:760px){.grid{grid-template-columns:1fr}}</style></head><body><header class=hero><div class=wrap><div class=brand><div class=logo>Currys</div><div><h1>Currys Retailer Information</h1><p class=copy>Useful Currys links for contact, support, price match, delivery, returns and guarantee information.</p></div></div><div class=toplinks><a href=../>Back to Currys report</a><a href=https://www.currys.co.uk/services/contact-us.html target=_blank rel=noopener>Contact Currys</a><a href=https://www.currys.co.uk/services/shopping-with-us/price-promise.html target=_blank rel=noopener>Price promise</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repairs and support</a></div></div></header><main class=wrap><section class=note><strong>Last checked:</strong> ${runDate} Europe/London. Please confirm policy details on the linked Currys pages before customer-facing use.</section><div class=grid><article class=card><p class=kicker>Customer support</p><h2>Contact and help</h2><p>Currys provides support routes for orders, repairs, returns, delivery, installation and product advice.</p><div class=links><a href=https://www.currys.co.uk/services/contact-us.html target=_blank rel=noopener>Contact Currys</a><a href=https://www.currys.co.uk/services/help-and-services.html target=_blank rel=noopener>Help and services</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repair and support</a><a href=https://www.currys.co.uk/store-finder target=_blank rel=noopener>Store finder</a></div></article><article class=card><p class=kicker>Company details</p><h2>Head office</h2><p class=address>Currys Group Limited<br>1 Portal Way<br>London W3 6RS</p><p class=small>Company number 00504877.</p><div class=links><a href=https://find-and-update.company-information.service.gov.uk/company/00504877 target=_blank rel=noopener>Companies House profile</a><a href=https://www.currysplc.com target=_blank rel=noopener>Currys plc</a></div></article><article class=card><p class=kicker>Pricing policy</p><h2>Price promise</h2><p>Currys product pages state that if a customer finds the same product cheaper at another UK retailer online or in-store, Currys can match it, subject to exclusions and conditions.</p><div class=links><a href=https://www.currys.co.uk/services/shopping-with-us/price-promise.html target=_blank rel=noopener>Price promise details</a></div></article><article class=card><p class=kicker>Delivery and services</p><h2>Delivery, installation and returns</h2><p>Useful operational links for checking delivery, installation and aftercare policy around TV purchases.</p><div class=links><a href=https://www.currys.co.uk/services/delivery-installation.html target=_blank rel=noopener>Delivery and installation</a><a href=https://www.currys.co.uk/services/shopping-with-us/returns-refunds.html target=_blank rel=noopener>Returns and refunds</a><a href=https://www.currys.co.uk/services/repair-and-support.html target=_blank rel=noopener>Repairs and support</a></div></article></div></main><footer><div class=wrap>Created as a secondary page for the Currys LG OLED pricing report.</div></footer></body></html>`;
}

const johnLewisReport = fs.existsSync("upload-index.html") && !manualBaselineMode
  ? footballReportTheme(normalizeReportHtml(read("upload-index.html"), "John Lewis", { cached: false }), "John Lewis")
  : normalizeReportHtml(read("john-lewis/index.html"), "John Lewis", { cached: true });
const johnLewisInfo = read("retailer-info/index.html");
const normalizedCurrysProducts = normalizeToBaseline(currysProducts, "Currys");
assertWatchlistPresent(normalizedCurrysProducts, currysWatchlistModels, "Currys");
const currysGroups = groupProducts(normalizedCurrysProducts);
const currysCachedMeta = manualBaselineMode ? existingReportMeta("currys/index.html") : {};

write("index.html", portfolioPage());
write("retailers/index.html", footballChooserTheme(splashPage()));
write("john-lewis/index.html", johnLewisReport);
write("john-lewis/retailer-info/index.html", johnLewisInfo);
write("currys/index.html", footballReportTheme(reportPage({
  retailer: "Currys",
  bodyClass: "currys-report",
  accent: "#4c12a1",
  retailerInfoHref: "retailer-info/",
  groups: currysGroups,
  sourceNote: "Source: official Currys consumer product pages and exact model-code search. This report keeps the fixed LG OLED baseline visible even when a retailer has no current data.",
  productDataDate: currysCachedMeta.productDataDate || runDate,
  dataStatus: manualBaselineMode
    ? "Manual baseline data - prices shown from the last manual update"
    : "Manual live data collected during this update",
}), "Currys"));
write("currys/retailer-info/index.html", currysInfoPage());
