import { Router } from "ssg-router";
import type { Context } from "./context/context";
import { generateIndexPage } from "./handlers/index/generate";
import { outputIndexPage } from "./handlers/index/output";
import { generateBlogPostPage } from "./handlers/post/generate";
import { getJapaneseBlogChildren } from "./handlers/post/getBlogChildren/getBlogChildren";
import { outputBlogPostPage } from "./handlers/post/output";
import { registerLanguagePlugin } from "./plugin/language";

const router = new Router<Context>();

router.register(registerLanguagePlugin);

router.on("/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});
router.on("/en/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});
router.onChildren(getJapaneseBlogChildren, {
	generate: generateBlogPostPage,
	output: outputBlogPostPage,
});

router.out();
