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
import { parseWorkExperienceContent } from "./parse-work-experience-content";
import { WorkExperience } from "./work-experience.entity";

export class WorkExperienceRepository {
	constructor(
		private fileIOInfrastructure: FileIOInfrastructureInterface,
		private filePathInfrastructure: FilePathInfrastructureInterface,
	) {}

	public async getWorkExperience(
		company: string,
		language: Language,
	): Promise<Result<WorkExperience, Error>> {
		const langCode = language === Language.ja ? "ja" : "en";
		const experiencePath = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/working-experience",
			company,
			`${langCode}.md`,
		);

		const experienceContent =
			await this.fileIOInfrastructure.readFile(experiencePath);

		const parseResult = await parseWorkExperienceContent(experienceContent);

		if (isErr(parseResult)) {
			return parseResult;
		}

		const { metadata, body } = unwrapOk(parseResult);

		return createOk(new WorkExperience(metadata, body, language, company));
	}

	public async getAllWorkExperiences(
		language: Language,
	): Promise<Result<WorkExperience[], Error>> {
		// Get all company directories
		const workExperienceDir = this.filePathInfrastructure.resolve(
			process.cwd(),
			"src/profile/working-experience",
		);

		const companyDirs =
			await this.fileIOInfrastructure.readDirectory(workExperienceDir);

		// Filter out non-directory entries and get work experiences
		const langCode = language === Language.ja ? "ja" : "en";
		const experiences: WorkExperience[] = [];
		const errors: Error[] = [];

		for (const companyDir of companyDirs) {
			const mdPath = this.filePathInfrastructure.resolve(
				workExperienceDir,
				companyDir,
				`${langCode}.md`,
			);

			// Check if the language-specific file exists
			try {
				await this.fileIOInfrastructure.readFile(mdPath);
				const result = await this.getWorkExperience(companyDir, language);

				if (isErr(result)) {
					errors.push(unwrapErr(result));
				} else {
					experiences.push(unwrapOk(result));
				}
			} catch {}
		}

		if (errors.length > 0) {
			return createErr(new AggregateError(errors));
		}

		// Sort by endDate descending (ongoing experiences first), and break ties
		// by startDate descending
		const toTime = (date: string) => new Date(date.replace("/", "-")).getTime();
		experiences.sort((a, b) => {
			const endA = a.metadata.endDate
				? toTime(a.metadata.endDate)
				: Number.POSITIVE_INFINITY;
			const endB = b.metadata.endDate
				? toTime(b.metadata.endDate)
				: Number.POSITIVE_INFINITY;

			if (endA !== endB) {
				return endB - endA;
			}

			return toTime(b.metadata.startDate) - toTime(a.metadata.startDate);
		});

		return createOk(experiences);
	}
}
