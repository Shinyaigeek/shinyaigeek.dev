import * as React from "react";

import { Twitter, Linkedin, Github } from "@zeit-ui/react-icons";

export const BaseProfile = () => {
  return (
    <div className="baseprofile">
      <div className="name">Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)</div>
      <div className="job glitch" data-text="Web Developer">
        Web Developer
      </div>
      <div className="word">
        I Love and Development Web Technology and that's ecosystem!!
      </div>
      <div className="mySnsBox">
        <div className="sns">
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <Twitter size={54} />
          </a>
        </div>
        <div className="sns">
          <a id="github" href="https://github.com/Shinyaigeek">
            <Github size={54} />
          </a>
        </div>
        <div className="sns">
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            <Linkedin size={54} />
          </a>
        </div>
      </div>
    </div>
  );
};
