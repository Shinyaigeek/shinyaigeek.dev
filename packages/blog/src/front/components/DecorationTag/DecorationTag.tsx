import { css } from "linaria";
import React from "react";

interface Props {
  tags: string[];
}

const tag = css`
  display: flex;
  width: 80%;
  padding: 12px 0;

  div {
    padding: 2px 4px;
  }
`;

export function DecorationTag({ tags }: Props) {
  return (
    <div className={tag}>
      {tags.map((tag, index) => {
        return <div key={`decorationTag__${index}`}>{tag}</div>;
      })}
    </div>
  );
}
