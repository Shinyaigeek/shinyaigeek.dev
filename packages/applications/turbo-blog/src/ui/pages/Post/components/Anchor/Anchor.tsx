interface Props {
	anchors: string[];
}
import postAnchor from "./Anchor.module.css";

export function Anchor(props: Props) {
	return (
		<details className={postAnchor.postAnchor}>
			<summary
				className="post--anchor__title"
				id="post--anchor__title"
			></summary>
			{props.anchors?.map((anchor, index) => {
				return (
					<a key={anchor} href={`#2__${index}`}>
						{anchor}
					</a>
				);
			})}
		</details>
	);
}
