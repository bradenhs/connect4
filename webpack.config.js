const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const path = require("path");

/**
 * @param {{mode: 'production' | 'development'}} argv
 */
function getWebpackConfig(env, argv) {
  /** @type {import("webpack").Rule[]} */
  const rules = [];

  /** @type {import("webpack").Plugin[]} */
  const plugins = [];

  rules.push({
    test: /\.tsx?/,
    loader: "ts-loader",
    options: {
      transpileOnly: argv.mode === "development"
    }
  });

  rules.push({
    test: /\.(png|jpg|gif|svg|eot|woff|ttf)$/,
    loader: "file-loader"
  });

  rules.push({
    test: /\.css/,
    loaders: ["style-loader", "css-loader"]
  });

  if (argv.mode === "development") {
    rules.push({
      test: /\.tsx?/,
      loader: "tslint-loader"
    });

    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        tslint: true
      }),
      new ForkTsCheckerNotifierWebpackPlugin()
    );
  }

  /** @type {import("webpack").Configuration} */
  const config = {
    entry: path.join(__dirname, "src/client/index.tsx"),
    output: {
      path: path.join(__dirname, "public/dist"),
      filename: "bundle.js",
      publicPath: "dist"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: { rules },
    devtool: argv.mode === "development" ? "eval-source-map" : "source-map",
    devServer: {
      contentBase: "public",
      historyApiFallback: true
    },
    plugins
  };

  return config;
}

module.exports = getWebpackConfig;
