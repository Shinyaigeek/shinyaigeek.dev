import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import type { GenerateHandler } from "ssg-router";
import { GetBlogPostsUsecase } from "../../application/getBlogPosts/getBlogposts.usecase";
import { GetFleetsUsecase } from "../../application/getFleets/getFleets.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { BlogRepository } from "../../model/blog/blog.repository";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { Language } from "../../model/language/language.entity";
import { oneLine } from "../one-line";
import { siteBaseUrl, siteDescription } from "../site-metadata";

/**
 * llms.txt (https://llmstxt.org/): what this site holds, as one Markdown file.
 *
 * The format is fixed by the spec, not chosen here: an H1, a blockquote
 * summarising the site, free prose, then H2 sections whose bodies are lists of
 * `- [name](url): notes`. "Optional" is the one section name with a meaning --
 * it marks what may be dropped when the reader is short on context -- so the
 * headings stay in English in both languages, while the prose does not.
 *
 * Every article links to its .md rather than its page, which is the point of
 * the file: an LLM that follows one gets the article and nothing else.
 */
export const generateLlmsTxt: GenerateHandler<Context> = async ({
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();

	const blogPostResults = await new GetBlogPostsUsecase(
		new BlogRepository(fileIOInfrastructure, filePathInfrastructure),
	).getBlogPosts(context.language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	// Newest first: an index that has to be truncated should lose the oldest.
	const blogPosts = unwrapOk(blogPostResults).sort(
		(a, b) =>
			publishedAt(b.metadata.publishedAt) - publishedAt(a.metadata.publishedAt),
	);

	// A fleet with no file in this language simply does not exist on this
	// language's site, so an empty list here is ordinary rather than an error --
	// the same reason the sitemap treats a failure to read them as none.
	const fleetResults = await new GetFleetsUsecase(
		new FleetRepository(fileIOInfrastructure, filePathInfrastructure),
	).getFleets(context.language);
	const fleets = isErr(fleetResults) ? [] : unwrapOk(fleetResults);

	const language = context.language;
	const baseUrl = siteBaseUrl(language);
	const japanese = language === Language.ja;

	const sections = [
		[
			"## Posts",
			"",
			...blogPosts.map((post) =>
				entry(
					post.metadata.title,
					`${baseUrl}/post/${post.metadata.path}/index.md`,
					post.metadata.description,
				),
			),
		],
		...(fleets.length > 0
			? [
					[
						"## Fleets",
						"",
						...fleets.map((fleet) =>
							entry(
								fleet.title,
								`${baseUrl}/fleets/${fleet.path}/`,
								fleet.metadata.description,
							),
						),
					],
				]
			: []),
		[
			"## Pages",
			"",
			entry(
				japanese ? "プロフィール" : "Profile",
				`${baseUrl}/profile/`,
				japanese
					? "書いている人の経歴、仕事、興味"
					: "Who writes this: background, work and interests",
			),
			entry(
				japanese ? "アクティビティ" : "Activity",
				`${baseUrl}/activity/`,
				japanese
					? "登壇、OSS、GitHub のコントリビューション"
					: "Talks, OSS work and GitHub contributions",
			),
			entry(
				japanese ? "記事一覧" : "All posts",
				`${baseUrl}/post/`,
				japanese
					? "記事の索引。本文は各記事の index.md にある"
					: "The article index; the text of each is at its index.md",
			),
		],
		[
			"## Optional",
			"",
			entry(
				"RSS",
				`${baseUrl}/rss.xml`,
				japanese ? "更新のフィード" : "A feed of new posts",
			),
			entry(
				"Sitemap",
				`${baseUrl}/sitemap.xml`,
				japanese ? "ページの一覧" : "Every page on the site",
			),
		],
	];

	const preamble = [
		"# shinyaigeek.dev",
		"",
		`> ${siteDescription(language)}`,
		"",
		japanese
			? "記事はすべて Markdown でも配信しています。ページが `/post/<slug>/` にあるとき、その本文は `/post/<slug>/index.md` にあります。下の一覧はそちらを指しています。"
			: "Every article is served as Markdown as well. Where the page is at `/post/<slug>/`, its text is at `/post/<slug>/index.md`, which is what the list below links to.",
		"",
		japanese
			? `日本語版がこのサイトで、英語版は ${siteBaseUrl(Language.en)} にあります。記事は対応しているとは限りません。`
			: `This is the English site; the Japanese one is at ${siteBaseUrl(Language.ja)}. The two do not carry all the same articles.`,
		"",
	];

	// Each section ends with a blank line. Without one, a section's last list
	// item and the next "## ..." are adjacent lines -- which CommonMark does
	// read as a heading, but nothing looser has to, and the file exists to be
	// read by things whose Markdown is approximate.
	const body = sections.map((section) => `${section.join("\n")}\n`);

	return [...preamble, ...body].join("\n");
};

/** One line of a section's list, in the shape the spec gives for them. */
const entry = (name: string, url: string, notes?: string) => {
	const summary = notes && summarise(notes);
	return summary
		? `- [${oneLine(name)}](${url}): ${summary}`
		: `- [${oneLine(name)}](${url})`;
};

/**
 * How much of an article's description this file carries.
 *
 * The descriptions were written for a `<meta>` tag and a feed reader, and a few
 * of the older ones are several paragraphs. What this index is for is deciding
 * which article to go and read, and the whole of one is a single fetch away, so
 * a long description is cut rather than allowed to bury the fifteen entries
 * under it.
 */
const SUMMARY_LIMIT = 200;

const summarise = (notes: string) => {
	const collapsed = oneLine(notes);
	return collapsed.length > SUMMARY_LIMIT
		? `${collapsed.slice(0, SUMMARY_LIMIT).trimEnd()}…`
		: collapsed;
};

/** Frontmatter dates are written "2021/12/10", which Date does not take. */
const publishedAt = (date: string) =>
	new Date(date.replace(/\//g, "-")).getTime();
