import React from "react";

interface Props {
  id: string;
  children: React.ReactChild;
}

export function Button(props: Props) {
  return (
    <div id={props.id} className="blog--button">
      {props.children}
    </div>
  );
}
