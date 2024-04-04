import React from "react";
import { Loading } from "../Loading/Loading";
import gitHubCalendar from "./GitHubCalendar.module.css";

export const GitHubCalender = () => {
	return (
		<github-calendar user-name="shinyaigeek" cache={86400}>
			<div className={gitHubCalendar.loadingStyle}>
				<Loading />
			</div>
		</github-calendar>
	);
};
