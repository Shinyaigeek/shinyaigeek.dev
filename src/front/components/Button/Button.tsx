import React from "react";
import { css } from "linaria";

interface Props {
  id: string;
  children: React.ReactChild;
}

const button = css`
  width: min-content;
  white-space: nowrap;
  padding: 2px 4px;
  min-width: 96px;
  height: 36px;
  border: 2px solid var(--theme-color);
  background: transparent;
  color: var(--theme-color);
  font-size: 20px;
  font-weight: bold;
  border-radius: 6px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background: #ffbc6e;
  }
`;

export function Button(props: Props) {
  return (
    <div id={props.id} className={button}>
      {props.children}
    </div>
  );
}
