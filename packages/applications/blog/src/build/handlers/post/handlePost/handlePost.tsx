import fs from "node:fs";
import path from "node:path";
import fm from "front-matter";
import { selectAll } from "hast-util-select";
import hljs from "highlight.js";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import rehypeHighlight from "rehype-highlight";
import raw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import gfm from "remark-gfm";
import md2html from "remark-rehype";
// @ts-ignore
import { remarkablePluginHeadingId } from "remarkable-plugin-heading-id";
import { tweetMacroPlugin } from "remarkable-plugin-tweet-share";
import Post from "../../../../client/Post/Post";
import { BLOG_TITLE } from "../../../../consts";
import { getContentAbsolutePath } from "../../../../contents-handler/get-content-path";
import helmet from "../../../util/helmet";

const htmlH2 = () => {
	return (tree: any) => {
		let count = 0;
		selectAll("h2", tree).forEach((node) => {
			node.properties = {
				...node.properties,
				id: `2__${count}`,
			};
			count++;
		});
	};
};

export const handlePost: (p: `/${string}`) => Promise<string> = async (p) => {
	const _postPath = getContentAbsolutePath(
		`./src/articles/public${p
			.replace("/post", "")
			.replace("/en/", "/")
			.replace("/ja/", "/")}.md`,
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
	const md = await remark();
	md.use(gfm);
	md.use(md2html, { allowDangerousHtml: true });
	md.use(raw);
	md.use(htmlH2);
	md.use(rehypeHighlight);
	md.use(rehypeStringify);
	const html = String(await md.process(body));
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
		page: "post",
	};

	const Html = React.createElement(
		helmet({
			children: Post,
			title: `${fields.fields.title} | ${BLOG_TITLE}`,
			slug: `https://shinyaigeek.dev/${fields.fields.slug}`,
			which: fields.fields.slug.slice(fields.fields.slug.lastIndexOf("/") + 1),
			props: fields,
			language: p.startsWith("/en") ? "en" : "ja",
		}),
	);

	return renderToStaticMarkup(Html);
};
