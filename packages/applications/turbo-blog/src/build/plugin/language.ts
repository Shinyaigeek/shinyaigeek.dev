import type { Plugin } from "ssg-router";
import type { Context } from "../context/context";
import { Language } from "../model/language/language.entity";

export const registerLanguagePlugin: Plugin<Context> = {
	async onRouted(path, context) {
		if (path.startsWith("/en/")) {
			context.language = Language.en;
		} else {
			context.language = Language.ja;
		}
	},
	async onGenerated(path, _, context) {
		if (path.startsWith("/en/")) {
			context.language = Language.en;
		} else {
			context.language = Language.ja;
		}
	},
	async onOutput(path, context) {
		if (path.startsWith("/en/")) {
			context.language = Language.en;
		} else {
			context.language = Language.ja;
		}
	},
};
