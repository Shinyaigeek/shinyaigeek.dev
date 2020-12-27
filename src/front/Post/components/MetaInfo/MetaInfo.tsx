// import { Edit } from "@zeit-ui/react-icons";

import { DecorationTag } from "../../../components/DecorationTag/DecorationTag";
import React from "react";
import { css } from "linaria";

const metaInfo = css`
  width: 80vw;
  margin 12px auto;
`;

export function MetaInfo(props: {
  fields: {
    tags: string[];
    title: string;
    publishedAt: string;
  };
}) {
  return (
    <div className={metaInfo}>
      <h1>{props.fields.title}</h1>
      <div>
        {/* <Edit /> */}
        {props.fields.publishedAt}
      </div>
      <DecorationTag tags={props.fields.tags} />
    </div>
  );
}
