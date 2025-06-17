import { join } from "node:path";
import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Profile } from "../../../ui/pages/Profile/Profile";
import { GetEducationsUsecase } from "../../application/getEducations/getEducations.usecase";
import { GetWorkExperiencesUsecase } from "../../application/getWorkExperiences/getWorkExperiences.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { AboutMeRepository } from "../../model/about-me/about-me.repository";
import { EducationRepository } from "../../model/education/education.repository";
import { Language } from "../../model/language/language.entity";
import { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";

export const generateProfilePage: GenerateHandler<Context> = async ({
	context,
}) => {
	// Initialize infrastructure and repository
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const workExperienceRepository = new WorkExperienceRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const educationRepository = new EducationRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const aboutMeRepository = new AboutMeRepository(
		join(process.cwd(), "src/profile"),
	);
	const getWorkExperiencesUsecase = new GetWorkExperiencesUsecase(
		workExperienceRepository,
	);
	const getEducationsUsecase = new GetEducationsUsecase(educationRepository);

	// Fetch work experiences
	const workExperiencesResult =
		await getWorkExperiencesUsecase.getWorkExperiences(context.language);

	if (isErr(workExperiencesResult)) {
		throw unwrapErr(workExperiencesResult);
	}

	const workExperiences = unwrapOk(workExperiencesResult);

	// Fetch educations
	const educationsResult = await getEducationsUsecase.getEducations(
		context.language,
	);

	if (isErr(educationsResult)) {
		throw unwrapErr(educationsResult);
	}

	const educations = unwrapOk(educationsResult);

	// Fetch about me
	const aboutMe = await aboutMeRepository.getAboutMe(context.language);

	const rawLanguage = context.language === Language.ja ? "ja" : "en";
	const description =
		context.language === Language.ja
			? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
			: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			title="shinyaigeek.dev"
			path="/profile"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={rawLanguage} page="1" currentPath="/">
				<Profile
					language={context.language}
					workExperiences={workExperiences}
					educations={educations}
					aboutMe={aboutMe}
				/>
			</Layout>
		</Shell>,
	);
};
