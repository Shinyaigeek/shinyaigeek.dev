import { Router } from "ssg-router";
import type { Context } from "./context";
import { outputPage } from "./handlers/output";
import {
	generatePrerender2Page,
	generatePrerender2SubPage,
} from "./handlers/projects/prerender2/generate";
import { generateTopPage } from "./handlers/top/generate";
import { registerBuiltAssetsPlugin } from "./plugin/built-assets";

const router = new Router<Context>();

router.register(registerBuiltAssetsPlugin);

router.on("/", {
	generate: generateTopPage,
	output: outputPage,
});

// The prerender2 experiment needs both pages to exist as real, separately
// addressable documents: its speculation rules prerender the subpage from the
// project page, which only means anything if the subpage is a genuine
// navigation rather than a client side swap.
router.on("/projects/prerender2/", {
	generate: generatePrerender2Page,
	output: outputPage,
});
router.on("/projects/prerender2/subpage/", {
	generate: generatePrerender2SubPage,
	output: outputPage,
});

// Exit non-zero on failure so a broken generation fails `pnpm build` in CI
// rather than leaving a half written public/ behind and reporting success.
router.out().catch((error) => {
	console.error(error);
	process.exit(1);
});
