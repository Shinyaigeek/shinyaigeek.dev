import { Router } from "../../../router/router";
import { handlePost } from "../handlePost/handlePost";
import { readContentsDirectory } from "../../../../contents-handler/contents-reader";

export const getChildren: () => Promise<Router> = async function () {
	const children = new Router();
	const posts = await readContentsDirectory("./src/articles/public/");
	for (let post of posts) {
		children.on(`/${post.replace(".md", "")}`, handlePost, undefined);
	}

	return children;
};
