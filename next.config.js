const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css")
const Mode = require('frontmatter-markdown-loader/mode')
const FontminPlugin = require('fontmin-webpack')
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  compress:true,
  webpack: function(config, { dev, defaultLoaders }) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jp g|gif|webp)$/,
      use: {
        loader: "url-loader",
      }
    });

    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        mode: [Mode.BODY]
      }
    })

    config.plugins.push(
      new FontminPlugin({
        autodetect: true,
      })
    )

    return config;
  }
};

module.exports = optimizedImages(withCss(withSass(nextConfig)));
