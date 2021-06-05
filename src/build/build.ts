import path from "path";
import { handleIndex } from "./handlers/index";
import { getChildren } from "./handlers/post/getChildren/getChildren";
import { Router } from "./router/router";
import { writeFileWithDir } from "./util/writeFileWithDir";

const router = new Router();

const postChildren = getChildren();

// todo interface
router.on("/post", undefined, [postChildren]);
router.out(function (slug, html) {
  writeFileWithDir(path.join(__dirname, `../../dist${slug}/index.html`), html);
});
