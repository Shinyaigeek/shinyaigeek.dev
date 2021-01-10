import { css } from "linaria";
import React from "react";

const radius = 30;
const range = 8;

const loadingStyle = css`
  @keyframes spin-fade {
    50% {
      opacity: 0.3;
      -webkit-transform: scale(0.4);
      transform: scale(0.4);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  width: ${radius * (1 + 1.414 * 2)}px;
  height: ${radius * (1 + 1.414 * 2)}px;
  top: calc(15vh - ${radius * (1 / 2 + 1.414)}px);
  position: relative;

  margin: auto;

  div {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin: 2px;
    background: var(--theme-color);
    position: absolute;

    ${Array(range)
      .fill(0)
      .map((_, idx) => {
        return `
        &:nth-child(${idx + 1}) {
          animation: spin-fade 1s -${idx * (1 / range)}s infinite linear;
          top: ${
            idx === 0 || idx === 7
              ? 0
              : idx === 1 || idx === 6
              ? (1 / 1.414) * radius
              : idx === 2 || idx === 5
              ? (1 / 1.414 + 1) * radius
              : (2 / 1.414 + 1) * radius
          }px;
          left: ${
            idx === 0 || idx === 3
              ? (1 / 2) * radius + radius * (1 / 2 + 1.414)
              : idx === 1 || idx === 2
              ? (1 / 1.414 + 1 / 2) * radius + radius * (1 / 2 + 1.414)
              : idx === 4 || idx === 7
              ? (-1 / 2) * radius + radius * (1 / 2 + 1.414)
              : (-1 / 2 - 1 / 1.414) * radius + radius * (1 / 2 + 1.414)
          }px;
        }
      `;
      })
      .join("")}
  }
`;

export const Loading = () => {
  return (
    <div className={loadingStyle}>
      {Array(range)
        .fill(0)
        .map((_) => {
          return <div></div>;
        })}
    </div>
  );
};
