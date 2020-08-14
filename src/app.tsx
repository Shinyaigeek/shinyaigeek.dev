import { render } from "solid-js/dom";
import { Home } from "./pages/Home";
import { Component, createResourceState, createEffect } from "solid-js";

const App: Component<{}> = () => {
  const [state, load] = createResourceState(undefined);
  createEffect(() => {
    load({
      asdf: fetch(
        "https://raw.githubusercontent.com/Shinyaigeek/shinyaigeek.dev/welcome/solid/post/index.json"
      ).then((res) => {
        return res.json();
      }),
    });
  });
  return (
    <>
      {state.asdf &&  <Home posts={state.asdf} />}
      <style jsx>
        {`
          html {
            --theme-background: #080708;
            --theme-text: #faf5fa;
            --theme-header: #1a161a;
            --menu-background: #402840;
            --headings-color: #f2aaf2;
            --headings-color-reverse: #aaf2b6;
            --core-font: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
              "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "-apple-system",
              BlinkMacSystemFont, sans-serif;
          }
        `}
      </style>
    </>
  );
};

render(() => <App />, document.getElementById("app")!);
