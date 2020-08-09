import React from "react";

import { Animation } from "./Animation";
import { ScrollDown } from "./ScrollDown";
import { StarStream } from "./StarStream";

export function Top() {
  return (
    <div className="welcome">
      <img className="banana" src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/banana.png" alt="banana" />
      <ScrollDown />
      <Animation />
      <StarStream />
    </div>
  );
}
