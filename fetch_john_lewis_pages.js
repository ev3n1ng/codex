const fs = require("fs");
const { spawnSync } = require("child_process");

const base = "https://www.johnlewis.com/browse/electricals/televisions/lg/oled/televisions";
const facet = "_/N-alkZ1z13wsdZ1z0rgkwZ1yzz00g";
const priceBands = "670-1200,1290-1680,1690-2400,2490-3100,3590-6800";
const pages = [
  {
    file: "johnlewis-lg-oled.html",
    url: `${base}/${facet}`,
  },
  ...priceBands.split(",").map((band, index) => ({
    file: `band${index + 1}.html`,
    url: `${base}/price=${band}/${facet}?price=${band}&priceBands=${priceBands}`,
  })),
];

function fetchHtml(url) {
  const result = spawnSync("curl", [
    "--http1.1",
    "-L",
    "--compressed",
    "--fail",
    "--max-time",
    "20",
    "--retry",
    "2",
    "--retry-delay",
    "5",
    "-A",
    "Mozilla/5.0",
    url,
  ], {
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`curl failed for ${url}: ${result.stderr || result.stdout}`);
  }

  if (!result.stdout.includes("__NEXT_DATA__")) {
    throw new Error(`John Lewis response did not include product data for ${url}`);
  }

  return result.stdout;
}

for (const page of pages) {
  const html = fetchHtml(page.url);
  fs.writeFileSync(page.file, html);
  console.log(`Wrote ${page.file} (${html.length} bytes)`);
}
