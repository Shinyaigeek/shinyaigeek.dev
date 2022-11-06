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
    <div style={{ display: "flex", width: `${width}px`, height: `${height}px`, background: "#ffffff" }}>
      <div
        className="frame"
        style={{
          width: `${0.85 * width}px`,
          height: `${0.85 * height}px`,
          borderRadius: "36px",
          border: `#FFE86A ${FRAME_BOLD}px solid`,
          position: "absolute",
          top: `${0.075 * height + FRAME_BOLD * 0.3}px`,
          left: `${0.075 * width + FRAME_BOLD * 0.15}px`,
        }}
      />
      <img
        className="logo"
        src={`data:image/png;base64,${logo}`}
        width={420}
        height={320}
        style={{
            left: `${width * 0.925 - 420 - FRAME_BOLD * 0.75}px`,
            top: `${height * 0.925 - 420 - FRAME_BOLD * 0.42}px`
        }}
      />
    </div>
  );
};
