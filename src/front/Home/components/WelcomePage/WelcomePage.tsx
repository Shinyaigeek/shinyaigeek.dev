import { ScrollDown } from "../ScrollDown/ScrollDown";
import { StarStream } from "../StartStream/StarStream";
import React from "react";
import { css } from "linaria";
import { Shinyaigeek } from "../../../components/Shinyaigeek/Shinyaigeek";

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

const shinyaigeek = css`
  position: absolute;
  bottom: 25px;
  right: 25px;
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
      <Shinyaigeek css={shinyaigeek} />
      <StarStream />
    </div>
  );
}
