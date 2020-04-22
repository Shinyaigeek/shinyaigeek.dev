import React from "react";

// import { EditOutlined } from "@ant-design/icons";

import { DecorationTag } from "./DecorationTag";

export function MetaInfo(props: {
  fields: {
    tags: string[];
    title: string;
    publishedAt: string;
  };
}) {
  return (
    <div>
      <h1>{props.fields.title}</h1>
      <div>
        {/* <EditOutlined /> */}
        {props.fields.publishedAt}
      </div>
      <DecorationTag tags={props.fields.tags} />
    </div>
  );
}
