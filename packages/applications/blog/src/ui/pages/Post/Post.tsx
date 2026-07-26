import type { FunctionComponent } from "react";
import { FloatingHeadings } from "../../components/floating-headings/floating-headings";
import { ShinyaigeekCoreProfile } from "../../components/shinyaigeek-core-profile/shinyaigeek-core-profile";
import { postContent, profile } from "./Post.module.css";
import { PostMetaInfo } from "./components/PostMetaInfo/PostMetaInfo";

interface Props {
	anchors: {
		href: string;
		content: string;
	}[];
	title: string;
	publishedAt: string;
	tags: string[];
	content: string;
}

export const Post: FunctionComponent<Props> = function Post({
	anchors,
	tags,
	title,
	publishedAt,
	content,
}) {
	return (
		<div>
			<FloatingHeadings anchors={anchors} />
			<PostMetaInfo title={title} tags={tags} publishedAt={publishedAt} />
			<div
				className={postContent}
				// The post body is rendered from in-repo markdown at build time.
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>

			<div className={profile}>
				<ShinyaigeekCoreProfile />
			</div>
		</div>
	);
};
