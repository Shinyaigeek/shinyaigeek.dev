import React from "react";

import { Drawer } from "./Drawer";

// import MailForm from "./MailForm";

interface Props {
  showContactModal: boolean;
  setShowContactModal: Function;
  showHamburgerMenu: boolean;
  setShowHamburgerMenu: Function;
}

export function Header() {
  return (
    <div className="header">
      <div className="header--title">
        <a href="/">
          <div>
            <img
              src="/icon_transparent_header.png"
              alt="icon"
              className="header--title__icon"
            />
            しにゃいの学習帳
          </div>
        </a>
      </div>
      <div className="header--contents">
        <div className="header--contents__anchorBlock">
          <a href="/">ブログ</a>
        </div>
        <div className="header--contents__anchorBlock">
          <a href="/profile">プロフィール</a>
        </div>
        <div className="header--contents__anchorBlock">
          <a href="/">
            <a>作品集</a>
          </a>
        </div>
        <div
          className="header--contents__anchorBlock"
          id="header--contents__contact"
        >
          コンタクト
        </div>
      </div>
      <div className="header--contentsHamburger">
        <div
          id="hamburger--menu"
          className={
            true
              ? "hamburger--menu__trigger"
              : "hamburger--menu__trigger__active"
          }
        >
          <span className="hamburger--menu__trigger__part" />
          <span className="hamburger--menu__trigger__part" />
          <span className="hamburger--menu__trigger__part" />
        </div>
      </div>
      {/* <MailForm {...props} /> */}
    </div>
  );
}
