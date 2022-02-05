import { css } from "linaria";
import React from "react";
import * as styles from "./DecorationTag.module.css";

interface Props {
  tags: string[];
}

export function DecorationTag({ tags }: Props) {
  return (
    <div className={styles.tag}>
      {tags.map((tag, index) => {
        return (
          <div className={styles.content} key={`decorationTag__${index}`}>
            {tag}
          </div>
        );
      })}
    </div>
  );
}
