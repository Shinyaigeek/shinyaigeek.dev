import React from "react";
import { Layout } from "../components/Layout";
import { Entry } from "../lib/getBlogPost";
import { Top } from "../components/Top";
import { Item } from "../components/Item";
import { Page } from "../components/Page";

const Home = (props: {
  items: Entry[];
  prev: number | false;
  next: number | false;
}) => {
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
      <Page {...props} />
    </div>
  );
};

export default Layout(Home);
