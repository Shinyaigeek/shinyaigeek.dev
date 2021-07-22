const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

const isProd = process.env.NODE_ENV !== "development";

module.exports = {
  target: "web",
  entry: {
    main: "./src/App.tsx",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "node_modules"],
  },
  devServer: {
    contentBase: path.join(__dirname, "./static"),
    port: process.env.ASSETS_PORT ? process.env.ASSETS_PORT : 3030,
    host: `localhost`,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      template: "src/index.html",
    }),
  ],
};
