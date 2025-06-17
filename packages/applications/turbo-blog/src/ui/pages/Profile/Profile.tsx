import type { FunctionComponent } from "react";
import type { AboutMe as AboutMeType } from "../../../build/model/about-me/about-me.entity";
import type { Education } from "../../../build/model/education/education.entity";
import { Language } from "../../../build/model/language/language.entity";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { AboutMe } from "../../components/about-me/about-me";
import { Divider } from "../../components/divider/divider";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import {
	entriesList,
	entryItem,
	entryLink,
	lists,
	metadataLabel,
	metadataValue,
	profile,
	technologiesContainer,
	technologyTag,
	title,
} from "./Profile.module.css";
import { Card } from "./components/Card/Card";

interface Props {
	language: Language;
	workExperiences: WorkExperience[];
	educations: Education[];
	aboutMe: AboutMeType;
}

export const Profile: FunctionComponent<Props> = ({
	language,
	workExperiences,
	educations,
	aboutMe,
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
					<AboutMe body={aboutMe.body} />
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
									<p>
										<span className={metadataLabel}>Role</span>
										<span className={metadataValue}>
											{experience.metadata.role}
										</span>
									</p>
								)}
								{experience.metadata.position && (
									<p>
										<span className={metadataLabel}>Position</span>
										<span className={metadataValue}>
											{experience.metadata.position}
										</span>
									</p>
								)}
								{experience.metadata.technologies && (
									<p>
										<span className={metadataLabel}>Technologies</span>
										<span className={technologiesContainer}>
											{experience.metadata.technologies.map((tech) => (
												<span key={tech} className={technologyTag}>
													{tech}
												</span>
											))}
										</span>
									</p>
								)}
								{experience.metadata.entries && (
									<div>
										<span className={metadataLabel}>Related Work</span>
										<ul className={entriesList}>
											{experience.metadata.entries.map((entry) => (
												<li key={entry.url} className={entryItem}>
													<a href={entry.url} className={entryLink}>
														{entry.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								)}
								<details>
									<summary>detail</summary>
									{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
									<div dangerouslySetInnerHTML={{ __html: experience.body }} />
								</details>
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
									<p>
										<span className={metadataLabel}>Degree</span>
										<span className={metadataValue}>
											{education.metadata.degree}
										</span>
									</p>
								)}
								{education.metadata.field && (
									<p>
										<span className={metadataLabel}>Field</span>
										<span className={metadataValue}>
											{education.metadata.field}
										</span>
									</p>
								)}
								{education.metadata.description && (
									<p>
										<span className={metadataLabel}>Description</span>
										<span className={metadataValue}>
											{education.metadata.description}
										</span>
									</p>
								)}
								{education.metadata.achievements && (
									<p>
										<span className={metadataLabel}>Achievements</span>
										<span className={technologiesContainer}>
											{education.metadata.achievements.map((achievement) => (
												<span key={achievement} className={technologyTag}>
													{achievement}
												</span>
											))}
										</span>
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
