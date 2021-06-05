import fs from "fs";
import path from "path";
import fm from "front-matter";
import { renderToStaticMarkup } from "react-dom/server";
import Post from "../../../../front/Post/Post";
import { Remarkable } from "remarkable";
import { tweetMacroPlugin } from "remarkable-plugin-tweet-share";
// @ts-ignore
import { remarkablePluginHeadingId } from "remarkable-plugin-heading-id";
import React from "react";
import hljs from "highlight.js";

export const handlePost: (p: `/${string}`) => string = function (p) {
  const _post = fs.readFileSync(
    path.join(
      __dirname,
      "../../../../articles/public" + p.replace("/post", "") + ".md"
    ),
    {
      encoding: "utf-8",
    }
  );

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

  const fields = {
    fields: {
      slug: p.replace("/", ""),
      ...(attributes as any),
    },
    anchors,
  };

  return renderToStaticMarkup(<Post {...fields} />);
};
