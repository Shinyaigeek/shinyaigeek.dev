import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../../front/Home/Home";
import React from "react";
import helmet from "../../util/helmet";
import { BLOG_TITLE } from "../../../consts";
import { __getBlogPosts } from "../../util/getBlogPosts";
import path from "path";

export const handleIndex: () => string = function () {
  const entries = __getBlogPosts(
    path.join(__dirname, "../../../articles/public/") as `${string}/`
  );
  const Html = React.createElement(
    helmet({
      children: Home,
      title: `${BLOG_TITLE}`,
      style: "home",
      slug: `https://shinyaigeek.dev`,
      props: {
          items: entries,
          prev: false,
          next: false
      },
    })
  );

  return renderToStaticMarkup(Html);
};
