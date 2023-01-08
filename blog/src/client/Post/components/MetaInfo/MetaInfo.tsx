// import { Edit } from "@zeit-ui/react-icons";

import { DecorationTag } from "../../../components/DecorationTag/DecorationTag";
import React from "react";
import metaInfo from "./MetaInfo.module.scss";

export function MetaInfo(props: {
	fields: {
		tags: string[];
		title: string;
		publishedAt: string;
	};
}) {
	const { tags } = props.fields;
	return (
		<div className={metaInfo.metaInfo}>
			<h1>{props.fields.title}</h1>
			<div>{props.fields.publishedAt}</div>
			<DecorationTag tags={tags} />
		</div>
	);
}
