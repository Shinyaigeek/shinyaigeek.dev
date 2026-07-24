import type { FunctionComponent } from "react";
import type { AboutMe as AboutMeType } from "../../../build/model/about-me/about-me.entity";
import type { Education } from "../../../build/model/education/education.entity";
import { Language } from "../../../build/model/language/language.entity";
import type { OSSProject } from "../../../build/model/oss/oss.entity";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { AboutMe } from "../../components/about-me/about-me";
import { AlterEgo } from "../../components/alter-ego/alter-ego";
import { Divider } from "../../components/divider/divider";
import { Education as EducationComponent } from "../../components/education/education";
import { OSS as OSSComponent } from "../../components/oss/oss";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import { WorkExperience as WorkExperienceComponent } from "../../components/work-experience/work-experience";
import { description, profile, title } from "./Profile.module.css";

interface Props {
	language: Language;
	workExperiences: WorkExperience[];
	educations: Education[];
	ossProjects: OSSProject[];
	aboutMe: AboutMeType;
}

export const Profile: FunctionComponent<Props> = ({
	language,
	workExperiences,
	educations,
	ossProjects,
	aboutMe,
}) => {
	return (
		<div className={profile}>
			<div>
				<ShinyaigeekPortrait />

				<ShinyaigeekCoreProfile />

				<Divider />

				<div className={description}>
					<div className={title}>About Me</div>
					<AboutMe body={aboutMe.body} />
				</div>

				<Divider />

				<AlterEgo language={language === Language.ja ? "ja" : "en"} />

				<Divider />

				<WorkExperienceComponent
					language={language}
					workExperiences={workExperiences}
				/>

				<Divider />

				<OSSComponent language={language} ossProjects={ossProjects} />

				<Divider />

				<EducationComponent language={language} educations={educations} />
			</div>
		</div>
	);
};
