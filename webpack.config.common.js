const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

require("dotenv").config();

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
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
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
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
      // {
      //   test: /\.js(x?)$/,
      //   loader: "babel-loader"
      // },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
  ],
};
