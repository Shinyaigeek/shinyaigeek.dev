import type { FunctionComponent } from "react";
import type { Education } from "../../../build/model/education/education.entity";
import { Language } from "../../../build/model/language/language.entity";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { AboutMe } from "../../components/about-me/about-me";
import { Divider } from "../../components/divider/divider";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import { lists, profile, title } from "./Profile.module.css";
import { Card } from "./components/Card/Card";

interface Props {
	language: Language;
	workExperiences: WorkExperience[];
	educations: Education[];
}

export const Profile: FunctionComponent<Props> = ({
	language,
	workExperiences,
	educations,
}) => {
	const educationTitle = language === Language.ja ? "学歴" : "Education";

	const workExperienceTitle =
		language === Language.ja ? "職歴" : "Working Experience";

	return (
		<div className={profile}>
			<div>
				<ShinyaigeekPortrait />

				<ShinyaigeekCoreProfile />

				<Divider />

				<div className="description">
					<div className={title}>About Me</div>
					<AboutMe />
				</div>

				<Divider />

				<div className="history--job element">
					<div className={title}>{workExperienceTitle}</div>
					<ul className={lists}>
						{workExperiences.map((experience) => (
							<li key={experience.slug}>
								<h3>{experience.metadata.company}</h3>
								<p>
									<time dateTime={experience.metadata.startDate}>
										{experience.metadata.startDate}
									</time>{" "}
									~{" "}
									{experience.metadata.endDate ? (
										<time dateTime={experience.metadata.endDate}>
											{experience.metadata.endDate}
										</time>
									) : (
										"Present"
									)}
								</p>
								{experience.metadata.role && (
									<p>Role: {experience.metadata.role}</p>
								)}
								{experience.metadata.position && (
									<p>Position: {experience.metadata.position}</p>
								)}
								{experience.metadata.technologies && (
									<p>
										Technologies: #{experience.metadata.technologies.join(" #")}
									</p>
								)}
								<details>
									<summary>detail</summary>
									{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
									<div dangerouslySetInnerHTML={{ __html: experience.body }} />
								</details>
								{experience.metadata.entries && (
									<ul>
										{experience.metadata.entries.map((entry) => (
											<li key={entry.url}>
												<a href={entry.url}>{entry.title}</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>

				<Divider />

				<div className="history--study element">
					<div className={title}>{educationTitle}</div>
					<ul className={lists}>
						{educations.map((education) => (
							<li key={education.slug}>
								<h3>{education.metadata.institution}</h3>
								<p>
									<time dateTime={education.metadata.startDate}>
										{education.metadata.startDate}
									</time>{" "}
									~{" "}
									{education.metadata.endDate ? (
										<time dateTime={education.metadata.endDate}>
											{education.metadata.endDate}
										</time>
									) : (
										"Present"
									)}
								</p>
								{education.metadata.degree && (
									<p>Degree: {education.metadata.degree}</p>
								)}
								{education.metadata.field && (
									<p>Field: {education.metadata.field}</p>
								)}
								{education.metadata.description && (
									<p>Description: {education.metadata.description}</p>
								)}
								{education.metadata.achievements && (
									<p>
										Achievements: #{education.metadata.achievements.join(" #")}
									</p>
								)}
								<details>
									<summary>detail</summary>
									{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
									<div dangerouslySetInnerHTML={{ __html: education.body }} />
								</details>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
