import webpack from "webpack";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  entry: "./src/server/index.tsx",
  target: "node",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "swc-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

export default config;
