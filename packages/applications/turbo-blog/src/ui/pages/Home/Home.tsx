import React from "react";
import type { Entry } from "../../build/util/getBlogPost";
import type { Entry as ThirdPirtyEntry } from "../../build/util/getThirdPirty";
import { Layout } from "../components/Layout/Layout";
import { Item } from "./components/Item/Item";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
const Home = (props: {
	items: Entry[];
	thirdPirtyItems: ThirdPirtyEntry[];
	prev: number | false;
	next: number | false;
}) => {
	const items = [...props.items, ...props.thirdPirtyItems];
	items.sort((l, r) => {
		const left = new Date("fields" in l ? l.fields.publishedAt : l.publishedAt);
		const right = new Date(
			"fields" in r ? r.fields.publishedAt : r.publishedAt,
		);

		return left < right ? 1 : -1;
	});
	return (
		<div>
			<WelcomePage />
			<div id="home--items">
				{items.map((item, index) => {
					const fields = "fields" in item ? item.fields : item;
					return <Item {...fields} key={fields.title} />;
				})}
			</div>
		</div>
	);
};

export default Layout(Home);
