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
const SLIDE_SEPARATOR = /^\s*---\s*$/m;

export async function parseFleetContent(
	markdownContent: string,
): Promise<Result<{ metadata: FleetMetadata; slides: FleetSlide[] }, Error>> {
	try {
		const { attributes, body } = fm(markdownContent);

		const metadata = attributes as Omit<FleetMetadata, "path">;

		const slideContents = body
			.split(SLIDE_SEPARATOR)
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
		});
	} catch (error) {
		return createErr(error instanceof Error ? error : new Error(String(error)));
	}
}
