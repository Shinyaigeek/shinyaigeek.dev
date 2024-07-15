import fs from "node:fs";
import fm from "front-matter";
import type { Entry } from "./getBlogPost.js";
interface HomeSlug {
	slug: string;
	tag?: string;
	page?: number;
}

export const getBlogPosts: (
	dir: `${string}/`,
	language: "en" | "ja",
) => Entry[] = (dir, language) => {
	const slugs = fs.readdirSync(dir);
	const posts = slugs.map(
		(slug) =>
			[
				language === "en" &&
				fs.existsSync(`${dir.replace("/public/", "/")}en/${slug}`)
					? fs.readFileSync(`${dir.replace("/public/", "/")}en/${slug}`, {
							encoding: "utf8",
						})
					: fs.readFileSync(`${dir}${slug}`, { encoding: "utf8" }),
				slug.replace(".md", "/"),
			] as const,
	);
	return posts
		.map(([post, slug]) => {
			const { attributes } = fm(post);
			return {
				fields: {
					// biome-ignore lint: reason
					...(attributes as any),
					slug,
				},
				sys: {
					// biome-ignore lint: reason
					updatedAt: (attributes as any).updatedAt,
				},
			};
		})
		.sort((l, r) => {
			if (new Date(l.fields.publishedAt) > new Date(r.fields.publishedAt)) {
				return -1;
			}

			return 1;
		});
};

export const getHomeSlug = (target: string) => {
	const ques = target.search(/\?/g);
	const res: HomeSlug = {
		slug: "",
	};
	if (ques === -1) {
		res.slug = target.replace("/", "");
	} else {
		const queries = target.slice(ques + 1).split("&");
		for (const query of queries) {
			if (query.includes("page")) {
				res.page = Number(query.split("=")[1]);
			}
			if (query.includes("tag")) {
				res.tag = query.split("=")[1];
			}
		}

		res.slug = target.replace(/\?.*/g, "").replace("/", "");
	}
	return res;
};
