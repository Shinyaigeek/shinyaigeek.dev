import { createState, Component } from "solid-js";

export const Home: Component<{}> = () => {
  const [state, setState] = createState({
    user: {
      firstName: "John",
      lastName: "Smith"
    }
  });

  return (
    <div
      onClick={() => setState("user", "lastName", (l: string) => l + "!")}
    >{state.user.firstName} {state.user.lastName}</div>
  );
};