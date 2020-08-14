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

  plugins: [
    new webpack.DefinePlugin({
      CONTENTFUL_SPACE_ID: JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
      CONTENTFUL_ACCESS_TOKEN: JSON.stringify(
        process.env.CONTENTFUL_ACCESS_TOKEN
      ),
      BLOG_POSTS_INDEX_URL: JSON.stringify(process.env.BLOG_POSTS_INDEX_URL)
    }),
  ],
};
