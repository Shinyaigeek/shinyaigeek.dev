import fs from "node:fs";
import path from "node:path";
import { BlogContent } from "./blog.entity";

export class BlogRepository {
	private _fs: typeof fs;
	private _path: typeof path;

	constructor(injectedFs: typeof fs, injectedPath: typeof path) {
		this._fs = injectedFs;
		this._path = injectedPath;
	}

	public async getBlog(slug: string): Promise<BlogContent> {
		const blogPath = this._path.resolve(
			process.cwd(),
			"packages/applications/turbo-blog/src/articles/public",
			`${slug}.md`,
		);
		const blogContent = this._fs.readFileSync(blogPath, "utf-8");

		const [title, ...body] = blogContent.split("\n");

		return new BlogContent(title, body.join("\n"));
	}
}
