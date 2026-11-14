import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { EXPERIENCE_COUNT, Home, OSS_COUNT } from "../../../ui/pages/Home/Home";
import { GetOSSProjectsUsecase } from "../../application/getOSSProjects/getOSSProjects.usecase";
import { getRecentItems } from "../../application/getRecentItems/getRecentItems";
import { GetWorkExperiencesUsecase } from "../../application/getWorkExperiences/getWorkExperiences.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { Language } from "../../model/language/language.entity";
import { OSSRepository } from "../../model/oss/oss.repository";
import { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";
import {
	linkItem,
	markdownHeader,
	markdownSection,
} from "../markdown/document";
import {
	ossEntry,
	recentItemEntry,
	workExperienceLine,
} from "../markdown/entries";
import { siteBaseUrl, siteDescription } from "../site-metadata";
import { homeJsonLd } from "../structured-data";

const loadHome = async (language: Language) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();

	// Experience and OSS also drive the profile page; the home page shows the
	// most recent slice of each so a first-time visitor sees them without
	// having to navigate. Already sorted (ongoing roles first) by the repository.
	const workExperiencesResult = await new GetWorkExperiencesUsecase(
		new WorkExperienceRepository(fileIOInfrastructure, filePathInfrastructure),
	).getWorkExperiences(language);
	if (isErr(workExperiencesResult)) {
		throw unwrapErr(workExperiencesResult);
	}

	const ossProjectsResult = await new GetOSSProjectsUsecase(
		new OSSRepository(fileIOInfrastructure, filePathInfrastructure),
	).getOSSProjects(language);
	if (isErr(ossProjectsResult)) {
		throw unwrapErr(ossProjectsResult);
	}

	return {
		items: await getRecentItems(language),
		workExperiences: unwrapOk(workExperiencesResult),
		ossProjects: unwrapOk(ossProjectsResult),
	};
};

export const generateIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const home = await loadHome(language);

	return renderToStaticMarkup(
		<Shell
			language={language}
			title="shinyaigeek.dev"
			path="/"
			description={siteDescription(language)}
			markdown
			jsonLd={homeJsonLd(language)}
			builtAssets={context.builtAssets}
		>
			<Layout language={language} page="home" currentPath="/">
				<Home language={language} {...home} />
			</Layout>
		</Shell>,
	);
};

export const generateIndexMarkdown: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const baseUrl = siteBaseUrl(language);
	const japanese = language === Language.ja;
	const { items, workExperiences, ossProjects } = await loadHome(language);

	return (
		markdownHeader({
			title: "shinyaigeek.dev",
			description: siteDescription(language),
			source: `${baseUrl}/`,
		}) +
		[
			// The header's navigation, which on the page is how a reader gets to the
			// rest of the site.
			markdownSection("Pages", [
				linkItem(
					japanese ? "プロフィール" : "Profile",
					`${baseUrl}/profile/index.md`,
				),
				linkItem(japanese ? "記事一覧" : "Posts", `${baseUrl}/post/index.md`),
				linkItem("Fleets", `${baseUrl}/fleets/index.md`),
				linkItem(
					japanese ? "アクティビティ" : "Activity",
					`${baseUrl}/activity/index.md`,
				),
			]),
			markdownSection(
				"Experience",
				workExperiences
					.slice(0, EXPERIENCE_COUNT)
					.map((experience) => workExperienceLine(experience, language)),
			),
			markdownSection(
				"Open source",
				ossProjects.slice(0, OSS_COUNT).map(ossEntry),
			),
			markdownSection(
				"Writing",
				items.map((item) => recentItemEntry(item, baseUrl)),
			),
		].join("\n")
	);
};
