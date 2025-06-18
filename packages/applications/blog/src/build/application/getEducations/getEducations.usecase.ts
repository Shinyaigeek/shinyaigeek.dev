import type { Result } from "option-t/esm/PlainResult";
import type { Education } from "../../model/education/education.entity";
import type { EducationRepository } from "../../model/education/education.repository";
import type { Language } from "../../model/language/language.entity";

export class GetEducationsUsecase {
	constructor(private educationRepository: EducationRepository) {}

	public async getEducations(
		language: Language,
	): Promise<Result<Education[], Error>> {
		return this.educationRepository.getAllEducations(language);
	}
}
