import { Button } from "../Button/Button";
import React from "react";
import { css } from "linaria";

const contact = css`
  width: 100%;
  max-width: 300px;
  margin: 18px auto;
  text-align: center;
  font-size: 18px;
`;

const icon = css`
  padding-bottom: 8px;
`;

const contactAnchor = css`
  display: block;
  width: 100%;
`;

const sns = css`
  margin: 0 auto;
`;

const snsAnchor = css`
  font-size: 42px;
  margin: 2px auto;
`;

export default function Contact() {
  return (
    <div className={contact}>
      <a href="/profile" className={contactAnchor}>
        <img src={`/assets/static/icon_thatsme.png`} className={icon} alt="icon" />
      </a>
      しにゃい/Shinyaigeek
      <br />
      エモいをハックしたい
      <br />
      <Button id="thatsme--contact">Contact Me</Button>
      <div className="mySnsBox">
        <div className={sns}>
          <a
            id="twitter"
            href="https://twitter.com/Shinyaigeek"
            className={snsAnchor}>
          </a>
        </div>
        <div className="sns">
          <a
            id="github"
            href="https://github.com/Shinyaigeek"
            className={snsAnchor}>
          </a>
        </div>
        <div className="sns">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/shinyaigeek/"
            className={snsAnchor}>
          </a>
        </div>
      </div>
    </div>
  );
}
