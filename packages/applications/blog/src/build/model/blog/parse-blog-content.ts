import type { Root } from "hast";
import { selectAll } from "hast-util-select";
import {
	type Result,
	createOk,
	isErr,
	unwrapOk,
} from "option-t/esm/PlainResult";
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

	const parsed = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkReferences)
		.use(remarkRehype)
		.use(rehypeHighlight)
		.use(wrapTablesInContainer)
		.use(rehypeStringify)
		.use(applyHeadingIdForHeadings)
		.process(content);

	const body = parsed.toString();

	const { headingIds, headingContents } = extractHeadings(body);

	return createOk({
		metadata: {
			...metadata,
			headings: headingIds.map((id, index) => ({
				href: id,
				content: headingContents[index],
			})),
		},
		body,
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

/**
 * TODO: Currently, I extract headings with remark's plugin.
 * But, I want to extract headings with traverser after my own markdown parser is implemented.
 */
const applyHeadingIdForHeadings: Plugin<[], Root> = () => {
	return (tree) => {
		let count = 0;
		for (const node of selectAll("h1,h2,h3,h4,h5,h6", tree)) {
			const headingLevel = node.tagName.replace("h", "");
			node.properties = {
				...node.properties,
				id: `${headingLevel}__${count}`,
			};
			count++;
		}
	};
};

const extractHeadings = (html: string) => {
	const headings = html.match(/<h[1-6] id=".+?">.+?<\/h[1-6]>/g);
	if (!headings) {
		return { headingIds: [], headingContents: [] };
	}
	const headingIds = headings.map((heading) => {
		const regexp = heading.match(/id=".+?"/);
		if (!regexp) {
			return "";
		}
		return regexp[0].replace(/id="|"/g, "");
	});
	const headingContents = headings.map((heading) => {
		return heading.replace(/<h[1-6] id=".+?">/, "").replace(/<\/h[1-6]>/, "");
	});
	return { headingIds, headingContents };
};
