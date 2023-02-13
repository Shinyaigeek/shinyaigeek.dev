import webpack from "webpack";

export const webpackBaseConfig: webpack.Configuration = {
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
        use: ["css-loader"],
      },
    ],
  },
};
