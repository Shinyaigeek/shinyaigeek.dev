import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBreak } from "./break/break";
import { mapCode } from "./code/code";
import { mapDelete } from "./delete/delete";
import { mapEmphasis } from "./emphasis/empasis";
import { mapFootnoteDefinition } from "./footnote-definition/footnote-definition";
import { mapFootnoteReference } from "./footnote-reference/footnote-reference";
import { mapHeading } from "./heading/heading";
import { mapHtml } from "./html/html";
import { mapImageReference } from "./image-reference/image-reference";
import { mapImage } from "./image/image";
import { mapInlineCode } from "./inline-code/inline-code";
import { mapLink } from "./link/link";
import { mapParagraph } from "./paragraph/paragraph";
import { mapReferenceDefinition } from "./reference-definition/reference-definition";
import { mapReferenceReference } from "./reference-reference/reference-reference";
import { mapStrong } from "./strong/strong";
import { mapText } from "./text/text";

export const mapNode: (node: RootContent) => Node = (node) => {
	switch (node.type) {
		case "break": {
			return mapBreak(node);
		}
		case "code": {
			return mapCode(node);
		}
		case "text": {
			return mapText(node);
		}
		case "emphasis": {
			return mapEmphasis(node);
		}
		case "paragraph": {
			return mapParagraph(node);
		}
		case "delete": {
			return mapDelete(node);
		}
		case "strong": {
			return mapStrong(node);
		}
		case "footnoteDefinition": {
			// Check if this is a reference (starts with "ref")
			if (node.identifier.startsWith("ref")) {
				return mapReferenceDefinition(node);
			}
			return mapFootnoteDefinition(node);
		}
		case "footnoteReference": {
			// Check if this is a reference (starts with "ref")
			if (node.identifier.startsWith("ref")) {
				return mapReferenceReference(node);
			}
			return mapFootnoteReference(node);
		}
		case "html": {
			return mapHtml(node);
		}
		case "image": {
			return mapImage(node);
		}
		case "imageReference": {
			return mapImageReference(node);
		}
		case "inlineCode": {
			return mapInlineCode(node);
		}
		case "link": {
			return mapLink(node);
		}
		case "heading": {
			return mapHeading(node);
		}
		default: {
			console.log(node);
			throw new Error("TODO: Implement");
		}
	}
};
