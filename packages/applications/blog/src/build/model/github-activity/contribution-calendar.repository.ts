import { type Result, createErr, createOk } from "option-t/esm/PlainResult";
import {
	ContributionCalendar,
	type ContributionWeek,
} from "./contribution-calendar.entity";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
	query ContributionCalendar($login: String!) {
		user(login: $login) {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							date
							contributionCount
							contributionLevel
						}
					}
				}
			}
		}
	}
`;

/** GitHub's contributionLevel enum, in ascending order. */
const LEVEL_BY_NAME: Record<string, number> = {
	NONE: 0,
	FIRST_QUARTILE: 1,
	SECOND_QUARTILE: 2,
	THIRD_QUARTILE: 3,
	FOURTH_QUARTILE: 4,
};

interface GraphQLResponse {
	data?: {
		user?: {
			contributionsCollection?: {
				contributionCalendar?: {
					totalContributions: number;
					weeks: {
						contributionDays: {
							date: string;
							contributionCount: number;
							contributionLevel: string;
						}[];
					}[];
				};
			};
		};
	};
	errors?: { message: string }[];
}

/**
 * Reads the contribution calendar from GitHub's GraphQL API at build time.
 *
 * The GraphQL API requires authentication even for public data, so this needs
 * GITHUB_TOKEN in the environment. Every failure path returns an Err rather
 * than throwing: the calendar is a decoration on one page, and a missing token
 * or a GitHub outage must not be able to fail the whole site build.
 */
export class ContributionCalendarRepository {
	constructor(
		private readonly login: string,
		private readonly token: string | undefined = process.env.GITHUB_TOKEN,
	) {}

	public async getContributionCalendar(): Promise<
		Result<ContributionCalendar, Error>
	> {
		if (!this.token) {
			return createErr(
				new Error(
					"GITHUB_TOKEN is not set; skipping the contribution calendar.",
				),
			);
		}

		let response: Response;
		try {
			response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
				method: "POST",
				headers: {
					Authorization: `bearer ${this.token}`,
					"Content-Type": "application/json",
					// GitHub rejects API requests without a User-Agent.
					"User-Agent": "shinyaigeek.dev-build",
				},
				body: JSON.stringify({
					query: CONTRIBUTION_QUERY,
					variables: { login: this.login },
				}),
			});
		} catch (cause) {
			return createErr(
				new Error("Failed to reach the GitHub GraphQL API.", { cause }),
			);
		}

		if (!response.ok) {
			return createErr(
				new Error(
					`GitHub GraphQL API responded with ${response.status} ${response.statusText}.`,
				),
			);
		}

		let body: GraphQLResponse;
		try {
			body = (await response.json()) as GraphQLResponse;
		} catch (cause) {
			return createErr(
				new Error("GitHub GraphQL API returned a malformed body.", { cause }),
			);
		}

		if (body.errors && body.errors.length > 0) {
			return createErr(
				new Error(
					`GitHub GraphQL API returned errors: ${body.errors
						.map((error) => error.message)
						.join(", ")}`,
				),
			);
		}

		const calendar =
			body.data?.user?.contributionsCollection?.contributionCalendar;

		if (!calendar) {
			return createErr(
				new Error(`No contribution calendar found for "${this.login}".`),
			);
		}

		const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
			days: week.contributionDays.map((day) => ({
				date: day.date,
				count: day.contributionCount,
				level: LEVEL_BY_NAME[day.contributionLevel] ?? 0,
			})),
		}));

		return createOk(
			new ContributionCalendar(calendar.totalContributions, weeks),
		);
	}
}
