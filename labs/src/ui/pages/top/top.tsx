import React, { type FunctionComponent } from "react";
import { HeaderComponent } from "../../components/header/header";
import styles from "./top.module.css";

interface Props {
  allProjects: string[];
}

export const TopPageComponent: FunctionComponent<Props> = function ({
  allProjects,
}) {
  return (
    <div>
      <HeaderComponent />
      <main className={styles.top}>
        <h1>
          Labs playground for shinyaigeek's private study of web ecosystem
        </h1>
        {allProjects.map((project) => (
          <a href={`/projects/${project}/`}>{project}</a>
        ))}
      </main>
    </div>
  );
};
