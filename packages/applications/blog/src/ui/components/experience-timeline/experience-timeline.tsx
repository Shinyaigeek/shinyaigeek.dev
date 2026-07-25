import type { FunctionComponent } from "react";
import type { WorkExperience } from "../../../build/model/work-experience/work-experience.entity";
import {
	body,
	company,
	companyRow,
	currentBadge,
	entries,
	entryItem,
	item,
	list,
	period,
	position as positionClass,
	role as roleClass,
	technologies,
	technology,
} from "./experience-timeline.module.css";

interface Props {
	language: "ja" | "en";
	workExperiences: WorkExperience[];
	/** Show related links (talks, articles) under each role. */
	showEntries?: boolean;
}

const COPY = {
	ja: { present: "現在", current: "在籍中" },
	en: { present: "Present", current: "Current" },
} as const;

export const ExperienceTimeline: FunctionComponent<Props> = ({
	language,
	workExperiences,
	showEntries = true,
}) => {
	const copy = COPY[language];

	return (
		<ul className={list}>
			{workExperiences.map((experience) => {
				const { metadata } = experience;
				const isCurrent = !metadata.endDate;

				return (
					<li key={experience.slug} className={item}>
						<div className={period}>
							<time dateTime={metadata.startDate}>{metadata.startDate}</time>
							{" – "}
							{metadata.endDate ? (
								<time dateTime={metadata.endDate}>{metadata.endDate}</time>
							) : (
								copy.present
							)}
						</div>

						<div className={body}>
							<div className={companyRow}>
								<h3 className={company}>{metadata.company}</h3>
								{isCurrent && (
									<span className={currentBadge}>{copy.current}</span>
								)}
							</div>

							{(metadata.role || metadata.position) && (
								<p className={roleClass}>
									{metadata.role}
									{metadata.role && metadata.position && " · "}
									{metadata.position && (
										<span className={positionClass}>{metadata.position}</span>
									)}
								</p>
							)}

							{metadata.technologies && metadata.technologies.length > 0 && (
								<ul className={technologies}>
									{metadata.technologies.map((tech) => (
										<li key={tech} className={technology}>
											{tech}
										</li>
									))}
								</ul>
							)}

							{showEntries &&
								metadata.entries &&
								metadata.entries.length > 0 && (
									<ul className={entries}>
										{metadata.entries.map((entry) => (
											<li key={entry.url} className={entryItem}>
												<a
													href={entry.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{entry.title}
												</a>
											</li>
										))}
									</ul>
								)}
						</div>
					</li>
				);
			})}
		</ul>
	);
};
