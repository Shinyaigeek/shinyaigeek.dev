import { writeFileSync } from "fs";
import path from "path";
import { handleIndex } from "./handlers/index";
import { getChildren } from "./handlers/post/getChildren/getChildren";
import { Router } from "./router/router";

const router = new Router();

const postChildren = getChildren();

// todo interface
router.on("/post", undefined, [postChildren]);
router.out(function (slug, html) {
  writeFileSync(path.join(__dirname, `../../dist${slug}.html`), html);
});
