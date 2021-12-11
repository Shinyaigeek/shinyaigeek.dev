import { TagProps, Tag } from "../Tag/Tag";
import React from "react";
import { css } from "linaria";

export const TAGS: TagProps[] = [
  {
    child: <span>React</span>,
    slug: "/?tag=React",
    color: css`
      color: #232322;
      background: #6bd4ff;
      border: #76b0ff;
    `,
  },
  {
    child: <span>JavaScript</span>,
    slug: "/?tag=JavaScript",
    color: css`
      color: #232322;
      background: #ff7b6a;
      border: #ff6662;
    `,
  },
  {
    child: <span>Algorithm</span>,
    slug: "/?tag=Algorithm",
    color: css`
      color: #232322;
      background: #80ffb0;
      border: #68ffbd;
    `,
  },
  {
    child: <span>Programming</span>,
    slug: "/?tag=Programming",
    color: css`
      color: #232322;
      background: #ff90ea;
      border: #ec99ff;
    `,
  },
  {
    child: <span>Poem</span>,
    slug: "/?tag=Poem",
    color: css`
      color: #232322;
      background: #ffb65a;
      border: #eba16e;
    `,
  },
  {
    child: <span>Blog</span>,
    slug: "/?tag=Blog",
    color: css`
      color: #232322;
      background: #a3e9eb;
      border: #aad2ed;
    `,
  },
];

const footTag = css`
  width: 90vw;
  margin: 12px auto;
`;

export function FootTags(props: { tags: TagProps[] }) {
  return (
    <div className={footTag}>
      {props.tags.map((tag) => {
        return <Tag {...tag} />;
      })}
    </div>
  );
}
