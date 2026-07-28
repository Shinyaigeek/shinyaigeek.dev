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
import type { Language } from "../language/language.entity";
import { OSSProject } from "./oss.entity";
import { parseOSSContent } from "./parse-oss-content";

export class OSSRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getOSSProject(
		slug: string,
		language: Language,
	): Promise<Result<OSSProject, Error>> {
		const projectPath = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/oss",
			slug,
			`${language}.md`,
		);

		const projectContent =
			await this.fileIOInfrastructure.readFile(projectPath);

		const parseResult = await parseOSSContent(projectContent);

		if (isErr(parseResult)) {
			return parseResult;
		}

		const { metadata, body } = unwrapOk(parseResult);

		return createOk(new OSSProject(metadata, body, language, slug));
	}

	public async getAllOSSProjects(
		language: Language,
	): Promise<Result<OSSProject[], Error>> {
		const ossDir = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/oss",
		);

		const projectDirs = await this.fileIOInfrastructure.readDirectory(ossDir);

		const projects: OSSProject[] = [];
		const errors: Error[] = [];

		for (const projectDir of projectDirs) {
			const mdPath = this.filePathInfrastructure.resolve(
				ossDir,
				projectDir,
				`${language}.md`,
			);

			// Check if the language-specific file exists
			try {
				await this.fileIOInfrastructure.readFile(mdPath);
				const result = await this.getOSSProject(projectDir, language);

				if (isErr(result)) {
					errors.push(unwrapErr(result));
				} else {
					projects.push(unwrapOk(result));
				}
			} catch {}
		}

		if (errors.length > 0) {
			return createErr(new AggregateError(errors));
		}

		// Sort: creator projects first, then contributions; within each group by
		// stars descending (projects without a star count come last).
		const kindOrder = { creator: 0, contributor: 1 };
		projects.sort((a, b) => {
			const kindDiff = kindOrder[a.metadata.kind] - kindOrder[b.metadata.kind];
			if (kindDiff !== 0) {
				return kindDiff;
			}
			return (b.metadata.stars ?? 0) - (a.metadata.stars ?? 0);
		});

		return createOk(projects);
	}
}
