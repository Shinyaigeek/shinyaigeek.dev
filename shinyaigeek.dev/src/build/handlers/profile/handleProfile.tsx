import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import helmet from "../../util/helmet";
import { Profile } from "../../../client/Profile/Profile";
import { BLOG_TITLE } from "../../../consts";

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
