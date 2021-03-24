import React from "react";

interface HeadProps {
  title: string;
  style: string;
  slug: string;
}

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 3030;
const ASSETS_SERVER =
  process.env.ASSETS_SERVER ?? "https://static.shinyaigeek.dev/static";

const ogp = "https://shinyaigeek-og-image.vercel.app/";

export const assets = isProd
  ? ASSETS_SERVER
  : "http://localhost:" + ASSETS_PORT;

const SiteHead = (props: HeadProps) => (
  <head>
    <title>{props.title}</title>
    <meta charSet="utf8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <meta property="og:title" content={props.title} />
    <meta property="og:site_name" content="しにゃいの学習帳" />
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
        props.title.replace(" | しにゃいの学習帳", "")
      )}`}
    />
    <meta
      name="twitter:image"
      content={`${ogp}api/?title=${encodeURIComponent(
        props.title.replace(" | しにゃいの学習帳", "")
      )}`}
    />

    <link rel="icon" type="image/x-icon" href={`${assets}/favicon.ico`} />
    <link
      rel="stylesheet"
      type="text/css"
      href={`${assets}/styles${
        process.env.CONTENTHASH_CSS ? "." + process.env.CONTENTHASH_CSS : ""
      }.css`}
    />
    <link rel="stylesheet" type="text/css" href={`${assets}/a11y-dark.css`} />
    <link
      rel="stylesheet"
      href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
    />

    <link rel="preload" as="style" href={`${assets}/a11y-dark.css`} />
    <link
      rel="preload"
      as="style"
      href={`${assets}/styles${
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
      href="https://static.shinyaigeek.dev/static/icon_transparent_header.png"
    />

    <link rel="dns-prefetch" href="//static.shinyaigeek.dev" />

    <link rel="preconnect" href="//static.shinyaigeek.dev" />

    <link
      rel="alternate"
      type="application/rss+xml"
      title="しにゃいの学習帳"
      href="https://shinyaigeek.dev/getRss"></link>
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
      <div id="_app">
        <props.children {...props.props} />
      </div>
      <script
        async
        defer
        src={`${assets}/main${
          process.env.CONTENTHASH_JS ? "." + process.env.CONTENTHASH_JS : ""
        }.js`}
      />
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "0893ac88cf0542af88bfd9b93008b408", "spa": true}'></script>
    </html>
  );
};

export default helmet;
