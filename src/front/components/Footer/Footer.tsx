import { css } from "linaria";
import React from "react";

const footer = css`
  text-align: center;
  margin-top: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: var(--theme-text);
  background-color: car(--theme-header)
`

export function Footer() {
  return <div className={footer}>Copyright. 2020 Shinyaigeek</div>;
}
