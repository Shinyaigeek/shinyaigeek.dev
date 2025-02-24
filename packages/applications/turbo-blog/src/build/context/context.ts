import type { Language } from "../model/language/language.entity";

export type Context = {
	language: Language;
	builtAssets: {
		javascript: string;
		css: string;
	};
};
