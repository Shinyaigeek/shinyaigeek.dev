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
	/** The frontmatter-stripped source, for the Markdown the site also serves. */
	markdown: string;
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
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeHighlight)
		.use(wrapTablesInContainer)
		.use(stripRawScripts)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.use(collectHeadings(headings))
		.process(content);

	return createOk({
		metadata: {
			...metadata,
			headings,
		},
		body: parsed.toString(),
		markdown: content,
	});
};

/**
 * Drops `<script>` out of the raw HTML an article passes through.
 *
 * Raw HTML reaches the output at all so that a post can embed an iframe -- a
 * live demo, a playground -- which markdown has no syntax for. But two 2020
 * posts paste Twitter's embed snippet, whose trailing
 * `<script src="platform.twitter.com/widgets.js">` had been silently dropped
 * for years; letting raw HTML through would start loading it. The blockquote
 * still renders, just as a plain quote.
 *
 * Raw nodes are unparsed strings at this point, hence the regexp rather than a
 * tree walk. It only has to hold against markdown I wrote myself.
 */
const stripRawScripts: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== "raw") {
				return;
			}

			const raw = node as unknown as { value: string };
			raw.value = raw.value.replace(/<script\b[\s\S]*?<\/script\s*>/gi, "");
		});
	};
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
