import {
	contentWrapper,
	date,
	dateContainer,
	dateIcon,
	description,
	home,
	itemHomeAnchor,
	ogp,
	textContent,
} from "./Item.module.css";

interface MetaData {
	title: string;
	description?: string;
	ogp?: string;
	publishedAt: string;
	path: string;
	media?: string;
}

export const Item = (props: MetaData) => {
	const formattedDate = new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format(new Date(props.publishedAt));

	return (
		<div className={home}>
			<div className={contentWrapper}>
				<div className={textContent}>
					<a
						className={itemHomeAnchor}
						href={!props.media ? `/post/${props.path}` : props.path}
					>
						{props.title}
					</a>
					<div className={dateContainer}>
						<span className={dateIcon}>🗓️</span>
						<time dateTime={props.publishedAt} className={date}>
							{formattedDate}
						</time>
					</div>
					<div className={description}>{props.description ?? ""}</div>
				</div>
				{props.ogp && (
					<a
						href={!props.media ? `/post/${props.path}` : props.path}
						tabIndex={-1}
					>
						<img
							src={props.ogp}
							alt={props.title}
							className={ogp}
							loading="lazy"
							width={120}
							height={67}
						/>
					</a>
				)}
			</div>
		</div>
	);
};
