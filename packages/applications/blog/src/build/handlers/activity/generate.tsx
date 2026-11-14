import { renderToStaticMarkup } from "react-dom/server";
import type { GenerateHandler } from "ssg-router";
import { Layout } from "../../../ui/components/Layout/Layout";
import { Shell } from "../../../ui/components/Shell/shell";
import {
	Activity,
	githubActivitySearchUrl,
} from "../../../ui/pages/Activity/Activity";
import { GetContributionCalendarUsecase } from "../../application/getContributionCalendar/getContributionCalendar.usecase";
import type { Context } from "../../context/context";
import { ContributionCalendarRepository } from "../../model/github-activity/contribution-calendar.repository";
import { Language } from "../../model/language/language.entity";
import {
	linkItem,
	markdownHeader,
	markdownSection,
} from "../markdown/document";
import { siteBaseUrl } from "../site-metadata";

const GITHUB_LOGIN = "Shinyaigeek";

const activityDescription = (language: Language) =>
	language === Language.ja
		? "Shinyaigeek の GitHub での活動。コントリビューションと、外部リポジトリへの Pull Request / Issue の一覧です。"
		: "Shinyaigeek's GitHub activity: contributions, plus pull requests and issues opened in other people's repositories.";

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

	return renderToStaticMarkup(
		<Shell
			language={context.language}
			title="Activity - shinyaigeek.dev"
			path="/activity/"
			description={activityDescription(context.language)}
			markdown
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

/**
 * The page's Markdown leaves the contribution calendar out: it is a grid of
 * colored squares, and what it says is a link away on GitHub. The list of pull
 * requests and issues is fetched by the reader's browser, so the page's own
 * markup only ever holds the link to it, which is what this carries too.
 */
export const generateActivityMarkdown: GenerateHandler<Context> = async ({
	context,
}) => {
	const language = context.language;
	const japanese = language === Language.ja;

	return (
		markdownHeader({
			title: "Activity",
			description: activityDescription(language),
			source: `${siteBaseUrl(language)}/activity/`,
		}) +
		markdownSection("GitHub", [
			linkItem(
				`@${GITHUB_LOGIN}`,
				`https://github.com/${GITHUB_LOGIN}`,
				japanese
					? "GitHub のプロフィールとコントリビューション"
					: "The GitHub profile and its contributions",
			),
			linkItem(
				japanese
					? "外部リポジトリへの Pull Request / Issue"
					: "Pull requests & issues in other repositories",
				githubActivitySearchUrl(GITHUB_LOGIN),
			),
		])
	);
};
