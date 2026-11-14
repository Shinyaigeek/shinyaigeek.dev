import type { JsonLd } from "../../ui/components/Shell/json-ld";
import type { BlogContent } from "../model/blog/blog.entity";
import type { Language } from "../model/language/language.entity";
import { authorProfiles, siteBaseUrl, siteDescription } from "./site-metadata";

// The schema.org descriptions the pages carry in their <head>, for the pages a
// search engine or an agent has a type for: an article, the site itself and
// the person writing it.

const author = (language: Language) => ({
	"@type": "Person",
	name: "Shinyaigeek",
	url: `${siteBaseUrl(language)}/profile/`,
	sameAs: Object.values(authorProfiles),
});

/**
 * The frontmatter writes dates as "2021/12/10"; schema.org wants ISO 8601.
 * Throws on anything else, so a malformed date fails the build rather than
 * shipping a datePublished nothing can read.
 */
export const isoDate = (date: string) => {
	const match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(date.trim());
	if (!match) {
		throw new Error(`Expected a date written YYYY/MM/DD, got "${date}"`);
	}
	const [, year, month, day] = match;
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const blogPostingJsonLd = (
	blogPost: BlogContent,
	language: Language,
): JsonLd => {
	const { metadata } = blogPost;
	const url = `${siteBaseUrl(language)}/post/${metadata.path}/`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: metadata.title,
		description: metadata.description,
		datePublished: isoDate(metadata.publishedAt),
		dateModified: isoDate(metadata.updatedAt),
		inLanguage: language,
		url,
		mainEntityOfPage: url,
		image: `${url}ogp.png`,
		keywords: metadata.tags,
		author: author(language),
		encoding: {
			"@type": "MediaObject",
			contentUrl: `${url}index.md`,
			encodingFormat: "text/markdown",
		},
	};
};

export const homeJsonLd = (language: Language): JsonLd => {
	const baseUrl = siteBaseUrl(language);

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${baseUrl}/#website`,
				name: "shinyaigeek.dev",
				url: `${baseUrl}/`,
				description: siteDescription(language),
				inLanguage: language,
			},
			{
				"@type": "Blog",
				"@id": `${baseUrl}/post/#blog`,
				name: "shinyaigeek.dev",
				url: `${baseUrl}/post/`,
				inLanguage: language,
				isPartOf: { "@id": `${baseUrl}/#website` },
				author: author(language),
			},
		],
	};
};

export const profilePageJsonLd = (language: Language): JsonLd => ({
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	url: `${siteBaseUrl(language)}/profile/`,
	inLanguage: language,
	mainEntity: author(language),
});
