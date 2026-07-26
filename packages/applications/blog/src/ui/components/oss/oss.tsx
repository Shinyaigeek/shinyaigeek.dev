import type { FunctionComponent } from "react";
import { Language } from "../../../build/model/language/language.entity";
import type { OSSProject } from "../../../build/model/oss/oss.entity";
import {
	badge,
	badgeContributor,
	badgeCreator,
	heading,
	highlightItem,
	highlightLink,
	highlightsLabel,
	highlightsList,
	lists,
	metaRow,
	metaValue,
	repoLink,
	technologiesContainer,
	technologyTag,
	title,
} from "./oss.module.css";

interface Props {
	language: Language;
	ossProjects: OSSProject[];
}

export const OSS: FunctionComponent<Props> = ({ language, ossProjects }) => {
	const isJa = language === Language.ja;
	const sectionTitle = isJa ? "OSS" : "Open Source";
	const highlightsTitle = isJa ? "主な貢献" : "Highlights";
	const creatorLabel = isJa ? "作者" : "Creator";
	const contributorLabel = isJa ? "貢献" : "Contributor";

	return (
		<div className="history--oss element">
			<div className={title}>{sectionTitle}</div>
			<ul className={lists}>
				{ossProjects.map((project) => (
					<li key={project.slug}>
						<h3 className={heading}>
							<a
								href={project.metadata.url}
								className={repoLink}
								target="_blank"
								rel="noreferrer"
							>
								{project.metadata.name}
							</a>
							<span
								className={`${badge} ${
									project.metadata.kind === "creator"
										? badgeCreator
										: badgeContributor
								}`}
							>
								{project.metadata.kind === "creator"
									? creatorLabel
									: contributorLabel}
							</span>
						</h3>
						<p className={metaRow}>
							{typeof project.metadata.stars === "number" && (
								<span className={metaValue}>
									★ {project.metadata.stars.toLocaleString("en-US")}
								</span>
							)}
							{project.metadata.language && (
								<span className={metaValue}>{project.metadata.language}</span>
							)}
						</p>
						{project.metadata.technologies && (
							<p className={technologiesContainer}>
								{project.metadata.technologies.map((tech) => (
									<span key={tech} className={technologyTag}>
										{tech}
									</span>
								))}
							</p>
						)}
						{/* The markdown is authored in this repo, rendered at build time. */}
						<div dangerouslySetInnerHTML={{ __html: project.body }} />
						{project.metadata.highlights &&
							project.metadata.highlights.length > 0 && (
								<div>
									<span className={highlightsLabel}>{highlightsTitle}</span>
									<ul className={highlightsList}>
										{project.metadata.highlights.map((highlight) => (
											<li key={highlight.url} className={highlightItem}>
												<a
													href={highlight.url}
													className={highlightLink}
													target="_blank"
													rel="noreferrer"
												>
													{highlight.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}
					</li>
				))}
			</ul>
		</div>
	);
};
