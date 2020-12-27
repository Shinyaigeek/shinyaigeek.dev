import React from "react";

interface HeadProps {
  title: string;
  style: string;
  slug: string;
}

const isProd = process.env.NODE_ENV === "production";
const ASSETS_PORT = process.env.ASSETS_PORT ?? 3030;
const ASSETS_SERVER =
  process.env.ASSETS_SERVER ??
  "https://storage.cloud.google.com/blog_assets_shinyaigeek/static";

const assets = isProd ? ASSETS_SERVER : "http://localhost:" + ASSETS_PORT;

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
    <meta name="twitter:card" content="summary" />
    <meta property="og:image" content={`${assets}/icon.png`} />
    <meta name="twitter:image" content={`${assets}/icon.png`} />

    <link rel="icon" type="image/x-icon" href={`${assets}/favicon.ico`} />
    <link rel="stylesheet" type="text/css" href={`${assets}/styles.css`} />
    <link
      rel="stylesheet"
      href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
    />

    {/* <link
      rel="alternate"
      type="application/rss+xml"
      title="しにゃいの学習帳"
      href="https://shinyaigeek.dev/getRss"></link> */}
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
      <script async defer src={`${assets}/main.js`} />
    </html>
  );
};

export default helmet;
