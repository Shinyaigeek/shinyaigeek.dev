import {
	type Result,
	createErr,
	createOk,
	isErr,
	unwrapErr,
	unwrapOk,
} from "option-t/plain_result";
import type { FileIOInfrastructureInterface } from "../../infrastructure/file-io/file-io.interface";
import type { FilePathInfrastructureInterface } from "../../infrastructure/file-path/file-path.interface";
import { Language } from "../language/language.entity";
import { FleetContent } from "./fleet.entity";
import { parseFleetContent } from "./parse-fleet-content";

/**
 * Fleets are authored per language, the same way articles are: src/fleets/public
 * for Japanese and src/fleets/en for English. A fleet with no file in the
 * English directory simply does not exist on the English site.
 */
const fleetDirectory = (language: Language) =>
	language === Language.ja ? "src/fleets/public" : "src/fleets/en";

export class FleetRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getFleet(
		slug: string,
		language: Language,
	): Promise<Result<FleetContent, Error>> {
		try {
			const fleetPath = this.filePathInfrastructure.resolve(
				process.cwd(),
				fleetDirectory(language),
				`${slug}.md`,
			);
			const fleetContent = await this.fileIOInfrastructure.readFile(fleetPath);

			const parseFleetContentResult = await parseFleetContent(fleetContent);

			if (isErr(parseFleetContentResult)) {
				return parseFleetContentResult;
			}

			const { metadata, slides } = unwrapOk(parseFleetContentResult);

			return createOk(
				new FleetContent(
					{ ...metadata, path: slug.replace(".md", "") },
					slides,
					language,
				),
			);
		} catch (error) {
			return createErr(
				error instanceof Error ? error : new Error(String(error)),
			);
		}
	}

	public async getFleets(
		language: Language,
	): Promise<Result<FleetContent[], Error>> {
		try {
			const fleetPaths = (
				await this.fileIOInfrastructure.readDirectory(
					this.filePathInfrastructure.resolve(
						process.cwd(),
						fleetDirectory(language),
					),
				)
			).map((fleetPath) => fleetPath.replace(".md", ""));

			if (fleetPaths.length === 0) {
				return createOk([]);
			}

			const fleetResults = await Promise.all(
				fleetPaths.map(async (fleetPath) => {
					return this.getFleet(fleetPath, language);
				}),
			);

			const fleetErrs = fleetResults.filter(isErr);

			if (fleetErrs.length > 0) {
				return createErr(AggregateError(fleetErrs.map(unwrapErr)));
			}

			return createOk(
				fleetResults
					.map(unwrapOk)
					.sort(
						(a, b) =>
							new Date(b.metadata.publishedAt).getTime() -
							new Date(a.metadata.publishedAt).getTime(),
					),
			);
		} catch {
			// Directory doesn't exist, return empty array
			return createOk([]);
		}
	}
}
