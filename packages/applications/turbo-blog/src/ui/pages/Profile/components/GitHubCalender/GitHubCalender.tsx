import { Loading } from "../Loading/Loading";
import { loadingStyle } from "./GitHubCalendar.module.css";

export const GitHubCalender = () => {
	return (
		<github-calendar user-name="shinyaigeek" cache={86400}>
			<div className={loadingStyle}>
				<Loading />
			</div>
		</github-calendar>
	);
};
