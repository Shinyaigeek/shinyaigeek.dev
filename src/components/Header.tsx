import React from "react";

// import { Drawer } from "antd";

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
              src="/static/icon_transparent_header.png"
              alt="icon"
              className="header--title__icon"
            />
            しにゃいの学習帳
          </div>
        </a>
      </div>
      <div className="header--contents">
        <div className="header--contents__anchorBlock">
          <a href="/">
            <a>ブログ</a>
          </a>
        </div>
        <div className="header--contents__anchorBlock">
          <a href="/profile">
            <a>プロフィール</a>
          </a>
        </div>
        <div className="header--contents__anchorBlock">
          <a href="/">
            <a>作品集</a>
          </a>
        </div>
        <div
          className="header--contents__anchorBlock"
          onClick={() => {
            // props.setShowContactModal();
          }}
        >
          コンタクト
        </div>
      </div>
      <div className="header--contentsHamburger">
        <div
          className={
            true
              ? "hamburger--menu__trigger"
              : "hamburger--menu__trigger__active"
          }
          onClick={() => {
            // props.setShowHamburgerMenu();
          }}
        >
          <span className="hamburger--menu__trigger__part" />
          <span className="hamburger--menu__trigger__part" />
          <span className="hamburger--menu__trigger__part" />
        </div>
        {/* <Drawer
          visible={props.showHamburgerMenu}
          onClose={() => props.setShowHamburgerMenu()}
          width="100%"
          zIndex={2000}
          closable={true}
        >
          <div className="hamburgerMenu--content">
            <div
              className="header--contents__anchorBlock"
              onClick={() => props.setShowHamburgerMenu()}
            >
              <a href="/">
                <a>ブログ</a>
              </a>
            </div>
            <div
              className="header--contents__anchorBlock"
              onClick={() => props.setShowHamburgerMenu()}
            >
              <a href="/profile">
                <a>プロフィール</a>
              </a>
            </div>
            <div
              className="header--contents__anchorBlock"
              onClick={() => props.setShowHamburgerMenu()}
            >
              <a href="/">
                <a>作品集</a>
              </a>
            </div>
            <div
              className="header--contents__anchorBlock"
              onClick={() => {
                props.setShowContactModal();
              }}
            >
              コンタクト
            </div>
          </div>
        </Drawer> */}
      </div>
      {/* <MailForm {...props} /> */}
    </div>
  );
}