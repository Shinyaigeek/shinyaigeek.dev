import type { FunctionComponent } from "react";
import { Divider } from "../../../../components/Divider/Divider";
import {
	date,
	home,
	itemHomeAnchor,
	ogp,
	readMore,
	readMoreAnchor,
} from "./ThirdPirtyBlogItem.module.css";

interface MetaData {
	title: string;
	description?: string;
	ogp?: string;
	publishedAt: string;
	path: string;
	media?: string;
}

export const ThirdPartyBlogItem: FunctionComponent<MetaData> = (props) => (
	<div className={home}>
		<a
			className={itemHomeAnchor}
			href={!props.media ? `/post/${props.path}` : props.path}
		>
			{props.title}
		</a>
		<div className={date}>{props.publishedAt}</div>
		<div>{props.description ?? ""}</div>
		{props.ogp && (
			<a href={!props.media ? `/post/${props.path}` : props.path} tabIndex={-1}>
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
				className={`item--home__anchor ${readMoreAnchor}`}
				href={!props.media ? `/post/${props.path}` : props.path}
				tabIndex={-1}
			>
				Read
			</a>
		</div>
		<Divider />
	</div>
);
