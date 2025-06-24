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

	get slideCount(): number {
		return this.slides.length;
	}

	get title(): string {
		return this.metadata.title;
	}

	get publishedAt(): string {
		return this.metadata.publishedAt;
	}

	get path(): string {
		return this.metadata.path;
	}

	get tags(): string[] | undefined {
		return this.metadata.tags;
	}
}
