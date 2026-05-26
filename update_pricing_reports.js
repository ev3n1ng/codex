const { spawnSync } = require("child_process");

const steps = [
  ["Fetch John Lewis listing pages", "fetch_john_lewis_pages.js"],
  ["Fetch John Lewis product service offers", "fetch_product_service_offers.js"],
  ["Refresh Currys consumer page data", "refresh_currys_data.js"],
  ["Build John Lewis report", "generate_upload_index.js"],
  ["Build portfolio and retailer pages", "generate_retailer_portal.js"],
];

for (const [label, script] of steps) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(process.execPath, [script], {
    stdio: "inherit",
    env: { ...process.env, TZ: "Europe/London" },
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
