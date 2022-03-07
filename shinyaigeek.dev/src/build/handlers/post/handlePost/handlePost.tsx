import fs from "fs";
import path from "path";
import fm from "front-matter";
import { renderToStaticMarkup } from "react-dom/server";
import Post from "../../../../client/Post/Post";
import { Remarkable } from "remarkable";
import { tweetMacroPlugin } from "remarkable-plugin-tweet-share";
// @ts-ignore
import { remarkablePluginHeadingId } from "remarkable-plugin-heading-id";
import React from "react";
import hljs from "highlight.js";
import helmet from "../../../util/helmet";
import { BLOG_TITLE } from "../../../../consts";

export const handlePost: (p: `/${string}`) => string = function (p) {
  const _postPath = path.join(
    __dirname,
    "../shinyaigeek.dev/src/articles/public" +
      p.replace("/post", "").replace("/en/", "/").replace("/ja/", "/") +
      ".md"
  );
  const postPath =
    p.startsWith("/en") &&
    fs.existsSync(_postPath.replace("articles/public/", "articles/en/"))
      ? _postPath.replace("articles/public/", "articles/en/")
      : _postPath;
  const _post = fs.readFileSync(postPath, {
    encoding: "utf-8",
  });

  // todo type assertion
  const { attributes, body } = fm(_post);
  const md = new Remarkable({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ""; // use external default escaping
    },
  });
  md.use(tweetMacroPlugin);
  md.use(remarkablePluginHeadingId, {
    targets: ["h2"],
    createId: (level: 1 | 2 | 3 | 4 | 5 | 6, _: string, idx: number) => {
      return `${level}__${idx}`;
    },
  });
  const html = md.render(body);
  const anchorsWithH2: string[] | null = html.match(/<h2 id=".+?">.+?<\/h2>/g);
  let anchors;
  if (anchorsWithH2) {
    anchors = anchorsWithH2.map((anc) => {
      return anc.replace(/<h2 id=".+?">/, "").replace("</h2>", "");
    });
  }

  const language = p.startsWith("/en")
    ? "en"
    : p.startsWith("/ja")
    ? "ja"
    : undefined;
  if (!language) {
    throw new Error(`invalid path, ${p}`);
  }

  const fields = {
    fields: {
      slug: p.replace("/", ""),
      ...(attributes as any),
      content: html,
    },
    anchors,
    language,
    currentPath: p.replace("/en/", "/").replace("/ja/", "/"),
  };

  const Html = React.createElement(
    helmet({
      children: Post,
      title: `${fields.fields.title} | ${BLOG_TITLE}`,
      page: "post",
      slug: `https://shinyaigeek.dev/${fields.fields.slug}`,
      props: fields,
      language: p.startsWith("/en") ? "en" : "ja"
    })
  );

  return renderToStaticMarkup(Html);
};
