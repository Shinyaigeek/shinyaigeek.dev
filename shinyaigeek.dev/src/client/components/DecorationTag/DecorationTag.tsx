import { css } from "linaria";
import React from "react";
import * as tag from "./DecorationTag.module.scss";

interface Props {
  tags: string[];
}

export function DecorationTag({ tags }: Props) {
  return (
    <div className={tag.tag}>
      {tags.map((tag, index) => {
        return <div key={`decorationTag__${index}`}>{tag}</div>;
      })}
    </div>
  );
}
