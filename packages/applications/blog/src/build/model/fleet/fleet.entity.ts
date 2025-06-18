import type { Language } from "../language/language.entity";

export interface FleetMetadata {
	title: string;
	publishedAt: string;
	tags?: string[];
	path: string;
}

export interface FleetSlide {
	content: string;
}

export class FleetContent {
	constructor(
		public readonly metadata: FleetMetadata,
		public readonly slides: FleetSlide[],
		public readonly language: Language,
	) {}
}
