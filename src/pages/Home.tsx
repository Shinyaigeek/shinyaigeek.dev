import React from "react";
import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { Top } from "../components/Top";

const Home = (props: { items: Entry[] }) => {
  return (
    <div>
      <Top />
      {props.items.map((en, index) => {
        return <div key={index}>{en.fields.title}</div>;
      })}
    </div>
  );
};

export default Layout(Home);
