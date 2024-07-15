import type React from "react";
import { cardStyle, title as titleStyle } from "./Card.module.css";

interface Props {
	title: string;
	img: string;
}

export const Card: React.FC<Props> = ({ title, img }) => (
	<li className={cardStyle}>
		<div className={titleStyle}>{title}</div>
		<img src={img} alt={title} loading="lazy" />
	</li>
);
