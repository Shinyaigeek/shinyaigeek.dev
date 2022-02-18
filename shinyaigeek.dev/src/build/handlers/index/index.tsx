import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../../client/Home/Home";
import React from "react";
import helmet from "../../util/helmet";
import { BLOG_TITLE } from "../../../consts";
import { getBlogPosts } from "../../util/getBlogPosts";
import path from "path";
import { getThirdPirty } from "../../util/getThirdPirty";

export const handleIndex: (p: string) => string = function (p) {
  const blogEntries = getBlogPosts(
    path.join(
      __dirname,
      "../shinyaigeek.dev/src/articles/public/"
    ) as `${string}/`
  );
  const thirdPirtyEntries = getThirdPirty(
    path.join(__dirname, "../shinyaigeek.dev/src/articles/third-pirty.json")
  );
  const Html = React.createElement(
    helmet({
      children: Home,
      title: `${BLOG_TITLE}`,
      style: "home",
      slug: `https://shinyaigeek.dev`,
      props: {
        items: blogEntries,
        thirdPirtyItems: thirdPirtyEntries,
        prev: false,
        next: false,
        language: p.startsWith("/en") ? "en" : "ja",
        currentPath: p.replace("/en/", "/").replace("/ja/", "/"),
      },
    })
  );

  return renderToStaticMarkup(Html);
};
