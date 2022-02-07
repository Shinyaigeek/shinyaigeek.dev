const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const isProd = process.env.NODE_ENV !== "development";
const output = process.env.STATIC_FILE_OUTPUT || "public";

module.exports = {
  entry: {
    main: "./shinyaigeek.dev/src/client/main.tsx",
    r: "./shinyaigeek.dev/src/client/_main.ts",
  },
  output: {
    path: path.join(__dirname, output),
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
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
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
              },
            },
          },
          "sass-loader"
        ],
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
      filename: isProd ? "styles.[contenthash].css" : "styles.css",
    }),
  ],
};
