import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBreak } from "./break/break";
import { mapCode } from "./code/code";
import { mapDelete } from "./delete/delete";
import { mapEmphasis } from "./emphasis/empasis";
import { mapFootnoteReference } from "./footnote-reference/footnote-reference";
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
		case "footnoteReference": {
			return mapFootnoteReference(node);
		}
		default: {
			console.log(node);
			throw new Error("TODO: Implement");
		}
	}
};
