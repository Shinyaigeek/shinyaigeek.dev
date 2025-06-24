import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { FleetDetail } from "../../../ui/pages/fleet-detail";
import { GetFleetUsecase } from "../../application/getFleet/getFleet.usecase";
import type { Context } from "../../context/context";
import { NodeFileIOInfrastructure } from "../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../infrastructure/file-path/node-file-path";
import { FleetRepository } from "../../model/fleet/fleet.repository";
import { Language } from "../../model/language/language.entity";

export const generateFleetPage: GenerateHandler<Context> = async ({
	path,
	context,
}) => {
	const segments = path.split("/").filter(Boolean);
	const slug = segments[segments.length - 1];
	if (!slug) {
		throw new Error("Invalid fleet path");
	}

	const fileIOInfrastructure = new NodeFileIOInfrastructure();
	const filePathInfrastructure = new NodeFilePathImplementation();
	const fleetRepository = new FleetRepository(
		fileIOInfrastructure,
		filePathInfrastructure,
	);
	const getFleetUsecase = new GetFleetUsecase(fleetRepository);
	const language = context.language;
	const fleetResult = await getFleetUsecase.getFleet(slug, language);

	if (isErr(fleetResult)) {
		throw unwrapErr(fleetResult);
	}

	const fleet = unwrapOk(fleetResult);
	const rawLanguage = language === Language.ja ? "ja" : "en";

	return renderToStaticMarkup(
		<Shell
			language={rawLanguage}
			title={`${fleet.metadata.title} | shinyaigeek.dev`}
			path={`/fleets/${slug}/`}
			description={fleet.metadata.description}
			builtAssets={context.builtAssets}
		>
			<Layout
				language={rawLanguage}
				page="fleet"
				currentPath={`/fleets/${slug}/`}
			>
				<FleetDetail fleet={fleet} />
			</Layout>
		</Shell>,
	);
};
