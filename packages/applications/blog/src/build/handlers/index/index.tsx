import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../../client/Home/Home";
import { BLOG_TITLE } from "../../../consts";
import { getContentAbsolutePath } from "../../../contents-handler/get-content-path";
import { getBlogPosts } from "../../util/getBlogPosts";
import { getThirdPirty } from "../../util/getThirdPirty";
import helmet from "../../util/helmet";

export const handleIndex: (p: string) => Promise<string> = async (p) => {
	const blogEntries = getBlogPosts(
		getContentAbsolutePath("./src/articles/public/") as `${string}/`,
		p.startsWith("/en") ? "en" : "ja",
	);
	const thirdPirtyEntries = getThirdPirty(
		getContentAbsolutePath("./src/articles/third-pirty.json"),
	);
	const Html = React.createElement(
		helmet({
			children: Home,
			title: `${BLOG_TITLE}`,
			slug: "https://shinyaigeek.dev",
			which: "top",
			props: {
				items: blogEntries,
				thirdPirtyItems: thirdPirtyEntries,
				prev: false,
				next: false,
				language: p.startsWith("/en") ? "en" : "ja",
				page: "home",
				currentPath: p.replace("/en/", "/").replace("/ja/", "/"),
			},
			language: p.startsWith("/en") ? "en" : "ja",
		}),
	);

	return renderToStaticMarkup(Html);
};
