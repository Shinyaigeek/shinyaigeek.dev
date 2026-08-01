import type { Configuration } from "@rspack/cli";
import { rspackBaseConfig } from "build-tool";
import { merge } from "webpack-merge";

/**
 * The client bundle as the dev loop builds it.
 *
 * Reuses the shared base config so CSS modules resolve to the same class names
 * in dev as in production. It used to redeclare the CSS rule with
 * style-loader + css-loader *and* `type: "css"`, which mixes the JS-based CSS
 * pipeline with Rspack's native one.
 *
 * There is no devServer block here any more, and no react-refresh. `rspack
 * serve` cannot serve this site: the pages are generated into public/ja and
 * public/en with the bundles beside them in public/assets, and serving public/
 * as one root puts the site at /ja/, where every root-absolute link in it 404s.
 * Nor was there anything for Fast Refresh to preserve -- main.tsx drives the
 * DOM directly and React only ever runs at build time. scripts/dev.ts drives
 * this config and serves the generated tree the way h2o does.
 */
const configForDevelopment: Configuration = {
	entry: {
		client: "./src/client/main.tsx",
	},
	output: {
		// Unhashed, so the name is stable across rebuilds: the built-assets plugin
		// finds the bundle by reading the directory, and the dev server sends
		// everything no-store, so there is nothing for a content hash to bust.
		filename: "[name].js",
		cssFilename: "[name].css",
		path: "public/assets",
		// public/assets also holds the copied static assets, which `clean` would
		// delete on every rebuild. The dev loop empties public/ once at startup,
		// which is what stale output actually needs.
		clean: false,
	},
	mode: "development",
	devtool: "eval-cheap-module-source-map",
	target: "web",
};

export default merge(rspackBaseConfig, configForDevelopment);
