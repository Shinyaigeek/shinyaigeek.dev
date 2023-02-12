import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/server/index.tsx",
  target: "node",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "swc-loader",
      },
    ],
  },
};

export default config;
