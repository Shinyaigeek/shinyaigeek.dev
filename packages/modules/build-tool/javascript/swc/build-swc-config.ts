import type { Config } from "@swc/core";

export const buildSwcConfig: () => Config = () => ({
	jsc: {
		parser: {
			syntax: "typescript",
			tsx: true,
		},
		transform: {
			react: {
				runtime: "automatic",
			},
		},
	},
	module: {
		type: "nodenext",
	},
});
