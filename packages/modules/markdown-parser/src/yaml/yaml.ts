import type { Yaml } from "mdast";
import type { YamlNode } from "../ast";

export const mapYaml: (node: Yaml) => YamlNode = (node) => ({
	type: "yaml",
	value: node.value,
});
