// eventually I dont use this

const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  target: "node",
  entry: {
    express: "./express.ts"
  },
};
