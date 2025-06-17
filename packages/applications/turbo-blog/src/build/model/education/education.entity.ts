import type { Language } from "../language/language.entity";

export interface EducationMetadata {
	institution: string;
	startDate: string;
	endDate?: string;
	degree?: string;
	field?: string;
	description?: string;
	achievements?: string[];
}

export class Education {
	constructor(
		public readonly metadata: EducationMetadata,
		public readonly body: string, // HTML content after markdown parsing
		public readonly language: Language,
		public readonly slug: string,
	) {}
}
