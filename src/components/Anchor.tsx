import React from "react";

import { DownCircleOutlined } from "@ant-design/icons";

interface Props {
  anchors: string[];
}

export function Anchor(props: Props) {
  return (
    <details className="post--anchor">
      <summary className="post--anchor__title" id="post--anchor__title">
        目次
      </summary>
        {props.anchors &&
          props.anchors.map((anchor, index) => {
            return (
              <a
                key={index}
                href={`#${encodeURI(anchor.toLowerCase()).replace(
                  /%20/g,
                  "-"
                )}`}>
                {anchor}
              </a>
            );
          })}
    </details>
  );
}
