import type { FunctionComponent } from "react";
import { ShinyaigeekPortrait } from "../../components/ShinyaigeekPortrait/ShinyaigeekPortrait";
import { ShinyaigeekCoreProfile } from "../Profile/components/ShinyaigeekCoreProfile/ShinyaigeekCoreProfile";
import { postContent, profile } from "./Post.module.css";
import { Anchor } from "./components/Anchor/Anchor";
import { PostMetaInfo } from "./components/PostMetaInfo/PostMetaInfo";

interface Props {
	anchors: string[];
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
			<Anchor anchors={anchors} />
			<PostMetaInfo title={title} tags={tags} publishedAt={publishedAt} />
			<div
				className={postContent}
				// biome-ignore lint: reason
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>

			<div className={profile}>
				<ShinyaigeekPortrait />
				<ShinyaigeekCoreProfile />
			</div>
		</div>
	);
};
