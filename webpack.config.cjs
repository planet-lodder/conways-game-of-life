const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
    "game-of-life": "./src/web-component.js",
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "static/game/js"),
    filename: "[name].js",
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
