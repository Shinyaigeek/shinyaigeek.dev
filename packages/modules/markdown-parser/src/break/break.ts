import type { Break } from "mdast";
import type { BreakNode } from "../ast";

export const mapBreak: (node: Break) => BreakNode = (_) => ({
	type: "break",
});
