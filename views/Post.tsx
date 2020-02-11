import React, { useState } from "react";

import { PageInfo } from "../pages/post/[item]";
import MetaInfo from "../components/MetaInfo";
import Anchors from "../components/Anchors";

import parser from "react-html-parser";

import dynamic from "next/dynamic";

const ShareModal = dynamic(() => import("../components/ShareModal"));
const ThatsMe = dynamic(() => import("../components/ThatsMe"));

import { Divider, Button, Icon } from "antd";

interface Props {
  pageInfo: PageInfo;
  setShowContactModal: Function;
}

export default function PostContent(props: Props) {
  const [showShareModal, setShowShareModal] = useState(false);

  function handleFlag(flag: boolean) {
    if (flag) {
      document.querySelector("html")!.style.overflow = "hidden";
    } else {
      document.querySelector("html")!.style.overflow = "visible";
    }
    setShowShareModal(flag);
  }
  return (
    <div className="post--content">
      {props.pageInfo.headings && (
        <Anchors headings={props.pageInfo.headings} />
      )}
      <MetaInfo {...props.pageInfo.header} />
      <Divider />
      {parser(props.pageInfo.body)}
      <ThatsMe setShowContactModal={props.setShowContactModal} />
      <div className="share">
        <Button
          type="primary"
          shape="circle"
          icon="share-alt"
          size="large"
          onClick={() => handleFlag(true)}
          style={{
            position: "fixed",
            bottom: "72px",
            right: "72px"
          }}
        />
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={handleFlag}
        >
          <div className="share--Twitter">
            <a
              href={
                "https://twitter.com/intent/tweet?url=https://www.shinyaigeek.com/post" +
                props.pageInfo.header.path +
                "&text=しにゃいの学習帳&via=shinyaigeek"
              }
            >
              <Icon type="twitter" />
              Twitter
            </a>
          </div>
          <div className="share--FaceBook">
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=https://www.shinyaigeek.com/post" +
                props.pageInfo.header.path
              }
            >
              <Icon type="facebook" />
              FaceBook
            </a>
          </div>
        </ShareModal>
      </div>
    </div>
  );
}
