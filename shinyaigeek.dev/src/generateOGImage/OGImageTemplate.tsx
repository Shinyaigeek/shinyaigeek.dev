import React, { FunctionComponent } from "react";

interface Props {
    title: string,
    width: number,
    height: number
}

const FRAME_BOLD = 48;

export const OGImageTemplate: FunctionComponent<Props> = function({ title, width, height }) {
    return <div style={{ display: "flex" }}>
        <div 
        className="frame"
        style={{
            width: `${0.8 * width}px`,
            height: `${0.8 * height}px`,
            borderRadius: "36px",
            border: `#FFE86A ${FRAME_BOLD}px solid`,
            position: "absolute",
            top: `${0.1 * height - FRAME_BOLD}px`,
            left: `${0.1 * width - FRAME_BOLD}px`,
        }} />
    </div>
}