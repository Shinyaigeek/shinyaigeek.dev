const common = require("./webpack.config.common");
const path = require("path");

module.exports = {
  ...common,
  entry: {
    post: "./src/front/post.tsx",
    home: "./src/front/home.tsx",
    profile: "./src/front/profile.tsx"
  }
};
