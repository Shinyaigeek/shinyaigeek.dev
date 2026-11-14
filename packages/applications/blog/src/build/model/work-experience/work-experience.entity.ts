import type { Language } from "../language/language.entity";

export interface WorkExperienceMetadata {
	company: string;
	startDate: string;
	endDate?: string;
	position?: string;
	role?: string;
	technologies?: string[];
	entries?: Array<{ title: string; url: string }>;
}

export class WorkExperience {
	constructor(
		public readonly metadata: WorkExperienceMetadata,
		public readonly body: string, // HTML content after markdown parsing
		public readonly language: Language,
		public readonly slug: string,
		/** The source `body` was rendered from, for the profile's Markdown. */
		public readonly markdown: string,
	) {}
}
