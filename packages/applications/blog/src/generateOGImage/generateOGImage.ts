import fs from "node:fs/promises";
import path from "node:path";
import type { Entry } from "../build/util/getBlogPost.js";
import { getBlogPosts } from "../build/util/getBlogPosts.js";
import { getContentAbsolutePath } from "../contents-handler/get-content-path.js";
import { generateOGImageFromBlogPost } from "./generateOGImageFromBlogPost.js";

const generateOGImage: () => Promise<void> = async () => {
	await fs.mkdir(getContentAbsolutePath("./public/assets/ogimage/ja"), {
		recursive: true,
	});
	await fs.mkdir(getContentAbsolutePath("./public/assets/ogimage/en"), {
		recursive: true,
	});

	const blogPosts = (["ja", "en"] as const).flatMap((language) =>
		getBlogPosts(
			getContentAbsolutePath("./src/articles/public/") as `${string}/`,
			language,
		).map((blogPost) => ({
			...blogPost,
			language,
		})),
	) as (Entry & { language: string })[];

	blogPosts.push({
		language: "ja",
		// @ts-ignore
		fields: {
			title: "Shinyaigeek's blog",
			slug: "top/",
		},
	});

	blogPosts.push({
		language: "en",
		// @ts-ignore
		fields: {
			title: "Shinyaigeek's blog",
			slug: "top/",
		},
	});

	blogPosts.push({
		language: "ja",
		// @ts-ignore
		fields: {
			title: "About Shinyaigeek",
			slug: "profile/",
		},
	});

	blogPosts.push({
		language: "en",
		// @ts-ignore
		fields: {
			title: "About Shinyaigeek",
			slug: "profile/",
		},
	});

	await Promise.all(
		blogPosts.map(async (blogPost) => {
			const pngData = await generateOGImageFromBlogPost({
				title: blogPost.fields.title,
			});

			fs.writeFile(
				getContentAbsolutePath(
					`./public/assets/ogimage/${
						blogPost.language
					}/${blogPost.fields.slug.slice(0, -1)}.png`,
				),
				pngData,
			);
		}),
	);
};

generateOGImage();
