import { Router } from "ssg-router";
import type { Context } from "./context/context";
import { generateIndexPage } from "./handlers/index/generate";
import { outputIndexPage } from "./handlers/index/output";
import { registerLanguagePlugin } from "./plugin/language";

const router = new Router<Context>();

router.register(registerLanguagePlugin);

router.on("/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});

router.out("/");
