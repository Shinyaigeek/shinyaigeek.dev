import type { FunctionComponent } from "react";
import { DecorationTag } from "../../../../components/DecorationTag/DecorationTag";
import { postMetaInfoContainer } from "./PostMetaInfo.module.css";

interface Props {
	title: string;
	publishedAt: string;
	tags: string[];
}

export const PostMetaInfo: FunctionComponent<Props> = ({
	title,
	publishedAt,
	tags,
}) => (
	<div className={postMetaInfoContainer}>
		<h1>{title}</h1>
		<div>{publishedAt}</div>
		<DecorationTag tags={tags} />
	</div>
);
