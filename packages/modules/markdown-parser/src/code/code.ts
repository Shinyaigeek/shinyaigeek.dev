import type { Code } from "mdast";
import type { CodeNode } from "../ast";

export const mapCode: (node: Code) => CodeNode = (node) => ({
	type: "code",
	value: node.value,
	language: node.lang ?? null,
	meta: node.meta ?? null,
});
