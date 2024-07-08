import {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  babelInclude,
  addBabelPreset,
  addBabelPlugins,
} from "customize-cra";
import { ProvidePlugin } from "webpack";
import { resolve as _resolve } from "path";

export default override(
  // Add Webpack Plugins
  addWebpackPlugin(
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  ),

  // Add Webpack Aliases
  addWebpackAlias({
    stream: "stream-browserify",
    crypto: "crypto-browserify",
    http: "stream-http",
    https: "https-browserify",
    zlib: "browserify-zlib",
  }),

  // Add Babel Presets
  addBabelPreset("@babel/preset-env"),

  // Add Babel Plugins
  addBabelPlugins("@babel/plugin-transform-modules-commonjs"),

  // Include specific directories for Babel processing
  babelInclude([
    _resolve("src"),
    _resolve("node_modules/@solana/spl-token"),
    _resolve("node_modules/@metaplex-foundation/mpl-core"),
  ]),

  // Add fallback resolutions and other configurations
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
    };

    // Add rules to handle ES modules
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  }
);
