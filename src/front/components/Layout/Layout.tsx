import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { FootTags, TAGS } from "../FootTags/FootTags";
import React from "react";
import { css } from "linaria";

const inner = css`
  position: relative;
  top: 72px;
  overflow: hidden;
  padding-bottom: 72px;
`

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div className={inner}>
      <Header />
      <div className="inner">
        <Component {...props} />
      </div>
      <FootTags tags={TAGS} />
      <Footer />
    </div>
  );
}
