import React from "react";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { FootTags, TAGS } from "../FootTags/FootTags";

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div>
      <Header />
      <div className="inner">
        <Component {...props} />
      </div>
      <FootTags tags={TAGS} />
      <Footer />
    </div>
  );
}
