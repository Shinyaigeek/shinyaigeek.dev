import { css } from "linaria";
import React from "react";

const footer = css`
  text-align: center;
  margin-top: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: var(--theme-color);
  background-color: var(--theme-header)
`

export function Footer() {
  return <div className={footer}>Copyright. 2020 Shinyaigeek</div>;
}
