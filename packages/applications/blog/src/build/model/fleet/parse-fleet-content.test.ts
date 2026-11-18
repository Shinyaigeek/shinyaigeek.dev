import { isOk, unwrapOk } from "option-t/plain_result";
import { describe, expect, test } from "vitest";
import { parseFleetContent } from "./parse-fleet-content";

const parse = async (body: string) => {
	const result = await parseFleetContent(
		`---\ntitle: "t"\npublishedAt: "2026-11-18"\n---\n\n${body}`,
	);
	if (!isOk(result)) throw new Error("expected the fleet to parse");
	return unwrapOk(result);
};

describe("parseFleetContent", () => {
	test("splits slides on a line of dashes", async () => {
		const { slides } = await parse("# One\n\n---\n\n## Two\n\n---\n\n## Three");
		expect(slides).toHaveLength(3);
	});

	// A slide showing YAML frontmatter, or any other code with a `---` line in
	// it, has to stay one slide.
	test("does not split on a line of dashes inside a fenced code block", async () => {
		const { slides, markdown } = await parse(
			[
				"## Frontmatter",
				"",
				"```markdown",
				"---",
				"type: Metric",
				"---",
				"# Definition",
				"```",
				"",
				"---",
				"",
				"## Next",
			].join("\n"),
		);
		expect(slides).toHaveLength(2);
		expect(slides[0]?.content).toContain("type: Metric");
		expect(markdown).toContain("```markdown\n---\ntype: Metric\n---");
	});

	test("treats a tilde fence the same way", async () => {
		const { slides } = await parse("~~~\n---\n~~~\n\n---\n\n## Next");
		expect(slides).toHaveLength(2);
	});
});
