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
          <a href="/">Blog</a>
        </div>
        <div className="header--contents__anchorBlock">
          <a href="/profile">Profile</a>
        </div>
        <div
          className="header--contents__anchorBlock"
          id="header--contents__contact">
          Contact
        </div>
      </div>
    </div>
  );
}
