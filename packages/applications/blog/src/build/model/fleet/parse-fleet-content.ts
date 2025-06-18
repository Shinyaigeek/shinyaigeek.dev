import fm from "front-matter";
import { marked } from "marked";
import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import type { FleetMetadata, FleetSlide } from "./fleet.entity";

export async function parseFleetContent(
	markdownContent: string,
): Promise<Result<{ metadata: FleetMetadata; slides: FleetSlide[] }, Error>> {
	try {
		const { attributes, body } = fm(markdownContent);

		const metadata = attributes as Omit<FleetMetadata, "path">;

		// Split content by --- to create slides
		const slideContents = body
			.split(/\n---\n/)
			.filter((content) => content.trim());

		const slides: FleetSlide[] = [];

		for (const slideContent of slideContents) {
			const renderedContent = await marked(slideContent.trim());
			slides.push({ content: renderedContent });
		}

		return createOk({
			metadata: metadata as FleetMetadata,
			slides,
		});
	} catch (error) {
		return createErr(error instanceof Error ? error : new Error(String(error)));
	}
}
