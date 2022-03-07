import React from "react";
import baseProfile from "./BaseProfile.module.scss";

export const BaseProfile = () => {
  return (
    <div className="baseprofile">
      <div className={baseProfile.hello}>
        Hi{" "}
        <span role="img" aria-label="wave hand">
          👋
        </span>{" "}
        I'm{" "}
        <span className={baseProfile.name}>
          Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)
        </span>
      </div>
      <div className={baseProfile.jobGlitch} data-text="Web Developer">
        Web Developer
      </div>
      <div className={baseProfile.word}>
        I Love and Development Web Technology and that's ecosystem!!
      </div>
      <div className={baseProfile.mySnsBox}>
        <div className={baseProfile.snsIcon}>
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <img
              src={`/assets/static/twitter.svg`}
              alt="twitter"
              width="54px"
              height="54px"
            />
          </a>
        </div>
        <div className={baseProfile.snsIcon}>
          <a id="github" href="https://github.com/Shinyaigeek">
            <img
              src={`/assets/static/github.svg`}
              alt="github"
              width="54px"
              height="54px"
            />
          </a>
        </div>
        <div className={baseProfile.snsIcon}>
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            <img
              src={`/assets/static/linkedin.svg`}
              alt="linkedin"
              width="54px"
              height="54px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
