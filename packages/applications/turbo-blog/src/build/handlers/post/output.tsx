import fs from "node:fs/promises";

export const outputBlogPostPage: ({
	path,
	content,
}: { path: string; content: string }) => Promise<void> = async ({
	path,
	content,
}) => {
	await fs.mkdir(`./public${path}`, { recursive: true });
	await fs.writeFile(`./public${path}/index.html`, content);
};
