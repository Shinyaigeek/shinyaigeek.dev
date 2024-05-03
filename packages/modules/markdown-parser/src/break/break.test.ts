import { describe, expect, it } from "vitest";
import { mapBreak } from "./break";

describe("mapBreak", () => {
	it("should map Break to break", () => {
		const result = mapBreak({ type: "break" });
		expect(result).toEqual({ type: "break" });
	});
});
