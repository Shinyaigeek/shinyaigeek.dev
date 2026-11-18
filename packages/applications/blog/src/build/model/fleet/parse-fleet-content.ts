import fm from "front-matter";
import { type Result, createErr, createOk } from "option-t/plain_result";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { FleetMetadata, FleetSlide } from "./fleet.entity";

/**
 * Slides go through the same pipeline as articles, so a fleet gets GFM and
 * syntax highlighting. It used to render with `marked`, which highlights
 * nothing -- unfortunate for a format whose slides are mostly code.
 */
const renderSlide = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeHighlight)
	.use(rehypeStringify);

/** A line of only dashes separates one slide from the next. */
const SLIDE_SEPARATOR = /^\s*---\s*$/;
const FENCE = /^\s*(`{3,}|~{3,})/;

/**
 * Splits a fleet's body into its slides' source, on separator lines outside
 * fenced code -- a slide that shows YAML frontmatter has `---` lines of its
 * own, and splitting there would cut the example in half.
 */
const splitSlides = (body: string): string[] => {
	const slides: string[][] = [[]];
	let fence: string | null = null;

	for (const line of body.split("\n")) {
		const marker = FENCE.exec(line)?.[1];
		if (fence === null && marker) {
			fence = marker;
		} else if (
			fence !== null &&
			marker?.[0] === fence[0] &&
			marker.length >= fence.length
		) {
			fence = null;
		} else if (fence === null && SLIDE_SEPARATOR.test(line)) {
			slides.push([]);
			continue;
		}
		slides[slides.length - 1]?.push(line);
	}

	return slides.map((lines) => lines.join("\n"));
};

export async function parseFleetContent(
	markdownContent: string,
): Promise<
	Result<
		{ metadata: FleetMetadata; slides: FleetSlide[]; markdown: string },
		Error
	>
> {
	try {
		const { attributes, body } = fm(markdownContent);

		const metadata = attributes as Omit<FleetMetadata, "path">;

		const slideContents = splitSlides(body)
			.map((content) => content.trim())
			.filter((content) => content);

		const slides: FleetSlide[] = await Promise.all(
			slideContents.map(async (slideContent) => ({
				content: String(await renderSlide.process(slideContent)),
			})),
		);

		return createOk({
			metadata: metadata as FleetMetadata,
			slides,
			markdown: slideContents.join("\n\n---\n\n"),
		});
	} catch (error) {
		return createErr(error instanceof Error ? error : new Error(String(error)));
	}
}
