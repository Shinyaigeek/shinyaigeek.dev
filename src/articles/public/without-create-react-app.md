---
title: 脱create-react-app、Reactアプリの小さめ構築
tags: [Programming, JavaScript, React]
description: |
  突然ですがみなさん、React アプリ構築に create-react-app 使わないと出来ないのにフロントエンジニア名乗ってるなんてまさかですけどないですよね？？？webpack の設定いつも適当にコピペしてたりなんてしていませんよね？？？
  (まあ僕も割とこんな感じだったので人の事は言えませんが)
  今回は上記の煽りであ、やばいかもと思った人向けの記事です。
  タイトルの通り create-react-app 無しでの React アプリ構築の手順(というか比較的小さい構築)をやっていこうかなと思います。(思ったより適当な日本語記事がなかったので)
  webpack,TypeScript あたりを使ってやって行く予定です。
  目標は"Hello React"と書き出すとこまでです。
  え？？しょぼくない？？と思う方もいると思われますが、これ以降の簡単なアプリ作ったりってのは結構どの記事でもやられているのでそちらを参考にしてほしいなという感じです。

  また特にモジュール積みのところでガンガン module についての記事を載せたり、公式のドキュメントを載せていますが、これはイマイチわからない人は読んだ方がいいんじゃない？というくらいの気持ちで載せたので読む体力がないのであれば今は飛ばしても結構かと思われます。いつか思い出した時にでも読んでください。
publishedAt: 2019/08/10
updatedAt: 2019/08/10
---


## はじめに

突然ですがみなさん、React アプリ構築に create-react-app 使わないと出来ないのにフロントエンジニア名乗ってるなんてまさかですけどないですよね？？？webpack の設定いつも適当にコピペしてたりなんてしていませんよね？？？
(まあ僕も割とこんな感じだったので人の事は言えませんが)
今回は上記の煽りであ、やばいかもと思った人向けの記事です。
タイトルの通り create-react-app 無しでの React アプリ構築の手順(というか比較的小さい構築)をやっていこうかなと思います。(思ったより適当な日本語記事がなかったので)
webpack,TypeScript あたりを使ってやって行く予定です。
目標は"Hello React"と書き出すとこまでです。
え？？しょぼくない？？と思う方もいると思われますが、これ以降の簡単なアプリ作ったりってのは結構どの記事でもやられているのでそちらを参考にしてほしいなという感じです。

また特にモジュール積みのところでガンガン module についての記事を載せたり、公式のドキュメントを載せていますが、これはイマイチわからない人は読んだ方がいいんじゃない？というくらいの気持ちで載せたので読む体力がないのであれば今は飛ばしても結構かと思われます。いつか思い出した時にでも読んでください。

## 賽の河原で module 積み

取り敢えず最低限必要な module をガンガン積んで行きます。
Node 使えないピヨという方は以下の記事を読んでから進んでください(Node からやってはこの記事の目指すところからズレるので)。
[Node.js を 5 分で大雑把に理解する](https://qiita.com/hshimo/items/1ecb7ed1b567aacbe559)

以下の記事では npm で module を積んで行きますが yarn をお使いの方は適宜読み替えてください。

まず作業するディレクトリを作っちゃいましょう。
取り敢えず初期化だけやっちゃいます。

```Console
mkdir without-create-react-app
cd without-create-react-app
npm init
```

これするといくつか質問が飛んでくると思います。これは今から作ろうとしているものがどんなものなのかという基本情報です。チュートリアルとかで作るものにそれらは不要なので今回の場合は面倒であれば適当に Enter 連打して大丈夫です。(後から書き換えられますし)

こっから module 積みの時間です。いい感じに小分けして行きますが多分大変です()
ある程度流し見しても大丈夫かと思われます。

```Console
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

[webpack](https://webpack.js.org/)はバンドルツールのことです。バンドルという言葉からもわかりそうですが、要するにいくつものモジュールからなるものを一つに纏め上げるツールです。
もっと言えば CommonJS の持つ module を読み込む require 機能をブラウザ上でも使えるようにするためのものです。
webpack-cli は webpack4 から、webpack から分離されたものだそうです。
webpack-dev-server は開発用のローカルサーバーを建てるために要るやつです。
html-webpack-plugin は webpack 用のプラグインです。あとでその用途がわかります。
この辺について詳しくは以下の記事がいいかと思います。
[webpack 4 入門](https://qiita.com/soarflat/items/28bf799f7e0335b68186)

```Console
npm install --save-dev react react-dom
```

はい、出ました[React](https://reactjs.org/)さんです。
React さんは表示が得意な facebook 製のライブラリです。
もっと言えば state(そのアプリの状態を表す変数的な？)に合わせて表示するのが得意って感じですかね。
例えば簡単な計算機を実装するとして、計算結果を表すために、計算結果が入って要る変数を表すのって結構手間というかどうしても実装が汚くなってしまうんですよね(でもやろうと思えば初学者の方でも結構できてしまいますが)。
それを React さんはそこをめっちゃ鮮やかに

```TypeScript
return(
    <div className="result">{result}</div>
)
```

こんな感じでやればあとは result という state の値に変更を加えるだけでぽぽぽっと React さんが表示をやってくれるというやつです、末恐ろしや。

```Console
npm install --save-dev typescript
```

毎度おなじみ[TypeScript](https://www.typescriptlang.org/index.html)さんです。
これは本来動的型付け言語であった JavaScript を静的に書いてより安全に書けるようにするお！！ってやつです。
TypeScript に関してはうひょさんの記事がめちゃくちゃおすすめ
[TypeScript の型入門](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)

```Console
npm install --save-dev babel-loader ts-loader path
```

webpack に渡す loader を積んで行きます、ついでに path も。
これで長きに渡る賽の河原での module 積みは終わりです、お疲れ様でした。
次からは設定ファイルを書いて行きましょう。

## config を書いて行く

次は config ファイルを書いて行きます。
退屈な時間ですがこれもめちゃくちゃ大事な作業ですので頑張りましょう。
package.json,webpack.config.js,tsconfig.json を書いて行きます。

まず package.json ですがこれは書くというよりは一行書き足して欲しいだけで、

```JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

こうなって要るところを

```JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server
}
```

これは webpack-dev-server を呼び出すコマンドを決めるためです。

でお次に webpack.config.js ですがここには webpack の設定をゴリゴリ書いて行きます。
でもどうせコピペすればいいんでしょう？？と思ったあなた、そんな人生甘くありません。この記事では分割してうだうだ書いて行きます。(一応最後にこの記事で言われたことを全部やったら出来上がる git リポジトリ上げておくので困ったらそれを参照して見てください)
まず必要なものを読み込んで吐かせます。

```JavaScript
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = {
    (略)
}
```

でこの略の部分をガンガン埋めて行くというのが次の工程ですね。

```JavaScript
mode: 'development',

entry: './src/index.tsx',
output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
},

devServer: {
    port: '3000',
    hot:true,
    open:true
},
```

mode には production か development を突っ込みます。この場合は開発中ですので development を突っ込みましょう。
entry にはバンドルする際の始点とするファイルを教えます。
output でバンドルさせた後そのファイルを出力する際の設定を教えます。この場合 dist/ディレクトリのなかに bundle.js というファイル名で出力されるということになります。
devServer で webpack-dev-server 使って開発用のサーバー建てた時の設定を教えます。
port には localhost のポート番号、hot を true にすることで hot reload(JavaScript ファイルに変更があった時更新する)を有効に、open を true にすることで localhost を建てた時ブラウザで開く様に設定しています。

```JavaScript
{
    module: {
        rules:[
            {
                test: /\.js(x?)$/,
                loader:'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts(x?)$/,
                loader:'ts-loader',
                exclude: /node_modules/,
         }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html'
        })
    ],

    resolve: {
        extensions: ['.js','.ts','.tsx']
    }
}
```
moduleのなかでこんな拡張子のファイルはこんな感じで処理して行くお！！ってのをwebpackに教えて行きます。
pluginでプラグインを使っているのですが、このHtmlwebpackPluginを使うことでhtmlファイルも一緒にバンドルすることができます。
要するにoutputに出力されるファイルにhtmlファイルも一緒になってくれるというやつです。
resolveのextensionsで.js,.ts.tsxの三種類の拡張子を指定してあげることでmoduleをimportするときに拡張子を忖度してくれる様になります。(てかこれを書かないとまずtsエラーになる気がしますが)
これでwebpackの設定は終了です。

次はtsconfig.jsonでtypescriptの設定をやって行きましょう。
tsconfig.jsonについては各オプションについて詳しく説明して要るとめっちゃ長くなってしまうので調べてください(~~僕も疲れてきたので~~)
```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "strictNullChecks": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "allowJs": true,
        "esModuleInterop": true,
        "jsx":"react"
    },
    "exclude": [
        "node_modules",
        "webpack.config.js",
        "dist"
    ]
}
```
これで設定ファイルをあれこれは終わりです！！やったね！！

## コードを書く
やっとコードを書いて行きましょう。
ここまできたら後もう少しです(割とマジ)
まずはファイルの準備から

```Console
mkdir src
cd src
```
これで作られたsrcディレクトリの中で
```Console
touch index.html index.tsx
mkdir components
cd components
touch App.tsx
```

![21-2](//images.ctfassets.net/6ib5avrqb1b0/4FpKAYEQUJQRdMffT1dmEk/6357c21a3d2f6e23013dfba9c5143c60/21-2.png)
とりあえずこんな感じの構成になったらOKです。
こっから書き込んで行きましょう。
まずindex.htmlファイルから

```HTML
<!DOCTYPE html>
<html lang="ja">
    <head>
        <title>ReactApp</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>

```

こんな感じで書きます。id=appになってる要素に対してreactがrenderして行く感じです。
あれ、jsファイル読み込んでなくないって思うじゃないですか？webpackにぶっこんだhtml-webpack-pluginがいい感じにjsファイルを読み込んだscriptタグを足して出力してくれるんですよね。いやめっちゃ便利。
ちなみに出来上がるHTMLファイルはこんな感じ。
![21-3](//images.ctfassets.net/6ib5avrqb1b0/79nsDh6Mqm3XhRBiJehw0F/cd1e4874fd1fbfcda073d7126d9d80fc/21-3.png)
で次はJavaScriptファイルをまとめて行きましょう。
まずはcomponents/内のApp.tsxから。

```TypeScript
import React from 'react'

export default function App() {
    return (
        <div className="reactApp">
            HELLO
        </div>
    )
}
```
ひとまずこんな感じでパッとコンポーネント作ってしまいます。
ちなみにVSCode使ってる方でしたら、es7という拡張機能を入れればrfcと打ち込むだけでベースとなる部分を一括で作ってくれるのでめっちゃおすすめです。
![21-4](//images.ctfassets.net/6ib5avrqb1b0/50HQt4FyzzwQYST113JtJp/dfc1cbc7bfbaead67e280b068644fd44/21-4.gif)
で次はindex.tsxを書いて行きましょう。

```TypeScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const target = document.getElementById('app');

ReactDOM.render(
    <App />
    ,target
)
```
これでtargetに指定されたところにAppコンポーネントがレンダリングされます。
まずターミナルにてwebpackを実行してみましょう。
そうするとdistファイルが以下の様に出力されます。
![21-5](//images.ctfassets.net/6ib5avrqb1b0/1vQw17YyyNp26622xeJTdm/b707e062ce7487494b313f111f92506b/21-5.png)
そして出力されたdist/以下のindex.htmlを開けばこんな感じになります、成功です。
![21-6](//images.ctfassets.net/6ib5avrqb1b0/4gbBnCaVxNHYZUTDIaFUc7/2a409a4f7ffab75e46e5f2c6cdf66462/21-6.png)
で次はターミナルにて
```Console
npm run dev
```
を実行してください。これでwebpack-dev-serverが走ってくれます。
でindex.htmlを開いた時とおんなじ様な表示がなされると思います。
じゃあApp.tsxのHELLOの部分をHELLO React!!に書き換えてみましょう。
```TypeScript
import React from 'react'

export default function App() {
    return (
        <div className="reactApp">
            HELLO React!!
        </div>
    )
}
```
無事変更が検知されて以下の様になると思います、ようこそReactへ！！
![21-7](//images.ctfassets.net/6ib5avrqb1b0/2UTesw4pcwrklQFfntvcRS/9a51dfacee82c99d9d6fb80ac8b49112/21-7.png)

一応僕が作った、この記事の通りに作ればこうなるはずだよ！！！って感じのgitリポジトリを下に置いておきます。
[完成品](https://github.com/Shinyaigeek/without-create-react-app)