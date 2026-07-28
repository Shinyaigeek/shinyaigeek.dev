import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { GetBlogPostsUsecase } from "../../../application/getBlogPosts/getBlogposts.usecase";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../../model/blog/blog.repository";
import { Language } from "../../../model/language/language.entity";
import { languagePrefix } from "../../site-path";

/**
 * A route for every article in a language.
 *
 * `suffix` is whatever hangs off the article's own path -- nothing for the page
 * itself, "/ogp.png" for its OG image -- so the page routes and the image routes
 * stay derived from one list instead of two copies that can drift apart.
 */
export const blogChildren = async (
	language: Language,
	suffix: "" | "/ogp.png",
): Promise<string[]> => {
	const blogPostsUsecase = new GetBlogPostsUsecase(
		new BlogRepository(
			new NodeFileIOInfrastructure(),
			new NodeFilePathImplementation(),
		),
	);

	const blogPostResults = await blogPostsUsecase.getBlogPosts(language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const prefix = languagePrefix(language);

	return unwrapOk(blogPostResults).map(
		(blogPost) => `${prefix}/post/${blogPost.metadata.path}${suffix}`,
	);
};

export const getJapaneseBlogChildren = () => blogChildren(Language.ja, "");

export const getEnglishBlogChildren = () => blogChildren(Language.en, "");
