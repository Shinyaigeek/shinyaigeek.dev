import { Router } from "../../../router/router";
import fs from "fs";
import path from "path";
import { handlePost } from "../handlePost/handlePost";

export const getChildren: () => Router = function () {
	const children = new Router();
	const posts = fs.readdirSync(path.join(__dirname, "../src/articles/public"));
	for (let post of posts) {
		children.on(`/${post.replace(".md", "")}`, handlePost, undefined);
	}

	return children;
};
