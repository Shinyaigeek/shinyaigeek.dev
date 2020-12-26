import { Layout } from "../components/Layout/Layout";
import { Entry } from "../../server/util/getBlogPost";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { Item } from "./components/Item/Item";
import { Pagenation } from "./components/Pagenation/Pagenation";
import React from "react";
const Home = (props: {
  items: Entry[];
  prev: number | false;
  next: number | false;
}) => {
  return (
    <div>
      <WelcomePage />
      {props.items.map((item, index) => {
        const { fields } = item;
        return (
          <div key={index}>
            <Item {...fields} />
          </div>
        );
      })}
      <Pagenation {...props} />
    </div>
  );
};

export default Layout(Home);
