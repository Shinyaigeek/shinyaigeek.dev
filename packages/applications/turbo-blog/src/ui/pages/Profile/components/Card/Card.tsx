import type React from "react";
import CardStyle from "./Card.module.css";

interface Props {
	title: string;
	img: string;
}

export const Card: React.FC<Props> = ({ title, img }) => (
	<li className={CardStyle.cardStyle}>
		<div className={CardStyle.title}>{title}</div>
		<img src={img} alt={title} loading="lazy" />
	</li>
);

export const CardShowcase: React.FC = ({ children }) => <ul>{children}</ul>;
