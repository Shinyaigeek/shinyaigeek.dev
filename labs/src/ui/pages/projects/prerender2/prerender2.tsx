import React, { type FunctionComponent } from "react";

interface Props {}

export const Prerender2PageComponent: FunctionComponent<Props> = function () {
  return (
    <div>
      Prerender2 go to <a href="/projects/prerender2/subpage">subpage</a>
    </div>
  );
};
