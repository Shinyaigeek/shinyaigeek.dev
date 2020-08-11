import { Component } from "solid-js";

export const Header: Component<{}> = () => {
  return (
    <>
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
      <style jsx>
          {`
          .header {
            height: 72px;
            width: 100vw;
            font-size: 30px;
            color: $theme_text;
            background: $theme_header;
            box-shadow: 1px 1px 1px #544854;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            padding: 6px 0px;
            z-index: 1000000;
          }

          
          `}
      </style>
    </>
  );
};
