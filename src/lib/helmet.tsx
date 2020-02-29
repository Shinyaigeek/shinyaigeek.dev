import React from "react";

interface HeadProps {
  title: string;
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
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta
      name="google-site-verification"
      content="5JK6z-d1Ve8G93LniItyCkXLQ8rkObyLbJZtRzET6Ak"
    />
  </head>
);

interface HelmetProps {
  children: () => JSX.Element;
  title: string;
  props?: any;
}

const helmet = (props: HelmetProps) => {
  return () => (
    <React.Fragment>
      <SiteHead title={props.title} />
      <props.children {...props.props} />
    </React.Fragment>
  );
};

export default helmet;
