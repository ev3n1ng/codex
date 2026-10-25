function modelOf(title = "") {
  return String(title).match(/(?:OLED\d+[A-Z0-9]+|\d{2,3}MRGB\d{2}[A-Z0-9]+)/i)?.[0].toUpperCase() || "LG OLED";
}

const mrgbUrls = {
  "John Lewis": {
    "50MRGB86B6A": "https://www.johnlewis.com/lg-50mrgb86b6a-2026-mini-rgb-evo-hdr-4k-ultra-hd-smart-ai-tv-50-inch-with-dolby-atmos-charcoal-black/p115360024",
    "55MRGB86B6A": "https://www.johnlewis.com/lg-55mrgb86b6a-2026-mini-rgb-evo-hdr-4k-ultra-hd-smart-ai-tv-55-inch-with-dolby-atmos-charcoal-black/p115360027",
    "65MRGB86B6A": "https://www.johnlewis.com/lg-65mrgb86b6a-2026-mini-rgb-evo-hdr-4k-ultra-hd-smart-ai-tv-65-inch-with-dolby-atmos-charcoal-black/p115360017",
    "75MRGB86B6A": "https://www.johnlewis.com/lg-75mrgb86b6a-2026-mini-rgb-evo-hdr-4k-ultra-hd-smart-ai-tv-75-inch-with-dolby-atmos-charcoal-black/p115360032",
    "86MRGB96B6B": "https://www.johnlewis.com/lg-86mrgb96b6b-2026-micro-rgb-evo-hdr-4k-ultra-hd-smart-ai-tv-86-inch-with-dolby-atmos-ashed-blue/p115239657",
  },
  Currys: {
    "50MRGB88B6B": "https://www.currys.co.uk/products/lg-mrgb88-50-mini-rgb-ai-4k-hdr-smart-tv-2026-50mrgb88b6b-10301888.html",
    "55MRGB88B6B": "https://www.currys.co.uk/products/lg-mrgb88-55-mini-rgb-ai-4k-hdr-smart-tv-2026-55mrgb88b6b-10301924.html",
    "65MRGB88B6B": "https://www.currys.co.uk/products/lg-mrgb88-65-mini-rgb-ai-4k-hdr-smart-tv-2026-65mrgb88b6b-10301919.html",
    "75MRGB88B6B": "https://www.currys.co.uk/products/lg-mrgb88-75-mini-rgb-ai-4k-hdr-smart-tv-2026-75mrgb88b6b-10301922.html",
    "86MRGB88B6B": "https://www.currys.co.uk/products/lg-mrgb88-86-mini-rgb-ai-4k-hdr-smart-tv-2026-86mrgb88b6b-10301926.html",
    "86MRGB96B6B": "https://www.currys.co.uk/products/lg-mrgb96-86-micro-rgb-ai-4k-hdr-smart-tv-2026-86mrgb96b6b-10301918.html",
    "100MRGB96B6B": "https://www.currys.co.uk/products/lg-mrgb96-100-micro-rgb-ai-4k-hdr-smart-tv-2026-100mrgb96b6b-10301997.html",
  },
};
const mrgbModels = [...new Set(Object.values(mrgbUrls).flatMap(Object.keys))];

function mrgbSeeds(retailer) {
  return Object.entries(mrgbUrls[retailer]).map(([model, url]) => ({
    model, url, year: "2026", size: Number(model.match(/^\d+/)[0]),
    title: `LG ${model} (2026) ${model.includes("MRGB96") ? "Micro" : "Mini"} RGB TV`,
    price: "Not available", availability: "Not available at the moment", offers: [],
  }));
}

module.exports = { modelOf, mrgbModels, mrgbSeeds };
