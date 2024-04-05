import { readContentsDirectory } from "../../../../contents-handler/contents-reader";
import { Router } from "../../../router/router";
import { handlePost } from "../handlePost/handlePost";

export const getChildren: () => Promise<Router> = async () => {
	const children = new Router();
	const posts = await readContentsDirectory("./src/articles/public/");
	for (const post of posts) {
		children.on(`/${post.replace(".md", "")}`, handlePost, undefined);
	}

	return children;
};
