import type { Nodes, Root } from "hast";
import { selectAll } from "hast-util-select";
import { type Result, createOk, isErr, unwrapOk } from "option-t/plain_result";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { type Plugin, unified } from "unified";
import { visit } from "unist-util-visit";
import { remarkReferences } from "../../plugins/remark-references";
import type { BlogMetadata } from "./blog.entity";
import { extractBlogMetadata } from "./extract-blog-metadata";

interface ParseBlogContentResult {
	metadata: BlogMetadata;
	body: string;
}

export const parseBlogContent: (
	blogContent: string,
) => Promise<Result<ParseBlogContentResult, Error>> = async (blogContent) => {
	const extractBlogMetadataResult = extractBlogMetadata(blogContent);

	if (isErr(extractBlogMetadataResult)) {
		return extractBlogMetadataResult;
	}

	const { content, metadata } = unwrapOk(extractBlogMetadataResult);

	const headings: Headings = [];

	const parsed = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkReferences)
		.use(remarkRehype)
		.use(rehypeHighlight)
		.use(wrapTablesInContainer)
		.use(rehypeStringify)
		.use(collectHeadings(headings))
		.process(content);

	return createOk({
		metadata: {
			...metadata,
			headings,
		},
		body: parsed.toString(),
	});
};

/**
 * Wraps tables in a scrollable container for responsive design
 */
const wrapTablesInContainer: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (node.tagName !== "table" || !parent || typeof index !== "number") {
				return;
			}

			parent.children[index] = {
				type: "element",
				tagName: "div",
				properties: {
					className: ["table-container"],
				},
				children: [node],
			};
		});
	};
};

type Headings = NonNullable<BlogMetadata["headings"]>;

/**
 * Gives every heading an id and records it for the table of contents.
 *
 * The two used to be separate steps: this walk set the ids, then the stringified
 * HTML was matched with a regular expression to read them back out. That handed
 * the table of contents each heading's inner *markup*, which the component
 * renders as text -- a heading like "About `--format` option" listed itself with
 * the <code> tags spelled out. Reading the text off the node we are already
 * standing on is both one pass and the content the component actually wants.
 *
 * TODO: swap the hast walk for a traverser over my own markdown parser once that
 * is wired in.
 */
const collectHeadings =
	(headings: Headings): Plugin<[], Root> =>
	() =>
	(tree) => {
		let count = 0;
		for (const node of selectAll("h1,h2,h3,h4,h5,h6", tree)) {
			const headingLevel = node.tagName.replace("h", "");
			const href = `${headingLevel}__${count}`;

			node.properties = {
				...node.properties,
				id: href,
			};
			headings.push({ href, content: textContent(node) });
			count++;
		}
	};

/** The visible text of a node, with any inline markup dropped. */
const textContent = (node: Nodes): string => {
	let text = "";
	visit(node, "text", (textNode) => {
		text += textNode.value;
	});
	return text;
};
