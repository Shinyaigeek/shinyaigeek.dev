import { isErr, unwrapOk } from "option-t/esm/PlainResult";
import { GetFleetsUsecase } from "../../../application/getFleets/getFleets.usecase";
import { NodeFileIOInfrastructure } from "../../../infrastructure/file-io/node-file-io";
import { NodeFilePathImplementation } from "../../../infrastructure/file-path/node-file-path";
import { FleetRepository } from "../../../model/fleet/fleet.repository";
import { Language } from "../../../model/language/language.entity";

export const getJapaneseFleetChildren: () => Promise<string[]> = async () => {
	try {
		const fileIOInfrastructure = new NodeFileIOInfrastructure();
		const filePathInfrastructure = new NodeFilePathImplementation();
		const fleetRepository = new FleetRepository(
			fileIOInfrastructure,
			filePathInfrastructure,
		);
		const getFleetsUsecase = new GetFleetsUsecase(fleetRepository);

		const fleetResults = await getFleetsUsecase.getFleets(Language.ja);

		if (isErr(fleetResults)) {
			return [];
		}

		const fleets = unwrapOk(fleetResults);
		return fleets.map((fleet) => `/fleets/${fleet.metadata.path}/`);
	} catch (error) {
		return [];
	}
};

export const getEnglishFleetChildren: () => Promise<string[]> = async () => {
	try {
		const fileIOInfrastructure = new NodeFileIOInfrastructure();
		const filePathInfrastructure = new NodeFilePathImplementation();
		const fleetRepository = new FleetRepository(
			fileIOInfrastructure,
			filePathInfrastructure,
		);
		const getFleetsUsecase = new GetFleetsUsecase(fleetRepository);

		const fleetResults = await getFleetsUsecase.getFleets(Language.en);

		if (isErr(fleetResults)) {
			return [];
		}

		const fleets = unwrapOk(fleetResults);
		return fleets.map((fleet) => `/en/fleets/${fleet.metadata.path}/`);
	} catch (error) {
		return [];
	}
};
