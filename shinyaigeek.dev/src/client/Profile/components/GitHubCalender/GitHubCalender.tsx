import React from "react";
import { Loading } from "../Loading/Loading";
import * as gitHubCalendar from "./GitHubCalender.module.scss";

export const GitHubCalender = () => {
  return (
    <github-calendar user-name="shinyaigeek" cache={86400}>
      <div className={gitHubCalendar.loadingStyle}>
        <Loading />
      </div>
    </github-calendar>
  );
};
