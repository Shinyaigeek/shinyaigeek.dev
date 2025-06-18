import type { FunctionComponent } from "react";
import type { Education as EducationType } from "../../../build/model/education/education.entity";
import { Language } from "../../../build/model/language/language.entity";
import {
	lists,
	metadataLabel,
	metadataValue,
	technologiesContainer,
	technologyTag,
	title,
} from "./education.module.css";

interface Props {
	language: Language;
	educations: EducationType[];
}

export const Education: FunctionComponent<Props> = ({
	language,
	educations,
}) => {
	const educationTitle = language === Language.ja ? "学歴" : "Education";

	return (
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
	);
};
