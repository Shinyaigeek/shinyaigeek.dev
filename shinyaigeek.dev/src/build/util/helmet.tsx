import React from "react";
import dotenv from "dotenv";

dotenv.config();

interface HeadProps {
  title: string;
  style: string;
  slug: string;
}

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 8080;
const ASSETS_SERVER = process.env.ASSETS_SERVER ?? "https://shinyaigeek.dev";

const ogp = "https://shinyaigeek-og-image.vercel.app/";

export const assets = isProd
  ? ASSETS_SERVER
  : "http://localhost:" + ASSETS_PORT + "/dist";

const SiteHead = (props: HeadProps) => (
  <head>
    <title>{props.title}</title>
    <meta charSet="utf8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <meta property="og:title" content={props.title} />
    <meta property="og:site_name" content="shinyaigeek.dev" />
    <meta property="og:locale" content="ja_JP" />
    <meta
      name="description"
      content="見習いWeb developer兼大学生のブログ. 主にweb開発の知見について喋ります"
    />
    <meta
      property="og:description"
      content="見習いWeb developer兼大学生のブログ. 主にweb開発の知見について喋ります"
    />
    <meta property="og:url" content={props.slug} />
    <meta name="twitter:site" content="@shinyaigeek" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      property="og:image"
      content={`${ogp}api/?title=${encodeURIComponent(
        props.title.replace(" | shinyaigeek.dev", "")
      )}`}
    />
    <meta
      name="twitter:image"
      content={`${ogp}api/?title=${encodeURIComponent(
        props.title.replace(" | shinyaigeek.dev", "")
      )}`}
    />

    <link
      rel="icon"
      type="image/x-icon"
      href={`/assets/static/favicon.ico`}
    />
    <link
      rel="stylesheet"
      type="text/css"
      href={`/styles${
        process.env.CONTENTHASH_CSS ? "." + process.env.CONTENTHASH_CSS : ""
      }.css`}
    />
    <link
      rel="stylesheet"
      type="text/css"
      href={`/a11y-dark.min.css`}
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
    />

    <link
      rel="preload"
      as="style"
      href={`/a11y-dark.min.css`}
    />
    <link
      rel="preload"
      as="style"
      href={`/styles${
        process.env.CONTENTHASH_CSS ? "." + process.env.CONTENTHASH_CSS : ""
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
      href={`/assets/static/icon_transparent_header.png`}
    />

    <link
      rel="alternate"
      type="application/rss+xml"
      title="shinyaigeek.dev"
      href="https://shinyaigeek.dev/rss.xml"
    ></link>
  </head>
);

interface HelmetProps {
  children: () => JSX.Element;
  title: string;
  style: string;
  props?: any;
  slug: string;
}

const helmet = (props: HelmetProps) => {
  return () => (
    <html lang="ja">
      <SiteHead {...props} />
      <body>
        <div id="_app">
          <props.children {...props.props} />
        </div>
      </body>
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "0893ac88cf0542af88bfd9b93008b408", "spa": true}'
      ></script>
      <script
        defer
        src={`/r${
          process.env.CONTENTHASH_JS ? "." + process.env.CONTENTHASH_JS : ""
        }.js`}
        async
      ></script>
    </html>
  );
};

export default helmet;
