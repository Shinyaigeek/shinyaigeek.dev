import type { FunctionComponent, ReactNode } from "react";
import { siteOrigin } from "../../../universal/site-origin";
import { LanguageContext } from "../../context/language-context";

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 8080;
const ASSETS_SERVER = process.env.ASSETS_SERVER ?? "https://shinyaigeek.dev";

export const assets = isProd
	? ASSETS_SERVER
	: `http://localhost:${ASSETS_PORT}/dist`;

interface SiteHeadProps {
	title: string;
	/**
	 * The page's own path, with a leading and trailing slash. It becomes og:url
	 * and, since every page renders its card alongside itself, the og:image URL
	 * too -- so a path that does not match the route leaves both pointing at the
	 * wrong page (or at a 404).
	 */
	path: string;
	language: "en" | "ja";
	description: string;
	builtAssets: {
		javascript: string;
		css: string;
	};
}

const SiteHead: FunctionComponent<SiteHeadProps> = ({
	title,
	path,
	language,
	description,
	builtAssets,
}) => {
	const locale = language === "en" ? "en_US" : "ja_JP";
	const origin = siteOrigin(language);
	const ogImage = `${origin}${path}ogp.png`;

	return (
		<head>
			<title>{title}</title>
			<meta charSet="utf8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, viewport-fit=cover"
			/>
			<meta property="og:title" content={title} />
			<meta property="og:site_name" content="shinyaigeek.dev" />
			<meta property="og:locale" content={locale} />
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			{/* og:url has to be absolute; crawlers do not resolve a relative one. */}
			<meta property="og:url" content={`${origin}${path}`} />
			<meta name="twitter:site" content="@shinyaigeek" />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="og:image" content={ogImage} />
			<meta name="twitter:image" content={ogImage} />

			<link
				rel="icon"
				type="image/x-icon"
				href={"/assets/static/favicon.ico"}
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href={`/assets/${builtAssets.css}`}
			/>
			<link rel="preload" as="style" href={`/assets/${builtAssets.css}`} />
			<link
				rel="stylesheet"
				type="text/css"
				href={"/assets/static/a11y-dark.min.css"}
			/>
			<link
				rel="preload"
				as="image"
				href={"/assets/static/icon_transparent_header.png"}
			/>
			<link
				rel="alternate"
				type="application/rss+xml"
				title="shinyaigeek.dev"
				href="/rss.xml"
			/>
		</head>
	);
};

interface ShellProps extends SiteHeadProps {
	children: ReactNode;
}

export const Shell: FunctionComponent<ShellProps> = ({
	children,
	title,
	path,
	language,
	description,
	builtAssets,
}) => (
	<LanguageContext.Provider value={language}>
		<html lang={language}>
			<SiteHead
				title={title}
				path={path}
				language={language}
				description={description}
				builtAssets={builtAssets}
			/>
			<body>
				<div id="_app">{children}</div>
			</body>
			<script
				defer
				src="https://static.cloudflareinsights.com/beacon.min.js"
				data-cf-beacon='{"token": "0893ac88cf0542af88bfd9b93008b408", "spa": true}'
			/>
			<script defer src={`/assets/${builtAssets.javascript}`} async />
		</html>
	</LanguageContext.Provider>
);
