import React from "react";

import "../style/animation.scss";

export default function Animation() {
  return (
    <div>
      <div className="welcome--animation">
        <div
          className="monkey"
          style={{
            width: "100%",
            height: "100%",
            zIndex: 3,
            position: "absolute"
          }}
        >
          <img
            src="/static/icon_transparent.png"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
            alt="monkey-icon"
          />
        </div>
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            bottom: "12%",
            left: "calc(50% - 25px)"
          }}
          className="earth"
        >
          <div className="earthY">
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain"
              }}
              src="/static/earth.png"
              alt="earth"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
