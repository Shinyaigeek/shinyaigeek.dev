const common = require("./webpack.config.common");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const client = {
  target: "web",
  entry: {
    profile: "./src/front/profile.ts",
    solid: "./src/app.tsx",
  },
  plugin: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};

module.exports = merge(common, client);
