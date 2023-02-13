import webpack from "webpack";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";
import { webpackBaseConfig } from "./webpack.config.base";

const config: webpack.Configuration = merge(
  {
    entry: {
      client: "./src/client/index.ts"
    },
    output: {
      filename: "[name].[contenthash].js"
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
  },
  webpackBaseConfig
);

export default config;
