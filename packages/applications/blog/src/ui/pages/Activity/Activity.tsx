import type { FunctionComponent } from "react";
import type { ContributionCalendar as ContributionCalendarType } from "../../../build/model/github-activity/contribution-calendar.entity";
import { ContributionCalendar } from "../../components/contribution-calendar/contribution-calendar";
import { Section } from "../../components/section/section";
import { calendarUnavailable, state } from "./Activity.module.css";

interface Props {
	language: "ja" | "en";
	/** null when the build could not reach GitHub; the page still renders. */
	calendar: ContributionCalendarType | null;
	/** GitHub login the client-side search query is built from. */
	login: string;
}

const COPY = {
	ja: {
		calendarEyebrow: "Contributions",
		calendarTitle: "GitHub の活動",
		calendarDescription:
			"直近 1 年のコントリビューション。ビルド時に GitHub から取得しています。",
		calendarUnavailable:
			"コントリビューションを取得できませんでした。GitHub のプロフィールからご確認ください。",
		listEyebrow: "Open Source",
		listTitle: "外部リポジトリへの Pull Request / Issue",
		listDescription:
			"自分以外のリポジトリに出した Pull Request と Issue を、GitHub から直接読み込んで表示しています。",
		loading: "読み込み中…",
		fallback: "GitHub で一覧を見る",
	},
	en: {
		calendarEyebrow: "Contributions",
		calendarTitle: "GitHub activity",
		calendarDescription:
			"Contributions over the last year, pulled from GitHub at build time.",
		calendarUnavailable:
			"The contribution calendar could not be loaded. It is available on the GitHub profile.",
		listEyebrow: "Open Source",
		listTitle: "Pull requests & issues in other repositories",
		listDescription:
			"Pull requests and issues opened outside my own repositories, read straight from GitHub in your browser.",
		loading: "Loading…",
		fallback: "See the full list on GitHub",
	},
} as const;

export const Activity: FunctionComponent<Props> = ({
	language,
	calendar,
	login,
}) => {
	const copy = COPY[language];
	const searchUrl = `https://github.com/search?q=${encodeURIComponent(
		`involves:${login} -user:${login} author:${login} is:public`,
	)}&type=issues`;

	return (
		<div>
			<Section
				eyebrow={copy.calendarEyebrow}
				title={copy.calendarTitle}
				description={copy.calendarDescription}
				action={{
					href: `https://github.com/${login}`,
					label: `@${login}`,
				}}
			>
				{calendar ? (
					<ContributionCalendar language={language} calendar={calendar} />
				) : (
					<p className={calendarUnavailable}>{copy.calendarUnavailable}</p>
				)}
			</Section>

			<Section
				eyebrow={copy.listEyebrow}
				title={copy.listTitle}
				description={copy.listDescription}
			>
				{/*
				  Hydrated by GitHubActivityManager in src/client/main.tsx. The
				  markup below is what a visitor sees before (or instead of) that
				  call succeeding, so it always offers a way through to the data.
				*/}
				<div
					data-github-activity
					data-github-login={login}
					data-loading-label={copy.loading}
					data-fallback-label={copy.fallback}
					data-fallback-url={searchUrl}
				>
					<p className={state}>
						<a href={searchUrl} target="_blank" rel="noopener noreferrer">
							{copy.fallback}
						</a>
					</p>
				</div>
			</Section>
		</div>
	);
};
