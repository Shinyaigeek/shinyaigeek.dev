import parse from "html-react-parser";

import { Layout } from "../components/Layout/Layout";
import { Entry } from "../../server/util/getBlogPost";
import { MetaInfo } from "./components/MetaInfo/MetaInfo";
import { Anchor } from "./components/Anchor/Anchor";
import { BaseProfile } from "../Profile/components/BaseProfile/BaseProfile";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import React from "react";
import { css } from "linaria";
interface Props extends Entry {
  anchors: string[];
}

const postContent = css`
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ",
    Meiryo, "ＭＳ Ｐゴシック", "-apple-system", BlinkMacSystemFont, sans-serif;
  width: 75%;
  margin: 12px auto;
  overflow: hidden;

  table tr td {
    border: 1px solid black;
  }

  img {
    width: 250px;
    display: block;
    object-fit: contain;
    margin: 0 auto;
  }

  h2 {
    color: var(--theme-color);
    margin: -108px;
    padding: 108px;
    &:before {
      content: "";
      background-color: var(--headings-color);
      border-radius: 4px;
      width: 12px;
      height: 30px;
      display: inline-block;
      margin-right: 12px;
      position: relative;
      top: 6px;
    }
  }

  h1 {
    margin-top: 42px;
  }
`;

function Post(props: Props) {
  const { content } = props.fields;
  return (
    <div className={postContent}>
      <Anchor anchors={props.anchors} />
      <MetaInfo {...props} />
      <div
        className={postContent}
        dangerouslySetInnerHTML={{
          __html: content,
        }}></div>

      <Shinyaigeek
      // styles={{
      //   height: "200px",
      //   width: "200px",
      //   margin: "12px auto",
      // }}
      />
      <BaseProfile />
    </div>
  );
}

export default Layout(Post);
