import type { FunctionComponent } from "react";
import { FirstBoard } from "./components/FirstBoard/FirstBoard";
import { Item } from "./components/Item/Item";

interface Props {
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
	}[];
}

export const Home: FunctionComponent<Props> = ({ items }) => (
	<div>
		<FirstBoard />
		<div>
			{items.map((item) => {
				return (
					<Item
						title={item.title}
						description={item.description}
						publishedAt={item.publishedAt}
						path={item.path}
					/>
				);
			})}
		</div>
	</div>
);
