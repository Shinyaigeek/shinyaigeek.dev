const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["solid", { generate: "ssr", hydratable: true }],
                "@babel/preset-env",
              ],
              plugins: ["solid-styled-jsx/babel"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  entry: {
    ssr: "./src/serverside/ssr.ts",
  },
};
