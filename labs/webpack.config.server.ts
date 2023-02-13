import webpack from "webpack";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";
import { webpackBaseConfig } from "./webpack.config.base";

const config: webpack.Configuration = merge(
  {
    entry: "./src/server/index.tsx",
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
        filename: "[name].css",
      }),
    ],
  },
  webpackBaseConfig
);

export default config;
