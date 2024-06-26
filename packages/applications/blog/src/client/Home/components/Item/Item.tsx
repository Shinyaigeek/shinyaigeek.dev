import { Button } from "../../../components/Button/Button";
import { Divider } from "../../../components/Divider/Divider";

import React from "react";
import { getOmmit } from "../../../../build/util/getOmmit";
import item from "./Item.module.css";
export interface MetaData {
	title: string;
	description?: string;
	ogp?: string;
	publishedAt: string;
	// tags: string[];
	slug: string;
	media?: string;
}

export const Item = (props: MetaData) => {
	return (
		<div className={item.home}>
			<a
				className={item.itemHomeAnchor}
				href={!props.media ? `/post/${props.slug}` : props.slug}
			>
				<div className={item.title}>{props.title}</div>
			</a>
			<Divider />
			<div className={item.date}>{props.publishedAt}</div>
			<div className={item.tags} />
			<div>{getOmmit(props.description ?? "")}</div>
			{props.ogp && (
				<a
					href={!props.media ? `/post/${props.slug}` : props.slug}
					tabIndex={-1}
				>
					<img
						src={props.ogp}
						alt={props.title}
						className={item.ogp}
						loading="lazy"
						width={1024}
						height={576}
					/>
				</a>
			)}
			<div className={item.readMore}>
				<a
					className={`item--home__anchor ${item.readMoreAnchor}`}
					href={!props.media ? `/post/${props.slug}` : props.slug}
					tabIndex={-1}
				>
					Read
				</a>
			</div>
		</div>
	);
};
