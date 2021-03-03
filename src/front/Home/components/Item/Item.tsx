import { Divider } from "../../../components/Divider/Divider";
import { Button } from "../../../components/Button/Button";

import { getOmmit } from "../../../../server/util/getOmmit";
import React from "react";
import { css } from "linaria";
export interface MetaData {
  title: string;
  description: string;
  publishedAt: string;
  // tags: string[];
  slug: string;
}

const itemHomeAnchor = css`
  color: var(--theme-color);
  text-decoration: none;
  display: inline-block;

  .title {
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    padding: 8px 12px;
  }
`;

const home = css`
  min-width: 300px;
  width: 80%;
  max-width: 750px;
  margin: 12px auto;

  .date {
    padding: 16px 6px;
    font-size: 18px;
  }

  .read--more__anchor {
    margin: 16px 0;
    position: absolute;
    right: 24px;
  }

  .read--more {
    position: relative;
    margin: 4px 0;
    height: 64px;
  }
`;

export const Item = (props: MetaData) => {
  return (
    <div className={home}>
      <a className={itemHomeAnchor} href={`/post/${props.slug}`}>
        <div className="title">{props.title}</div>
      </a>
      <Divider />
      <div className="date">{props.publishedAt}</div>
      <div className="tags"></div>
      <div>{getOmmit(props.description)}</div>
      <div className="read--more">
        <a
          className="item--home__anchor read--more__anchor"
          href={`/post/${props.slug}`}
          tabIndex={-1}>
          <Button id="more-button">Read</Button>
        </a>
      </div>
    </div>
  );
};
