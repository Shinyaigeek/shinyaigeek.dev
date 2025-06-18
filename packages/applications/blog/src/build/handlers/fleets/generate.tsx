import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { FleetIndex } from "../../../ui/pages/fleet-index";
import { GetFleetsUsecase } from "../../application/getFleets/getFleets.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { Language } from "../../model/language/language.entity";

export const generateFleetsPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const fleetRepository = new FleetRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getFleetsUsecase = new GetFleetsUsecase(fleetRepository);
	const language = context.language;
	const fleetResults = await getFleetsUsecase.getFleets(language);

	interface FleetDisplayItem {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		slideCount: number;
		tags?: string[];
	}

	let fleets: FleetDisplayItem[] = [];
	if (!isErr(fleetResults)) {
		fleets = unwrapOk(fleetResults).map((fleet) => ({
			title: fleet.metadata.title,
			description: fleet.metadata.description,
			publishedAt: fleet.metadata.publishedAt,
			path: fleet.metadata.path,
			slideCount: fleet.slides.length,
			tags: fleet.metadata.tags,
		}));
	}

	const rawLanguage = language === Language.ja ? "ja" : "en";
	const description =
		language === Language.ja
			? "Fleet - ちょっとしたアイデアや学習記録をスライド形式で共有"
			: "Fleet - Quick ideas and learning notes shared in slide format";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			ogImageFilename="TODO"
			title="Fleets | shinyaigeek.dev"
			path="/fleets/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout language={rawLanguage} page="fleets" currentPath="/fleets/">
				<FleetIndex fleets={fleets} />
			</Layout>
		</Shell>,
	);
};
