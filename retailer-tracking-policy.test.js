const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const { isTrackedModel } = require("./retailer-tracking-policy");
const { modelOf, mrgbModels, mrgbSeeds } = require("./retailer-models");

test("MRGB models retain retailer suffixes and three-digit screen sizes", () => {
  assert.equal(modelOf('LG MRGB96 100" TV - 100MRGB96B6B'), "100MRGB96B6B");
  assert.equal(modelOf("LG 65MRGB86B6A (2026) Mini RGB"), "65MRGB86B6A");
  assert.equal(modelOf("LG OLED55C66LB"), "OLED55C66LB");
  assert.equal(mrgbModels.length, 11);
  assert.equal(mrgbSeeds("Currys").find(p => p.model === "100MRGB96B6B").size, 100);
});

test("retired models cannot be rediscovered; available older models remain tracked", () => {
  for (const model of ["OLED65G54LW", "OLED65M59LA", "OLED65B56LA", "OLED77C54LA"]) {
    assert.equal(isTrackedModel(model), false);
    assert.equal(isTrackedModel(model.toLowerCase()), false);
  }
  for (const model of ["OLED77G54LW", "OLED48G56LS", "OLED42C54LA", "OLED55C66LB", "OLED65M49LA"]) {
    assert.equal(isTrackedModel(model), true);
  }
});

test("retailer exclusions prevent impossible listings without hiding valid counterparts", () => {
  for (const model of ["OLED42C54LA", "OLED48G56LS", "65MRGB88B6B"]) {
    assert.equal(isTrackedModel(model, "John Lewis"), false);
    assert.equal(isTrackedModel(model, "Currys"), true);
  }
  assert.equal(isTrackedModel("65MRGB86B6A", "Currys"), false);
  assert.equal(isTrackedModel("65MRGB86B6A", "John Lewis"), true);
});

for (const file of ["refresh_john_lewis_official.js", "refresh_currys_official.js"]) {
  test(`${file} rejects a retired model before filesystem or network access`, () => {
    const source = fs.readFileSync(`${__dirname}/${file}`, "utf8");
    const start = source.indexOf("function fetchProductPage(product) {");
    const end = source.indexOf("\nfunction ", start + 1);
    const context = vm.createContext({ isTrackedModel });
    vm.runInContext(source.slice(start, end), context);
    assert.throws(() => context.fetchProductPage({ model: "OLED65G54LW" }), /Retired model/);
    const excluded = file.includes("john_lewis") ? "OLED42C54LA" : "65MRGB86B6A";
    assert.throws(() => context.fetchProductPage({ model: excluded }), /Retired model/);
  });
}
