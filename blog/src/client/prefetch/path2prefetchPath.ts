export const path2prefetchPath = (path: string | null) => {
	// TODO
	if (path && path.startsWith("/post")) {
		return `/prefetch${path}`;
	}
	return undefined;
};
