const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  html: path.resolve(__dirname, 'src', 'index.html'),
  target: path.resolve(__dirname, 'public'),
};

const rules = {
  typescript: {
    test: /.tsx?$/,
    loader: 'ts-loader',
  },
};

const plugins = {
  clean: new CleanWebpackPlugin(),
  html: new HtmlWebpackPlugin({
    template: paths.html,
  }),
};

module.exports = {
  entry: paths.entry,
  output: {
    filename: 'app.js',
    path: paths.target,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [rules.typescript],
  },
  plugins: [plugins.clean, plugins.html],
};
