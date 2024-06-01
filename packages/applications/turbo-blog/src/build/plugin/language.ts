import type { Plugin } from "ssg-router";
import type { Context } from "../context/context";
import { Language } from "../model/language/language.entity";

export const registerLanguagePlugin: Plugin<Context> = {
	async onRouted(_, context) {
		context.language = Language.ja;
	},
};
