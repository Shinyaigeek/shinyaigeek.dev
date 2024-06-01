import fs from "node:fs/promises";
import nodePath from "node:path";
import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Post } from "../../../ui/pages/Post/Post";
import { GetBlogPostUsecase } from "../../application/getBlogPost/getBlogPost.usecase";
import type { Context } from "../../context/context";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";
import { Shell } from "../../util/helmet";

export const generateBlogPostPage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const blogRepository = new BlogRepository(fs, nodePath);
	const getblogPostsUsecase = new GetBlogPostUsecase(blogRepository);
	const language = context.language;
	const blogPostResults = await getblogPostsUsecase.getBlogPost(path, language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const blogPost = unwrapOk(blogPostResults);

	const rawLanguage = language === Language.ja ? "ja" : "en";

	return renderToStaticMarkup(
		<Shell language={rawLanguage} which="TODO" title="shinyaigeek.dev" slug="/">
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Post
					title={blogPost.metadata.title}
					tags={blogPost.metadata.tags}
					publishedAt={blogPost.metadata.publishedAt}
					content={blogPost.content}
					anchors={[]}
				/>
			</Layout>
		</Shell>,
	);
};
