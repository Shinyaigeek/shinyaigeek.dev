import type { FunctionComponent, ReactNode } from "react";

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 8080;
const ASSETS_SERVER = process.env.ASSETS_SERVER ?? "https://shinyaigeek.dev";

export const assets = isProd
	? ASSETS_SERVER
	: `http://localhost:${ASSETS_PORT}/dist`;

interface SiteHeadProps {
	title: string;
	path: string;
	language: "en" | "ja";
	ogImageFilename: string;
	description: string;
}

const SiteHead: FunctionComponent<SiteHeadProps> = ({
	title,
	path,
	language,
	ogImageFilename,
	description,
}) => {
	const locale = language === "en" ? "en_US" : "ja_JP";

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
			<meta property="og:url" content={path} />
			<meta name="twitter:site" content="@shinyaigeek" />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				property="og:image"
				content={`${
					language === "en"
						? "https://en.shinyaigeek.dev"
						: "https://ja.shinyaigeek.dev"
				}/assets/ogimage/${language}/${ogImageFilename}.png`}
			/>
			<meta
				name="twitter:image"
				content={`${
					language === "en"
						? "https://en.shinyaigeek.dev"
						: "https://ja.shinyaigeek.dev"
				}/assets/ogimage/${language}/${ogImageFilename}.png`}
			/>

			<link
				rel="icon"
				type="image/x-icon"
				href={"/assets/static/favicon.ico"}
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href={`/assets/style${
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

			<link
				rel="preload"
				as="style"
				href={"/assets/static/a11y-dark.min.css"}
			/>
			<link
				rel="preload"
				as="style"
				href={`/assets/style${
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
};

interface ShellProps extends SiteHeadProps {
	children: ReactNode;
}

export const Shell: FunctionComponent<ShellProps> = ({
	children,
	title,
	path,
	language,
	ogImageFilename,
	description,
}) => (
	<html lang={language}>
		<SiteHead
			title={title}
			path={path}
			ogImageFilename={ogImageFilename}
			language={language}
			description={description}
		/>
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
			src={`/client${
				process.env.CONTENTHASH_JS ? `.${process.env.CONTENTHASH_JS}` : ""
			}.js`}
			async
		/>
	</html>
);
