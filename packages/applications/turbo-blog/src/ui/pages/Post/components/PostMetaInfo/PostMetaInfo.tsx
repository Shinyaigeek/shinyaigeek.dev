import type { FunctionComponent } from "react";
import { DecorationTag } from "../../../../components/DecorationTag/DecorationTag";
import {
	metaSection,
	postMetaInfoContainer,
	postTitle,
	publishDate,
	publishDateIcon,
} from "./PostMetaInfo.module.css";

interface Props {
	title: string;
	publishedAt: string;
	tags: string[];
}

export const PostMetaInfo: FunctionComponent<Props> = function ({
	title,
	publishedAt,
	tags,
}) {
	const formattedDate = new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
	}).format(new Date(publishedAt));

	return (
		<div className={postMetaInfoContainer}>
			<h1 className={postTitle}>{title}</h1>
			<div className={metaSection}>
				<time className={publishDate} dateTime={publishedAt}>
					<span className={publishDateIcon}>📅</span>
					{formattedDate}
				</time>
				<DecorationTag tags={tags} />
			</div>
		</div>
	);
};
