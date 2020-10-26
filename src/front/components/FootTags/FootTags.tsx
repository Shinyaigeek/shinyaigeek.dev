import React from "react";
import { TagProps, Tag } from "../Tag/Tag";

export const TAGS: TagProps[] = [
  {
    child: <span>React</span>,
    slug: "/?tag=React",
    color: "#3E95FF",
    background: "#6BD4FF",
    border: "#76B0FF"
  },
  {
    child: <span>JavaScript</span>,
    slug: "/?tag=JavaScript",
    color: "#FF4444",
    background: "#FF7B6A",
    border: "#FF6662"
  },
  {
    child: <span>Algorithm</span>,
    slug: "/?tag=Algorithm",
    color: "#66FF55",
    background: "#80FFB0",
    border: "#68FFBD"
  },
  {
    child: <span>Programming</span>,
    slug: "/?tag=Programming",
    color: "#FF4DEC",
    background: "#FF90EA",
    border: "#EC99FF"
  },
  {
    child: <span>Poem</span>,
    slug: "/?tag=Poem",
    color: "#FF8C25",
    background: "#FFB65A",
    border: "#EBA16E"
  },
  {
    child: <span>Blog</span>,
    slug: "/?tag=Blog",
    color: "#11E0EB",
    background: "#A3E9EB",
    border: "#AAD2ED"
  }
];

export function FootTags(props: { tags: TagProps[] }) {
  return (
    <div className="footTag">
      {props.tags.map(tag => {
        return <Tag {...tag} />;
      })}
    </div>
  );
}
