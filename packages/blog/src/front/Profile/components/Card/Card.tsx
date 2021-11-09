import React from "react";
import { CardStyle, CardShowcaseStyle } from "./Card.style";

interface Props {
  title: string;
  img: string;
}

export const Card: React.FC<Props> = function ({ title, img }) {
  return (
    <li className={CardStyle}>
      <div className="title">{title}</div>
      <img src={img} alt={title} loading="lazy" />
    </li>
  );
};

export const CardShowcase: React.FC = function ({ children }) {
  return <ul className={CardShowcaseStyle}>{children}</ul>;
};
