import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { FootTag, TAGS } from "./FootTag";

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div>
      <Header />
      <div className="inner">
        <Component {...props} />
      </div>
      <FootTag tags={TAGS} />
      <Footer />
    </div>
  );
}
