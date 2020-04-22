import React from "react";

// import { DownCircleOutlined } from "@ant-design/icons";

interface Props {
  anchors: string[];
}

export function Anchor(props: Props) {
  return (
    <div className="post--anchor">
      <div className="post--anchor__title" id="post--anchor__title">
        {/* <DownCircleOutlined /> */}
        目次
      </div>
      <div id="post--anchors" className="post--anchors">
        {props.anchors && props.anchors.map((anchor, index) => {
          return (
            <a
              key={index}
              href={`#${encodeURI(anchor.toLowerCase()).replace(/%20/g, "-")}`}
            >
              {anchor}
            </a>
          );
        })}
      </div>
    </div>
  );
}
