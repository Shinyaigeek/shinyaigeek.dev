import { createState, Component } from "solid-js";
import { Top } from "../components/Top/Top";
import { Meta } from "../utils/makeIndex/makeIndex";
import { Posts } from "../components/Posts/Posts";

export interface HomeProps {
  items: Meta[];
  // prev: number | false;
  // next: number | false;
}

export const Home: Component<{
  posts: HomeProps[]
}> = (props) => {
  return (
    <div>
      <Top />
      <Posts items={props.posts} />
    </div>
  );
};
