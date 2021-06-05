---
title:  Next.jsとnow.shでブログを新しく作り替えた
tags: [Blog,Programming, JavaScript,React]
description: |
[Next.js 9](https://nextjs.org/blog/next-9)
7月8日Next.jsのv9リリースが発表されました。

実はこのブログの前身もNext.jsで書かれていて書いた当時はまだv8でした。でv9リリースからおよそ5ヶ月が経ってやっと、重い腰を上げて自分のブログのアップデートを試みました。
ですが蓋を開けるとあら不思議、あまりの~~クソ~~コードぷりになかなか作業が進まない。
具体的に言ってしまうと@ts-ignoreとanyのオンパレードで下手したらJSのまま作業するよりも酷い代物が出来上がっていました。
そんなものをアップデートしようとしても全然コンパイルが通らず、しかもバカ遅い。
![27-1](//images.ctfassets.net/6ib5avrqb1b0/1pGRDYrjlORgA07fHoIJpJ/69276f41d669c08bf74403212044dee3/27-1.jpg)
ちなみにこれが書き換える前のlighthouseのスコア、無慈悲な0点に涙を禁じ得ません。
そしてもう何もかもが無理になり一から作り直してしまうことにしました()
publishedAt: 2019/12/14
updatedAt: 2019/12/14
---

asdfasdfasdfasdf## 作り替えに至った経緯

[Next.js 9](https://nextjs.org/blog/next-9)
7月8日Next.jsのv9リリースが発表されました。

実はこのブログの前身もNext.jsで書かれていて書いた当時はまだv8でした。でv9リリースからおよそ5ヶ月が経ってやっと、重い腰を上げて自分のブログのアップデートを試みました。
ですが蓋を開けるとあら不思議、あまりの~~クソ~~コードぷりになかなか作業が進まない。
具体的に言ってしまうと@ts-ignoreとanyのオンパレードで下手したらJSのまま作業するよりも酷い代物が出来上がっていました。
そんなものをアップデートしようとしても全然コンパイルが通らず、しかもバカ遅い。
![27-1](//images.ctfassets.net/6ib5avrqb1b0/1pGRDYrjlORgA07fHoIJpJ/69276f41d669c08bf74403212044dee3/27-1.jpg)
ちなみにこれが書き換える前のlighthouseのスコア、無慈悲な0点に涙を禁じ得ません。
そしてもう何もかもが無理になり一から作り直してしまうことにしました()

## やったこと
ここからだらだらと箇条書きになります。

* SSRした

実は以前のブログはstatic file exportしたものを一々FTPしてました(ぇ
Next.jsのSSR (with rehydration) はTTFBがちょっと辛いというのはありましたが、以前のぐっちゃぐちゃになっていたものに比べるとかなり早くなりました。
(~~それでもまだ速さが物足りないしブログにSSRはミスマッチな気がするからGatsbyに乗り換えたい~~)

* ダークモードに対応した

スマホやブラウザのダークモード、ライトモードそれぞれによって微妙に異なる配色を採用するようにしています。
cssのprefers-color-schemeというメディアクエリで対応できたので、そこでcss変数作ってよしなにやりました。
prefers-*はユーザーの閲覧環境に関するメディアクエリで、まだ実装はされてない(はず)ですけど今後はアニメーションの動きを減らすか否か、コントラストが高いか低いかというのにも対応できるようになるっぽい？

* 画像の遅延読み込み

ブログのコンテンツ一覧のページのアイキャッチ?画像の読み込みがボトルネックになっていたので、低解像度のデフォルトとなる画像をあらかじめ読み込んで表示させておき、Intersection Observer APIというターゲットとなる要素について、それが指定された要素あるいはビューポートと*交差*するたびに呼ばれるコールバック関数を定められるAPIを用いています。
僕はuseEffect(componentDidMound)の中で、windowのloadイベントでIntersectionObserverを定め〜って感じの実装にしました。
これにより、ファーストビューではブログのアイキャッチ画像は低解像度のものが表示され、帯域の節約になりもちろんロード時間も減ります。そして下にスクロールしてそれが表示される！！ってなると(ビューポートと交差すると)新たに普通の解像度のその記事のアイキャッチ画像が読み込まれ差し込まれるという具合です。
僕の場合これがかなり速度に貢献した。

* webフォントとの別れ

Unicode-rangeで帯域減らしたといえど4.7MBは辛かった、以上

* animationをkeyframesで表現

以前は[Ant Motion](https://motion.ant.design/components/tween-one)のtween oneというライブラリを用いてアニメーションを表現していたけれど、僕のCSS習熟度が上がりこれ別にkeyframesで表現できるくねってなった、あとはやるだけ。
ちなみにトップページの惑星の公転周期っぽいアニメーションは

```JSX
<div className="target_x">
  <div className="target_y">
    <Target />
  </div>
</div>
```

みたいな感じで二つのdivでラッピングして、target_{x|y}にそれぞれx軸,y軸方向のtransformを与えて、animation-timing-functionにease-in-outを与えてあげると、x軸方向、y軸方向に同時にease-in-outに動き〜となってその二つの動きが合成されて円周上を回転する(語彙力)
あとはz-indexの魔法をかけておしまい。

* now.shでデプロイ

zeitの提供する静的サイトプラットフォームの[now.sh](https://zeit.co/dashboard)を使ってデプロイした。
githubと連携できて、各コミットごとにデプロイされて、master pushで本番環境に反映されるという感じでとてもDXが良い

* any, @ts-ignoreとの別れ

用法用量見極められるようになるまでは。。

* textlintの導入

markdownと言った文章の推敲をしてくれるというもの。
こんな感じで怒られる
![27-3](//images.ctfassets.net/6ib5avrqb1b0/5QyjELI9c7X25D9IChuvo6/71d848be235ff045de9d30f94dfcc534/27-3.png)
僕はGithub Actionsを使ってプルリクごとに走らせている。
自分の日本語力のNASAに直面させられて辛い。

* sitemapの自動生成

今まではブログのコンテンツの追加のたびにsitemapも書き換えていたけれど、API routesでapiを用意して、そこを叩くとsitemap.xmlが生成されて返されるという仕組みにした。

* AntDesignは続投

一番好きなUIライブラリーまである。Headings Anchorとか変態だと思う。

* MathJaxを突っ込む

Texで数式を描けるようにしました。やったね！ブログでも数学ができるよ!(~~やるとは言ってない~~)

## やらなかった/やれなかったこと

* webp対応

力尽きた。。
safariさんはwebp対応をやな。。

* server push

nextjsでserver pushするのどうするんや。。ってなって詰んでます。。
求)知見
 
* cache

同上、Cache-Control触ってない。。

* CDN

Fastly触りたかったけど月50$-は貧乏学生には厳しい。。

## 結果

![27-2](//images.ctfassets.net/6ib5avrqb1b0/6vr4l0mNRNNqKQYBFOj0O7/012b1afbca5d5dbd5f5528167dc95031/27-2.png)
一応ここまではスコアが伸びた。
ただブログでこのスコアか。。って辛さはある。

元気がでたらまたいろいろ触ってみます。
とりあえずしばらくは数学と物理の試験に追われます。