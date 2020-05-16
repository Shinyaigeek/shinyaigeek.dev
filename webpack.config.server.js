const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  target: "node",
  entry: {
    server: "./server.ts",
    main: "./src/front/main.ts"
  }
};
