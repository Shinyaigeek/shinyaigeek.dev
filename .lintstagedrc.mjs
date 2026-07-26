import path from "node:path";

const relative = (files) =>
	files.map((file) => path.relative(process.cwd(), file)).join(" ");

const config = {
	"*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}": (files) => [
		`pnpm exec oxlint --fix ${relative(files)}`,
		`pnpm exec oxfmt ${relative(files)}`,
	],
};

export default config;
