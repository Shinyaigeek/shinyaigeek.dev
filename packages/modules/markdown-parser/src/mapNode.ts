import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBlockquote } from "./blockquote";
import { mapBreak } from "./break/break";

export const mapNode: (node: RootContent) => Node = (node) => {
	switch (node.type) {
		case "break": {
			return mapBreak(node);
		}
		default: {
			throw new Error("TODO: Implement");
		}
	}
};
