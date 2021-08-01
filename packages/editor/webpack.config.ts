import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import dotenv from "dotenv";
import { backend } from "./src/backend/backend";
dotenv.config();

const isProd = process.env.NODE_ENV !== "development";

// TODO: devServer is not defined as property in webpack.Configuration
const devServer = {
  contentBase: path.join(__dirname, "./static"),
  port: process.env.ASSETS_PORT ? process.env.ASSETS_PORT : 3030,
  host: `localhost`,
  before: backend,
} as any;

const config: webpack.Configuration = {
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
  // @ts-ignore
  devServer,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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

export default config;
