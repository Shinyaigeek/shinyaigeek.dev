import React from 'react';
import CardStyle from './Card.module.css';

interface Props {
    title: string;
    img: string;
}

export const Card: React.FC<Props> = function ({ title, img }) {
    return (
        <li className={CardStyle.cardStyle}>
            <div className={CardStyle.title}>{title}</div>
            <img
                src={img}
                alt={title}
                loading="lazy"
            />
        </li>
    );
};

export const CardShowcase: React.FC = function ({ children }) {
    return <ul>{children}</ul>;
};
