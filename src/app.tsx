import { render } from "solid-js/dom";
import {Home} from "./pages/Home";
import { Component } from "solid-js"

const App:Component<{}> = () => {
    return(
        <>
            <Home />
            <style jsx>
                {`
                    html {
                        --theme-background: #080708;
                        --theme-text: #faf5fa;
                        --theme-header: #1a161a;
                        --menu-background: #402840;
                        --headings-color: #f2aaf2;
                        --headings-color-reverse: #aaf2b6;
                        --core-font: 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ',
                        Meiryo, 'ＭＳ Ｐゴシック', '-apple-system', BlinkMacSystemFont, sans-serif;
                    }
                `}
            </style>
        </>
    )
}

render(() => <App />, document.getElementById("app")!);