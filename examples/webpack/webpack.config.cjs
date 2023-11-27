const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js",
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    static: "./static",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
};
