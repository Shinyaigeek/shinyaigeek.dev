import type { Undefinable } from "option-t/esm/Undefinable";
import type { FunctionComponent } from "react";
import { FirstBoard } from "../../components/FirstBoard/FirstBoard";
import { Item } from "../../components/Item/Item";
import { Divider } from "../../components/divider/divider";
import { blogGrid, blogSection } from "./Home.module.css";

interface Props {
	items: {
		title: string;
		description: string;
		publishedAt: string;
		path: string;
		ogp?: Undefinable<string>;
		media?: "speakerdeck" | "blog";
	}[];
}

export const Home: FunctionComponent<Props> = ({ items }) => (
	<div>
		<FirstBoard />
		<Divider />

		<section className={blogSection}>
			<h2>Latest Articles</h2>
			<div className={blogGrid}>
				{items.map((item) => (
					<Item
						key={item.path}
						title={item.title}
						description={item.description}
						publishedAt={item.publishedAt}
						path={item.path}
						ogp={item.ogp}
						media={item.media}
					/>
				))}
			</div>
		</section>
	</div>
);
