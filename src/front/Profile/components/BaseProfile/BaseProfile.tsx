import { css } from "linaria";
import React from "react";

import { Twitter, Linkedin, Github } from "@zeit-ui/react-icons";
import { serverPath } from "../../../utils/consts/server";

// * Math.random()でrandomを導出すると, SSR時にclassNameが変わってしまう可能性があるためrandomな値は静的な値としておく
const noiseAnimRandomInt1 = [
  21,
  99,
  70,
  38,
  1,
  7,
  35,
  21,
  28,
  66,
  60,
  60,
  97,
  54,
  74,
  77,
  65,
  68,
  8,
  97,
];

const noiseAnimRandomInt2 = [
  40,
  2,
  50,
  26,
  48,
  36,
  63,
  67,
  79,
  37,
  77,
  42,
  47,
  77,
  5,
  83,
  1,
  88,
  95,
  49,
];

const noiseAnimRandomInt3 = [
  62,
  86,
  56,
  22,
  36,
  99,
  48,
  60,
  23,
  9,
  90,
  55,
  34,
  95,
  26,
  50,
  94,
  27,
  77,
  27,
];

const noiseAnimRandomInt4 = [
  78,
  83,
  93,
  17,
  77,
  50,
  43,
  50,
  91,
  80,
  36,
  33,
  30,
  12,
  42,
  10,
  84,
  94,
  77,
  58,
];

const name = css`
  font-size: 24px;
  text-align: center;
`;

const jobGlitch = css`
  font-size: 32px;
  text-align: center;
  position: relative;
  width: max-content;
  margin: 0 auto;

  &:after {
    @keyframes noise-anim {
      ${Array(21)
        .fill(0)
        .map((_, idx) => {
          return `
         ${5 * idx}% {
          clip: rect(${noiseAnimRandomInt1[idx]}px, 9999px, ${
            noiseAnimRandomInt2[idx]
          }px, 0);
         }
        `;
        })
        .join("")}
    }

    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: 2s infinite linear alternate-reverse noise-anim;
    white-space: nowrap;
  }

  &:before {
    @keyframes noise-anim-2 {
      ${Array(20)
        .fill(0)
        .map((_, idx) => {
          return `
         ${5 * idx}% {
          clip: rect(${noiseAnimRandomInt3[idx]}px, 9999px, ${
            noiseAnimRandomInt4[idx]
          }px, 0);
         }
        `;
        })
        .join("")}
    }
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: 3s infinite linear alternate-reverse noise-anim-2;
    white-space: nowrap;
  }
`;

const word = css`
  font-size: 24px;
  padding: 12px 0;
`;

const mySnsBox = css`
  display: flex;
  margin: 2px auto;
  max-width: 500px;
`;

const snsIcon = css`
  width: 54px;
  margin: 0 auto;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const BaseProfile = () => {
  return (
    <div className="baseprofile">
      <div className={name}>Shinobu Hayashi a.k.a Shinyaigeek(しにゃい)</div>
      <div className={jobGlitch} data-text="Web Developer">
        Web Developer
      </div>
      <div className={word}>
        I Love and Development Web Technology and that's ecosystem!!
      </div>
      <div className={mySnsBox}>
        <div className={snsIcon}>
          <a id="twitter" href="https://twitter.com/Shinyaigeek">
            <img src={`/assets/static/twitter.svg`} alt="twitter" width="54px" height="54px" />
          </a>
        </div>
        <div className={snsIcon}>
          <a id="github" href="https://github.com/Shinyaigeek">
            <img src={`/assets/static/github.svg`} alt="github" width="54px" height="54px"  />
          </a>
        </div>
        <div className={snsIcon}>
          <a id="linkedin" href="https://www.linkedin.com/in/shinyaigeek/">
            <img src={`/assets/static/linkedin.svg`} alt="linkedin" width="54px" height="54px"  />
          </a>
        </div>
      </div>
    </div>
  );
};
