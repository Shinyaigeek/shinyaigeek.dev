import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import type { Language } from "../../model/language/language.entity";
import type { ThirdPartyPublishContent } from "../../model/third-party-publish/third-party-publish.entity";
import { ThirdPartyPublishContentRepository } from "../../model/third-party-publish/third-party-publish.repository";
import { GetBlogPostsUsecase } from "../getBlogPosts/getBlogposts.usecase";

export interface RecentItem {
	title: string;
	description: string;
	publishedAt: string;
	path: string;
	ogp?: string;
	/** Set only for posts published elsewhere, so the card can say where. */
	media?: ThirdPartyPublishContent["media"];
}

/**
 * The articles written here plus the ones published elsewhere, newest first.
 * Both the home page and the post index list exactly this, and used to each
 * build it themselves from the same 40-odd lines.
 */
export const getRecentItems = async (
	language: Language,
): Promise<RecentItem[]> => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();

	const blogPostResults = await new GetBlogPostsUsecase(
		new BlogRepository(fileIOInfrastructure, filePathInfrastructure),
	).getBlogPosts(language);
	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const thirdPartyPublishContentResult =
		await new ThirdPartyPublishContentRepository(
			fileIOInfrastructure,
			filePathInfrastructure,
		).getThirdPartyPublishContents();
	if (isErr(thirdPartyPublishContentResult)) {
		throw unwrapErr(thirdPartyPublishContentResult);
	}

	const blogItems: RecentItem[] = unwrapOk(blogPostResults).map(
		(blogPost) => blogPost.metadata,
	);
	const thirdPartyItems: RecentItem[] = unwrapOk(
		thirdPartyPublishContentResult,
	).map((item) => ({
		title: item.title,
		description: item.description,
		publishedAt: item.publishedAt.toString(),
		path: item.slug.toString(),
		ogp: item.ogp.toString(),
		media: item.media,
	}));

	return [...blogItems, ...thirdPartyItems].sort((l, r) =>
		l.publishedAt < r.publishedAt ? 1 : -1,
	);
};
