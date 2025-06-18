import type { FunctionComponent } from "react";
import { card, image, title as titleStyle } from "./Card.module.css";

interface Props {
	title: string;
	img?: string;
}

export const Card: FunctionComponent<Props> = ({ title, img }) => {
	return (
		<div className={card}>
			<img src={img} alt={title} className={image} />
			<h3 className={titleStyle}>{title}</h3>
		</div>
	);
};
