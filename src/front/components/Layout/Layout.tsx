import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { FootTags, TAGS } from "../FootTags/FootTags";
import React from "react";
import { css } from "linaria";

const inner = css`
  position: relative;
  top: 72px;
  overflow: hidden;
  margin-bottom: 84px;
`;

const root = css`
  --theme-header: #1a161a;
  --theme-background: #eee;
  --theme-color: #1e1e1e;
  --headings-color: #f2aaf2;
  --twitter-background: #fff;
  --twitter-toggle: #e6ecf0;
  --twitter-cancel: #e6ecf0;
  --item-background: #fff;
  --item-border: #f6e6ff;
  --image-gray: grayscale(0%);

  @media (prefers-color-scheme: dark) {
    --theme-background: #3c3c3b;
    --theme-color: #e4e4e4;
    --headings-color: #d2f0da;
    --twitter-background: #15202b;
    --twitter-toggle: #1c2938;
    --twitter-cancel: #243447;
    --item-background: #7b7a79;
    --item-border: #a2a2a1;
    --image-gray: grayscale(15%);
  }
  :global() {
    body {
      margin: 0;
    }
  }

  background: var(--theme-background);
  color: var(--theme-color);

  a {
    text-decoration: none;
  }
`;

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div className={root}>
      <Header />
      <div className={inner}>
        <Component {...props} />
      </div>
      <FootTags tags={TAGS} />
      <Footer />
    </div>
  );
}
