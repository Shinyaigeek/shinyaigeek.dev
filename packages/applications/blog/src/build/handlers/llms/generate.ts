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
import { fleetMarkdown } from "../fleet/markdown";
import { linkItem, markdownSection } from "../markdown/document";
import { blogPostMarkdown } from "../post/children/markdown/generate";
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
	const language = context.language;
	const { blogPosts, fleets } = await loadContent(language);
	const baseUrl = siteBaseUrl(language);
	const japanese = language === Language.ja;

	const sections = [
		markdownSection(
			"Posts",
			blogPosts.map((post) =>
				linkItem(
					post.metadata.title,
					`${baseUrl}/post/${post.metadata.path}/index.md`,
					post.metadata.description,
				),
			),
		),
		...(fleets.length > 0
			? [
					markdownSection(
						"Fleets",
						fleets.map((fleet) =>
							linkItem(
								fleet.title,
								`${baseUrl}/fleets/${fleet.path}/index.md`,
								fleet.metadata.description,
							),
						),
					),
				]
			: []),
		markdownSection("Pages", [
			linkItem(
				japanese ? "プロフィール" : "Profile",
				`${baseUrl}/profile/index.md`,
				japanese
					? "書いている人の経歴、仕事、興味"
					: "Who writes this: background, work and interests",
			),
			linkItem(
				japanese ? "アクティビティ" : "Activity",
				`${baseUrl}/activity/index.md`,
				japanese
					? "登壇、OSS、GitHub のコントリビューション"
					: "Talks, OSS work and GitHub contributions",
			),
			linkItem(
				japanese ? "記事一覧" : "All posts",
				`${baseUrl}/post/index.md`,
				japanese
					? "記事の索引。本文は各記事の index.md にある"
					: "The article index; the text of each is at its index.md",
			),
		]),
		markdownSection("Optional", [
			linkItem(
				"llms-full.txt",
				`${baseUrl}/llms-full.txt`,
				japanese
					? "すべての記事と Fleet の本文を 1 ファイルにまとめたもの"
					: "The text of every article and fleet, in one file",
			),
			linkItem(
				"RSS",
				`${baseUrl}/rss.xml`,
				japanese ? "更新のフィード" : "A feed of new posts",
			),
			linkItem(
				"Sitemap",
				`${baseUrl}/sitemap.xml`,
				japanese ? "ページの一覧" : "Every page on the site",
			),
		]),
	];

	const lead = japanese
		? "どのページも Markdown でも配信しています。ページが `/post/<slug>/` にあるとき、その Markdown は `/post/<slug>/index.md` にあります。下の一覧はそちらを指しています。"
		: "Every page is served as Markdown as well. Where the page is at `/post/<slug>/`, its Markdown is at `/post/<slug>/index.md`, which is what the list below links to.";

	return [preamble(language, lead), ...sections].join("\n");
};

/**
 * llms-full.txt: the same preamble as llms.txt, then the whole of every
 * article and every fleet, each exactly as its index.md has it.
 *
 * Not part of llms.txt's spec, but the name the convention around it has
 * settled on, for a reader that would rather take the site in one fetch than
 * follow fifteen links. Each document is set off by a thematic break and opens
 * with its own H1 and its Source line, so where one ends is unambiguous.
 */
export const generateLlmsFullTxt: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const { blogPosts, fleets } = await loadContent(language);
	const baseUrl = siteBaseUrl(language);
	const lead =
		language === Language.ja
			? `このファイルは、すべての記事と Fleet の本文を新しい順に並べたものです。サイトの索引は ${baseUrl}/llms.txt にあります。`
			: `This file is the text of every article and fleet on the site, newest first. The index of the site is ${baseUrl}/llms.txt.`;

	return [
		preamble(language, lead),
		...blogPosts.map((post) => blogPostMarkdown(post, language)),
		...fleets.map((fleet) => fleetMarkdown(fleet, language)),
	].join("\n\n---\n\n");
};

const loadContent = async (language: Language) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();

	const blogPostResults = await new GetBlogPostsUsecase(
		new BlogRepository(fileIOInfrastructure, filePathInfrastructure),
	).getBlogPosts(language);

	if (isErr(blogPostResults)) {
		throw unwrapErr(blogPostResults);
	}

	// A fleet with no file in this language simply does not exist on this
	// language's site, so an empty list here is ordinary rather than an error --
	// the same reason the sitemap treats a failure to read them as none.
	const fleetResults = await new GetFleetsUsecase(
		new FleetRepository(fileIOInfrastructure, filePathInfrastructure),
	).getFleets(language);

	return {
		// Newest first: an index that has to be truncated should lose the oldest.
		blogPosts: unwrapOk(blogPostResults).sort(
			(a, b) =>
				publishedAt(b.metadata.publishedAt) -
				publishedAt(a.metadata.publishedAt),
		),
		fleets: isErr(fleetResults) ? [] : unwrapOk(fleetResults),
	};
};

/** The H1, the blockquote and the prose the spec puts above the sections. */
const preamble = (language: Language, lead: string) => {
	const japanese = language === Language.ja;

	return `${[
		"# shinyaigeek.dev",
		"",
		`> ${siteDescription(language)}`,
		"",
		lead,
		"",
		japanese
			? `日本語版がこのサイトで、英語版は ${siteBaseUrl(Language.en)} にあります。記事は対応しているとは限りません。`
			: `This is the English site; the Japanese one is at ${siteBaseUrl(Language.ja)}. The two do not carry all the same articles.`,
	].join("\n")}\n`;
};

/** Frontmatter dates are written "2021/12/10", which Date does not take. */
const publishedAt = (date: string) =>
	new Date(date.replace(/\//g, "-")).getTime();
