// import {
//   Linkedin,
//   Twitter,
//   Github,
// } from "@zeit-ui/react-icons";
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
        <img src={`${"https://static.shinyaigeek.dev/static"}/icon_thatsme.png`} className={icon} alt="icon" />
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
            {/* <Twitter /> */}
            {/* <Icon
              type="twitter"
              style={{ color: "#38A1F3", fontSize: "42px", margin: "8px auto" }}
            /> */}
          </a>
        </div>
        <div className="sns">
          <a
            id="github"
            href="https://github.com/Shinyaigeek"
            className={snsAnchor}>
            {/* <Github /> */}
            {/* <Icon
              type="github"
              style={{ color: "#000", fontSize: "42px", margin: "8px auto" }}
            /> */}
          </a>
        </div>
        <div className="sns">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/shinyaigeek/"
            className={snsAnchor}>
            {/* <Icon
              type="linkedin"
              style={{ color: "#0077B5", fontSize: "42px", margin: "8px auto" }}
              theme="filled"
            /> */}
            {/* <Linkedin /> */}
          </a>
        </div>
      </div>
    </div>
  );
}
