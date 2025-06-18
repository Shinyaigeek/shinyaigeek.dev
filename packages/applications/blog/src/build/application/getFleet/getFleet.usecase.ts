import type { Result } from "option-t/esm/PlainResult";
import type { FleetContent } from "../../model/fleet/fleet.entity";
import type { FleetRepository } from "../../model/fleet/fleet.repository";
import type { Language } from "../../model/language/language.entity";

export class GetFleetUsecase {
	constructor(private fleetRepository: FleetRepository) {}

	async getFleet(
		slug: string,
		language: Language,
	): Promise<Result<FleetContent, Error>> {
		const fleet = await this.fleetRepository.getFleet(slug, language);

		return fleet;
	}
}
