const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  target: "web",
  entry: {
    main: "./src/front/main.ts",
  }
};
