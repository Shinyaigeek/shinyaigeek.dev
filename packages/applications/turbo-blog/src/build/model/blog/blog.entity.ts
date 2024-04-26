import { Content } from "../content/content.entity";

export class BlogContent extends Content {
	public title: string;
	public language: "ja" | "en";
	public body: string;

	constructor(title: string, body: string, language: "ja" | "en") {
		super(body);
		this.title = title;
		this.body = body;
		this.language = language;
	}
}
