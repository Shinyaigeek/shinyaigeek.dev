export type AST = {
	type: NodeType;
	children: Node[];
};

export type NodeType = "root" | "blockquote" | "definition" | "break";

export type Node = CodeNode | BreakNode;

export type BreakNode = {
	type: "break";
};

export type CodeNode = {
	type: "code";
	language: string | null;
	meta: string | null;
	value: string;
};
