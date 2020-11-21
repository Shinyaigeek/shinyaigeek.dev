import { render } from "lit-html";
import { Item } from "./Home/components/Item/Item";
import { registerPrefetch } from "./prefetch/prefetcher";
import React from "react"

// console.log(Item)

render(
  <Item title="a" description="a" publishedAt="o" slug="oo" />,
  document.getElementById("_app")!
);

// registerPrefetch();

// console.log("hey")
