import type { Undefinable } from "option-t/undefinable";
import type { FunctionComponent } from "react";
import { Item } from "./components/Item/Item";

interface Props {
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		ogp?: Undefinable<string>;
		/**
		 * Set only for posts published elsewhere. The item links straight out to
		 * them, so leaving it off here made every one of them a link to
		 * "/post/https://speakerdeck.com/..." -- the path is already a whole URL.
		 */
		media?: Undefinable<string>;
	}[];
}

export const PostIndex: FunctionComponent<Props> = ({ items }) => (
	<div>
		<div>
			{items.map((item) => {
				return (
					<Item
						key={item.path}
						title={item.title}
						description={item.description}
						publishedAt={item.publishedAt}
						path={item.path}
						ogp={item.ogp}
						media={item.media}
					/>
				);
			})}
		</div>
	</div>
);
