import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Profile } from "../../../client/Profile/Profile";
import { BLOG_TITLE } from "../../../consts";
import helmet from "../../util/helmet";

export const handleProfile: (p: `/${string}`) => Promise<string> = async (
	p,
) => {
	const Html = React.createElement(
		helmet({
			children: Profile,
			title: `About Shinyaigeek | ${BLOG_TITLE}`,
			slug: "https://shinyaigeek.dev/profile",
			which: "profile",
			props: {
				language: p.startsWith("/en") ? "en" : "ja",
				currentPath: p.replace("/en/", "/").replace("/ja/", "/"),
				page: "profile",
			},
			language: p.startsWith("/en") ? "en" : "ja",
		}),
	);

	return renderToStaticMarkup(Html);
};
