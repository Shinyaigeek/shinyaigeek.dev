import React from "react";
import parse from "html-react-parser";

import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { MetaInfo } from "../components/MetaInfo";
import { Anchor } from "../components/Anchor";
import { BaseProfile } from "../components/BaseProfile";
import { MyIcon } from "../components/MyIcon";

interface Props extends Entry {
  anchors: string[];
}

function Post(props: Props) {
  return (
    <div className="post--content">
      <Anchor anchors={props.anchors} />
      <MetaInfo {...props} />
      {parse(props.fields.content)}

      <MyIcon
        styles={{
          height: "200px",
          width: "200px",
          margin: "12px auto",
        }}
      />
      <BaseProfile />
    </div>
  );
}

export default Layout(Post);
