import React from "react";
import parse from "html-react-parser";

import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { MetaInfo } from "../components/MetaInfo";
import ThatsMe from "../components/ThatsMe";

function Post(props: Entry) {
  console.log(props)
  return (
    <div className="post--content">
      <MetaInfo {...props} />
      {parse(props.fields.content)}
      <ThatsMe setShowContactModal={() => null} />
    </div>
  );
}

export default Layout(Post);
