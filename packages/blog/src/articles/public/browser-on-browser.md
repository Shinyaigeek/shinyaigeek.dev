---
title: ブラウザの上でブラウザを動かす
tags: [Programming, Rust, JavaScript, Web, Browser]
description: |
  この記事では, 自作ブラウザを実装した続きとして, chromeブラウザで自作ブラウザを動かす, ということをしようと思います.
publishedAt: 2019/08/12
updatedAt: 2019/08/12
---

## 初めに

こんにちは, [しにゃい/Shinyaigeek](https://twitter.com/Shinyaigeek) です.


ちまちまと作っていた自作ブラウザ [Shinyaic](https://github.com/shinyaigeek/shinyaic) をChrome上で動かすことができたので, それについて勉強ノートを書こうと思います.

本稿ではこの自作ブラウザの実装についての詳細には触れるつもりがありません, 興味がある方は以下のスライドを見てくださると幸いです.

[![](https://files.speakerdeck.com/presentations/f70e84d625ae44949d1a6f6a87909011/slide_0.jpg?19382839)](https://speakerdeck.com/shinyaigeek/burauzazuo-rifalsesu-me)

## ブラウザの仕組み概略図

![](/assets/browser-on-browser/sys.png)

ブラウザの仕組みはおおまかに書くとこの概略図のようになっています. 本当は描画の処理はもう少し細かいんですがここでは割愛します.

まずHTMLからDOMを構築, CSSからCSSOMを構築して, それをもとにRenderTreeを構築します. このRenderTreeには描画に必要な情報が格納されます. DOMは **Document Object Model** という名の通り, HTMLのマークアップの構造に基づいた情報が格納されています. 例えばこのノードはH1要素である...と言ったこと, あるいはheadタグやmetaタグなど描画されるわけではない要素についてのノードも格納されています. 一方RenderTreeは描画に必要な情報が格納されるので, `display: none;` が付与されていたりあるいはheadタグといった, 描画されない要素のノードは含まれません. また基本的にはそのノードがHTMLにおける何タグであるか, といった情報も削げ落ちており, Block NodeかInline Nodeか, そしてどんなスタイルが当たっているか, といった情報が格納されます.

RenderTreeを構築すれば, 次はそれを元に矩形情報を計算します. このノードがどれくらいの大きさで, どの位置に描画されるか, ということを計算して, それが完了すれば実際に描画処理を行います.

## ブラウザ on ブラウザ

このブラウザを動かすための処理のうち, 実際にブラウザ上で実行できる部分は意外に多いということに仕組みの概略図を見ると気づけると思います.

HTML -> DOMにする処理や, RenderTreeを構築する処理はOSのあれこれに依存している処理というわけではないので, 普通にブラウザでも動かすことができます. 今回は自作ブラウザをRustで実装していたので, WASMへとビルドしてブラウザで動かしていましたが, 普通にJavaScriptで書けばそのまま動かすこともできます.

単純に実装したブラウザがブラウザ上で動かすことが難しい主な箇所は, 描画処理となります. というのも今回の自作ブラウザも, 世の一般的なブラウザもネイティブアプリブラウザなので, ネイティブアプリをそのままブラウザ上で描画する, というのは基本できません. (icedのように, for webな出力もできるGUI Library for Native Appもありますが, 今回は割愛します)
そして厳密にはLayout処理の一部分もブラウザ上で動かすことができません. というのも矩形情報を得るためには, こういった文をこのフォントサイズでこのフォントで描画するとどれくらいの幅, 高さをとるかといった情報はどう描画するか, の部分に依存するからです.

一般的なChromeやSafariといったブラウザはNative Applicationであるため, それ用に描画されます. 例えば僕が作っていた自作ブラウザやservoでは `iced` という描画エンジンが用いられています.

その代替として, 描画部分をfor WebとしてCanvas APIで実装し, 同様に上記で述べたLayout処理でのこういった文章をこのフォントサイズでこのフォントで描画するとどれくらいの幅, 高さをとるかといった情報を取得する処理を実装できれば, Web上で, ブラウザ上で自作ブラウザを動かすことが可能なのでは, というのが今回の記事, 趣味開発(?)の原点発想となります.

## nativeでの実装

native appとしての自作ブラウザでは, icedという描画エンジンを利用しています.

それありきで, 以下のような実装をしています.

```rust
use iced_graphics::Primitive;

fn create_block(render_object: RenderObject) -> Primitive {
  Primitive::Quad {
    ...
  }
}

fn create_text(render_object: RenderObject) -> Primitive {
  Primitive::Text {
    ...
  }
}

```

このように `RenderObject` をもとにそれを iced のPrimitiveという単位に変換します. create_block では「この位置でこの大きさで, この背景色のブロック」というのを生成します. 同様に create_text では「この位置でこのフォントでこの文字」というのを生成します。

## Webでの実装

Webでの実装では, これをCanvas APIベースのものに置き換えます.

まず, RenderTreeの構築処理までとLayout処理の一部は, nativeで使われている実装と共通のものを使いまわせるので, それ以降の, 

* Layout処理におけるこの文をこのフォントで描画したときどれくらい幅, 高さをとるかの取得
* 実際に描画する処理

をWebでも動くようにするために, Canvas APIによって実装します.

* /core: RenderTreeの構築まで
* /native: nativeでの描画処理
* /wasm: webでの描画処理

とpackageを分けて, native, wasmからcoreに依存する形で実装します.

それありきで, 以下のような実装をしています.

```rust

fn create_block(render_object: RenderObject, canvas_context: CanvasContext) -> Primitive {
  canvas_context.set_style
}

fn create_text(render_object: RenderObject, canvas_context: CanvasContext) -> Primitive {
  Primitive::Text {
    ...
  }
}

```

**web-sys** moduleから, Canvas APIにアクセスして, よしなに描画します.

WASMから, このようにHTMLを入力にとりCanvas上に描画するところまで実行することができました.

https://shinyaic-wasm-playground.vercel.app/

## 終わりに


