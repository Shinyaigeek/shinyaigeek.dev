import { Router } from "ssg-router";
import { generateIndexPage } from "./handlers/index/generate";
import { outputIndexPage } from "./handlers/index/output";

const router = new Router();

router.on("/", {
	generate: generateIndexPage,
	output: outputIndexPage,
});

router.out("/");
