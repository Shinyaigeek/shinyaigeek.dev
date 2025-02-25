import { Divider } from "../divider/divider";
import {
	date,
	dateContainer,
	dateIcon,
	description,
	home,
	itemHomeAnchor,
	ogp,
	readMore,
	readMoreAnchor,
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
						width={1024}
						height={576}
					/>
				</a>
			)}
			<div className={readMore}>
				<a
					className={readMoreAnchor}
					href={!props.media ? `/post/${props.path}` : props.path}
				>
					Read
				</a>
			</div>
			<Divider />
		</div>
	);
};
