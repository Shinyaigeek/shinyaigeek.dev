const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const Mode = require("frontmatter-markdown-loader/mode");
const FontminPlugin = require("fontmin-webpack");
const optimizedImages = require("next-optimized-images");
const fs = require("fs");
const marked = require("marked")
const frontmatter = require("front-matter")

const nextConfig = {
  compress: true,
  exportTrailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const pageNames = fs.readdirSync("./items");
    const pages = {};
    for (let i of pageNames) {
      try {
        if (!i.includes(".md")) {
          continue;
        }
        const item = fs.readFileSync("./items/" + i, "utf8");
        const bodyWithHeader = frontmatter(item)
        const header = bodyWithHeader.attributes;
        const content = marked(
          bodyWithHeader.body.replace(/\?\?.+\?\?/g, target => {
            return target
              .replace("??", "<span class='text__red'>")
              .replace("??", "</span>");
          }),
          {
            highlight: function(code) {
              return require("highlight.js").highlightAuto(code).value;
            }
          }
        ).replace(/\n/g, "<br>");
        const headings = content.match(/<h2 id=".+?">.+?<\/h2>/g);
        const body = content.replace(/<h2 id=".+?">/g, target => {
          const id = target.replace('<h2 id="', "").replace('">', "");
          return `<h2 id="${encodeURI(id)}">`;
        });
        pages[`/post/${header.slug}`] = {
          page: "/post/[item]",
          query: {
            // header: header,
            // body: body,
            // headings: headings
            target: i
          }
        };
      } catch (e) {
        console.log(e);
        const header = {
          name: "not found",
          path: "not found",
          tag: [],
          description: "not found",
          date: "not found"
        };
        pages[`/post/${i.slug}`] = {
          page: "/post/[item]",
          query: {
            header: header,
            body: body,
            headings: headings
          }
        };
      }
    }
    console.log(Object.assign({}, pages, defaultPathMap));
    return Object.assign({}, pages, defaultPathMap);
  },
  webpack: function(config, { dev, defaultLoaders }) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jp g|gif|webp)$/,
      use: {
        loader: "url-loader"
      }
    });

    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        mode: [Mode.BODY]
      }
    });

    config.plugins.push(
      new FontminPlugin({
        autodetect: true
      })
    );

    return config;
  }
};

module.exports = optimizedImages(withCss(withSass(nextConfig)));
