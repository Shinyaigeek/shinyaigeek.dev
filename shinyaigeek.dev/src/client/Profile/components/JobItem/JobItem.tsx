import React from "react";
import jobItem from "./JobItem.module.scss";

interface Props {
  job: string;
  description: string;
  term: string;
  position: string;
}

export const JobItem = (props: Props) => {
  return (
    <li className={jobItem.jobItem}>
      <div className="title">{props.job}</div>
      <div className="meta">
        <div className="position">{props.position}</div>/
        <div className="term">{props.term}</div>
      </div>
      <div className="description">{props.description}</div>
    </li>
  );
};
