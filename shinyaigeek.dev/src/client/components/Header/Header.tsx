import React from "react";
import header from "./Header.module.scss";

export function Header() {
  return (
    <div className={header.header}>
      <div className={header.title}>
        <a href="/" className="link2Home">
          <div>
            <img
              src={`/assets/static/icon_transparent_header.png`}
              alt="icon"
              className={header.icon}
              width="36px"
              height="36px"
            />
            shinyaigeek.dev
          </div>
        </a>
      </div>
      <div className={header.contents}>
        <div className={header.anchor}>
          <a href="/" className="link2Home">
            Blog
          </a>
        </div>
        <div className={header.anchor}>
          <a href="/profile" id="link2profile">
            Profile
          </a>
        </div>
        <div className={header.anchor}>
          <a href="https://github-activity.shinyaigeek.dev/" id="link2activity">
            Activity
          </a>
        </div>
        <div className={header.anchor}>
          <a href="mailto:me@shinyaigeek.dev">Contact</a>
        </div>
      </div>
    </div>
  );
}
