import { Content } from "../content/content.entity";

export class BlogContent extends Content {
	public title: string;
	public body: string;

	constructor(title: string, body: string) {
		super(body);
		this.title = title;
		this.body = body;
	}
}
