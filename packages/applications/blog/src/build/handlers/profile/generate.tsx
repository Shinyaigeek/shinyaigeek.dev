import { join } from "node:path";
import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Profile } from "../../../ui/pages/Profile/Profile";
import { GetEducationsUsecase } from "../../application/getEducations/getEducations.usecase";
import { GetOSSProjectsUsecase } from "../../application/getOSSProjects/getOSSProjects.usecase";
import { GetWorkExperiencesUsecase } from "../../application/getWorkExperiences/getWorkExperiences.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { AboutMeRepository } from "../../model/about-me/about-me.repository";
import { EducationRepository } from "../../model/education/education.repository";
import type { Language } from "../../model/language/language.entity";
import { OSSRepository } from "../../model/oss/oss.repository";
import { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";
import { absoluteAssetUrls } from "../markdown/absolute-asset-urls";
import {
	linkItem,
	markdownHeader,
	markdownSection,
} from "../markdown/document";
import { ossSummary, period, workExperienceSummary } from "../markdown/entries";
import { authorProfiles, siteBaseUrl, siteDescription } from "../site-metadata";
import { profilePageJsonLd } from "../structured-data";

/** Everything the profile shows, which its page and its Markdown both render. */
const loadProfile = async (language: Language) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();

	const workExperiencesResult = await new GetWorkExperiencesUsecase(
		new WorkExperienceRepository(fileIOInfrastructure, filePathInfrastructure),
	).getWorkExperiences(language);
	if (isErr(workExperiencesResult)) {
		throw unwrapErr(workExperiencesResult);
	}

	const educationsResult = await new GetEducationsUsecase(
		new EducationRepository(fileIOInfrastructure, filePathInfrastructure),
	).getEducations(language);
	if (isErr(educationsResult)) {
		throw unwrapErr(educationsResult);
	}

	const ossProjectsResult = await new GetOSSProjectsUsecase(
		new OSSRepository(fileIOInfrastructure, filePathInfrastructure),
	).getOSSProjects(language);
	if (isErr(ossProjectsResult)) {
		throw unwrapErr(ossProjectsResult);
	}

	const aboutMe = await new AboutMeRepository(
		join(process.cwd(), "src/profile"),
	).getAboutMe(language);

	return {
		workExperiences: unwrapOk(workExperiencesResult),
		educations: unwrapOk(educationsResult),
		ossProjects: unwrapOk(ossProjectsResult),
		aboutMe,
	};
};

export const generateProfilePage: GenerateHandler<Context> = async ({
	context,
}) => {
	const profile = await loadProfile(context.language);

	return renderToStaticMarkup(
		<Shell
			language={context.language}
			title="Profile | shinyaigeek.dev"
			// The missing trailing slash here made og:image "/profileogp.png".
			path="/profile/"
			description={siteDescription(context.language)}
			markdown
			jsonLd={profilePageJsonLd(context.language)}
			builtAssets={context.builtAssets}
		>
			<Layout
				language={context.language}
				page="profile"
				currentPath="/profile/"
			>
				<Profile language={context.language} {...profile} />
			</Layout>
		</Shell>,
	);
};

export const generateProfileMarkdown: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const baseUrl = siteBaseUrl(language);
	const { aboutMe, workExperiences, ossProjects, educations } =
		await loadProfile(language);
	const source = (markdown: string) =>
		absoluteAssetUrls(markdown.trim(), baseUrl);

	return (
		markdownHeader({
			title: aboutMe.metadata.name,
			description: siteDescription(language),
			facts: [
				`Occupation: ${aboutMe.metadata.occupation}`,
				`Location: ${aboutMe.metadata.location}`,
				`GitHub: ${authorProfiles.github}`,
				`X: ${authorProfiles.x}`,
				`LinkedIn: ${authorProfiles.linkedin}`,
			],
			source: `${baseUrl}/profile/`,
		}) +
		[
			markdownSection("About me", [source(aboutMe.markdown)]),
			markdownSection(
				"Work experience",
				workExperiences.map(({ metadata, markdown }) =>
					blocks(
						`### ${metadata.company}`,
						workExperienceSummary(metadata, language),
						metadata.technologies?.length &&
							`Technologies: ${metadata.technologies.join(", ")}`,
						source(markdown),
						metadata.entries
							?.map((entry) => linkItem(entry.title, entry.url))
							.join("\n"),
					),
				),
			),
			markdownSection(
				"Open source",
				ossProjects.map(({ metadata, markdown }) =>
					blocks(
						`### [${metadata.name}](${metadata.url})`,
						ossSummary(metadata),
						source(markdown),
						metadata.highlights
							?.map((highlight) => linkItem(highlight.title, highlight.url))
							.join("\n"),
					),
				),
			),
			markdownSection(
				"Education",
				educations.map(({ metadata, markdown }) =>
					blocks(
						`### ${metadata.institution}`,
						[
							metadata.degree,
							metadata.field,
							period(metadata.startDate, metadata.endDate, language),
						]
							.filter(Boolean)
							.join(", "),
						source(markdown),
						metadata.achievements?.map((item) => `- ${item}`).join("\n"),
					),
				),
			),
		].join("\n")
	);
};

/**
 * One profile entry: its parts as paragraphs, with whichever ones the entry's
 * frontmatter leaves out simply absent. It ends with a blank line, so the next
 * entry's heading starts a block of its own.
 */
const blocks = (...parts: (string | 0 | false | undefined)[]) =>
	`${parts.filter(Boolean).join("\n\n")}\n`;
