export interface TagProps {
    child: React.ReactChild;
    slug: string;
    color: string;
}
import React from 'react';
import tag from './Tag.module.scss';

export function Tag(props: TagProps) {
    return (
        <a
            href={props.slug}
            className={tag.tag}
        >
            {props.child}
        </a>
    );
}
