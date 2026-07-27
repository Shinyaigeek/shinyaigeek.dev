#!/usr/bin/env node
/**
 * Every generated page advertises an OG image at its own path, and og:url has to
 * be the page's absolute URL. Both used to drift silently: /post/ claimed to be
 * the home page, /profile lost its trailing slash and pointed og:image at
 * "/profileogp.png", and the fleet pages referenced cards nobody generated.
 * Nothing failed -- the markup was simply wrong. This runs after the build so a
 * mismatch stops it instead.
 */
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = "public";
const HOSTS = {
	ja: "https://ja.shinyaigeek.dev",
	en: "https://en.shinyaigeek.dev",
};

const pages = [];
const walk = (dir) => {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full);
		else if (entry.name === "index.html") pages.push(full);
	}
};
walk(PUBLIC_DIR);

const problems = [];
for (const page of pages) {
	const html = fs.readFileSync(page, "utf8");
	const meta = (property) =>
		html.match(
			new RegExp(`<meta property="${property}" content="([^"]*)"`),
		)?.[1];

	// public/ja/post/ -> ja + /post/
	const rel = path.relative(PUBLIC_DIR, path.dirname(page));
	const [langDir, ...rest] = rel.split(path.sep);
	const language = langDir === "en" ? "en" : "ja";
	const expectedPath = `/${rest.join("/")}${rest.length ? "/" : ""}`;
	const expectedUrl = `${HOSTS[language]}${expectedPath}`;

	const ogUrl = meta("og:url");
	if (ogUrl !== expectedUrl) {
		problems.push(`${rel}: og:url is ${ogUrl}, expected ${expectedUrl}`);
	}

	const ogImage = meta("og:image");
	if (ogImage !== `${expectedUrl}ogp.png`) {
		problems.push(
			`${rel}: og:image is ${ogImage}, expected ${expectedUrl}ogp.png`,
		);
	} else {
		const onDisk = path.join(PUBLIC_DIR, langDir, ...rest, "ogp.png");
		if (!fs.existsSync(onDisk)) {
			problems.push(
				`${rel}: og:image points at ${onDisk}, which was not generated`,
			);
		}
	}
}

if (problems.length > 0) {
	console.error(
		`OG metadata check failed for ${problems.length} of ${pages.length} pages:`,
	);
	for (const problem of problems) console.error(`  ${problem}`);
	process.exit(1);
}
console.log(
	`OG metadata OK: ${pages.length} pages, each with an image that exists.`,
);
