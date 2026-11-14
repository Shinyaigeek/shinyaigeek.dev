import type { GenerateHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { Language } from "../../model/language/language.entity";
import { authorProfiles, siteBaseUrl, siteDescription } from "../site-metadata";

/**
 * /.well-known/agent.json: every machine route this site has, in one fetch.
 *
 * agentfriendly.network names the path but publishes no schema for it, and
 * A2A's agent card describes an agent that can be called, which a static blog
 * is not. So this claims to be neither: it lists what is here, under keys that
 * say what they are, and states the one thing an agent most needs to know
 * before acting -- that nothing here takes input or needs credentials.
 */
export const generateAgentJson: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const baseUrl = siteBaseUrl(language);
	const other = language === Language.ja ? Language.en : Language.ja;

	const manifest = {
		name: "shinyaigeek.dev",
		description: siteDescription(language),
		url: `${baseUrl}/`,
		language,
		alternates: [{ language: other, url: `${siteBaseUrl(other)}/` }],
		author: {
			name: "Shinyaigeek",
			url: `${baseUrl}/profile/`,
			sameAs: Object.values(authorProfiles),
		},
		access: {
			authentication: "none",
			readOnly: true,
			methods: ["GET", "HEAD"],
		},
		markdown: {
			description:
				"Every HTML page has a Markdown twin at <page path>index.md, also returned for the page URL itself when Accept prefers text/markdown.",
			pathTemplate: "{pagePath}index.md",
			contentNegotiation: "Accept: text/markdown",
		},
		resources: [
			resource(
				"llms.txt",
				`${baseUrl}/llms.txt`,
				"text/plain",
				"llmstxt.org index of the site, linking each page's Markdown",
			),
			resource(
				"llms-full.txt",
				`${baseUrl}/llms-full.txt`,
				"text/plain",
				"The text of every article and fleet, newest first",
			),
			resource(
				"sitemap",
				`${baseUrl}/sitemap.xml`,
				"application/xml",
				"Every page on the site",
			),
			resource(
				"rss",
				`${baseUrl}/rss.xml`,
				"application/rss+xml",
				"A feed of new posts",
			),
			resource(
				"robots",
				`${baseUrl}/robots.txt`,
				"text/plain",
				"Crawling policy; AI agents are named and allowed",
			),
			resource(
				"security",
				`${baseUrl}/.well-known/security.txt`,
				"text/plain",
				"RFC 9116 contacts",
			),
		],
		contact: [authorProfiles.github, authorProfiles.x],
	};

	return `${JSON.stringify(manifest, null, "\t")}\n`;
};

const resource = (
	name: string,
	url: string,
	mediaType: string,
	description: string,
) => ({ name, url, mediaType, description });
