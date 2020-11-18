import React from "react";

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
              src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon_transparent_header.png"
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
        <div className="header--contents__anchorBlock">
          <a href="mailto:me@shinyaigeek.dev">Contact</a>
        </div>
      </div>
    </div>
  );
}
