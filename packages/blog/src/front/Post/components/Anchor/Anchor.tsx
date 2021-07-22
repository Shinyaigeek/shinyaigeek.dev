interface Props {
  anchors: string[];
}
import { css } from "linaria";
import React from "react";

const postAnchor = css`
  position: fixed;
  top: 84px;
  left: 20vw;
  width: 180px;
  color: black;
  background: white;
  a {
    display: block;
    color: black;
    margin: 4px 0 4px 4px;
    text-decoration: none;
  }

  > summary::-webkit-details-marker {
    color: black;
    margin-left: 6px;
  }
`;

export function Anchor(props: Props) {
  return (
    <details className={postAnchor}>
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
