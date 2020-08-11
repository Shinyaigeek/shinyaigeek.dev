import { Component } from "solid-js";

export const StarStream: Component<{}> = () => {
  return (
    <>
      <div className="starStream">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <style jsx>
        {`
          .starStream {
            background-color: var(--theme-background);
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: calc(100vh - 72px);
            z-index: -888;
            overflow: hidden;
          }

          .star {
            animation: rain 500ms linear infinite;
            background-color: rgba(#ffffff, 0.25);
            position: absolute;
            left: 0;
            top: -20vh;
            width: 1px;
            height: 20vh;
            transform-origin: center center;
          }

          @keyframes rain {
            from {
              transform: rotate(-5deg) translateY(-$rain_drop_height);
            }
            to {
              transform: rotate(-5deg) translateY(100vh + $rain_drop_height);
            }
          }
        `}
      </style>
    </>
  );
};
