import { isErr, unwrapErr, unwrapOk } from "option-t/esm/PlainResult";
import type { ContributionCalendar } from "../../model/github-activity/contribution-calendar.entity";
import type { ContributionCalendarRepository } from "../../model/github-activity/contribution-calendar.repository";

export class GetContributionCalendarUsecase {
	constructor(private repository: ContributionCalendarRepository) {}

	/**
	 * Returns null instead of failing when GitHub can't be reached or no token
	 * is configured, so the activity page still builds (minus the calendar)
	 * rather than taking the whole deploy down with it. The reason is logged so
	 * a silently empty calendar is still traceable in the build output.
	 */
	public async getContributionCalendarOrNull(): Promise<ContributionCalendar | null> {
		const result = await this.repository.getContributionCalendar();

		if (isErr(result)) {
			console.warn(
				`[activity] contribution calendar unavailable: ${
					unwrapErr(result).message
				}`,
			);
			return null;
		}

		return unwrapOk(result);
	}
}
