import { Component } from "solid-js";

export const ScrollDown: Component<{}> = () => {
  return (
    <>
      <div className="scroll--down__animation">
        <div className="scroll--down__box" />
        <a href="#home--items" className="scroll-anchor">
          SCROLL DOWN
        </a>
      </div>

      <style jsx>
        {`
          .scroll--down__animation {
            color: #ffffff;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            text-align: center;
          }
          .scroll--down__box {
            width: 8px;
            height: 8px;
            background-color: #ffffff;
            margin: 0 auto;
            border: 1px solid #ffffff;
            border-radius: 1px;
            animation: scroll-down 1s infinite;
          }

          .scroll--down {
            display: block;
          }

          .scroll--anchor {
            text-decoration: none;
            color: white;
          }

          @keyframes scroll-down {
            0%,
            100% {
            }
            25% {
              transform: translateY(-50px);
            }
            50% {
              transform: translateY(0px);
            }
            70% {
              transform: translateY(-15px);
            }
            95% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </>
  );
};
