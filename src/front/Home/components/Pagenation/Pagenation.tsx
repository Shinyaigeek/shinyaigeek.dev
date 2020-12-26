interface Props {
  prev: number | false;
  next: number | false;
}
import { css, cx } from "linaria";
import React from "react";

const pagination = css`
  position: relative;
  height: 64px;
  width: 100vw;
`;

const paginationIcon = css`
  font-size: 32px;
  font-weight: bold;
  color: var(--theme-color);
  text-decoration: none;
  position: absolute;
  bottom: 0;
`;

const prev = css`
  left: 15vw;

  &::before {
    content: "<";
    position: relative;
    right: -17px;
    transition: right 1s 0.1s ease;
  }

  &:hover {
    &:before {
      right: 0;
    }
  }
`;

const next = css`
  right: 15vw;

  &::after {
    content: ">";
    position: relative;
    left: -17px;
    transition: left 1s 0.1s ease;
  }

  &:hover {
    &:after {
      left: 0;
    }
  }
`;

export function Pagenation(props: Props) {
  return (
    <div className={pagination}>
      {props.prev && (
        <a className={cx(paginationIcon, prev)} href={`/?page=${props.prev}`}>
          &lt; prev
        </a>
      )}
      {props.next && (
        <a className={cx(paginationIcon, next)} href={`/?page=${props.next}`}>
          next &gt;
        </a>
      )}
    </div>
  );
}
