import type { GenerateHandler } from "ssg-router";
import type { Context } from "../../context/context";
import { authorProfiles, siteBaseUrl } from "../site-metadata";

/**
 * Just under a year. RFC 9116 recommends keeping `Expires` less than a year
 * out, and the site is rebuilt nightly, so the date moves forward long before
 * it could lapse.
 */
const LIFETIME_MS = 364 * 24 * 60 * 60 * 1000;

/**
 * /.well-known/security.txt (RFC 9116): where to report a vulnerability.
 *
 * The contacts are the public profiles the pages already link to, not an
 * address: this file is read by scrapers as often as by researchers.
 */
export const generateSecurityTxt: GenerateHandler<Context> = async ({
	context,
}) => {
	const baseUrl = siteBaseUrl(context.language);

	return `${[
		`Contact: ${authorProfiles.github}`,
		`Contact: ${authorProfiles.x}`,
		`Expires: ${new Date(Date.now() + LIFETIME_MS).toISOString()}`,
		"Preferred-Languages: ja, en",
		`Canonical: ${baseUrl}/.well-known/security.txt`,
	].join("\n")}\n`;
};
