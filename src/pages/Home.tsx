import React from "react";
import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { Top } from "../components/Top";
import { Item } from "../components/Item";

const Home = (props: { items: Entry[] }) => {
  return (
    <div>
      <Top />
      {props.items.map((item, index) => {
        return (
          <div key={index}>
            <Item {...item.fields} />
          </div>
        );
      })}
    </div>
  );
};

export default Layout(Home);
