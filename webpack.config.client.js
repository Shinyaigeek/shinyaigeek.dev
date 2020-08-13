const common = require("./webpack.config.common");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const client = {
  target: "web",
  entry: {
    solid: "./src/app.tsx",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};

module.exports = merge(common, client);
