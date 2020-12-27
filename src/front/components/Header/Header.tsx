import { css } from "linaria";
import React from "react";

interface Props {
  showContactModal: boolean;
  setShowContactModal: Function;
  showHamburgerMenu: boolean;
  setShowHamburgerMenu: Function;
}

const header = css`
  height: 72px;
  width: 100vw;
  font-size: 30px;
  color: var(--theme-text);
  background: var(--theme-header);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: black;

  a {
    color: white;
  }
`;

const title = css`
  position: none;
  left: 10px;
  width: fit-content;
`;

const icon = css`
  width: 36px;
  object-fit: contain;
`;

const anchor = css`
  width: auto;
  margin: 0 20px;
  position: relative;
  display: inline-block;
  font-size: 16px;
`;

export function Header() {
  return (
    <div className={header}>
      <div className={title}>
        <a href="/" id="link2Home">
          <div>
            <img
              src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon_transparent_header.png"
              alt="icon"
              className={icon}
            />
            しにゃいの学習帳
          </div>
        </a>
      </div>
      <div className="header--contents">
        <div className={anchor}>
          <a href="/" id="link2Home">
            Blog
          </a>
        </div>
        <div className={anchor}>
          <a href="/profile" id="link2profile">
            Profile
          </a>
        </div>
        <div className={anchor}>
          <a href="mailto:me@shinyaigeek.dev">Contact</a>
        </div>
      </div>
    </div>
  );
}
