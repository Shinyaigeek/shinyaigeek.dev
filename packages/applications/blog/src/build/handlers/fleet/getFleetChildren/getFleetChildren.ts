import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { GetFleetsUsecase } from "../../../application/getFleets/getFleets.usecase";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { FleetRepository } from "../../../model/fleet/fleet.repository";
import { Language } from "../../../model/language/language.entity";

/**
 * Both of these used to swallow every failure and return [], so a fleet with
 * broken frontmatter just vanished from the build with nothing said. A missing
 * directory is still fine -- the repository reports that as an empty list, which
 * is what a language with no fleets yet looks like -- but a fleet that fails to
 * parse now stops the build.
 */
const fleetChildren = async (
	language: Language,
	prefix: "" | "/en",
): Promise<string[]> => {
	const fleetRepository = new FleetRepository(
		new NodeFileIOInfrastructure(),
		new NodeFilePathImplementation(),
	);

	const fleetResults = await new GetFleetsUsecase(fleetRepository).getFleets(
		language,
	);
	if (isErr(fleetResults)) {
		throw unwrapErr(fleetResults);
	}

	return unwrapOk(fleetResults).map(
		(fleet) => `${prefix}/fleets/${fleet.metadata.path}/`,
	);
};

export const getJapaneseFleetChildren = () => fleetChildren(Language.ja, "");

export const getEnglishFleetChildren = () => fleetChildren(Language.en, "/en");
