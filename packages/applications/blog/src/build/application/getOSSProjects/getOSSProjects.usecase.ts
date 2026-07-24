import type { Result } from "option-t/esm/PlainResult";
import type { Language } from "../../model/language/language.entity";
import type { OSSProject } from "../../model/oss/oss.entity";
import type { OSSRepository } from "../../model/oss/oss.repository";

export class GetOSSProjectsUsecase {
	constructor(private ossRepository: OSSRepository) {}

	public async getOSSProjects(
		language: Language,
	): Promise<Result<OSSProject[], Error>> {
		return this.ossRepository.getAllOSSProjects(language);
	}
}
