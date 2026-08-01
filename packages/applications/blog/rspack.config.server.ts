import type { Configuration } from "@rspack/cli";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

const configForApplicationServer: Configuration = {
	entry: {
		build: "./src/build/build.ts",
	},
	output: {
		filename: "[name].js",
		chunkFormat: "module",
		library: {
			type: "module",
		},
		// Rspack 2 reads the ESM output flag from here. It used to be set as
		// `experiments.outputModule`, which Rspack 2 no longer has: the key was
		// simply ignored, and only the library type and chunk format above were
		// holding the output to ESM. Nothing was checking this file until
		// scripts/dev.ts started importing it.
		module: true,
	},
	target: "node",
	externalsType: "module",
	externals: {
		"@resvg/resvg-js": "@resvg/resvg-js",
		satori: "satori",
	},
};

export default merge(rspackBaseConfig, configForApplicationServer);
