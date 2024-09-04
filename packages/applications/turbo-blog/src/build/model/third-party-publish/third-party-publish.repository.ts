import type { FileIOInfrastructureInterface } from "../../infrastructure/file-io/file-io.interface";
import type { FilePathInfrastructureInterface } from "../../infrastructure/file-path/file-path.interface";
import type { ThirdPartyPublishContent } from "./third-party-publish.entity";

export class ThirdPartyPublishContentRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getThirdPartyPublishContents(): Promise<ThirdPartyPublishContent> {
		const thirdPartyPublishContentsListPath =
			this.filePathInfrastructure.resolve(
				process.cwd(),
				"src/articles/third-pirty.json",
			);

		const thirdPartyPublichContentsList = JSON.parse(
			await this.fileIOInfrastructure.readFile(
				thirdPartyPublishContentsListPath,
			),
		);
	}
}
