import type { Result } from "option-t/esm/PlainResult";
import type { FileIOInfrastructureInterface } from "../../infrastructure/file-io/file-io.interface";
import type { FilePathInfrastructureInterface } from "../../infrastructure/file-path/file-path.interface";
import { parseThirdPartyPublishContentsListJson } from "./parse-third-party-publish-contents-list-json";
import type { ThirdPartyPublishContent } from "./third-party-publish.entity";

export class ThirdPartyPublishContentRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getThirdPartyPublishContents(): Promise<
		Result<ThirdPartyPublishContent[], Error>
	> {
		const thirdPartyPublishContentsListPath =
			this.filePathInfrastructure.resolve(
				process.cwd(),
				"src/articles/third-pirty.json",
			);

		const thirdPartyPublichContentsList =
			parseThirdPartyPublishContentsListJson(
				await this.fileIOInfrastructure.readFile(
					thirdPartyPublishContentsListPath,
				),
			);

		return thirdPartyPublichContentsList;
	}
}
