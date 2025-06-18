import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";

export const generateSitemapPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const blogPostsUsecase = new GetBlogPostsUsecase(blogRepository);

	const blogPostResults = await blogPostsUsecase.getBlogPosts(context.language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const blogPosts = unwrapOk(blogPostResults);

	const language = context.language === Language.ja ? "ja" : "en";
	const baseUrl = `https://${language}.shinyaigeek.dev`;
	const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

	const staticUrls = [
		{
			loc: `${baseUrl}/`,
			lastmod: currentDate,
			changefreq: "monthly",
			priority: "1.0",
		},
		{
			loc: `${baseUrl}/profile/`,
			lastmod: currentDate,
			changefreq: "monthly",
			priority: "0.8",
		},
	];

	const blogUrls = blogPosts.map((post) => ({
		loc: `${baseUrl}/post/${post.metadata.path}`,
		lastmod: currentDate,
		changefreq: "monthly",
		priority: "0.8",
	}));

	const allUrls = [...staticUrls, ...blogUrls];

	const urlElements = allUrls
		.map(
			(url) => `
	<url>
		<loc>${url.loc}</loc>
		<lastmod>${url.lastmod}</lastmod>
		<changefreq>${url.changefreq}</changefreq>
		<priority>${url.priority}</priority>
	</url>`,
		)
		.join("");

	const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
${urlElements}
</urlset>`;

	return sitemapContent;
};
