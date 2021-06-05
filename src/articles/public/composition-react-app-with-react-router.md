---
title: Reactアプリ小さめ構成with react-router 編
tags: [Programming, JavaScript, React]
description: |
この記事は前回の記事の続きという感じです。これまた初学者向け
[脱 create-react-app、React アプリの小さめ構築](https://www.shinyaigeek.com/p/22)

この記事を読めば create-react-app なしで react アプリを構築できる様になるのですが、その続きとしてこの記事では react-router について扱おうと思います(開発していて思いの外どぶったので)

react-router のエラー、割とありますよね.
ていうか公式の API なり Document なりがよくわからないって感じはします。
なんかよくわからないけど 404 エラーが出たり、CANNOT GET URL みたいなエラーが出たり、僕もこれでどぶって、いい感じの日本語記事が見つからなかったのもあってじゃあ紹介しておこうかなという感じです。
publishedAt: 2019/08/12
updatedAt: 2019/08/12
---

## はじめに

この記事は前回の記事の続きという感じです。これまた初学者向け
[脱 create-react-app、React アプリの小さめ構築](https://www.shinyaigeek.com/p/22)

この記事を読めば create-react-app なしで react アプリを構築できる様になるのですが、その続きとしてこの記事では react-router について扱おうと思います(開発していて思いの外どぶったので)

react-router のエラー、割とありますよね.
ていうか公式の API なり Document なりがよくわからないって感じはします。
なんかよくわからないけど 404 エラーが出たり、CANNOT GET URL みたいなエラーが出たり、僕もこれでどぶって、いい感じの日本語記事が見つからなかったのもあってじゃあ紹介しておこうかなという感じです。

## react-router とは

react-router とは react でルーティングを実現してくれるというやつです。
じゃあルーティングとは何か、この URL を渡されたらこんなのを表示して！！って教えこむことです。

例えば'なんちゃらなんちゃら/login'っていう URL ではログイン画面を見せたいじゃないですか、'なんちゃらなんちゃら/home'っていう URL ではホーム画面を見せたいじゃないですか、これを実現するお！！ってやつです。

英語読める人はここ読むと詳しくわかると思います。
[REACT TRAINING/REACT ROUTER](https://reacttraining.com/react-router/web/guides/quick-start)

## 導入

まずモジュールをインストールしましょう。

```TypeScript
npm install react-router-dom
```

でそれをインポートします。

```TypeScript
import { BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
```

この辺がよく使うやつですね。
BrowserRouter は react-router-dom の親分めいたやつと言いますか、BrowserRouter のなかで Route や Link を使って行くという感じです。
似た様なのに HashRouter と MemoryRouter,StaticRouter があります。
MemoryRouter に関してはデバッグ用と言いますか、テストやクライアントサイドでない環境で遊びたい時に使うやつです(ほぼ使わないので忘れていいと思います)。
StaticRouter については React をサーバーサイドレンダリングしたいときに使うやつです。だから Static っていう形容詞がついています。
対照的に BrowserRouter ですとブラウザ上でのルーティングができます。ただこれは history API を採用していますのでレガシーな環境では利用できません。逆に HashRouter ですと URL hash を利用していますので環境の制限はありません。ただそのおかげで location.key や location.state はカバーされていません。
長々と喋りましたが面倒くさい時は脳死で BrowserRouter で構いません。

書き方としては

```TypeScript

function Home(){
    return(
        <div>ログインしました</div>
    )
}

function Login(){
    return(
        <div>ログインして下さい</div>
    )
}

function Test(){
    return(
        <div className="test">
            <BrowserRouter>
                <Link to='/login'>Login</Link>
                <Link to='/home'>Home</Link>

                <Route path='/login' render={() => Login()} />
                <Route path='/home' render={() => Home()} />
            </BrouserRouter>
        </div>
    )
}
```

こんな感じでやれば取り敢えずの実装は出来ます。ただ色々と問題も生じます。
例えば上の Route の path に引っかからない奴がでる(switch-case でいう default 的な)とき返す component を設定したい、あるいはそのときログイン画面へリダイレクトさせたい。
あるいはこれをやったけど 404 エラーがでた、あるいは Cannot GET URL みたいなエラーがでたみたいなことがあると思います。以下でそれについて書いておこうかなと思います。

## Default を設定したい

Route で引っ掛けるやつ以外の URL ではこのコンポーネントを表示させたい、あるいはリダイレクトさせたいってときのやつをここで紹介します。(要するにデフォルト設定)

こんなときに役に立つのが Switch です。

以前のやつに加筆しますと

```TypeScript
function Login(){
    略
}

function Home() {
    略
}

function Default(){
    略
}

function Test() {
    return(
        <div className="test">
            <BrowserRouter>
                <Link to='/login'>Login</Link>
                <Link to='/home'>Home</Link>
                <Switch>
                    <Route path='/login' render={() => Login()} />
                    <Route path='/home' render={() => Home()} />
                    <Route render={() => Default()} />
                </Switch>
            </BrouserRouter>
        </div>
    )
}
```
これで/loginでも/homeでもないURLが渡されるとDefaultコンポーネントがレンダリングされます。
でリダイレクトさせたいって時はRedirectを使います。
この場合は上の
```TypeScript
<Route render={() => Default()} />
```
を
```TypeScript
<Route render={() => <Redirect push='/login' />} />
```
って変えるだけ。これで/loginへとリダイレクトされていきます、やったね！！

## Cannot GET URL エラーがでる
めっちゃ簡単です、webpack.config.jsの設定をほんのちょっと触るだけです。

```JavaScript
module.exports = {
    略
    devServer: {
        historyApiFallback:true,
    }
}
```
webpackのdevServerにこれを加筆するだけです。

## 404エラーが出る
404エラーには２パターンあります、これにはブラウザ側で吐かれているエラーを確認してみて下さい。
もし404になっているのがfavicon.icoでしたらそれはただのwebページのアイコンが見つからないよ！！っていうエラーです。この場合スルーして大丈夫です。

もし404になっているのがwebpackによってバンドルされた後の出力されたjsファイルでしたらそれはディレクトリミスです。
相対パスで参照しているがために生じてしまったエラーです。
この場合は
```JavaScript
module.exports = {
    略
    output: {
        path: path.resolve(__dirname, '/dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
}
```
こんな感じにして絶対パスを指定してあげれば大丈夫です。