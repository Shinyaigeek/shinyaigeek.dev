import { Divider } from "../../../components/Divider/Divider";
import { Button } from "../../../components/Button/Button";

import { getOmmit } from "../../../../server/util/getOmmit";
import React from "react";
import { css } from "linaria"
export interface MetaData {
  title: string;
  description: string;
  publishedAt: string;
  // tags: string[];
  slug: string;
}

const home = css`
  min-width: 300px;
  width: 80%;
  max-width: 750px;
  margin: 12px auto;
  color: red;
`;

export const Item = (props: MetaData) => {
  return (
    <div className={home}>
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
