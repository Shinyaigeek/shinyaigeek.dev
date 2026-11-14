import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostUsecase } from "../../../../application/getBlogPost/getBlogPost.usecase";
import type { Context } from "../../../../context/context";
import { NodeFileIOInfrastructure } from "../../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../../infrastructure/file-path/node-file-path";
import type { BlogContent } from "../../../../model/blog/blog.entity";
import { BlogRepository } from "../../../../model/blog/blog.repository";
import type { Language } from "../../../../model/language/language.entity";
import { siteBaseUrl } from "../../../site-metadata";
import { sitePath } from "../../../site-path";
import { MARKDOWN_SUFFIX } from "../../getBlogChildren/getBlogChildren";
import { absoluteAssetUrls } from "../../../markdown/absolute-asset-urls";
import { markdownHeader } from "../../../markdown/document";

/**
 * An article as Markdown, at <its path>index.md.
 *
 * This is the same article the HTML page renders, served in the form an LLM
 * would rather have it in: no navigation, no syntax highlighting markup, no
 * table wrappers. llms.txt links here rather than to the page for that reason.
 *
 * The frontmatter does not come along -- it is an implementation detail of how
 * the articles are stored, and half its keys (path, headings) are derived
 * rather than written. What a reader actually wants out of it is restated as a
 * heading and a short block of prose above the body.
 */
export const generateBlogPostMarkdown: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const blogRepository = new BlogRepository(
		new NodeFileIOInfrastructure(),
		new NodeFilePathImplementation(),
	);
	const language = context.language;
	// The route is "/en/post/<slug>/index.md" at most; the article underneath it
	// is "/post/<slug>".
	const articlePath = sitePath(path).slice(0, -MARKDOWN_SUFFIX.length);

	const blogPostResult = await new GetBlogPostUsecase(
		blogRepository,
	).getBlogPost(articlePath, language);

	if (isErr(blogPostResult)) {
		throw unwrapErr(blogPostResult);
	}

	return blogPostMarkdown(unwrapOk(blogPostResult), language);
};

/**
 * The Markdown itself, apart from the route: llms-full.txt is every article's
 * Markdown laid end to end, and is built from this too.
 */
export const blogPostMarkdown = (blogPost: BlogContent, language: Language) => {
	const { metadata } = blogPost;
	const baseUrl = siteBaseUrl(language);

	const header = markdownHeader({
		title: metadata.title,
		// Not truncated the way a list entry is: there, a long description
		// buries the entries around it, and here it is the only one on the page.
		description: metadata.description,
		facts: [
			`Published: ${metadata.publishedAt}`,
			`Updated: ${metadata.updatedAt}`,
			...(metadata.tags.length > 0
				? [`Tags: ${metadata.tags.join(", ")}`]
				: []),
		],
		source: `${baseUrl}/post/${metadata.path}/`,
	});

	return header + absoluteAssetUrls(blogPost.markdown, baseUrl);
};
