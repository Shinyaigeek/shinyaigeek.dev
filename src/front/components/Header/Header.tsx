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
  background: #1a161a;
  box-shadow: 1px 1px 1px #544854;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;

  a {
    color: white;
  }

  @media (min-width: 750px) {
    display: flex;
  }
`;

const contents = css`
  width: auto;
  display: flex;

  @media (min-width: 750px) {
    position: absolute;
    right: 15px;
  }
`;

const title = css`
  position: relative;
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

  &::after {
    position: absolute;
    left: 0;
    bottom: 2px;
    content: " ";
    width: 100%;
    height: 2px;
    background: white;
    transform: scale(0, 1);
    transform-origin: center top;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: scale(1.1, 1);
  }

  @media (min-width: 750px) {
    font-size: 28px !important;
  }
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
              width="36px"
              height="36px"
            />
            しにゃいの学習帳
          </div>
        </a>
      </div>
      <div className={contents}>
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
