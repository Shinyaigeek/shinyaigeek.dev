import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import helmet from "../../../../src/build/util/helmet";
import { Profile } from "../../../../src/front/Profile/Profile";
import { BLOG_TITLE } from "../../../../src/consts";

export const handleProfile: (p: `/${string}`) => string = function (p) {
    const Html = React.createElement(
        helmet({
          children: Profile,
          title: `Profile | ${BLOG_TITLE}`,
          style: "profile",
          slug: `https://shinyaigeek.dev/profile`
        })
      );
    
      return renderToStaticMarkup(Html);
};
