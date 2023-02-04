import React, { type FunctionComponent } from "react";

interface Props {
  allProjects: string[];
}

export const TopPageComponent: FunctionComponent<Props> = function ({
  allProjects,
}) {
  return <div>hello {allProjects.map((project) => `${project},`)}</div>;
};
