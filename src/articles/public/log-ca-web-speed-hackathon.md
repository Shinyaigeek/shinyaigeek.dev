---
title: CyberAgent主催『Web Speed Hackathon Online』参加ログ
tags: [Web,Programming]
description: |
  Cyber Agent主催のWeb Speed Hackathon Online 4/25, 4/26に参加してきました. 結果は残念ながらレギュレーション違反で選外でしたが, とても楽しく刺激を得られたイベントになりました.

  この混乱した情勢の中オンラインという形でシステムを整えて実施してくださったCyber Agentの皆さん, ありがとうございました.
publishedAt: 2020/04/26
updatedAt: 2020/04/26
---

## はじめに

Cyber Agent主催のWeb Speed Hackathon Online 4/25, 4/26に参加してきました. 結果は残念ながらレギュレーション違反で選外でしたが, とても楽しく刺激を得られたイベントになりました.

![hackathon-res](/log-ca-web-speed-hackathon/hackathon-res.png.png)

この混乱した情勢の中オンラインという形でシステムを整えて実施してくださったCyber Agentの皆さん, ありがとうございました.

## イベント内容
あらかじめ用意されている, 架空のブログサービスのパフォーマンスをどれだけ高められるかというものです.
ランタイムのパフォーマンスの最適化ももちろん必要でしたが, チューニング対象がメディアという特性上やはりI/Oコストをどれだけ抑えられるかが大きな鍵で, フロントエンドだけでなくインフラ, バックエンドも触れるところがありました.

得点づけはlight houseにより計測される得点や, TTI, Speed Index等に重み付けを行なってホニャホニャするそうです.

レギュレーションは**Google Chrome で機能落ちやデザイン差異が生じない**ことです.
具体的には画像のアスペクト比等が崩れない, いいね機能などが落ちない等で結構厳し目だった印象があります(あと個人で進めていたこともあって気付きにくかった)

僕のレギュ違反はmoment, lodash, jQueryを剥がした時に機能落ちが生じたか, 画像のresizeを行なった時にアスペクト比がずれたかかなと。。悔しい。。

## 経緯

スタート時
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">やっていき💪💪💪💪💪 <a href="https://twitter.com/hashtag/WebSpeedHackathon?src=hash&amp;ref_src=twsrc%5Etfw">#WebSpeedHackathon</a></p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1253854845817126915?ref_src=twsrc%5Etfw">April 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

1日目終了

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/WebSpeedHackathon?src=hash&amp;ref_src=twsrc%5Etfw">#WebSpeedHackathon</a><br><br>現状3位。。。まだまだ詰められる要素あるしやっていくぞ💪</p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1253989347902152704?ref_src=twsrc%5Etfw">April 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


調子乗ってる時
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">逃げ切りたいですが。。 <a href="https://t.co/HXU4Z0nURy">pic.twitter.com/HXU4Z0nURy</a></p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1254246375056797697?ref_src=twsrc%5Etfw">April 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

終わった直後(審査中)
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/WebSpeedHackathon?src=hash&amp;ref_src=twsrc%5Etfw">#WebSpeedHackathon</a><br><br>お疲れ様でした！！あとは神に祈ります。。</p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1254326987847421952?ref_src=twsrc%5Etfw">April 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

死んだあと
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/WebSpeedHackathon?src=hash&amp;ref_src=twsrc%5Etfw">#WebSpeedHackathon</a> <br><br>レギュレーション違反やってしまっていた。。めっちゃ悔しい。。お疲れ様でした。。！ <a href="https://t.co/zV40X344Jw">pic.twitter.com/zV40X344Jw</a></p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1254352999243079682?ref_src=twsrc%5Etfw">April 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## やった施策

雑に箇条書きです. 効果が顕著だったものは**太字**にします
よろしければ他の参加者の皆さんもどんなことをやったか教えて欲しいです🤲

* webpackのbuild最適化
  * **source map剥がす**
  * **modeをnone -> productionにする** ([https://webpack.js.org/configuration/mode/](https://webpack.js.org/configuration/mode/))
* code splitting
  Reactに頼りました. Router levelでchunkしてさらにcomponentレベルでもいくつかchunkしました. fetch, contextの更新のためのscriptも切り出そうと思いましたが, webpackをゴリゴリ考える必要が出てきてしんどくなって諦めました
  * **Lazy, Suspense** ([https://ja.reactjs.org/docs/code-splitting.html](https://ja.reactjs.org/docs/code-splitting.html))  
  ちなみにですが, 遅延読み込みをする時, **main.bundle.js**から相対パスで必要なjsを読み込むっぽくて, それはサーバーのどこにmain.jsがあるかでなくそのスクリプトが評価された時点のパスから相対的にパスが決定されるっぽくて, 例えばReact routerとかを使っているとダイレクトに **/asdf/hogehoge/barbar/celcel/**みたいなところにアクセスするとchunkされているjsが迷子になってエラーが出ます. これをなんとかするために, サーバー上で, jsへのRequestのうち迷子になりそうなものは, catchしてよしなに返すというものを実装しました.多分webpackでこういうのをいい感じに解決するものがありそうでしたけど, 見つからなかった。。 ちなみにhtmlファイルの配信にも似たようなことをしなければならないです.
* 画像の最適化
  * 用いられている画像のresize, webp化(画像があるリポジトリからcloneしてcloud storageにアップロードしました) -> ここでやらかした可能性ありますね。。
  * **webpackによりbase64にencodeされて埋め込まれているものもあったのを, encodeさせずに普通にpathで画像を指定する.**
* 一部ライブラリの削除
  * jQuery, moment, lodashを剥がしました -> ここでやらかした可能性もありますね。。
  * [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)で剥がすべきライブラリを洗い出しました
    ![webpack-bundle-analyzer](/log-ca-web-speed-hackathon/webpack-bundle-analyzer.png)
  * immutable.jsとbluebird.jsについては辛そうだったので諦めました。。
* html, cssのminify
  * htmlはHtmlWebpackPluginに任せました
  * cssはpost-cssに任せました
* google fontの最適化
  google fontsはquery paramaterでこの文字のフォントだけ欲しい！という指定ができます, それをやりました [https://developers.google.com/fonts/docs/getting_started](https://developers.google.com/fonts/docs/getting_started)
* fontawesomeの読み込みを最小限にする
* service workerでfetch時にキャッシュ
* 配信されるコンテンツにとても強いCacheを効かせる
* react importの最適化
  import React fromよりもimport * as React fromの方が余計なプロパティアクセスが生じなくてちょっと早くなるらしいです, まじで？(未検証)
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">You might want to check the build output of your Webpack. If you see something like react_default.a.createElement(...). Note the extra .a. That might mean you&#39;re using `import React from &quot;react&quot;` which adds a bad getter in Webpack. Instead use `import * as React from &quot;react&quot;`.</p>&mdash; Sebastian Markbåge (@sebmarkbage) <a href="https://twitter.com/sebmarkbage/status/1250284377138802689?ref_src=twsrc%5Etfw">April 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
* 配信時に圧縮をかける
  expressでcompressionするあれです
* 画像の遅延読み込み     
  [https://developers.google.com/web/updates/2016/04/intersectionobserver](https://developers.google.com/web/updates/2016/04/intersectionobserver), [https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video?hl=ja](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video?hl=ja), [https://blog.jxck.io/entries/2019-05-20/lazyloading.html](https://blog.jxck.io/entries/2019-05-20/lazyloading.html)この辺
  実装は時間がなかったので良さそうなReact Componentを採用しました [https://www.npmjs.com/package/react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component)
  
## やれなかったこと
* SSR
  そもそもメディアだったらSSRしたくない？ってなって1時間ほど作業しましたが, React-routerやreact-reduxといったfor clientのライブラリが多く, シンプルにserver上でレンダリングまでが既にしんどい, client, server間でcontextやstate, routerの共有が沼いという理由で諦めました
* ブログの記事をfetchを並列でRequestを投げる

```javascript
useEffect(() => {
  await fetchASDF()
  await fetchHOGE()
  await fetchBAR()
},[])
```
となっていて, これだとfetchASDFが終わったらfetchHOGEのRequestを投げてそのResponseが返ってきたらfetchBarを投げてという感じでブロッキングになっちゃって辛いので
```javascript
Promise.all([fetchAsdf(), fetchHOGE(), fetchBAR()])
```

という感じにしてRequestをまとめて投げてもらうようにして, こうすれば多分fetchにかかる時間が短くなってTTI減らせるんじゃないかのと思っていたのですが, なぜかTTIが大幅に落ち込んだので辞めました。。。何故だ。。知見求むです。。

## 結局

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">個人戦のハッカソンや個人開発をADHDがやるのはやはり辛い(辛い)</p>&mdash; しにゃい | Shinobu Hayashi@🏡 (@Shinyaigeek) <a href="https://twitter.com/Shinyaigeek/status/1254358899152400385?ref_src=twsrc%5Etfw">April 26, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

パフォーマンスチューニングをする時, (パフォーマンスでなくとも何らかのチューニングを行う時), ただパフォーマンスについてだけ数字をとって考えればいいというわけではなく, デザイン差分や機能差分についても目を配りそれらに落ちがないようにする必要がもちろんあるんですが, その際**僕のような注意力散漫な人間であっても, そして別に特段注意を払わなくとも**差異が発生した時は気づけるようなシステムを作っていくべきだと感じました. せっかくPlaywright, puppeteer, GitHub Actionsといった便利なツールがあるし, エンジニアを志望する以上こういう仕組みづくりをして行くべきで, 逆に普段のプロダクトでこういったことを怠っていた | Review任せにしていたというのが今回のレギュレーション違反に繋がったかなと反省があります. 

最後に主催してくれたCyber Agent, 競い合った参加者の皆さんに感謝を述べて終わりたいと思います.ありがとうございました！！

(次は優勝したいのでまたやってください)
    