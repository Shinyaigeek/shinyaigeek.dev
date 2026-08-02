import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { GetBlogPostsUsecase } from "../../../application/getBlogPosts/getBlogposts.usecase";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../../model/blog/blog.repository";
import { Language } from "../../../model/language/language.entity";
import { languagePrefix } from "../../site-path";

/**
 * What an article's Markdown hangs off its own path as.
 *
 * "index.md" rather than "<slug>.md" because an article is a directory --
 * the page itself is the index.html in it -- so this is the same file name in
 * the other format, and it needs no separate rule in h2o to be served.
 *
 * Exported because the handler has to strip it back off the route to get at the
 * article, and a literal in each place is two chances to disagree.
 */
export const MARKDOWN_SUFFIX = "/index.md";

/**
 * A route for every article in a language.
 *
 * `suffix` is whatever hangs off the article's own path -- nothing for the page
 * itself, "/ogp.png" for its OG image, "/index.md" for its Markdown -- so those
 * route sets stay derived from one list instead of copies that can drift apart.
 */
export const blogChildren = async (
	language: Language,
	suffix: "" | "/ogp.png" | typeof MARKDOWN_SUFFIX,
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

export const getJapaneseBlogMarkdownChildren = () =>
	blogChildren(Language.ja, MARKDOWN_SUFFIX);

export const getEnglishBlogMarkdownChildren = () =>
	blogChildren(Language.en, MARKDOWN_SUFFIX);
