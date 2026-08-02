/**
 * Points an article's image links at the host it is served from.
 *
 * They are written two ways across the articles -- "/assets/x.png" and
 * "../../../assets/x.png" -- and both happen to resolve to the same place from
 * an article's own URL, which is why the pages have never needed this. A .md is
 * routinely read somewhere other than the URL it came from, though, where
 * neither form means anything, so they are resolved here rather than left to
 * whatever fetched the file.
 *
 * Only the Markdown link form is rewritten. A handful of articles embed raw
 * HTML for things Markdown has no syntax for, but those are iframes pointing at
 * absolute URLs elsewhere, not images out of this directory.
 */
export const absoluteAssetUrls = (markdown: string, baseUrl: string) =>
	markdown.replace(/\]\((?:\.\.\/)*\/?assets\//g, `](${baseUrl}/assets/`);
