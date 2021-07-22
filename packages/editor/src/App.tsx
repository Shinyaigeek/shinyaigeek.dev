import React from "react";
import { render } from "react-dom";

const App: React.FC<{}> = function () {
  return <div>helo </div>;
};

render(<App />, document.getElementById("app"));
