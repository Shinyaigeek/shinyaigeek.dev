import type { FunctionComponent } from "react";
import { Item } from "./components/Item/Item";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";

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
		<WelcomePage />
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
