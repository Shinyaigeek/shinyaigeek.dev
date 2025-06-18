import type { Result } from "option-t/esm/PlainResult";
import type { Language } from "../../model/language/language.entity";
import type { WorkExperience } from "../../model/work-experience/work-experience.entity";
import type { WorkExperienceRepository } from "../../model/work-experience/work-experience.repository";

export class GetWorkExperiencesUsecase {
	constructor(private workExperienceRepository: WorkExperienceRepository) {}

	public async getWorkExperiences(
		language: Language,
	): Promise<Result<WorkExperience[], Error>> {
		return this.workExperienceRepository.getAllWorkExperiences(language);
	}
}
