import React from "react";

import { Tag } from "antd";

interface Props {
  tags: string[];
}

export default function DecorationTag(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        padding:"12px 0"
      }}
    >
      {props.tags.map((tag, index) => {
        return <Tag key={`decorationTag__${index}`}>{tag}</Tag>;
      })}
    </div>
  );
}
