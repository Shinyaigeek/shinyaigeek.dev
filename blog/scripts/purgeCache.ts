import dotenv from "dotenv";
import assert from "assert";
import fetch from "node-fetch";
import path from "path";
import { JSDOM } from "jsdom";
import fs from "fs";

const baseUrl = "https://api.cloudflare.com/client/v4/";
//6386a36a9ac3e8c8494e8a4d43fd4f79b0956
//5cbceaea7b728562c7efd0a00cec0d25

const domains = [
	"https://shinyaigeek.dev",
	"https://www.shinyaigeek.dev",
	"https://en.shinyaigeek.dev",
	"https://ja.shinyaigeek.dev",
];

async function shouldPurge(filename: string) {
	const _remoteSource = await fetch(`https://shinyaigeek.dev${filename}`);
	const remoteSource = await _remoteSource.text();
	const localSourcePath = (() => {
		if (filename.endsWith(".html")) {
			return path.resolve(__dirname, `../../public/ja${filename}`);
		}
		if (filename === "sitemap.xml") {
			return path.resolve(__dirname, `../../public${filename}`);
		}
		if (filename === "rss.xml") {
			return path.resolve(__dirname, `../../public/ja${filename}`);
		}

		return path.resolve(__dirname, `../../public${filename}`);
	})();

	const localSource = fs.readFileSync(localSourcePath, "utf-8");
	return localSource !== remoteSource;
}

async function getContentsShouldPurged() {
	const paths = [
		"/index.html",
		"/post/browser-on-browser/index.html",
		"/profile/index.html",
	];

	const _allAssets = await Promise.all(
		paths.map(async (p) => {
			const html = await fetch(`https://shinyaigeek.dev${p}`);
			const dom = new JSDOM(await html.text());
			const scripts = Array.from(
				dom.window.document.querySelectorAll("script"),
			);
			const styles = Array.from(dom.window.document.querySelectorAll("link"));
			const assets = [...scripts, ...styles];
			return assets
				.map((asset) => {
					// @ts-ignore
					if (asset.tagName === "LINK") {
						const { href } = asset as HTMLLinkElement; // TODO
						if (
							!href.startsWith("http") &&
							!href.startsWith("/cdn-cgi") /* TODO ? */
						) {
							/* TODO */ return href;
						}
					} else if (asset.tagName === "SCRIPT") {
						const { src } = asset as HTMLScriptElement; // TODO
						if (
							!src.startsWith("http") &&
							!src.startsWith("/cdn-cgi") /* TODO ? */
						) {
							/* TODO */ return src;
						}
					}
					return undefined;
				})
				.filter(
					(asset) =>
						typeof asset !== "undefined" &&
						!asset.endsWith("png") &&
						!asset.endsWith("io"),
				);
		}),
	);
	const allAssets = _allAssets.flat() as string[]; // TODO;
	console.log(allAssets);

	const allPurgeAssets = await Promise.all(
		allAssets.map(async (asset) =>
			(await shouldPurge(asset)) ? asset : undefined,
		),
	);
	return allPurgeAssets.filter((asset) => !!asset);
}

export const purgeCache = () => {
	dotenv.config();
	const {
		CLOUDFLARE_PURGE_HTML_TOKEN: token,
		CLOUDFLARE_ID: id,
		CLOUDFLARE_EMAIL: email,
	} = process.env;
	assert(token && id && email, "CloudFlare Token is undefined");
	const target = `${baseUrl}zones/${id}/purge_cache`;
	return fetch(target, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Auth-Email": email,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			files: [
				"https://static.shinyaigeek.dev/**/*.js",
				"https://static.shinyaigeek.dev/**/*.css",
				"https://shinyaigeek.dev/**/*.html",
			],
		}),
	})
		.then(async (res) => {
			console.log(res);
			console.log(await res.json());
		})
		.catch((e) => {
			throw new Error(e);
		});
};

// purgeCache();

(async () => {
	console.log(await getContentsShouldPurged());
})();
