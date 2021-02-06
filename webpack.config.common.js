const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const isProd = process.env.NODE_ENV !== "development";
const output = process.env.STATIC_FILE_OUTPUT || "dist";

module.exports = {
  output: {
    path: path.join(__dirname, output),
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "node_modules"],
  },
  externals: [
    "long", // optional dependency fast-json-stringify
    "uglify-es", // optional dependency fast-json-stringify
    "uglify-es/package.json", // optional dependency fast-json-stringify
  ],
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
          "linaria/loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.json",
            },
          },
        ],
      },
      // {
      //   test: /\.js(x?)$/,
      //   loader: "babel-loader"
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      CONTENTFUL_SPACE_ID: JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
      CONTENTFUL_ACCESS_TOKEN: JSON.stringify(
        process.env.CONTENTFUL_ACCESS_TOKEN
      ),
    }),

    new MiniCssExtractPlugin({
      filename: isRrod ? "styles.[contenthash].css" : "styles.css",
    }),
  ],
};
