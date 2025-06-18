import type { FunctionComponent } from "react";
import { Language } from "../../../build/model/language/language.entity";
import type { WorkExperience as WorkExperienceType } from "../../../build/model/work-experience/work-experience.entity";
import {
	entriesList,
	entryItem,
	entryLink,
	lists,
	metadataLabel,
	metadataValue,
	technologiesContainer,
	technologyTag,
	title,
} from "./work-experience.module.css";

interface Props {
	language: Language;
	workExperiences: WorkExperienceType[];
}

export const WorkExperience: FunctionComponent<Props> = ({
	language,
	workExperiences,
}) => {
	const workExperienceTitle =
		language === Language.ja ? "職歴" : "Working Experience";

	return (
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
	);
};
