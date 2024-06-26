import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBreak } from "./break/break";
import { mapCode } from "./code/code";
import { mapDelete } from "./delete/delete";
import { mapEmphasis } from "./emphasis/empasis";
import { mapFootnoteDefinition } from "./footnote-definition/footnote-definition";
import { mapFootnoteReference } from "./footnote-reference/footnote-reference";
import { mapHtml } from "./html/html";
import { mapImageReference } from "./image-reference/image-reference";
import { mapImage } from "./image/image";
import { mapInlineCode } from "./inline-code/inline-code";
import { mapLink } from "./link/link";
import { mapParagraph } from "./paragraph/paragraph";
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
			return mapFootnoteDefinition(node);
		}
		case "footnoteReference": {
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
		default: {
			console.log(node);
			throw new Error("TODO: Implement");
		}
	}
};
