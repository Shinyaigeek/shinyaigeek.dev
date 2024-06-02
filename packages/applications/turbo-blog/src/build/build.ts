import { Router } from "ssg-router";
import type { Context } from "./context/context";
import { generateIndexPage } from "./handlers/index/generate";
import { outputIndexPage } from "./handlers/index/output";
import { generateBlogPostPage } from "./handlers/post/generate";
import {
	getEnglishBlogChildren,
	getJapaneseBlogChildren,
} from "./handlers/post/getBlogChildren/getBlogChildren";
import { outputBlogPostPage } from "./handlers/post/output";
import { generateProfilePage } from "./handlers/profile/generate";
import { outputProfilePage } from "./handlers/profile/output";
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
router.onChildren(getEnglishBlogChildren, {
	generate: generateBlogPostPage,
	output: outputBlogPostPage,
});
router.on("/profile/", {
	generate: generateProfilePage,
	output: outputProfilePage,
});
router.on("/en/profile/", {
	generate: generateProfilePage,
	output: outputProfilePage,
});

router.out();
