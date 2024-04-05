import parse from "html-react-parser";

import React from "react";
import type { Entry } from "../../build/util/getBlogPost";
import { BaseProfile } from "../Profile/components/BaseProfile/BaseProfile";
import { Layout } from "../components/Layout/Layout";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import postContent from "./Post.module.css";
import { Anchor } from "./components/Anchor/Anchor";
import { MetaInfo } from "./components/MetaInfo/MetaInfo";
interface Props extends Entry {
	anchors: string[];
}

function Post(props: Props) {
	const { content } = props.fields;
	return (
		<div>
			<Anchor anchors={props.anchors} />
			<MetaInfo {...props} />
			<div
				className={postContent.postContent}
				// biome-ignore lint: reason
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>

			<div className={postContent.profile}>
				<Shinyaigeek />
				<BaseProfile />
			</div>
		</div>
	);
}

export default Layout(Post);
