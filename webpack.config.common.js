const path = require("path");
const webpack = require("webpack");

require("dotenv").config();

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "node_modules"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    host: `localhost`,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js(x?)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["solid"],
          },
        },
      },
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
