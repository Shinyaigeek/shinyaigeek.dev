import Post from "../pages/Post";
import * as React from "react";
import ReactDOM from "react-dom";

const props = JSON.parse(
  document.getElementById("props-data")?.getAttribute("data-json") || ""
);

