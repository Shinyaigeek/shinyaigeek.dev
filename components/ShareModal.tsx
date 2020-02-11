import React, { useState, useEffect } from "react";

import "../style/sharemodal.scss";

interface Props {
  showShareModal: boolean;
  setShowShareModal: Function;
  children: JSX.Element[];
}

export default function ShareModal(props: Props) {
  const show = props.showShareModal ? "enter" : "out";
  const childrenNum = props.children.length * 43;

  const [modalHeight, setModalHeight] = useState(0);

  const positionTop = process.browser
    ? window.innerHeight - 90 - childrenNum
    : 0;

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  function handleWindowSizeChange() {
    setModalHeight(0);
  }

  function handleMove(y: number) {
    setModalHeight(-positionTop + y);
  }

  function handleRemoveTouch(y: number) {
      console.log((window.innerHeight - positionTop) / (window.innerHeight - y))
    if((window.innerHeight - positionTop) / (window.innerHeight - y) >= 1.25){
        props.setShowShareModal(false)
    }
    setModalHeight(0)
  }

  return (
    <React.Fragment>
      <div
        className={`twitter--modal__${show} twitter--modal`}
        onTouchMove={e => handleMove(e.changedTouches[0].clientY)}
        onTouchEnd={e => handleRemoveTouch(e.changedTouches[0].clientY)}
        style={{
          top: props.showShareModal ? positionTop : "110vh",
          transform: "translateY(" + modalHeight + "px)"
        }}
      >
        {props.children}
        <div
          className="modal--section__cansel"
          onClick={() => props.setShowShareModal(false)}
        >
          キャンセル
        </div>
      </div>
      <div
        className="awkward--sheet"
        onClick={() => props.setShowShareModal(false)}
        style={{ display: props.showShareModal ? "block" : "none" }}
      ></div>
    </React.Fragment>
  );
}
