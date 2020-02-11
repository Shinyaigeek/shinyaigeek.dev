import React from "react";

import { Anchor } from "antd";

const { Link } = Anchor;

import "../style/scrolldown.scss";

export default function ScrollDown() {
  return (
    <div className="scroll--down__animation">
      <div className="scroll--down__box" />
      <a href="#home--items" style={{
        textDecoration:"none",
        color:"white"
      }}>SCROLL DOWN</a>
    </div>
  );
}
