import { Router } from "ssg-router";
import type { Context } from "./context/context";
import { generateIndexPage } from "./handlers/index/generate";
import { outputIndexPage } from "./handlers/index/output";
import { generateBlogPostPage } from "./handlers/post/children/generate";
import { outputBlogPostPage } from "./handlers/post/children/output";
import { generateBlogIndexPage } from "./handlers/post/generate";
import {
	getEnglishBlogChildren,
	getJapaneseBlogChildren,
} from "./handlers/post/getBlogChildren/getBlogChildren";
import { outputBlogIndexPage } from "./handlers/post/output";
import { generateProfilePage } from "./handlers/profile/generate";
import { outputProfilePage } from "./handlers/profile/output";
import { generateRssPage } from "./handlers/rss/generate";
import { outputRssPage } from "./handlers/rss/output";
import { generateSitemapPage } from "./handlers/sitemap/generate";
import { outputSitemapPage } from "./handlers/sitemap/output";
import { registerBuiltAssetsPlugin } from "./plugin/built-assets";
import { registerLanguagePlugin } from "./plugin/language";

const router = new Router<Context>();

router.register(registerLanguagePlugin);
router.register(registerBuiltAssetsPlugin);

router.on("/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});
router.on("/en/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});
router.on("/post/", {
	generate: generateBlogIndexPage,
	output: outputBlogIndexPage,
});
router.on("/en/post/", {
	generate: generateBlogIndexPage,
	output: outputBlogIndexPage,
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
router.on("/rss.xml", {
	generate: generateRssPage,
	output: outputRssPage,
});
router.on("/en/rss.xml", {
	generate: generateRssPage,
	output: outputRssPage,
});
router.on("/sitemap.xml", {
	generate: generateSitemapPage,
	output: outputSitemapPage,
});
router.on("/en/sitemap.xml", {
	generate: generateSitemapPage,
	output: outputSitemapPage,
});

router.out();
