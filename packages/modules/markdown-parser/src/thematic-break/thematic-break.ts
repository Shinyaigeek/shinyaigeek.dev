import type { ThematicBreak } from "mdast";
import type { ThematicBreakNode } from "../ast";

export const mapThematicBreak: (node: ThematicBreak) => ThematicBreakNode = (
	_,
) => ({
	type: "thematic-break",
});
