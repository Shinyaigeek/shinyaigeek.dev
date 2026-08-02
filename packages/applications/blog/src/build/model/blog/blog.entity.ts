import { Content } from "../content/content.entity";
import type { Language } from "../language/language.entity";

export interface BlogMetadata {
	title: string;
	tags: string[];
	description: string;
	publishedAt: string;
	updatedAt: string;
	path: string;
	headings?: {
		href: string;
		content: string;
	}[];
}

export class BlogContent extends Content {
	public metadata: BlogMetadata;
	public language: Language;
	/**
	 * The article as it was written, with the frontmatter stripped off.
	 *
	 * `content` is the rendered HTML, which is what the page needs and all
	 * anything needed until the site started publishing an article's Markdown
	 * alongside it at <its path>index.md. Turning that HTML back into Markdown
	 * would be a lossy round trip of something we already have on disk, so the
	 * source rides along from the one place that has both.
	 */
	public markdown: string;

	constructor(
		metadata: BlogMetadata,
		body: string,
		language: Language,
		markdown: string,
	) {
		super(body);
		this.metadata = metadata;
		this.language = language;
		this.markdown = markdown;
	}
}
