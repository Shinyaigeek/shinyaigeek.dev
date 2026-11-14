import { oneLine } from "../one-line";

/**
 * The block every page's Markdown opens with: the title, the description as a
 * blockquote, then a list of facts about the page.
 *
 * `source` is the HTML page the Markdown stands in for. It goes last in the
 * list on every page, so a reader that was handed only the .md can always find
 * its way back.
 */
export const markdownHeader = ({
	title,
	description,
	facts = [],
	source,
}: {
	title: string;
	description: string;
	facts?: string[];
	source: string;
}) =>
	[
		`# ${oneLine(title)}`,
		"",
		`> ${oneLine(description)}`,
		"",
		...facts.map((fact) => `- ${fact}`),
		`- Source: ${source}`,
		"",
		"",
	].join("\n");

/**
 * An H2 section.
 *
 * It ends with a blank line. Without one, a section's last list item and the
 * next "## ..." are adjacent lines -- which CommonMark does read as a heading,
 * but nothing looser has to, and these files exist to be read by things whose
 * Markdown is approximate.
 */
export const markdownSection = (heading: string, lines: string[]) =>
	`${[`## ${heading}`, "", ...lines].join("\n")}\n`;

/**
 * One entry of a list of links, `- [name](url): notes`, the shape llms.txt's
 * spec gives for them and which the index pages' Markdown reuses.
 */
export const linkItem = (name: string, url: string, notes?: string) => {
	const summary = notes && summarise(notes);
	return summary
		? `- [${oneLine(name)}](${url}): ${summary}`
		: `- [${oneLine(name)}](${url})`;
};

/**
 * How much of a description a list entry carries.
 *
 * The descriptions were written for a `<meta>` tag and a feed reader, and a few
 * of the older ones are several paragraphs. What a list is for is deciding
 * which entry to go and read, and the whole of one is a single fetch away, so a
 * long description is cut rather than allowed to bury the entries under it.
 */
const SUMMARY_LIMIT = 200;

const summarise = (notes: string) => {
	const collapsed = oneLine(notes);
	return collapsed.length > SUMMARY_LIMIT
		? `${collapsed.slice(0, SUMMARY_LIMIT).trimEnd()}…`
		: collapsed;
};
