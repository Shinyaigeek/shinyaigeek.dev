import React from "react";

interface HeadProps {
  title: string;
  style: string;
  slug: string;
}

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
    <meta property="og:image" content="https://shinyaigeek.dev/icon.png" />
    <meta name="twitter:image" content="https://shinyaigeek.dev/icon.png" />

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/layout.css" />
    <link rel="stylesheet" type="text/css" href={"/" + props.style + ".css"} />
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
        <div id="props-data" data-json={JSON.stringify(props.props)} />
      </body>
      <script src={`/${props.style}.js`} />
    </html>
  );
};

interface TopHtmlI {
  body: string;
  title: string;
  style: string;
  props?: any;
  slug: string;
}

export const getTopOfHTML = (props: TopHtmlI) => {
  return new Promise<string>((resolve, reject) => {
    resolve(`
    <html>
    <head>
    <title>${props.title}</title>
    <meta charSet="utf8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <meta property="og:title" content=${props.title} />
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
    <meta property="og:url" content=${props.slug} />
    <meta name="twitter:site" content="@shinyaigeek" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta property="og:image" content="https://shinyaigeek.dev/icon.png" />
    <meta name="twitter:image" content="https://shinyaigeek.dev/icon.png" />
  
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/layout.css" />
    <link rel="stylesheet" type="text/css" href=${"/" + props.style + ".css"} />
  </head>
  <body>
    <div id="_app">
      ${props.body}
    </div>
    `);
  });
};

export const getMiddleOfHTML = (props: { json: string }) => {
  return new Promise<string>((resolve, reject) => {
    resolve(`
    <script id="props-data" type="text/plain" data-json='${props.json}'></script>
    `);
  });
};

export const getLastOfHTML = (props: { js: string }) => {
  return new Promise<string>((resolve, reject) => {
    resolve(`
    </body>
        <script src="/${props.js}.js" /></script>
      </html>
    `);
  });
};

export default helmet;
