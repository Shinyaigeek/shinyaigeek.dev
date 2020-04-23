import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Drawer } from "./Drawer";
import { MailForm } from "./MailForm";
import { FootTag, TAGS } from "./FootTag";

export function Layout(Component: (props?: any) => JSX.Element) {
  return (props?: any) => (
    <div>
      <Header />
      <Drawer id="drawer" class="drawer">
        <div className="hamburgerMenu--content">
          <div
            className="header--contents__anchorBlock"
            // onClick={() => props.setShowHamburgerMenu()}
          >
            <a href="/">Blog</a>
          </div>
          <div className="header--contents__anchorBlock">
            <a href="/profile">Profile</a>
          </div>
          <div className="header--contents__anchorBlock">
            <a href="mailto:me@shinyaigeek.dev">Contact</a>
          </div>
        </div>
      </Drawer>
      <div className="inner">
        <Component {...props} />
      </div>
      <FootTag tags={TAGS} />
      <Footer />
    </div>
  );
}
