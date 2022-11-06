import React, { FunctionComponent } from "react";

interface Props {
  title: string;
  width: number;
  height: number;
  logo: string;
}

const FRAME_BOLD = 48;

export const OGImageTemplate: FunctionComponent<Props> = function ({
  title,
  width,
  height,
  logo,
}) {
  return (
    <div style={{ display: "flex" }}>
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
        }}
      />
      <img
        className="logo"
        src={`data:image/png;base64,${logo}`}
        width={420}
        height={320}
        style={{
            left: `${width * 0.8 - 420}px`,
            top: `${height * 0.8 - 420}px`
        }}
      />
    </div>
  );
};
