import React from "react";
import jobItem from "./JobItem.module.css";

interface Props {
	job: string;
	description: string;
	term: string;
	position: string;
}

export const JobItem = (props: Props) => {
	return (
		<li className={jobItem.jobItem}>
			<div className={jobItem.title}>{props.job}</div>
			<div className={jobItem.meta}>
				<div className={jobItem.position}>{props.position}</div>/
				<div className={jobItem.term}>{props.term}</div>
			</div>
			<div className="description">{props.description}</div>
		</li>
	);
};
