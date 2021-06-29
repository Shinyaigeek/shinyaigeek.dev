import { css } from "linaria";
import React from "react";

const startStreamRandomInt100 = [
  13,
  49,
  99,
  55,
  26,
  65,
  46,
  51,
  79,
  75,
  82,
  81,
  10,
  32,
  29,
  61,
  99,
  59,
  96,
  86,
  4,
  62,
  49,
  12,
  93,
];

const startStreamRandomInt250 = [
  45,
  236,
  233,
  239,
  153,
  25,
  68,
  243,
  228,
  88,
  166,
  180,
  74,
  218,
  135,
  134,
  117,
  107,
  146,
  105,
  236,
  80,
  222,
  8,
  26,
];

const starStreamStyle = css`
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 72px);
  z-index: -888;
  overflow: hidden;
`;

const stars = css`
  @keyframes rain {
    from {
      transform: rotate(-5deg) translateY(-20vh);
    }
    to {
      transform: rotate(-5deg) translateY(120vh);
    }
  }
  animation: rain 500ms linear infinite;
  background-color: rgba(255, 255, 255, 0.25);
  position: absolute;
  left: 0;
  top: -20vh;
  width: 1px;
  height: 20vh;
  transform-origin: center center;

  ${Array(25)
    .fill(0)
    .map((_, idx) => {
      return `
  &:nth-child(${idx + 1}) {
    animation-delay: ${idx * 100 + 100}ms;
    animation-duration: ${startStreamRandomInt250[idx] * 3}ms;
    left: ${startStreamRandomInt100[idx]}vw;
  }

  @media (prefers-reduced-motion) {
    animation: dissolve;
  }
  `;
    })
    .join("")}
`;

export function StarStream() {
  return (
    <div className={starStreamStyle}>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
      <div className={stars}></div>
    </div>
  );
}
