import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Drawer } from "./Drawer";
import { MailForm } from "./MailForm";

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
            <a href="/">ブログ</a>
          </div>
          <div className="header--contents__anchorBlock">
            <a href="/profile">プロフィール</a>
          </div>
          <div
            className="header--contents__anchorBlock"
            // onClick={() => props.setShowHamburgerMenu()}
          >
            <a href="/">
              <a>作品集</a>
            </a>
          </div>
          <div
            className="header--contents__anchorBlock"
            id="header--modal__contact"
            onClick={() => {
              // props.setShowContactModal();
            }}
          >
            コンタクト
          </div>
        </div>
      </Drawer>
      <MailForm />
      <div className="inner">
        <Component {...props} />
      </div>
      <Footer />
    </div>
  );
}
