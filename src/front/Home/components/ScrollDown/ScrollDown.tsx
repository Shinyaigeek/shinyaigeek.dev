import { css } from "linaria";
import React from "react";

const scrollDownStyle = css`
  color: #ffffff;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  a {
    color: white
    text-decoration: none;
  }
`;

const box = css`
  @keyframes scroll-down {
    0%,
    100% {
    }
    25% {
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(0px);
    }
    70% {
      transform: translateY(-15px);
    }
    95% {
      transform: translateY(0px);
    }
  }
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  margin: 0 auto;
  border: 1px solid #ffffff;
  border-radius: 1px;
  animation: scroll-down 1s infinite;
`;

export function ScrollDown() {
  return (
    <div className={scrollDownStyle}>
      <div className={box} />
      <a href="#home--items">SCROLL DOWN</a>
    </div>
  );
}
