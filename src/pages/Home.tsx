import { createState, Component } from "solid-js";
import { Top } from "../components/Top/Top";

export interface HomeProps {}

export const Home: Component<{}> = () => {
  const [state, setState] = createState({
    user: {
      firstName: "John",
      lastName: "Smith",
    },
  });

  return <div><Top /></div>;
};
