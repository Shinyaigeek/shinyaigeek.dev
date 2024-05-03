import type { RootContent } from "mdast";
import type { Node } from "./ast";
import { mapBreak } from "./break/break";
import { mapCode } from "./code/code";

export const mapNode: (node: RootContent) => Node = (node) => {
	switch (node.type) {
		case "break": {
			return mapBreak(node);
		}
		case "code": {
			return mapCode(node);
		}
		default: {
			throw new Error("TODO: Implement");
		}
	}
};
