import { Content } from "../content/content.entity";
import type { Language } from "../language/language.entity";

export class BlogContent extends Content {
	public title: string;
	public language: Language;
	public body: string;

	constructor(title: string, body: string, language: Language) {
		super(body);
		this.title = title;
		this.body = body;
		this.language = language;
	}
}
