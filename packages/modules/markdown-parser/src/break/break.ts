import type { Break } from "mdast";
import type { Node } from "../ast";

export const mapBreak: (node: Break) => Node = (_) => ({
	type: "break",
});
