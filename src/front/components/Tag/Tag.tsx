export interface TagProps {
  child: React.ReactChild;
  slug: string;
  color: string;
}
import { css, cx } from "linaria";
import React from "react";

const tag = css`
  border-radius: 4px;
  width: min-content;
  padding: 2px 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 21px;
  font-weight: bold;
  margin: 12px 18px;
`;

export function Tag(props: TagProps) {
  return (
    <a href={props.slug} className={cx(tag, props.color)}>
      {props.child}
    </a>
  );
}
