/** A single day in the contribution calendar. */
export interface ContributionDay {
	/** ISO date, e.g. "2026-07-25". */
	date: string;
	count: number;
	/**
	 * 0–4, mirroring GitHub's own buckets (NONE / FIRST_QUARTILE / … ). Kept as
	 * a number so the view can map it straight onto a colour ramp.
	 */
	level: number;
}

/** One column of the calendar: up to seven days, Sunday first. */
export interface ContributionWeek {
	days: ContributionDay[];
}

export class ContributionCalendar {
	constructor(
		public readonly totalContributions: number,
		public readonly weeks: ContributionWeek[],
	) {}
}
