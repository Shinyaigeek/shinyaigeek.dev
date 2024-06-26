export const generateHash = (key: string) => {
	const contenthash =
		(process.env.CONTENTHASH_JS ?? "") + (process.env.CONTENTHASH_CSS ?? "");
	return Math.abs(
		(key + contenthash).split("").reduce((a, b) => {
			// biome-ignore lint: reason
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0),
	);
};
