import React from "react";

import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { Button } from "./Button";

interface Props {
  setShowContactModal: Function;
}

export default function ThatsMe(props: Props) {
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
            <TwitterOutlined />
            {/* <Icon
              type="twitter"
              style={{ color: "#38A1F3", fontSize: "42px", margin: "8px auto" }}
            /> */}
          </a>
        </div>
        <div className="sns">
          <a id="github" href="https://github.com/Shinyaigeek">
            <GithubOutlined />
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
            <LinkedinOutlined />
          </a>
        </div>
      </div>
    </div>
  );
}
