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
    <script src="//assets.adobedtm.com/43692acb8f62beca52063bd53825dcc138f4617b/satelliteLib-4d5ebdc6f6d59ce846b1c9447eb4087d3c37d7a0.js" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/layout.css" />
    <link rel="stylesheet" type="text/css" href={props.style + ".css"} />
    <meta
      name="google-site-verification"
      content="5JK6z-d1Ve8G93LniItyCkXLQ8rkObyLbJZtRzET6Ak"
    />
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
    <React.Fragment>
      <SiteHead {...props} />
      <props.children {...props.props} />
    </React.Fragment>
  );
};

export default helmet;
