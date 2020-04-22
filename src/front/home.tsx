import Home from "../pages/Home";
import React from "react";
import ReactDOM from "react-dom";

const props = JSON.parse(
  document.getElementById("props-data")?.getAttribute("data-json") || ""
);

ReactDOM.hydrate(<Home {...props} />, document.getElementById("_app"));
