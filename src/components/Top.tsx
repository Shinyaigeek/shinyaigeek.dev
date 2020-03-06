import React from "react";

import { Animation } from "./Animation";
import { ScrollDown } from "./ScrollDown";
import { StarStream } from "./StarStream";

export function Top() {
  return (
    <div className="welcome">
      <img className="banana" src="/banana.png" alt="banana" />
      <ScrollDown />
      <Animation />
      <StarStream />
    </div>
  );
}
