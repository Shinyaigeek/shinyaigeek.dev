import { Button } from "../Button/Button";
import React from "react";
import * as contact from "./Contact.module.scss";

export default function Contact() {
  return (
    <div className={contact.contact}>
      <a href="/profile" className={contact.contactAnchor}>
        <img
          src={`/assets/static/icon_thatsme.png`}
          className={contact.icon}
          alt="icon"
        />
      </a>
      しにゃい/Shinyaigeek
      <br />
      エモいをハックしたい
      <br />
      <Button id="thatsme--contact">Contact Me</Button>
      <div className="mySnsBox">
        <div className={contact.sns}>
          <a
            id="twitter"
            href="https://twitter.com/Shinyaigeek"
            className={contact.snsAnchor}
          ></a>
        </div>
        <div className="sns">
          <a
            id="github"
            href="https://github.com/Shinyaigeek"
            className={contact.snsAnchor}
          ></a>
        </div>
        <div className="sns">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/shinyaigeek/"
            className={contact.snsAnchor}
          ></a>
        </div>
      </div>
    </div>
  );
}
