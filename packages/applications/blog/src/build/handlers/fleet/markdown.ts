import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import type { GenerateHandler } from "ssg-router";
import { GetFleetUsecase } from "../../application/getFleet/getFleet.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import type { FleetContent } from "../../model/fleet/fleet.entity";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import type { Language } from "../../model/language/language.entity";
import { absoluteAssetUrls } from "../markdown/absolute-asset-urls";
import { markdownHeader } from "../markdown/document";
import { MARKDOWN_SUFFIX } from "../post/getBlogChildren/getBlogChildren";
import { siteBaseUrl } from "../site-metadata";
import { sitePath } from "../site-path";
import { fleetDescription } from "./description";

/**
 * A fleet as Markdown, at <its path>index.md: its source, the way an article's
 * is, with the slides separated by thematic breaks.
 */
export const generateFleetMarkdown: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	// "/en/fleets/<slug>/index.md" -> "<slug>"
	const slug = sitePath(path)
		.slice(0, -MARKDOWN_SUFFIX.length)
		.replace(/^\/fleets\//, "");

	const fleetResult = await new GetFleetUsecase(
		new FleetRepository(
			new NodeFileIOInfrastructure(),
			new NodeFilePathImplementation(),
		),
	).getFleet(slug, context.language);

	if (isErr(fleetResult)) {
		throw unwrapErr(fleetResult);
	}

	return fleetMarkdown(unwrapOk(fleetResult), context.language);
};

/** Apart from the route, because llms-full.txt carries every fleet's too. */
export const fleetMarkdown = (fleet: FleetContent, language: Language) => {
	const baseUrl = siteBaseUrl(language);
	const tags = fleet.tags ?? [];

	const header = markdownHeader({
		title: fleet.title,
		description: fleetDescription(fleet, language),
		facts: [
			`Published: ${fleet.publishedAt}`,
			...(tags.length > 0 ? [`Tags: ${tags.join(", ")}`] : []),
		],
		source: `${baseUrl}/fleets/${fleet.path}/`,
	});

	return `${header + absoluteAssetUrls(fleet.markdown, baseUrl)}\n`;
};
