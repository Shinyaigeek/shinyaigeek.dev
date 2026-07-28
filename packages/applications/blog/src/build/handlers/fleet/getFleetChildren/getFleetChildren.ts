import { isErr, unwrapErr, unwrapOk } from "option-t/plain_result";
import { GetFleetsUsecase } from "../../../application/getFleets/getFleets.usecase";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { FleetRepository } from "../../../model/fleet/fleet.repository";
import { Language } from "../../../model/language/language.entity";
import { languagePrefix } from "../../site-path";

/**
 * A route for every fleet in a language.
 *
 * `suffix` is whatever hangs off the fleet's own path -- "/" for the page
 * itself, "/ogp.png" for its OG image -- so the page routes and the image routes
 * stay derived from one list instead of two copies that can drift apart.
 *
 * These used to swallow every failure and return [], so a fleet with broken
 * frontmatter just vanished from the build with nothing said. A missing
 * directory is still fine -- the repository reports that as an empty list, which
 * is what a language with no fleets yet looks like -- but a fleet that fails to
 * parse now stops the build.
 */
export const fleetChildren = async (
	language: Language,
	suffix: "/" | "/ogp.png",
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

	const prefix = languagePrefix(language);

	return unwrapOk(fleetResults).map(
		(fleet) => `${prefix}/fleets/${fleet.metadata.path}${suffix}`,
	);
};

export const getJapaneseFleetChildren = () => fleetChildren(Language.ja, "/");

export const getEnglishFleetChildren = () => fleetChildren(Language.en, "/");
