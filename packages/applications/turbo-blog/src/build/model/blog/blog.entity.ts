import { Content } from "../content/content.entity";
import type { Language } from "../language/language.entity";

export interface BlogMetadata {
	title: string;
	tags: string[];
	description: string[];
	publishedAt: string;
	updatedAt: string;
	path: string;
}

export class BlogContent extends Content {
	public metadata: BlogMetadata;
	public language: Language;

	constructor(metadata: BlogMetadata, body: string, language: Language) {
		super(body);
		this.metadata = metadata;
		this.language = language;
	}
}
