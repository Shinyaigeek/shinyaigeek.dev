/**
 * Collapses a run of text onto one line.
 *
 * An article's `description` is frontmatter, and several of them are written
 * across several lines -- some are whole paragraphs. The feed gets away with
 * that by wrapping them in CDATA and the pages by putting them in an attribute,
 * but a Markdown list item and a blockquote are both line oriented: a newline
 * in the middle of one ends it, and the rest of the description becomes body
 * text of the document it was supposed to be a note on.
 */
export const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();
