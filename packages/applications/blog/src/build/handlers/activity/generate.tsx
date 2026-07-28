import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import { Activity } from "../../../ui/pages/Activity/Activity";
import { GetContributionCalendarUsecase } from "../../application/getContributionCalendar/getContributionCalendar.usecase";
import type { Context } from "../../context/context";
import { ContributionCalendarRepository } from "../../model/github-activity/contribution-calendar.repository";
import { Language } from "../../model/language/language.entity";

const GITHUB_LOGIN = "Shinyaigeek";

export const generateActivityPage: GenerateHandler<Context> = async ({
	context,
}) => {
	const contributionCalendarRepository = new ContributionCalendarRepository(
		GITHUB_LOGIN,
	);
	const getContributionCalendarUsecase = new GetContributionCalendarUsecase(
		contributionCalendarRepository,
	);

	// Returns null (with a warning) rather than throwing when GitHub is
	// unreachable or GITHUB_TOKEN is absent — see the usecase.
	const calendar =
		await getContributionCalendarUsecase.getContributionCalendarOrNull();

	const title = "Activity - shinyaigeek.dev";
	const description =
		context.language === Language.ja
			? "Shinyaigeek の GitHub での活動。コントリビューションと、外部リポジトリへの Pull Request / Issue の一覧です。"
			: "Shinyaigeek's GitHub activity: contributions, plus pull requests and issues opened in other people's repositories.";

	return renderToStaticMarkup(
		<Shell
			language={context.language}
			title={title}
			path="/activity/"
			description={description}
			builtAssets={context.builtAssets}
		>
			<Layout
				language={context.language}
				page="activity"
				currentPath="/activity/"
			>
				<Activity
					language={context.language}
					calendar={calendar}
					login={GITHUB_LOGIN}
				/>
			</Layout>
		</Shell>,
	);
};
