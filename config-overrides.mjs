import {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  babelInclude,
  addBabelPreset,
  addBabelPlugins,
} from "customize-cra";
import webpack from "webpack";
import path from "path";

const { ProvidePlugin } = webpack;

const configOverride = async (config) => {
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
  };
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};

export default override(
  addWebpackPlugin(
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  ),
  addWebpackAlias({
    stream: "stream-browserify",
    crypto: "crypto-browserify",
    http: "stream-http",
    https: "https-browserify",
    zlib: "browserify-zlib",
  }),
  addBabelPreset("@babel/preset-env"),
  addBabelPlugins("@babel/plugin-transform-modules-commonjs"),
  babelInclude([
    path.resolve("src"),
    path.resolve("node_modules/@solana/spl-token"),
    path.resolve("node_modules/@metaplex-foundation/mpl-core"),
  ]),
  configOverride
);
