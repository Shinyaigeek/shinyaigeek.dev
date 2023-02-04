import React, { type FunctionComponent } from "react";
import { HeaderComponent } from "../../components/header/header";

interface Props {
  allProjects: string[];
}

export const TopPageComponent: FunctionComponent<Props> = function ({
  allProjects,
}) {
  return (
    <div>
      <HeaderComponent />
      hello {allProjects.map((project) => `${project},`)}
    </div>
  );
};
