export type AST = {
	type: "root";
	children: Node[];
};

export type NodeType = Node["type"];

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
	| ReferenceDefinitionNode
	| ReferenceReferenceNode
	| HeadingNode
	| HtmlNode
	| ImageNode
	| ImageReferenceNode
	| InlineCodeNode
	| LinkNode
	| BlockquoteNode
	| ThematicBreakNode
	| ListNode
	| ListItemNode
	| TableNode
	| TableRowNode
	| TableCellNode
	| DefinitionNode
	| LinkReferenceNode
	| YamlNode;

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

export type LinkNode = {
	type: "link";
	url: string;
	title: string | null;
	children: Node[];
};

export type ReferenceDefinitionNode = {
	type: "reference-definition";
	identifier: string;
	title: string;
	url?: string;
	accessDate?: string;
	children: Node[];
};

export type ReferenceReferenceNode = {
	type: "reference-reference";
	label: string | null;
	identifier: string;
};

export type HeadingNode = {
	type: "heading";
	depth: number;
	children: Node[];
};

export type BlockquoteNode = {
	type: "blockquote";
	children: Node[];
};

export type ThematicBreakNode = {
	type: "thematic-break";
};

export type ListNode = {
	type: "list";
	ordered: boolean;
	/** Where an ordered list starts counting; null for unordered lists. */
	start: number | null;
	spread: boolean;
	children: ListItemNode[];
};

export type ListItemNode = {
	type: "list-item";
	/** Set only for GFM task list items: true for [x], false for [ ]. */
	checked: boolean | null;
	spread: boolean;
	children: Node[];
};

export type TableNode = {
	type: "table";
	/** Column alignments, in column order; null where the column sets none. */
	align: TableAlign[];
	children: TableRowNode[];
};

export type TableAlign = "left" | "right" | "center" | null;

export type TableRowNode = {
	type: "table-row";
	children: TableCellNode[];
};

export type TableCellNode = {
	type: "table-cell";
	children: Node[];
};

/** A link reference definition: the `[id]: url "title"` line itself. */
export type DefinitionNode = {
	type: "definition";
	identifier: string;
	label: string | null;
	url: string;
	title: string | null;
};

export type LinkReferenceNode = {
	type: "link-reference";
	identifier: string;
	label: string | null;
	reference: "full" | "shortcut" | "collapsed";
	children: Node[];
};

/** Frontmatter, present only when the processor enables remark-frontmatter. */
export type YamlNode = {
	type: "yaml";
	value: string;
};
