import { Divider } from "../../../components/Divider/Divider";
import { Button } from "../../../components/Button/Button";

import { getOmmit } from "../../../../build/util/getOmmit";
import React from "react";
import item from "./Item.module.scss";
export interface MetaData {
  title: string;
  description?: string;
  ogp?: string;
  publishedAt: string;
  // tags: string[];
  slug: string;
  media?: string;
}

export const Item = (props: MetaData) => {
  return (
    <div className={item.home}>
      <a className={item.itemHomeAnchor} href={`/post/${props.slug}`}>
        <div className={item.title}>{props.title}</div>
      </a>
      <Divider />
      <div className={item.date}>{props.publishedAt}</div>
      <div className={item.tags}></div>
      <div>{getOmmit(props.description ?? "")}</div>
      {props.ogp && (
        <a
          href={!props.media ? `/post/${props.slug}` : props.slug}
          tabIndex={-1}
        >
          <img
            src={props.ogp}
            alt={props.title}
            className={item.ogp}
            loading="lazy"
          />
        </a>
      )}
      <div className={item.readMore}>
        <a
          className={`item--home__anchor ${item.readMoreAnchor}`}
          href={!props.media ? `/post/${props.slug}` : props.slug}
          tabIndex={-1}
        >
          <Button id="more-button">Read</Button>
        </a>
      </div>
    </div>
  );
};
