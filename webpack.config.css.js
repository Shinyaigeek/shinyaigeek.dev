const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const isProd = process.env.NODE_ENV !== "development";
const output = process.env.STATIC_FILE_OUTPUT || "dist";

module.exports = {
  entry: {
    main: "./src/front/main.tsx",
    r: "./src/front/_main.ts",
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
      filename: isProd ? "styles.[contenthash].css" : "styles.css",
    }),
  ],
};
