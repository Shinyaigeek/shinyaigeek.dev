import { Component } from "solid-js";

export const MyIcon: Component<{}> = () => {
  return (
    <>
      <div className="myicon" style={props.styles}>
        <div className="monkey">
          <img
            src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon_transparent.png"
            alt="monkey-icon"
            className="monkey-icon"
          />
        </div>
        <div className="earth">
          <div className="earthY">
            <img
              src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/earth.png"
              alt="earth"
              className="earch-img"
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .myicon {
            position: absolute;
            bottom: 25px;
            right: 25px;
            transform-style: preserve-3d;
            transform: perspective(5000px);
            overflow: visible;
            width: 270px;
            height: 270px;
          }

          .monkey {
            width: 100%;
            height: 100%;
            z-index: 3;
            position: absolute;
          }

          .monkey-icon {
              width: 100%;
              height: 100%;
              object-fit: contain;
          }

          .earth {
              width: 50px;
              height: 50px;
              position: absolute;
              bottom: 12%;
              left: calc(50% - 25px);
              animation 5s infinite forwards normal earthX;
          }

          .earthY {
            animation: 5s infinite forwards normal earthY ease-in-out -1.25s;
          }

          .earth-img {
              height: 100%;
              width: 100%;
              object-fit: contain;
          }

          @keyframes earthY {
            0%,
            100% {
              transform: translateY(0px);
            }
          
            50% {
                transform: translateY(-120px);
            }
          }
          
          @keyframes earthX {
            0%,
            100% {
              transform: translateX(-180px);
              z-index: 5;
            }
          
            25% {
              z-index: 2;
            }
          
            50% {
              transform: translateX(180px);
              z-index: 2;
            }
          }
        `}
      </style>
    </>
  );
};
