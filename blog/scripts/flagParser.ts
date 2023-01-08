interface Flags {
	target?: string;
}

export const flagParser = () => {
	const args = process.argv;

	const res: Flags = {};

	args.forEach((ar) => {
		if (ar.includes("--target") || ar.includes("-t")) {
			res.target = ar.split("=")[1];
		}
	});

	return res;
};
