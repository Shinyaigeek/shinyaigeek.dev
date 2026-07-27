import type { Definition } from "mdast";
import type { DefinitionNode } from "../ast";

export const mapDefinition: (node: Definition) => DefinitionNode = (node) => ({
	type: "definition",
	identifier: node.identifier,
	label: node.label ?? null,
	url: node.url,
	title: node.title ?? null,
});
