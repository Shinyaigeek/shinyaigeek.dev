import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Home } from "../../../ui/pages/Home/Home";
import { GetOSSProjectsUsecase } from "../../application/getOSSProjects/getOSSProjects.usecase";
import { getRecentItems } from "../../application/getRecentItems/getRecentItems";
import { GetWorkExperiencesUsecase } from "../../application/getWorkExperiences/getWorkExperiences.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { Language } from "../../model/language/language.entity";
import type { OSSProject } from "../../model/oss/oss.entity";
import { OSSRepository } from "../../model/oss/oss.repository";
import type { WorkExperience } from "../../model/work-experience/work-experience.entity";
import { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";

export const generateIndexPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const items = await getRecentItems(language);

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
	const workExperiences: WorkExperience[] = unwrapOk(workExperiencesResult);

	const ossProjectsResult = await new GetOSSProjectsUsecase(
		new OSSRepository(fileIOInfrastructure, filePathInfrastructure),
	).getOSSProjects(language);
	if (isErr(ossProjectsResult)) {
		throw unwrapErr(ossProjectsResult);
	}
	const ossProjects: OSSProject[] = unwrapOk(ossProjectsResult);

	const description =
		language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={language}
			title="shinyaigeek.dev"
			path="/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={language} page="home" currentPath="/">
				<Home
					language={language}
					items={items}
					workExperiences={workExperiences}
					ossProjects={ossProjects}
				/>
			</Layout>
		</Shell>,
	);
};
