import React from "react";
import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";

function Post(props: Entry) {
  return (
    <div>
      {props.fields.title}
      {props.fields.description}
      {props.fields.publishedAt}
      {props.fields.content}

    </div>
  );
}

export default Layout(Post);
