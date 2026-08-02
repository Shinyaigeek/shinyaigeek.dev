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
 */
export const generateRobotsTxt: GenerateHandler<Context> = async ({
	context,
}) => {
	const baseUrl = siteBaseUrl(context.language);

	return `${[
		"User-agent: *",
		"Allow: /",
		"",
		// A comment because robots.txt has no directive for this. It costs
		// nothing and is where someone poking at the site would look.
		`# llms.txt (https://llmstxt.org/): ${baseUrl}/llms.txt`,
		"# Every article is also served as Markdown at <its path>index.md",
		"",
		`Sitemap: ${baseUrl}/sitemap.xml`,
	].join("\n")}\n`;
};
