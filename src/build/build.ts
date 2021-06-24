import path from "path";
import { handleIndex } from "./handlers/index";
import { getChildren } from "./handlers/post/getChildren/getChildren";
import { handlePost } from "./handlers/post/handlePost/handlePost";
import { handleProfile } from "./handlers/profile/handleProfile";
import { Router } from "./router/router";
import { writeFileWithDir } from "./util/writeFileWithDir";

const router = new Router();

const postChildren = getChildren();

// todo interface
router.on("/post", undefined, [postChildren]);
router.on("/", handleIndex, undefined);
router.on("/profile", handleProfile, undefined);
router.out(function (slug, html) {
  writeFileWithDir(path.join(__dirname, `../../public${slug}/index.html`), html);
});
