import type fs from "node:fs";
import type path from "node:path";
import { Language } from "../language/language.entity";
import { BlogContent } from "./blog.entity";

export class BlogRepository {
	private _fs: typeof fs;
	private _path: typeof path;

	constructor(injectedFs: typeof fs, injectedPath: typeof path) {
		this._fs = injectedFs;
		this._path = injectedPath;
	}

	public async getBlog(slug: string, language: Language): Promise<BlogContent> {
		const blogPath = this._path.resolve(
			process.cwd(),
			"packages/applications/turbo-blog/src/articles/",
			language === Language.ja ? "public" : "en",
			`${slug}.md`,
		);
		const blogContent = this._fs.readFileSync(blogPath, "utf-8");

		const [title, ...body] = blogContent.split("\n");

		return new BlogContent(title, body.join("\n"), language);
	}

	public async getBlogs(): Promise<BlogContent[]> {
		const blogPaths = this._fs.readdirSync(
			this._path.resolve(
				process.cwd(),
				"packages/applications/turbo-blog/src/articles/public",
			),
		);
		const blogEnPaths = this._fs.readdirSync(
			this._path.resolve(
				process.cwd(),
				"packages/applications/turbo-blog/src/articles/en",
			),
		);

		const blogs = blogPaths.map((blogPath) => {
			const blogContent = this._fs.readFileSync(
				this._path.resolve(
					process.cwd(),
					"packages/applications/turbo-blog/src/articles/public",
					blogPath,
				),
				"utf-8",
			);

			const [title, ...body] = blogContent.split("\n");

			return new BlogContent(title, body.join("\n"), Language.ja);
		});

		const blogsEn = blogEnPaths.map((blogPath) => {
			const blogContent = this._fs.readFileSync(
				this._path.resolve(
					process.cwd(),
					"packages/applications/turbo-blog/src/articles/en",
					blogPath,
				),
				"utf-8",
			);

			const [title, ...body] = blogContent.split("\n");

			return new BlogContent(title, body.join("\n"), Language.en);
		});

		return [...blogs, ...blogsEn];
	}
}
