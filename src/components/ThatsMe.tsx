import React from "react";

import {
  Linkedin,
  Twitter,
  Github,
} from "@zeit-ui/react-icons";
import { Button } from "./Button";

export default function ThatsMe() {
  return (
    <div className="thatsMe">
      <a href="/profile">
        <a>
          <img src="/icon_thatsme.png" className="thatsMe--icon" alt="icon" />
        </a>
      </a>
      しにゃい/Shinyaigeek
      <br />
      エモいをハックしたい
      <br />
      <Button id="thatsme--contact">Contact Me</Button>
      <div className="mySnsBox">
        <div className="sns">
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <Twitter />
            {/* <Icon
              type="twitter"
              style={{ color: "#38A1F3", fontSize: "42px", margin: "8px auto" }}
            /> */}
          </a>
        </div>
        <div className="sns">
          <a id="github" href="https://github.com/Shinyaigeek">
            <Github />
            {/* <Icon
              type="github"
              style={{ color: "#000", fontSize: "42px", margin: "8px auto" }}
            /> */}
          </a>
        </div>
        <div className="sns">
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            {/* <Icon
              type="linkedin"
              style={{ color: "#0077B5", fontSize: "42px", margin: "8px auto" }}
              theme="filled"
            /> */}
            <Linkedin />
          </a>
        </div>
      </div>
    </div>
  );
}
