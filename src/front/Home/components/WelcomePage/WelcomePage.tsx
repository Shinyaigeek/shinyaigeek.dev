import { ShinyaigeekAnimation } from "../../../components/ShinyaigeekAnimation/ShinyaigeekAnimation";
import { ScrollDown } from "../ScrollDown/ScrollDown";
import { StarStream } from "../StartStream/StarStream";
import React from "react";
import { css } from "linaria";

const welcome = css`
  height: calc(100vh - 72px);
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const banana = css`
  height: 200px;
  margin: 20px 20px;
  object-fit: contain;
`;

export function WelcomePage() {
  return (
    <div className={welcome}>
      <img
        className={banana}
        src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/banana.png"
        alt="banana"
      />
      <ScrollDown />
      <ShinyaigeekAnimation />
      <StarStream />
    </div>
  );
}
