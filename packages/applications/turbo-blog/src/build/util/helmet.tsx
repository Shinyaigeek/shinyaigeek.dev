import type { ReactNode } from "react";

interface HeadProps {
	title: string;
	slug: string;
	language: "en" | "ja";
	which: string;
}

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 8080;
const ASSETS_SERVER = process.env.ASSETS_SERVER ?? "https://shinyaigeek.dev";

export const assets = isProd
	? ASSETS_SERVER
	: `http://localhost:${ASSETS_PORT}/dist`;

const SiteHead = ({ title, slug, language, which }: HeadProps) => (
	<head>
		<title>{title}</title>
		<meta charSet="utf8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, viewport-fit=cover"
		/>
		<meta property="og:title" content={title} />
		<meta property="og:site_name" content="shinyaigeek.dev" />
		<meta property="og:locale" content="ja_JP" />
		<meta
			name="description"
			content="Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
		/>
		<meta
			property="og:description"
			content="Web が好きなオタクのブログ. 主にweb開発の知見について喋ります"
		/>
		<meta property="og:url" content={slug} />
		<meta name="twitter:site" content="@shinyaigeek" />
		<meta property="og:type" content="website" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta
			property="og:image"
			content={`${
				language === "en"
					? "https://en.shinyaigeek.dev"
					: "https://ja.shinyaigeek.dev"
			}/assets/ogimage/${language}/${which}.png`}
		/>
		<meta
			name="twitter:image"
			content={`${
				language === "en"
					? "https://en.shinyaigeek.dev"
					: "https://ja.shinyaigeek.dev"
			}/assets/ogimage/${language}/${which}.png`}
		/>

		<link rel="icon" type="image/x-icon" href={"/assets/static/favicon.ico"} />
		<link
			rel="stylesheet"
			type="text/css"
			href={`/assets/styles${
				process.env.CONTENTHASH_CSS ? `.${process.env.CONTENTHASH_CSS}` : ""
			}.css`}
		/>
		<link
			rel="stylesheet"
			type="text/css"
			href={"/assets/static/a11y-dark.min.css"}
		/>
		<link
			rel="stylesheet"
			href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
		/>

		<link rel="preload" as="style" href={"/assets/static/a11y-dark.min.css"} />
		<link
			rel="preload"
			as="style"
			href={`/assets/styles${
				process.env.CONTENTHASH_CSS ? `.${process.env.CONTENTHASH_CSS}` : ""
			}.css`}
		/>
		<link
			rel="preload"
			as="style"
			href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
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

interface HelmetProps {
	children: ReactNode;
	title: string;
	slug: string;
	language: "en" | "ja";
	which: string;
}

export const Shell = ({
	children,
	title,
	slug,
	language,
	which,
}: HelmetProps) => {
	return (
		<html lang={language}>
			<SiteHead title={title} slug={slug} which={which} language={language} />
			<body>
				<div id="_app">{children}</div>
			</body>
			<script
				defer
				src="https://static.cloudflareinsights.com/beacon.min.js"
				data-cf-beacon='{"token": "0893ac88cf0542af88bfd9b93008b408", "spa": true}'
			/>
			<script
				defer
				src={`/assets/r${
					process.env.CONTENTHASH_JS ? `.${process.env.CONTENTHASH_JS}` : ""
				}.js`}
				async
			/>
		</html>
	);
};
