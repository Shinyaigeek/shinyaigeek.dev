import React from "react";

import DecorationTag from "../components/DecorationTag"

import { Tag,Icon } from "antd";

export default function MetaInfo(props: {
  tag: string[];
  name: string;
  date: string;
}) {
  return (
    <div>
      <h1>{props.name}</h1>
      <div><Icon type="edit" />{props.date}</div>
      <DecorationTag tags={props.tag} />
    </div>
  );
}
