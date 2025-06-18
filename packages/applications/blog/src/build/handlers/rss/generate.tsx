import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";

export const generateRssPage: GenerateHandler<Context> = async ({
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

	// Sort by publishedAt date in descending order
	const sortedPosts = blogPosts.sort((a, b) => {
		const dateA = new Date(a.metadata.publishedAt.replace(/\//g, "-"));
		const dateB = new Date(b.metadata.publishedAt.replace(/\//g, "-"));
		return dateB.getTime() - dateA.getTime();
	});

	const language = context.language === Language.ja ? "ja" : "en";
	const baseUrl = `https://${language}.shinyaigeek.dev`;
	const rssUrl = `${baseUrl}/rss.xml`;
	const siteUrl = `${baseUrl}/`;

	const description =
		language === "ja"
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "A blog by a web enthusiast. Mainly about web development insights and knowledge.";

	const items = sortedPosts
		.map((post) => {
			const postUrl = `${baseUrl}/post/${post.metadata.path}`;
			return `
				<item>
					<title>${post.metadata.title} | shinyaigeek.dev</title>
					<link>${postUrl}</link>
					<description><![CDATA[${post.metadata.description}]]></description>
					<guid>${postUrl}</guid>
					<pubDate>${new Date(
						post.metadata.publishedAt.replace(/\//g, "-"),
					).toUTCString()}</pubDate>
				</item>`;
		})
		.join("");

	const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
		<title>shinyaigeek.dev</title>
		<link>${siteUrl}</link>
		<description>${description}</description>
		<language>${language}</language>
		<copyright>(C) Shinyaigeek All Rights Reserved.</copyright>
		<managingEditor>me@shinyaigeek.dev (Shinobu Hayashi)</managingEditor>
		<webMaster>me@shinyaigeek.dev (Shinobu Hayashi)</webMaster>
		<image>
			<url>https://shinyaigeek.dev/assets/static/icon.png</url>
			<title>shinyaigeek.dev</title>
			<link>${siteUrl}</link>
			<width>32</width>
			<height>32</height>
		</image>
		${items}
	</channel>
</rss>`;

	return rssContent;
};
