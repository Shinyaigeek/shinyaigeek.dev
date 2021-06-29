import { css, cx } from "linaria";
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

  @media (prefers-reduced-motion) {
    animation: dissolve;
  }
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

  @media (prefers-reduced-motion) {
    animation: dissolve;
  }
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

interface Props {
  css?: string;
}

export const Shinyaigeek = (props: Props) => {
  const { css } = props;
  const additionalStyle = css ?? ""
  return (
    <div className={cx(icon, additionalStyle)}>
      <div className={monkey}>
        <img
          src={`/assets/static/icon_transparent.png`}
          className={monkeyImg}
          alt="monkey-icon"
          width="270px"
          height="270px"
        />
      </div>
      <div className={earth}>
        <div className={earthX}>
          <div className={earthY}>
            <img
              src={`/assets/static/earth.png`}
              alt="earth"
              width="50px"
              height="50px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
