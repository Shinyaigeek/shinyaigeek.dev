import type webpack from "webpack";
import { buildSwcConfig } from "../javascript/swc/build-swc-config.ts";

export const webpackBaseConfig: webpack.Configuration = {
	resolve: {
		extensions: [
			".ts",
			".tsx",
			".mts",
			".cts",
			".js",
			".jsx",
			".cjs",
			".mjs",
			".json",
			".css",
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "swc-loader",
				options: buildSwcConfig(),
			},
			{
				// sass-loader used to sit behind css-loader here, but there is not a
				// single .scss/.sass file in the repo, and sass-loader v17 resolves
				// sass-embedded eagerly, so it only ever broke the build.
				test: /\.css$/i,
				use: [
					{
						loader: "css-loader",
						options: {
							modules: {
								// css-loader v7 switched namedExport on by default, which
								// removes the default export that `import styles from
								// "./x.module.css"` relies on.
								namedExport: false,
							},
						},
					},
				],
			},
		],
	},
};
