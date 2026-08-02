import { Language } from "../model/language/language.entity";

/**
 * The origin a language's pages are published under.
 *
 * Each language is its own host, so the language code is the whole of what
 * distinguishes them. Every absolute URL the build emits -- the feed, the
 * sitemap, llms.txt, an article's canonical link -- is built from this, rather
 * than each handler interpolating the host itself, which is how the sitemap
 * once ended up advertising URLs that redirect.
 */
export const siteBaseUrl = (language: Language) =>
	`https://${language}.shinyaigeek.dev`;

/**
 * What the site says it is, in one sentence.
 *
 * The index and the profile page both put this in their <meta
 * name="description">, and llms.txt opens with it. The RSS feed deliberately
 * keeps its own English wording: it is what every existing subscriber's reader
 * already shows, and rewriting it is a change to a published feed rather than
 * to a page.
 */
export const siteDescription = (language: Language) =>
	language === Language.ja
		? "Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
		: "shinyaigeek.dev is a tech blog by a web developer. I mainly write about web development.";
