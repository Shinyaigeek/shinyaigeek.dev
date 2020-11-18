export interface TagProps {
  child: React.ReactChild;
  slug: string;
  color: string;
  border: string;
  background: string;
}
import React from "react";

export function Tag(props: TagProps) {
  return (
    <a
      href={props.slug}
      className="tag"
      style={{
        color: props.color,
        border: `${props.border} 3px solid`,
        background: props.background
      }}
    >
      {props.child}
    </a>
  );
}
