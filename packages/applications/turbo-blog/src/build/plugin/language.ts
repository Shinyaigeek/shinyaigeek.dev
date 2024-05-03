import type { Plugin } from "ssg-router";
import type { Context } from "../context/context";

export const registerLanguagePlugin: Plugin<Context> = {
	async onRouted(_, context) {
		context.language = "ja";
	},
};
