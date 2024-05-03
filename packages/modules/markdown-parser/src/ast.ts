export type AST = {
	type: NodeType;
	children: Node[];
};

export type NodeType = "root" | "blockquote" | "definition" | "break";

export type Node = {
	type: NodeType;
	children?: Node[];
};
