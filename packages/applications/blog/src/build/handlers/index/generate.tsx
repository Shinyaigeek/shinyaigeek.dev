import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Home } from "../../../ui/pages/Home/Home";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import { GetOSSProjectsUsecase } from "../../application/getOSSProjects/getOSSProjects.usecase";
import { GetWorkExperiencesUsecase } from "../../application/getWorkExperiences/getWorkExperiences.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { Language } from "../../model/language/language.entity";
import type { OSSProject } from "../../model/oss/oss.entity";
import { OSSRepository } from "../../model/oss/oss.repository";
import { ThirdPartyPublishContentRepository } from "../../model/third-party-publish/third-party-publish.repository";
import type { WorkExperience } from "../../model/work-experience/work-experience.entity";
import { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";

export const generateIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const blogRepository = new BlogRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getblogPostsUsecase = new GetBlogPostsUsecase(blogRepository);
	const language = context.language;

	const blogPostResults = await getblogPostsUsecase.getBlogPosts(language);
	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}
	const blogPosts = unwrapOk(blogPostResults).sort((l, r) => {
		return l.metadata.publishedAt < r.metadata.publishedAt ? 1 : -1;
	});

	const thirdPartyPublishContentRepository =
		new ThirdPartyPublishContentRepository(
			fileIOInfrastructure,
			filePathInfrastructure,
		);

	const thirdPartyPublishContentResult =
		await thirdPartyPublishContentRepository.getThirdPartyPublishContents();
	if (isErr(thirdPartyPublishContentResult)) {
		throw unwrapErr(thirdPartyPublishContentResult);
	}
	const thirdPartyPUblishContent = unwrapOk(
		thirdPartyPublishContentResult,
	).sort((l, r) => {
		return l.publishedAt < r.publishedAt ? 1 : -1;
	});

	const blogItems = blogPosts.map((blogPost) => blogPost.metadata);
	const thirdPartyPublishContentItems = thirdPartyPUblishContent.map(
		(thirdPartyPublishContentItem) => {
			return {
				title: thirdPartyPublishContentItem.title,
				description: thirdPartyPublishContentItem.description,
				publishedAt: thirdPartyPublishContentItem.publishedAt.toString(),
				path: thirdPartyPublishContentItem.slug.toString(),
				ogp: thirdPartyPublishContentItem.ogp.toString(),
				media: thirdPartyPublishContentItem.media,
			};
		},
	);

	const items = [...blogItems, ...thirdPartyPublishContentItems].sort(
		(l, r) => {
			return l.publishedAt < r.publishedAt ? 1 : -1;
		},
	);

	// Experience and OSS also drive the profile page; the home page shows the
	// most recent slice of each so a first-time visitor sees them without
	// having to navigate. Already sorted (ongoing roles first) by the repository.
	const workExperienceRepository = new WorkExperienceRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const ossRepository = new OSSRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const workExperiencesResult = await new GetWorkExperiencesUsecase(
		workExperienceRepository,
	).getWorkExperiences(language);
	if (isErr(workExperiencesResult)) {
		throw unwrapErr(workExperiencesResult);
	}
	const workExperiences: WorkExperience[] = unwrapOk(workExperiencesResult);

	const ossProjectsResult = await new GetOSSProjectsUsecase(
		ossRepository,
	).getOSSProjects(language);
	if (isErr(ossProjectsResult)) {
		throw unwrapErr(ossProjectsResult);
	}
	const ossProjects: OSSProject[] = unwrapOk(ossProjectsResult);

	const rawLanguage = language === Language.ja ? "ja" : "en";
	const description =
		language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			title="shinyaigeek.dev"
			path="/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Home
					language={rawLanguage}
					items={items}
					workExperiences={workExperiences}
					ossProjects={ossProjects}
				/>
			</Layout>
		</Shell>,
	);
};
