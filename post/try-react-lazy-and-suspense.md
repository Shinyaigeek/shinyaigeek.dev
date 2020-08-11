---
name: webpackからReact Lazy+Suspenseを試す
tags: [Programming, JavaScript, React]
description: お久しぶりです。しにゃいです。
この記事ではまた React+webpack をやろうと思います。今回は Lazy+Suspense を用いてコンポーネントを動的に読み込むやつをやろうと思います。
よかったら前回の記事も読んでねん。
[脱 create-react-app、React アプリの小さめ構築](https://www.shinyaigeek.com/p/21)
[React アプリ小さめ構成 with react-router 編](https://www.shinyaigeek.com/p/22)
date: 2019/6/21
---

## はじめに

お久しぶりです。しにゃいです。
この記事ではまた React+webpack をやろうと思います。今回は Lazy+Suspense を用いてコンポーネントを動的に読み込むやつをやろうと思います。
よかったら前回の記事も読んでねん。
[脱 create-react-app、React アプリの小さめ構築](https://www.shinyaigeek.com/p/21)
[React アプリ小さめ構成 with react-router 編](https://www.shinyaigeek.com/p/22)

## コード分割という教義

React の Lazy(というよりコンポーネントを動的インポートすること)ってコード分割(Code Splitting)の思想をベースとしています。
webpack 等のバンドルツールを使って軒並みある JavaScript モジュールをバンドルするじゃないですか。でもアプリケーションのサイズが大きくなると必然的にバンドルされたファイルのサイズも大きくなりますよね。特にサイズの大きいモジュール打ち込んだりってやったら顕著にサイズが膨れ上がりますよね。
僕も昔 select2 のためだけに jQuery ぶち込んだら一気にバンドルサイズが膨れ上がって辛い思いをしたことがあります。
もちろんバンドルサイズが大きくなれば読み込みにも時間がかかってしまうわけで、パフォーマンスに大きな影響が出ます。ここに気を使うのはフロントエンドの責務とも言えましょう。

でも全てのモジュール(コンポーネントも含めて)を最初のロードの際に読み込みたいと聞かれるとそうでもないじゃないですか。SPA を作ってる時だとあるページでしか使わないコンポーネントとかも発生します。そういうコードを分割して管理して、ユーザーが必要とするコードだけを遅延読み込みさせルことができれば(もちろんコードの総量は変わりませんが)パフォーマンスの改善に繋がるでしょう。(もちろんやり過ぎると逆にパフォーマンスの悪化や管理コストに繋がったりするのでトレードオフではありますが)

ですのでそういうコードを分割してしまいましょう、これが教義です。コード分割は webpack や Browserify などのバンドらでサポートされています。
この記事では webpack でコード分割を試してみようと思います。

## コード分割を試す

僕は　[脱 create-react-app、React アプリの小さめ構築](https://www.shinyaigeek.com/p/21) これで用意したコードを前提として進めていきます。ちなみに Next.js や create-react-app で生成されたプロジェクトはデフォルトで遅延読み込みをサポートする設定になっているそうなので弄らなくても大丈夫っぽいです。ただ上記の記事の通り webpack から React のプロジェクトを組み立てると webpack の方も触らないといけないので触っちゃいましょう。

まず webpack.config.js から

```JavaScript
module.exports = {
    略
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: 'chunk.js',
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    略
}
```

こんな感じで書き換えます。
まず output のところで分割したファイルを chunk.js というファイル名で dist のなかに出力するよって設定します。
そして optimization のとこでコード分割するっていうのを設定しています。
これは[Dan 先生の webpack.config](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269)を参考にしたのでリンクから本家見てみるのもいいかと思います。
あと上記の例ですと TypeScript のコンパイラ設定も触らないといけないです(Promise 等で縛りがあるため)。

```JSON
{
    "compilerOptions": {
        "lib": ["es2015","dom"]
    }
}
```

次はコンポーネントを用意しましょう。
まず動的にインポートするコンポーネントから

```TypeScript
import React from 'react';

export default function Lazy(){
    return (
        <div>
            <div>This is Lazy Component with random2837</div>
            <div>This is Lazy Component with random3395</div>
            <div>This is Lazy Component with random3574</div>
            <div>This is Lazy Component with random4860</div>
            <div>This is Lazy Component with random3843</div>
            <div>This is Lazy Component with random3544</div>
            // 略(こんな感じのが五千行続きます)これ自体はPythonで生成しました。
        </div>
    )
}
```

![24-2](//images.ctfassets.net/6ib5avrqb1b0/34d8XtPlSiZJeaXZYR518e/11099053826f1424e3ef8f1feb124184/24-2.png)

ちなみにこのLazyコンポーネントは249KBあります、App.tsxが295バイトであることを考えるとこれは約1000倍のファイルサイズです、いかに馬鹿馬鹿しいものかがよくわかりますね()
次はSuspense用のコンポーネントを用意しましょう。
SuspenseとはLazyコンポーネントをインポートしている間に表示させるファイルです。僕はSplash画面って読んでました。
ページを読み込んでいる時とかにくるくるしてるあれのことです。

```TypeScript
import React from 'react';

export default function Suspense(){
    return(
        <div>
            <div>Wait</div>
        </div>
    )
}
```

こんな感じでいいでしょう。
でまずは動的インポートをさせない方向でバンドルさせましょう。
App.tsxを単純にこんな感じに書きます。

```TypeScript
import React from 'react';

import Suspense from './Suspense';
import Lazy from './Lazy';

export default function Suspense(){
    return(
        <div>
            <Suspense />
            <Lazy />
        </div>
    )
}
```

でこれをバンドルするとバンドルサイズは
![24-3](//images.ctfassets.net/6ib5avrqb1b0/7EiyCUlazAgiwtWC8CL14R/3340a21d40f3b3b6bf3c986b70e1b536/24-3.png)
1.6MBになりました。

で次は動的インポートさせてみましょう。
App.tsxをこんな感じで書きます。

```TypeScript
import React from 'react';

import Suspense from './Suspense';
const Lazy = React.Lazy(() => import('./Lazy));

export default function Suspense(){
    return(
        <div>
            <React.Suspense fallback={<Suspense />} >
                <Lazy />
            </React.Suspense>
        </div>
    )
}
```

このReact.Suspenseの配下に動的インポートするコンポーネントを書きます。
その配下でレンダーするコンポーネントがまだ準備できていない時、fallbackに渡されているコンポーネントが表示されるという仕組みです。

バンドルファイルのファイルサイズはこんな感じ。
![24-4](//images.ctfassets.net/6ib5avrqb1b0/PR8CF24PU7ZjlkrNexoQS/b811fe24c55bcbc2c011a1ea5673ebd1/24-4.png)
確かに重たいLazyコンポーネントの部分がchunk.jsとして分割されています。
実際の挙動はこんな感じ。
![24-5](//images.ctfassets.net/6ib5avrqb1b0/12vBMyNCov1gLE24pSxyFd/f750038ae3dfa03bdb98e16ca4d484d1/24-5.gif)

個人的にSuspenseにはある可能性を感じていて(Suspenseはまだまだ開発中)、今後データ取得などの多くのシナリオ処理がSuspenseに押し付けられるようになります(これについてはReactのBlogで[React 16.x Roadmap](https://ja.reactjs.org/blog/2018/11/27/react-16-roadmap.html))。
これをすると何がいいかというと、現在データフェッチしている時、その待機には僕はreduxを使ってわざわざfetch_flagと言ったstateを用意して、redux-sagaでフェッチさせてそれが成功した時fetch_flagをfalseに書き換えて、fetch_flagがtrueの時はSuspenseを、falseの時は画面を表示させるって感じで書いています。それをわざわざやらなくてもよくなる気はします。
というか単純にSuspenseにより多くのことを押し付けられるようになると楽だなって感じが。
今ではこの機能は使えないので、正直無理して実装するコストに得られる恩恵が見合わないなという感じはありますが、今後に期待という感じでしょう。