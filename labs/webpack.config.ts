import webpack from "webpack";

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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default config;
