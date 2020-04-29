import * as React from "react";

import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

export const BaseProfile = () => {
  return (
    <div className="baseprofile">
      <div className="name">Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)</div>
      <div className="job">Web Developer</div>
      <div className="mySnsBox">
        <div className="sns">
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <TwitterOutlined />
          </a>
        </div>
        <div className="sns">
          <a id="github" href="https://github.com/Shinyaigeek">
            <GithubOutlined />
          </a>
        </div>
        <div className="sns">
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            <LinkedinOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};
