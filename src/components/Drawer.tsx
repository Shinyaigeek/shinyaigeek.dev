import React from "react";

interface Props {
  children: React.ReactChild;
  class: string;
  id: string;
}

export function Drawer(props: Props) {
  return (
    <div id={props.id} className={props.class}>
      {props.children}
    </div>
  );
}
