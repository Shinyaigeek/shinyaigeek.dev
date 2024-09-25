import type { Undefinable } from "option-t/esm/Undefinable";
import type { FunctionComponent } from "react";
import { FirstBoard } from "./components/FirstBoard/FirstBoard";
import { Item } from "./components/Item/Item";

interface Props {
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		ogp?: Undefinable<string>;
	}[];
}

export const PostIndex: FunctionComponent<Props> = ({ items }) => (
	<div>
		<div>
			{items.map((item) => {
				return (
					<Item
						title={item.title}
						description={item.description}
						publishedAt={item.publishedAt}
						path={item.path}
						ogp={item.ogp}
					/>
				);
			})}
		</div>
	</div>
);