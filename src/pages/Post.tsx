import React from "react";
import parse from "html-react-parser";

import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { MetaInfo } from "../components/MetaInfo";
import ThatsMe from "../components/ThatsMe";
import { Anchor } from "../components/Anchor";

interface Props extends Entry {
  anchors: string[]
}

function Post(props: Props) {
  return (
    <div className="post--content">
      <Anchor anchors={props.anchors}/>
      <MetaInfo {...props} />
      {parse(props.fields.content)}
      <ThatsMe />
    </div>
  );
}

export default Layout(Post);
