const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const paths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  html: path.resolve(__dirname, "src", "index.html"),
  static: path.resolve(__dirname, "src", "static"),
  target: path.resolve(__dirname, "public"),
};

const rules = {
  typescript: {
    test: /.tsx?$/,
    loader: "ts-loader",
  },
  css: {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
};

const plugins = {
  clean: new CleanWebpackPlugin(),
  html: new HtmlWebpackPlugin({
    template: paths.html,
  }),
  copy: new CopyWebpackPlugin({
    patterns: [{ from: paths.static, to: paths.target }],
  }),
  extractCss: new MiniCssExtractPlugin({
    filename: "app.css",
  }),
};

module.exports = {
  entry: paths.entry,
  output: {
    filename: "app.js",
    path: paths.target,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [rules.typescript, rules.css],
  },
  plugins: [plugins.clean, plugins.copy, plugins.html, plugins.extractCss],
};
