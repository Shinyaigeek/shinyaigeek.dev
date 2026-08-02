import { describe, expect, test } from "vitest";
import { absoluteAssetUrls } from "./absolute-asset-urls";

const baseUrl = "https://ja.shinyaigeek.dev";

describe("absoluteAssetUrls", () => {
	test("rewrites a root absolute asset link", () => {
		expect(absoluteAssetUrls("![a](/assets/x/y.png)", baseUrl)).toBe(
			"![a](https://ja.shinyaigeek.dev/assets/x/y.png)",
		);
	});

	// The two 2021 articles reach the same directory this way instead.
	test("rewrites an asset link written relative to the article source", () => {
		expect(absoluteAssetUrls("![a](../../../assets/x/y.png)", baseUrl)).toBe(
			"![a](https://ja.shinyaigeek.dev/assets/x/y.png)",
		);
	});

	test("rewrites every link in a document, not just the first", () => {
		expect(
			absoluteAssetUrls(
				"![a](/assets/a.png)\n![b](../../../assets/b.png)",
				baseUrl,
			),
		).toBe(
			"![a](https://ja.shinyaigeek.dev/assets/a.png)\n![b](https://ja.shinyaigeek.dev/assets/b.png)",
		);
	});

	test("leaves a link that is already absolute alone", () => {
		const already = "![a](https://example.com/assets/x.png)";
		expect(absoluteAssetUrls(already, baseUrl)).toBe(already);
	});

	// The articles are full of ordinary outbound links, and "assets" is an
	// unremarkable enough path segment to appear in one.
	test("leaves a link to another site's assets alone", () => {
		const outbound = "[docs](https://example.com/docs/assets/guide)";
		expect(absoluteAssetUrls(outbound, baseUrl)).toBe(outbound);
	});
});
