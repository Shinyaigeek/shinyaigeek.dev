import React from "react";
import { MyIcon } from "./MyIcon";

export function Animation() {
  return (
    <div>
      <MyIcon
        styles={{
          position: "absolute",
          bottom: "25px",
          right: "25px",
        }}
      />
    </div>
  );
}
