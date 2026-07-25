import type { FunctionComponent } from "react";
import type { ContributionCalendar as ContributionCalendarType } from "../../../build/model/github-activity/contribution-calendar.entity";
import {
	cell,
	chart,
	dayLabel,
	footer,
	legend,
	legendSwatch,
	level0,
	level1,
	level2,
	level3,
	level4,
	monthLabel,
	scroller,
	swatch0,
	swatch1,
	swatch2,
	swatch3,
	swatch4,
	total as totalClass,
	totalCount,
	wrapper,
} from "./contribution-calendar.module.css";

interface Props {
	language: "ja" | "en";
	calendar: ContributionCalendarType;
}

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT_GUTTER = 26;
const TOP_GUTTER = 16;

const LEVEL_CLASS = [level0, level1, level2, level3, level4];
const SWATCH_CLASS = [swatch0, swatch1, swatch2, swatch3, swatch4];

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const COPY = {
	ja: {
		contributions: "contributions（直近 1 年）",
		less: "少",
		more: "多",
		label: "GitHub の contribution カレンダー",
	},
	en: {
		contributions: "contributions in the last year",
		less: "Less",
		more: "More",
		label: "GitHub contribution calendar",
	},
} as const;

/**
 * Month labels sit above the first week whose Sunday starts a new month, which
 * is how GitHub places them. Weeks that would collide with the previous label
 * are skipped so short months don't overprint each other.
 */
const buildMonthLabels = (
	weeks: ContributionCalendarType["weeks"],
): { x: number; label: string }[] => {
	const labels: { x: number; label: string }[] = [];
	let lastMonth = -1;
	let lastLabelledWeek = Number.NEGATIVE_INFINITY;

	weeks.forEach((week, weekIndex) => {
		const firstDay = week.days[0];
		if (!firstDay) return;

		const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
		if (month === lastMonth) return;

		lastMonth = month;
		if (weekIndex - lastLabelledWeek < 3) return;

		lastLabelledWeek = weekIndex;
		labels.push({
			x: LEFT_GUTTER + weekIndex * STEP,
			label: MONTHS[month],
		});
	});

	return labels;
};

export const ContributionCalendar: FunctionComponent<Props> = ({
	language,
	calendar,
}) => {
	const copy = COPY[language];
	const width = LEFT_GUTTER + calendar.weeks.length * STEP;
	const height = TOP_GUTTER + 7 * STEP;
	const monthLabels = buildMonthLabels(calendar.weeks);

	return (
		<div className={wrapper}>
			<div className={scroller}>
				<svg
					className={chart}
					viewBox={`0 0 ${width} ${height}`}
					width={width}
					height={height}
					role="img"
					aria-label={`${copy.label}: ${calendar.totalContributions}`}
				>
					{monthLabels.map((month) => (
						<text
							key={`${month.label}-${month.x}`}
							className={monthLabel}
							x={month.x}
							y={10}
						>
							{month.label}
						</text>
					))}

					{/* Mon / Wed / Fri only, matching GitHub — labelling every row
					    crowds the 11px cells. */}
					{[1, 3, 5].map((dayIndex) => (
						<text
							key={dayIndex}
							className={dayLabel}
							x={0}
							y={TOP_GUTTER + dayIndex * STEP + CELL - 1}
						>
							{["", "Mon", "", "Wed", "", "Fri", ""][dayIndex]}
						</text>
					))}

					{calendar.weeks.map((week, weekIndex) =>
						week.days.map((day) => {
							const dayIndex = new Date(`${day.date}T00:00:00Z`).getUTCDay();

							return (
								<rect
									key={day.date}
									className={`${cell} ${LEVEL_CLASS[day.level] ?? level0}`}
									x={LEFT_GUTTER + weekIndex * STEP}
									y={TOP_GUTTER + dayIndex * STEP}
									width={CELL}
									height={CELL}
									rx={2}
								>
									<title>{`${day.date}: ${day.count}`}</title>
								</rect>
							);
						}),
					)}
				</svg>
			</div>

			<div className={footer}>
				<p className={totalClass}>
					<span className={totalCount}>
						{calendar.totalContributions.toLocaleString("en-US")}
					</span>{" "}
					{copy.contributions}
				</p>
				<p className={legend}>
					{copy.less}
					{SWATCH_CLASS.map((swatch, index) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: the legend is a fixed 0–4 ramp
							key={index}
							className={`${legendSwatch} ${swatch}`}
						/>
					))}
					{copy.more}
				</p>
			</div>
		</div>
	);
};
