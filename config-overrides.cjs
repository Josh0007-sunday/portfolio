(async () => {
  const configOverrides = await import("./config-overrides.mjs");
  module.exports = configOverrides.default || configOverrides;
})();
