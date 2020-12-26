import { css } from "linaria";
import React from "react";

const divider = css`
    backgorund: var(--theme-color);
    width: 100%;
    height: 2px;
    border: 1px solid var(--theme-color);
    border-radius: 12px;
`;

export function Divider() {
    return (
        <div className={divider}>
            
        </div>
    )
}
