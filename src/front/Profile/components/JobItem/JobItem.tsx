import { css } from "linaria";
import React from "react";

interface Props {
  job: string;
  description: string;
  term: string;
  position: string;
}

const jobItem = css`
  margin: 12px 2px;
  .title {
    font-size: 18px;
  }

  .position {
    display: inline-block;
    margin-right: 9px;
  }

  .term {
    display: inline-block;
    margin-left: 9px;
  }

  .meta {
      margin: 3px 4px;
  }
`;

export const JobItem = (props: Props) => {
  return (
    <li className={jobItem}>
      <div className="title">{props.job}</div>
      <div className="meta">
        <div className="position">{props.position}</div>/
        <div className="term">{props.term}</div>
      </div>
      <div className="description">{props.description}</div>
    </li>
  );
};
