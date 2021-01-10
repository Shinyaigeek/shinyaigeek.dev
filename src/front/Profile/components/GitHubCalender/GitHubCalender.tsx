import { css } from "linaria";
import React from "react";
import { Loading } from "../Loading/Loading";

const loadingStyle = css`
  width: 100%;
  height: 30vh;
`;

export const GitHubCalender = () => {
  return (
    <div className="ghCalender">
      <div className={loadingStyle}>
        <Loading />
      </div>
    </div>
  );
};
