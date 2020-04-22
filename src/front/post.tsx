import Post from "../pages/Post";
import React from "react";
import ReactDOM from "react-dom";

const props = JSON.parse(
  document.getElementById("props-data")?.getAttribute("data-json") || ""
);

ReactDOM.hydrate(<Post {...props} />, document.getElementById("_app"));
