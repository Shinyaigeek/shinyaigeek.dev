import { css } from "linaria";
import React from "react";

const icon = css`
  transform-style: preserve-3d;
  transform: perspective(5000px);
  overflow: visible;
  width: 270px;
  height: 270px;
  margin: 0 auto;
`;

const earthX = css`
  @keyframes earthX {
    0%,
    100% {
      transform: translateX(-180px);
      z-index: 5;
    }

    25% {
      z-index: 2;
    }

    50% {
      transform: translateX(180px);
      z-index: 2;
    }
  }

  animation: 5s infinite forwards normal earthX ease-in-out;
`;

const earth = css`
  position: absolute;
  bottom: 12%;
  left: calc(50% - 25px);

  @keyframes earth {
    0%,
    100% {
      z-index: 5;
    }

    25% {
      z-index: 2;
    }

    50% {
      z-index: 2;
    }
  }

  animation: 5s infinite forwards normal earth ease-in-out;
`;

const earthY = css`
  @keyframes earthY {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-120px);
    }
  }
  animation: 5s infinite forwards normal earthY ease-in-out -1.25s;
  width: 50px;
  height: 50px;
`;

const monkey = css`
  width: 100%;
  height: 100%;
  z-index: 3;
  position: absolute;
`;

const monkeyImg = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Shinyaigeek = () => {
  return (
    <div className={icon}>
      <div className={monkey}>
        <img
          src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon_transparent.png"
          className={monkeyImg}
          alt="monkey-icon"
        />
      </div>
      <div className={earth}>
        <div className={earthX}>
          <div className={earthY}>
            <img
              src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/earth.png"
              alt="earth"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
