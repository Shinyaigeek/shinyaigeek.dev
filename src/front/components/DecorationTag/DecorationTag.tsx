import React from "react";

// import { Tag } from "antd";

interface Props {
  tags: string[];
}

export function DecorationTag(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        padding: "12px 0"
      }}
    >
      {props.tags.map((tag, index) => {
        return <div key={`decorationTag__${index}`}>{tag}</div>;
      })}
    </div>
  );
}
