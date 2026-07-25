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

/**
 * How central a role is, used to order concurrent experiences.
 *
 * `position` is free-form text authored in the markdown front matter, so
 * anything unrecognised lands between full-time and internships and the sort
 * falls through to the start date. The ja and en front matter use the same
 * `position` values, which keeps both locales in the same order.
 */
const employmentRank = (position?: string): number => {
	const normalized = position?.toLowerCase() ?? "";

	if (normalized.includes("full-time")) {
		return 0;
	}

	if (normalized.includes("intern")) {
		return 2;
	}

	return 1;
};

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

		// Sort by endDate descending (ongoing experiences first). Roles that run
		// concurrently — same endDate, or both ongoing — are then ordered by how
		// central the role is, so a full-time job leads the side contracts it
		// overlaps with rather than losing to whichever started most recently.
		// Only after that does startDate descending decide.
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

			const rankA = employmentRank(a.metadata.position);
			const rankB = employmentRank(b.metadata.position);

			if (rankA !== rankB) {
				return rankA - rankB;
			}

			return toTime(b.metadata.startDate) - toTime(a.metadata.startDate);
		});

		return createOk(experiences);
	}
}
