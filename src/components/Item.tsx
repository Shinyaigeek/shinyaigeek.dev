import React from "react";

import { Divider } from "./Divider";
import { Button } from "./Button";

import { getOmmit } from "../lib/getOmmit";

export interface MetaData {
  title: string;
  content: string;
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
      <div>{getOmmit(props.content)}</div>
      <div className="read--more">
        <a className="item--home__anchor read--more__anchor" href={`/post/${props.slug}`}>
          <Button id="more-button">MORE</Button>
        </a>
      </div>
    </div>
  );
}
