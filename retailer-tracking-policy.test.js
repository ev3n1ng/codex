const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const { isTrackedModel } = require("./retailer-tracking-policy");

test("retired models cannot be rediscovered; available older models remain tracked", () => {
  for (const model of ["OLED65G54LW", "OLED65M59LA", "OLED65B56LA", "OLED77C54LA"]) {
    assert.equal(isTrackedModel(model), false);
    assert.equal(isTrackedModel(model.toLowerCase()), false);
  }
  for (const model of ["OLED77G54LW", "OLED48G56LS", "OLED42C54LA", "OLED55C66LB", "OLED65M49LA"]) {
    assert.equal(isTrackedModel(model), true);
  }
});

for (const file of ["refresh_john_lewis_official.js", "refresh_currys_official.js"]) {
  test(`${file} rejects a retired model before filesystem or network access`, () => {
    const source = fs.readFileSync(`${__dirname}/${file}`, "utf8");
    const start = source.indexOf("function fetchProductPage(product) {");
    const end = source.indexOf("\nfunction ", start + 1);
    const context = vm.createContext({ isTrackedModel });
    vm.runInContext(source.slice(start, end), context);
    assert.throws(() => context.fetchProductPage({ model: "OLED65G54LW" }), /Retired model/);
  });
}
