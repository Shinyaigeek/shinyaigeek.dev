import { Divider } from "../../../components/Divider/Divider";
import { Button } from "../../../components/Button/Button";

import { getOmmit } from "../../../../server/util/getOmmit";
import React from "react";
export interface MetaData {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  slug: string;
}

export function Item(props: MetaData) {
  return (
    <div className="item--home">
      <a className="item--home__anchor" href={`/post/${props.slug}`}>
        <div className="title">{props.title}</div>
      </a>
      <Divider />
      <div className="date">{props.publishedAt}</div>
      <div className="tags"></div>
      <div>{getOmmit(props.description)}</div>
      <div className="read--more">
        <a className="item--home__anchor read--more__anchor" href={`/post/${props.slug}`}>
          <Button id="more-button">MORE</Button>
        </a>
      </div>
    </div>
  );
}
