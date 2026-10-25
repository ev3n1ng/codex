const retiredModels = new Set([
  "OLED65G54LW",
  "OLED65M59LA",
  "OLED55G56LS",
  "OLED83C54LA",
  "OLED77C54LA",
  "OLED77C56LB",
  "OLED65C54LA",
  "OLED65C56LB",
  "OLED55C54LA",
  "OLED55C56LB",
  "OLED48C56LB",
  "OLED83B56LA",
  "OLED77B56LA",
  "OLED65B56LA",
  "OLED55B56LA",
  "OLED48B56LA",
]);

// Retired at the user's request on 25 October 2026. Never rediscover or fetch.
function isTrackedModel(model, retailer) {
  const code = String(model).toUpperCase();
  if (retiredModels.has(code)) return false;
  if (retailer === "John Lewis") {
    return !["OLED42C54LA", "OLED48G56LS"].includes(code) && !/MRGB88/.test(code);
  }
  if (retailer === "Currys") return !/MRGB86/.test(code);
  return true;
}

module.exports = { isTrackedModel };
