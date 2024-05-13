export type AST = {
	type: NodeType;
	children: Node[];
};

export type NodeType = "root" | "blockquote" | "definition" | "break";

export type Node =
	| CodeNode
	| BreakNode
	| TextNode
	| EmphasisNode
	| ParagraphNode
	| DeleteNode
	| StrongNode
	| FootnoteDefinitionNode
	| FootnoteReferenceNode
	| HtmlNode
	| ImageNode
	| ImageReferenceNode
	| InlineCodeNode;

export type BreakNode = {
	type: "break";
};

export type CodeNode = {
	type: "code";
	language: string | null;
	meta: string | null;
	value: string;
};

export type TextNode = {
	type: "text";
	value: string;
};

export type EmphasisNode = {
	type: "emphasis";
	children: Node[];
};

export type DeleteNode = {
	type: "delete";
	children: Node[];
};

export type StrongNode = {
	type: "strong";
	children: Node[];
};

export type ParagraphNode = {
	type: "paragraph";
	children: Node[];
};

export type FootnoteDefinitionNode = {
	type: "footnote-definition";
	identifier: string;
	children: Node[];
};

export type FootnoteReferenceNode = {
	type: "footnote-reference";
	label: string | null;
	identifier: string;
};

export type HtmlNode = {
	type: "html";
	html: string;
};

export type ImageNode = {
	type: "image";
	url: string;
	title: string | null;
	alt: string | null;
};

export type ImageReferenceNode = {
	type: "image-reference";
	alt: string | null;
	reference: "full" | "shortcut" | "collapsed";
};

export type InlineCodeNode = {
	type: "inline-code";
	value: string;
};
