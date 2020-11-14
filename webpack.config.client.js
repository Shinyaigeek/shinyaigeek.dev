const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  target: "web",
  entry: {
    profile: "./src/front/main.ts",
  }
};
