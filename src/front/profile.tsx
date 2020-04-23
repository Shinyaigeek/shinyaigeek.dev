import Profile from "../pages/Profile";
import React from "react";
import ReactDOM from "react-dom";

// const props = JSON.parse(
//   document.getElementById("props-data")?.getAttribute("data-json") || ""
// );

ReactDOM.hydrate(<Profile />, document.getElementById("_app"));
