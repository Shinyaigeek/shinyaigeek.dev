import React from "react";
import { CardStyle, CardShowcaseStyle } from "./Card.style";

interface Props {
  title: string;
  img: string;
}

export const Card: React.FC<Props> = function ({ title, img }) {
  return <li className={CardStyle}></li>;
};

export const CardShowcase: React.FC<{ list: Props[] }> = function ({ list }) {
  return <ul className={CardShowcaseStyle}></ul>;
};
