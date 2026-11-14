import type { RecentItem } from "../../application/getRecentItems/getRecentItems";
import { Language } from "../../model/language/language.entity";
import type { OSSProject } from "../../model/oss/oss.entity";
import type { WorkExperience } from "../../model/work-experience/work-experience.entity";
import { linkItem } from "./document";

// The entries more than one page's Markdown lists: the home page shows a slice
// of what the post index and the profile show in full.

/**
 * An article written here links to its Markdown, the way llms.txt does. One
 * published elsewhere has no Markdown of ours, so it links to where it is.
 */
export const recentItemEntry = (item: RecentItem, baseUrl: string) =>
	item.media
		? linkItem(
				item.title,
				item.path,
				[item.publishedAt, item.media, item.description]
					.filter(Boolean)
					.join(" · "),
			)
		: linkItem(
				item.title,
				`${baseUrl}/post/${item.path}/index.md`,
				[item.publishedAt, item.description].filter(Boolean).join(" · "),
			);

export const period = (
	start: string,
	end: string | undefined,
	language: Language,
) => `${start} – ${end ?? (language === Language.ja ? "現在" : "Present")}`;

export const workExperienceSummary = (
	metadata: WorkExperience["metadata"],
	language: Language,
) =>
	[
		metadata.role,
		metadata.position,
		period(metadata.startDate, metadata.endDate, language),
	]
		.filter(Boolean)
		.join(", ");

export const workExperienceLine = (
	{ metadata }: WorkExperience,
	language: Language,
) => `- **${metadata.company}**: ${workExperienceSummary(metadata, language)}`;

export const ossSummary = (metadata: OSSProject["metadata"]) =>
	[metadata.kind, metadata.language].filter(Boolean).join(", ");

export const ossEntry = ({ metadata }: OSSProject) =>
	linkItem(metadata.name, metadata.url, ossSummary(metadata));
