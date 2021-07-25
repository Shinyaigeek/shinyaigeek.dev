import React from "react";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { Editor } from "./pages/Editor/Editor";

const App: React.FC = function () {
  return (
    <RecoilRoot>
      <Editor />
    </RecoilRoot>
  );
};

render(<App />, document.getElementById("app"));
