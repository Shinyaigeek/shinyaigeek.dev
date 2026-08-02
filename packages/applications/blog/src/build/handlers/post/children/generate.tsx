import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../../ui/components/Layout/Layout";
import { Shell } from "../../../../ui/components/Shell/shell";
import { Post } from "../../../../ui/pages/Post/Post";
import { GetBlogPostUsecase } from "../../../application/getBlogPost/getBlogPost.usecase";
import type { Context } from "../../../context/context";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../../model/blog/blog.repository";
import { sitePath } from "../../site-path";

export const generateBlogPostPage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getblogPostsUsecase = new GetBlogPostUsecase(blogRepository);
	const language = context.language;
	// The route carries the "/en" prefix; the article underneath it does not.
	const articlePath = sitePath(path);
	const blogPostResults = await getblogPostsUsecase.getBlogPost(
		articlePath,
		language,
	);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	const blogPost = unwrapOk(blogPostResults);

	return renderToStaticMarkup(
		<Shell
			language={language}
			title={`${blogPost.metadata.title} - shinyaigeek.dev`}
			path={`${articlePath}/`}
			description={blogPost.metadata.description}
			// The articles are the only pages with a Markdown counterpart, and
			// this is what points a reader at it without going through llms.txt.
			markdown
			builtAssets={context.builtAssets}
		>
			{/* currentPath drives the language switcher, so it has to be this
			    article rather than "/" -- otherwise switching language from an
			    article dropped the reader on the other language's home page. */}
			<Layout language={language} page="post" currentPath={`${articlePath}/`}>
				<Post
					title={blogPost.metadata.title}
					tags={blogPost.metadata.tags}
					publishedAt={blogPost.metadata.publishedAt}
					content={blogPost.content}
					anchors={blogPost.metadata.headings ?? []}
				/>
			</Layout>
		</Shell>,
	);
};
