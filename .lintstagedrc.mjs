import path from "path";

const buildLinterCommand = (filenames) => {
	return `pnpm __biome check --apply-unsafe ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" ")}`;
};

const config = {
	"*.{js,jsx,mjs,ts,tsx}": (files) => {
		return [
			buildLinterCommand(files),
			`pnpm __biome format --write ${files
				.map((file) => `"${file}"`)
				.join(" ")}`,
		].filter((command) => command.length > 0);
	},
};

export default config;
