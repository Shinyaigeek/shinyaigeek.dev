import {
	type Result,
	createErr,
	createOk,
	isErr,
	unwrapErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
import type { FileIOInfrastructureInterface } from "../../infrastructure/file-io/file-io.interface";
import type { FilePathInfrastructureInterface } from "../../infrastructure/file-path/file-path.interface";
import { Language } from "../language/language.entity";
import { Education } from "./education.entity";
import { parseEducationContent } from "./parse-education-content";

export class EducationRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getEducation(
		institution: string,
		language: Language,
	): Promise<Result<Education, Error>> {
		const langCode = language === Language.ja ? "ja" : "en";
		const educationPath = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/education",
			institution,
			`${langCode}.md`,
		);

		const educationContent =
			await this.fileIOInfrastructure.readFile(educationPath);

		const parseResult = await parseEducationContent(educationContent);

		if (isErr(parseResult)) {
			return parseResult;
		}

		const { metadata, body } = unwrapOk(parseResult);

		return createOk(new Education(metadata, body, language, institution));
	}

	public async getAllEducations(
		language: Language,
	): Promise<Result<Education[], Error>> {
		// Get all institution directories
		const educationDir = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/education",
		);

		const institutionDirs =
			await this.fileIOInfrastructure.readDirectory(educationDir);

		// Filter out non-directory entries and get educations
		const langCode = language === Language.ja ? "ja" : "en";
		const educations: Education[] = [];
		const errors: Error[] = [];

		for (const institutionDir of institutionDirs) {
			const mdPath = this.filePathInfrastructure.resolve(
				educationDir,
				institutionDir,
				`${langCode}.md`,
			);

			// Check if the language-specific file exists
			try {
				await this.fileIOInfrastructure.readFile(mdPath);
				const result = await this.getEducation(institutionDir, language);

				if (isErr(result)) {
					errors.push(unwrapErr(result));
				} else {
					educations.push(unwrapOk(result));
				}
			} catch {}
		}

		if (errors.length > 0) {
			return createErr(new AggregateError(errors));
		}

		// Sort by startDate descending (most recent first)
		educations.sort((a, b) => {
			const dateA = new Date(a.metadata.startDate.replace("/", "-"));
			const dateB = new Date(b.metadata.startDate.replace("/", "-"));
			return dateB.getTime() - dateA.getTime();
		});

		return createOk(educations);
	}
}
