module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "linaria/babel",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "transform-inline-environment-variables",
      {
        include: ["CONTENTHASH_JS", "CONTENTHASH_CSS"],
      },
    ],
  ],
};
