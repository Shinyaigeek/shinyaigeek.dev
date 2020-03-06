import React from "react";

export function MessageOK() {
  return (
    <div className="contact--message" id="message--ok">メッセージの送信に成功しました！</div>
  );
}

export function MessageError() {
  return (
    <div className="contact--message" id="message--error">
      <div>メッセージの送信に失敗しました</div>
      <div
        className="contact--message__again"
        // onClick={() => this.props.setShowContactModal()}
      >
        Again?
      </div>
    </div>

  )
}