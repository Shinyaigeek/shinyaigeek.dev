import type { GenerateHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { siteBaseUrl } from "../site-metadata";

/**
 * robots.txt, which the site did not have one of at all.
 *
 * Nothing here is a restriction -- everything published is meant to be read,
 * and the absence of the file already said as much. What it adds is the
 * `Sitemap:` line, the one directive a crawler cannot guess and the only
 * standard way to hand it the sitemap that has been generated all along.
 *
 * It is per host, so each language names its own sitemap; pointing both at one
 * would be a cross-host reference that crawlers ignore.
 *
 * The AI crawlers get a group naming them even though `*` already lets them
 * in, so that the allow reads as meant for them rather than as a default
 * nobody thought about. It says exactly what `*` says, and has to keep doing
 * so: a crawler that matches a named group ignores `*` entirely (RFC 9309).
 */
export const generateRobotsTxt: GenerateHandler<Context> = async ({
	context,
}) => {
	const baseUrl = siteBaseUrl(context.language);

	return `${[
		"User-agent: *",
		"Allow: /",
		"",
		...AI_AGENTS.map((agent) => `User-agent: ${agent}`),
		"Allow: /",
		"",
		// A comment because robots.txt has no directive for this. It costs
		// nothing and is where someone poking at the site would look.
		`# llms.txt (https://llmstxt.org/): ${baseUrl}/llms.txt`,
		`# Every article and fleet in one file: ${baseUrl}/llms-full.txt`,
		"# Every page is also served as Markdown at <its path>index.md",
		"",
		`Sitemap: ${baseUrl}/sitemap.xml`,
	].join("\n")}\n`;
};

/**
 * Crawlers that collect for an AI product, and fetchers that read a page for
 * one because a user asked, by the token each operator documents. The site's
 * answer to both kinds is the same.
 */
const AI_AGENTS = [
	"GPTBot",
	"OAI-SearchBot",
	"ChatGPT-User",
	"ClaudeBot",
	"Claude-SearchBot",
	"Claude-User",
	"PerplexityBot",
	"Perplexity-User",
	"Google-Extended",
	"Applebot-Extended",
	"Meta-ExternalAgent",
	"Amazonbot",
	"CCBot",
	"DuckAssistBot",
	"MistralAI-User",
];
