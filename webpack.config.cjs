const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    core: "./src/core.js",
    index: "./src/index.js",
    "web-component": "./src/web-component.js",
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "static/game/js"),
    filename: "[name].js",
  },
  plugins: [
    //new HtmlWebpackPlugin({
    //  title: "The game of Life",
    //  meta: {
    //    viewport: "width=device-width, initial-scale=1",
    //  },
    //}),
  ],
  module: {
    rules: [
      // use the html loader
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
      // use the css loaders (first load the css, then inject the style)
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(png|gif|jpg|jpeg|xml|json)$/,
        use: ["url-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
