export const getOmmit = (target: string) => {
	return target
		.slice(target.search("\n") + 1, target.replace("##", "").search("##"))
		.replace(/\!\[.*\]\(.*\)/g, "");
};
