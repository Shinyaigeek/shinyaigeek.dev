import React from "react";
import parse from "html-react-parser";

import { Layout } from "../components/Layout/Layout";
import { Entry } from "../../util/getBlogPost";
import { MetaInfo } from "./components/MetaInfo/MetaInfo";
import { Anchor } from "./components/Anchor/Anchor";
import { BaseProfile } from "../Profile/components/BaseProfile/BaseProfile";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";

interface Props extends Entry {
  anchors: string[];
}

function Post(props: Props) {
  return (
    <div className="post--content">
      <Anchor anchors={props.anchors} />
      <MetaInfo {...props} />
      {parse(props.fields.content)}

      <Shinyaigeek
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
