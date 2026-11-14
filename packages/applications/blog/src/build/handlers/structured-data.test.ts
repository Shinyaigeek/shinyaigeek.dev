import { describe, expect, test } from "vitest";
import { serializeJsonLd } from "../../ui/components/Shell/json-ld";
import { BlogContent } from "../model/blog/blog.entity";
import { Language } from "../model/language/language.entity";
import { blogPostingJsonLd } from "./structured-data";

describe("serializeJsonLd", () => {
	test("leaves nothing that could close the <script> it is written into", () => {
		const serialized = serializeJsonLd({
			"@context": "https://schema.org",
			headline: "</script><script>alert(1)</script>",
		});

		expect(serialized).not.toContain("<");
		expect(JSON.parse(serialized).headline).toBe(
			"</script><script>alert(1)</script>",
		);
	});
});

describe("blogPostingJsonLd", () => {
	test("describes an article, its author and its Markdown", () => {
		const blogPost = new BlogContent(
			{
				title: "Title",
				description: "Description",
				tags: ["TypeScript", "AST"],
				publishedAt: "2021/3/2",
				updatedAt: "2021/12/10",
				path: "slug",
			},
			"<p>body</p>",
			Language.en,
			"body",
		);

		expect(blogPostingJsonLd(blogPost, Language.en)).toEqual({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: "Title",
			description: "Description",
			datePublished: "2021-03-02",
			dateModified: "2021-12-10",
			inLanguage: "en",
			url: "https://en.shinyaigeek.dev/post/slug/",
			mainEntityOfPage: "https://en.shinyaigeek.dev/post/slug/",
			image: "https://en.shinyaigeek.dev/post/slug/ogp.png",
			keywords: ["TypeScript", "AST"],
			author: {
				"@type": "Person",
				name: "Shinyaigeek",
				url: "https://en.shinyaigeek.dev/profile/",
				sameAs: [
					"https://github.com/Shinyaigeek",
					"https://x.com/Shinyaigeek",
					"https://www.linkedin.com/in/shinyaigeek/",
				],
			},
			encoding: {
				"@type": "MediaObject",
				contentUrl: "https://en.shinyaigeek.dev/post/slug/index.md",
				encodingFormat: "text/markdown",
			},
		});
	});
});
