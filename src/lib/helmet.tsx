import React from "react";

interface HeadProps {
  title: string;
  style: string;
}

const SiteHead = (props: HeadProps) => (
  <head>
    <title>{props.title}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
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
}

const helmet = (props: HelmetProps) => {
  return () => (
    <html lang="ja">
      <SiteHead {...props} />
      <props.children {...props.props} />
      <script src="/main.js" />
    </html>
  );
};

export default helmet;
