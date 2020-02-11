import React from "react";

import Link from "next/link";

import { Icon, Button } from "antd";

import "../style/thatsme.scss";

interface Props {
  setShowContactModal: Function;
}

export default function ThatsMe(props: Props) {
  return (
    <div className="thatsMe">
      <Link href="/profile">
        <a>
          <img src="/static/icon_thatsme.png" className="thatsMe--icon" alt="icon" />
        </a>
      </Link>
      しにゃい/Shinyaigeek
      <br />
      エモいをハックしたい
      <br />
      <Button
        type="primary"
        shape="round"
        icon="mail"
        size="large"
        style={{ margin: "12px auto", display: "block" }}
        onClick={() => props.setShowContactModal()}
      >
        Contact Me
      </Button>
      <div className="mySnsBox">
        <div className="sns">
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <Icon
              type="twitter"
              style={{ color: "#38A1F3", fontSize: "42px", margin: "8px auto" }}
            />
          </a>
        </div>
        <div className="sns">
          <a id="github" href="https://github.com/Shinyaigeek">
            <Icon
              type="github"
              style={{ color: "#000", fontSize: "42px", margin: "8px auto" }}
            />
          </a>
        </div>
        <div className="sns">
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            <Icon
              type="linkedin"
              style={{ color: "#0077B5", fontSize: "42px", margin: "8px auto" }}
              theme="filled"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
