import React from "react";
import { Shinyaigeek } from "../Shinyaigeek/Shinyaigeek";

export function ShinyaigeekAnimation() {
  return (
    <div>
      <Shinyaigeek
        styles={{
          position: "absolute",
          bottom: "25px",
          right: "25px",
        }}
      />
    </div>
  );
}
