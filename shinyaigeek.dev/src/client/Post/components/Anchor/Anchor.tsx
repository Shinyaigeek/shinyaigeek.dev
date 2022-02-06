interface Props {
  anchors: string[];
}
import React from "react";
import postAnchor from "./Anchor.module.scss";

export function Anchor(props: Props) {
  return (
    <details className={postAnchor.postAnchor}>
      <summary className="post--anchor__title" id="post--anchor__title">
        目次
      </summary>
      {props.anchors &&
        props.anchors.map((anchor, index) => {
          return (
            <a key={index} href={`#2__${index}`}>
              {anchor}
            </a>
          );
        })}
    </details>
  );
}
