import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBlockquote } from "./blockquote/blockquote";
import { mapBreak } from "./break/break";
import { mapCode } from "./code/code";
import { mapDefinition } from "./definition/definition";
import { mapDelete } from "./delete/delete";
import { mapEmphasis } from "./emphasis/emphasis";
import { mapFootnoteDefinition } from "./footnote-definition/footnote-definition";
import { mapFootnoteReference } from "./footnote-reference/footnote-reference";
import { mapHeading } from "./heading/heading";
import { mapHtml } from "./html/html";
import { mapImageReference } from "./image-reference/image-reference";
import { mapImage } from "./image/image";
import { mapInlineCode } from "./inline-code/inline-code";
import { mapLinkReference } from "./link-reference/link-reference";
import { mapLink } from "./link/link";
import { mapListItem } from "./list-item/list-item";
import { mapList } from "./list/list";
import { mapParagraph } from "./paragraph/paragraph";
import { mapReferenceDefinition } from "./reference-definition/reference-definition";
import { mapReferenceReference } from "./reference-reference/reference-reference";
import { mapStrong } from "./strong/strong";
import { mapTableCell } from "./table-cell/table-cell";
import { mapTableRow } from "./table-row/table-row";
import { mapTable } from "./table/table";
import { mapText } from "./text/text";
import { mapThematicBreak } from "./thematic-break/thematic-break";
import { mapYaml } from "./yaml/yaml";

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
		case "blockquote": {
			return mapBlockquote(node);
		}
		case "thematicBreak": {
			return mapThematicBreak(node);
		}
		case "list": {
			return mapList(node);
		}
		case "listItem": {
			return mapListItem(node);
		}
		case "table": {
			return mapTable(node);
		}
		case "tableRow": {
			return mapTableRow(node);
		}
		case "tableCell": {
			return mapTableCell(node);
		}
		case "definition": {
			return mapDefinition(node);
		}
		case "linkReference": {
			return mapLinkReference(node);
		}
		case "yaml": {
			return mapYaml(node);
		}
		default: {
			// Every mdast node type is handled above, so `node` is `never` here. If
			// mdast gains a type, this stops compiling instead of throwing at
			// runtime on somebody's article.
			return assertNeverNode(node);
		}
	}
};

const assertNeverNode = (node: never): never => {
	throw new Error(
		`Unhandled mdast node: ${JSON.stringify((node as { type?: unknown }).type)}`,
	);
};
