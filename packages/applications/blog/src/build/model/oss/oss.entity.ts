import type { Language } from "../language/language.entity";

export type OSSKind = "creator" | "contributor";

export interface OSSHighlight {
	title: string;
	url: string;
}

export interface OSSProjectMetadata {
	name: string;
	url: string;
	kind: OSSKind;
	stars?: number;
	language?: string;
	technologies?: string[];
	highlights?: OSSHighlight[];
}

export class OSSProject {
	constructor(
		public readonly metadata: OSSProjectMetadata,
		public readonly body: string, // HTML content after markdown parsing
		public readonly language: Language,
		public readonly slug: string,
	) {}
}
