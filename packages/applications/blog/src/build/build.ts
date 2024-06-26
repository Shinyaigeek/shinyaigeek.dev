import { minify } from "html-minifier";
import { writeContent } from "../contents-handler/contents-writer";
import { messages as en } from "../locales/en/messages";
import { messages as ja } from "../locales/ja/messages";
import { handleIndex } from "./handlers/index/index";
import { getChildren } from "./handlers/post/getChildren/getChildren";
import { handleProfile } from "./handlers/profile/handleProfile";
import { Router } from "./router/router";
import { addDOCTYP } from "./util/addDOCTYPE";

export const build = async () => {
	const router = new Router();

	const postChildren = await getChildren();

	router.registerDefaultLanguage("ja", ja);
	router.registerLanguage("en", en);

	// todo interface
	router.on("/post", undefined, [postChildren]);
	router.on("/", handleIndex, undefined);
	router.on("/profile", handleProfile, undefined);
	await router.out(async (slug, html) => {
		await writeContent(`./public${slug}/index.html`, minify(addDOCTYP(html)));
	});
};
