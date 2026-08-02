import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import { GetFleetsUsecase } from "../../application/getFleets/getFleets.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { siteBaseUrl } from "../site-metadata";

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

	// Fleets are pages too; they were missing from the sitemap entirely, so
	// nothing but a direct link could lead anyone to them.
	const fleetResults = await new GetFleetsUsecase(
		new FleetRepository(fileIOInfrastructure, filePathInfrastructure),
	).getFleets(context.language);
	const fleets = isErr(fleetResults) ? [] : unwrapOk(fleetResults);

	const language = context.language;
	const baseUrl = siteBaseUrl(language);
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
		{
			loc: `${baseUrl}/activity/`,
			lastmod: currentDate,
			changefreq: "weekly",
			priority: "0.6",
		},
		{
			loc: `${baseUrl}/post/`,
			lastmod: currentDate,
			changefreq: "weekly",
			priority: "0.9",
		},
	];

	// Only list the fleet index where there is something in it.
	const fleetIndexUrls =
		fleets.length > 0
			? [
					{
						loc: `${baseUrl}/fleets/`,
						lastmod: currentDate,
						changefreq: "weekly",
						priority: "0.7",
					},
				]
			: [];

	const blogUrls = blogPosts.map((post) => ({
		// Trailing slash: the pages live at /post/<slug>/, and the sitemap was
		// advertising URLs that redirect.
		loc: `${baseUrl}/post/${post.metadata.path}/`,
		lastmod: currentDate,
		changefreq: "monthly",
		priority: "0.8",
	}));

	const fleetUrls = fleets.map((fleet) => ({
		loc: `${baseUrl}/fleets/${fleet.path}/`,
		lastmod: currentDate,
		changefreq: "monthly",
		priority: "0.6",
	}));

	const allUrls = [...staticUrls, ...fleetIndexUrls, ...blogUrls, ...fleetUrls];

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
