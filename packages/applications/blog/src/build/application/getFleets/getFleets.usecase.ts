import type { Result } from "option-t/esm/PlainResult";
import type { FleetContent } from "../../model/fleet/fleet.entity";
import type { FleetRepository } from "../../model/fleet/fleet.repository";
import type { Language } from "../../model/language/language.entity";

export class GetFleetsUsecase {
	constructor(private fleetRepository: FleetRepository) {}

	async getFleets(language: Language): Promise<Result<FleetContent[], Error>> {
		const fleets = await this.fleetRepository.getFleets(language);

		return fleets;
	}
}
