import type { FunctionComponent } from "react";
import type { OSSProject } from "../../../build/model/oss/oss.entity";
import {
	badge,
	badgeContributor,
	badgeCreator,
	card,
	grid,
	head,
	meta,
	name,
	summary,
} from "./oss-highlights.module.css";

interface Props {
	language: "ja" | "en";
	ossProjects: OSSProject[];
}

const COPY = {
	ja: { creator: "作者", contributor: "貢献" },
	en: { creator: "Creator", contributor: "Contributor" },
} as const;

/**
 * `body` is already-rendered markdown HTML; the card only needs the opening
 * sentence or two as plain text, so tags are stripped rather than injected.
 */
const toPlainText = (html: string): string =>
	html
		.replace(/<[^>]*>/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim();

export const OSSHighlights: FunctionComponent<Props> = ({
	language,
	ossProjects,
}) => {
	const copy = COPY[language];

	return (
		<ul className={grid}>
			{ossProjects.map((project) => {
				const { metadata } = project;
				const isCreator = metadata.kind === "creator";
				const description = toPlainText(project.body);

				return (
					<li key={project.slug} className={card}>
						<div className={head}>
							<h3 className={name}>
								<a
									href={metadata.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{metadata.name}
								</a>
							</h3>
							<span
								className={`${badge} ${
									isCreator ? badgeCreator : badgeContributor
								}`}
							>
								{isCreator ? copy.creator : copy.contributor}
							</span>
						</div>

						{(typeof metadata.stars === "number" || metadata.language) && (
							<p className={meta}>
								{typeof metadata.stars === "number" && (
									<span>★ {metadata.stars.toLocaleString("en-US")}</span>
								)}
								{metadata.language && <span>{metadata.language}</span>}
							</p>
						)}

						{description && <p className={summary}>{description}</p>}
					</li>
				);
			})}
		</ul>
	);
};
