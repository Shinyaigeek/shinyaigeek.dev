import { isErr, unwrapOk } from "option-t/plain_result";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { FleetIndex } from "../../../ui/pages/fleet-index";
import { GetFleetsUsecase } from "../../application/getFleets/getFleets.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import type { FleetContent } from "../../model/fleet/fleet.entity";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { Language } from "../../model/language/language.entity";
import { fleetDescription } from "../fleet/description";
import {
	linkItem,
	markdownHeader,
	markdownSection,
} from "../markdown/document";
import { siteBaseUrl } from "../site-metadata";

const fleetsDescription = (language: Language) =>
	language === Language.ja
		? "Fleet - ちょっとしたアイデアや学習記録をスライド形式で共有"
		: "Fleet - Quick ideas and learning notes shared in slide format";

const getFleets = async (language: Language): Promise<FleetContent[]> => {
	const fleetResults = await new GetFleetsUsecase(
		new FleetRepository(
			new NodeFileIOInfrastructure(),
			new NodeFilePathImplementation(),
		),
	).getFleets(language);

	return isErr(fleetResults) ? [] : unwrapOk(fleetResults);
};

export const generateFleetsPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const fleets = await getFleets(language);

	return renderToStaticMarkup(
		<Shell
			language={language}
			title="Fleets | shinyaigeek.dev"
			path="/fleets/"
			description={fleetsDescription(language)}
			markdown
			builtAssets={context.builtAssets}
		>
			<Layout language={language} page="fleets" currentPath="/fleets/">
				<FleetIndex fleets={fleets} language={language} />
			</Layout>
		</Shell>,
	);
};

export const generateFleetsMarkdown: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const baseUrl = siteBaseUrl(language);
	const fleets = await getFleets(language);

	return (
		markdownHeader({
			title: "Fleets",
			description: fleetsDescription(language),
			source: `${baseUrl}/fleets/`,
		}) +
		markdownSection(
			"Fleets",
			fleets.length > 0
				? fleets.map((fleet) =>
						linkItem(
							fleet.title,
							`${baseUrl}/fleets/${fleet.path}/index.md`,
							`${fleet.publishedAt} · ${fleetDescription(fleet, language)}`,
						),
					)
				: [language === Language.ja ? "まだありません。" : "None yet."],
		)
	);
};
