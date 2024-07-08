const { createRequire } = require("module");
const require = createRequire(import.meta.url);
const configOverrides = require("./config-overrides.mjs");

module.exports = configOverrides.default || configOverrides;
