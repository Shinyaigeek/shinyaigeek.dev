import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import helmet from "../../util/helmet";
import { Profile } from "../../../client/Profile/Profile";
import { BLOG_TITLE } from "../../../consts";

export const handleProfile: (p: `/${string}`) => string = function (p) {
  const Html = React.createElement(
    helmet({
      children: Profile,
      title: `About Shinyaigeek | ${BLOG_TITLE}`,
      slug: `https://shinyaigeek.dev/profile`,
      props: {
        language: p.startsWith("/en") ? "en" : "ja",
        currentPath: p.replace("/en/", "/").replace("/ja/", "/"),
        page: "profile",
      },
      language: p.startsWith("/en") ? "en" : "ja"
    })
  );

  return renderToStaticMarkup(Html);
};
