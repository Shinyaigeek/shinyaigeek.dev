---
title: cloud flare workerで省エネSSRなBlogを目指す
tags: [Blog,Programming, Web]
description: |
  世は技術ブログ大時代. みんなはてなブログか[JAMstack](https://jamstack.org/)にその身を委ねていた. お手軽さを求めるならはてなブログ, あるいはそこにカスタマイズ性やスピードを求めてHeadlessCMSにコンテンツを追加して動的に静的サイトを更新していくJAMstackな構成を目指した. 実際今の時代, GatsbyjsなりNextjsでもcontentfulなどを組み込んだJAMstackのテンプレートがあるので, HeadlessCMSからAPIを取得して環境変数として設定して, 適切にCI/CDを組んであげればもうJAMstackによる高速でお手軽な技術ブログが完成します. すごい時代だ.でもそんな中, あえてSSRを用いた動的な構成にロマンを感じ動的なブログを構築しようとした男がいました, いや僕なんですけど. cloud runでNode.jsの上にexpressサーバーを生やして, そこでJSXをreact-domを通してhtmlにしています.

  しかし一回のアクセスごとにexpressが立ち上がると時間がかかる(特にTTFB), そもそも従量課金制なのでアクセスのたびにサーバーを立ち上げるのでなく, 出来るだけキャッシュを効かせたい. 特にこの場合本質となるブログ記事はCMS上にあるのでそこを参照したい.

  というのを叶えたく, edge-sideでスクリプトを動かしてキャッシュを動的に管理して更なる最適化を目指す, という取り組みをしてみます.
publishedAt: 2020/04/13
updatedAt: 2020/04/13
---

## はじめに

世は技術ブログ大時代. みんなはてなブログか[JAMstack](https://jamstack.org/)にその身を委ねていた. お手軽さを求めるならはてなブログ, あるいはそこにカスタマイズ性やスピードを求めてHeadlessCMSにコンテンツを追加して動的に静的サイトを更新していくJAMstackな構成を目指した. 実際今の時代, GatsbyjsなりNextjsでもcontentfulなどを組み込んだJAMstackのテンプレートがあるので, HeadlessCMSからAPIを取得して環境変数として設定して, 適切にCI/CDを組んであげればもうJAMstackによる高速でお手軽な技術ブログが完成します. すごい時代だ.でもそんな中, あえてSSRを用いた動的な構成にロマンを感じて動的なブログを構築しようとした男がいました, いや僕なんですけど. cloud runでNode.jsの上にexpressサーバーを生やして, そこでJSXをreact-domを通してhtmlにしています.

しかし一回のアクセスごとにexpressが立ち上がると時間がかかる(特にTTFB), そもそも従量課金制なのでアクセスのたびにサーバーを立ち上げるのでなく, 出来るだけキャッシュを効かせたい. 特にこの場合本質となるブログ記事はCMS上にあるのでそこを参照したい.

というのを叶えたく, edge-sideでスクリプトを動かしてキャッシュを動的に管理して更なる最適化を目指す, という取り組みをしてみます.

## Cloud flareってなんぞ

一言で言い難いのですが, めちゃ簡単に使えるリバースプロキシを利用したCDNサービスとしておきましょう. サービスとしてはそこだけではないのですが, 
* この記事ではCDN, リバースプロキシとして利用している
* 説明がしんどい, 記事の本質でない

というのがありますので詳細は省かせてもらいます. 詳しく知りたい方は公式のwebページを参照してください. 

サーバーから配信される内容をCDNにキャッシュしておくことで, サーバーの負担を減らす, 帯域を減らしてパフォーマンス向上が図れたりします. コンテンツの配信元と, クライエントとなるブラウザの物理的距離が小さくなることも魅力です. え, そんなの影響する？と思うかもしれませんが, 適当に海外のカフェとかの個人webサイトとかを覗いてもらえば物理的距離の影響が見えると思います, CDNはこれを解消する一助になりますね.

ちなみにですがJAMstack構成でブログ作っている人は, cloud flareにそのweb serverを登録するだけでその恩恵がかなり受けられます. 個人のweb siteなら無料で利用できますし, かなりお手軽に登録できるのでやってみてください.

## cloudflare workerって何？

そもそもCloudflare workerとはなんなんでしょう？ ついさっき

> ちなみにですがJAMstack構成でブログ作っている人は, Cloud flareにそのweb serverを登録するだけでその恩恵がかなり受けられます.

といっていますが, 実はこれだけで僕のこのブログの動的な構成でも全然恩恵を受けることができます.
そもそもedge-sideを介すことでどんなことがおきてるかというと, 

![how-works-cdn](//images.ctfassets.net/6ib5avrqb1b0/3Me2xX0XcsXmpJzhWo0hCM/31f64cdc0e36942bad76d0b23ac7acf2/IMG_82073C6538F5-1.jpeg)

こんな感じで,
1. clientからReqestが飛ぶ
2. Edge-serverでそれを受け取りキャッシュを見る
3. そのキャッシュされた内容をクライエントに返していいかどうかserverに確認しにいく
4. OKと返ってくる
5. キャッシュされた内容をクライエントに返す


みたいなことがおきています(といってもこの流れは過度に一般化されていて, もちろん状況によって分岐は生じますが)

でもこれだとclientからアクセスが飛ぶたびにCloudRunが立ち上がってしまいます. いちいちサーバーを建ててhtmlを生成しても時間が勿体無いですし, 何よりお金がかかります.

そもそも本質となるブログ記事はCMS上にあるので, キャッシュされているコンテンツをそのまま返していいか判定したければ, そもそもCMSだけ覗けば十分なはずです.

これを可能にするのがcloudflareでservice worker的な, scriptを動かしてキャッシュを制御するcloud flare workerです.

因みにJSだけでなくRustやCも動かす事が出来ます.

## cloudflare workerを動かしてみる

といってもやることは至極単純です.

1. CMSから記事の更新状況をfetchしてくる
2. その結果をみてキャッシュされているコンテンツが最新のものか判断する
3. 最新のものだったらキャッシュされているコンテンツをクライエントに返す, 最新のものでなかったらCMS上のデータをもとにhtmlを生成してクライエントに返す, そしてそのhtmlとcmsから取ってきたデータをキャッシュしておく

という感じです.

まずcloudflare workerを編集するために**wrangler**を導入しましょう.

```shell
npm i @cloudflare/wrangler -g
```

で**wrangler**をグローバルインストールします.

で次にworkerのcodeを置いておきたいディレクトリで

```shell
wrangler generate my-router-app
```

を実行してセットアップします.

生成されるpackage.jsonをみてもらえれば分かる通り, mainとなるcodeは**index.js**ですので, そこのファイルが書き換える対象です.

そこでは**fetch**に対するイベントリスナーとそのハンドラが生えています.
なのでがっつり触るべきはハンドラですね.  
因みに初期のものから触っていなければ, 

```javascript
event.respondWith(handleRequest(event))
```

としていますので, ハンドラとなるhandleRequestのなかで

```javascript
return Response
```

という体になっていれば大丈夫です.

因みにですが**wrangler**を使っていれば

```shell
wrangler publish // publishされる

wrangler preview --watch // dev-serverを建てる(HRM付き)
```

という感じです.

## Routing

まずこの場合(僕のブログ), 動的なスクリプトを効かせたいのは**https://~~~/index.html**だけです. このように, このメソッドだったらこういうハンドラで, このpathだったらこのハンドラでというのも勿論あるでしょう.
そのためにRoutingは不可欠ですね.  

といってもcloudflare workerの場合Routingはかなり原始的にする必要があり,

```javascript
const url = new URL(event.request.url);
```
でurlを取れるので, **url.method**でメソッドを取って, **url.pathname**でpathを取って, switch文で頑張りましょう.

e.g.

```javascript

const handleRequest = (event) => {
  const url = new URL(event.request.url)
  
  switch(url.method) {
    case "GET": {
      // handleGETMethod
      break;
    }
    case "POST": {
      // handlePOSTMethod
      break
    }
    default: {
      // asdf
      break
    }
  }
}

```

## Cache API

**Cache API** を用いてキャッシュを制御します. 仰々しく聞こえますが, そんなややこしいことをする感じでもありません. そもそも利用可能なCacheに生えているメソッドはput, match, deleteだけです.
その内容も直感的に分かる通り

* putでキャッシュする
* deleteで消す
* matchでキャッシュを探す

という感じです.
引数も単純で例えばputは**put(Request, Response)**です. 因みにworker文脈でのRequestはstring値も受け取れます. 察しのいい人は気付いちゃうと思いますがなんか**Request**をkeyと見なせば**Map**っぽさが出てきますね.
matchについては**match(Request, options)**で該当Requestに対してキャッシュがあればそのキャッシュの**Response**を, なければ**undefined**を返します. optionについては割愛.
deleteについては**delete(Request, options)**で該当Requestに対してキャッシュがあればそのキャッシュを削除するという感じです.

また**put**や**delete**を利用する時は, **event.waitUntil**で, putやdeleteが完了する前にサーバーが落ちないように制御しましょう. サーバーレス感があります
.
因みにCache APIのdocsはここにあります[https://developers.cloudflare.com/workers/reference/apis/cache/](https://developers.cloudflare.com/workers/reference/apis/cache/).

またPreview modeについてはCacheAPIは未実装でまだ使えないっぽいので, 何度cache.putしてもキャッシュされていないという事態が起こります.注意してください(僕はここがわからず3０分くらい溶かしました)

因みに以下のtemplateではCache APIが実際にどう使われてるかのexampleがみれます. [https://developers.cloudflare.com/workers/templates/pages/cache_api/](https://developers.cloudflare.com/workers/templates/pages/cache_api/)

## やっていき

さあ材料はだいたい揃ったのでやっていきましょう.
といってもやることは本当に単純です.

まず僕の場合, HeadlessCMSのcontentfulを使ってブログ記事を管理しています.
contentfulだと以下のAPIが生えているので, [https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/authentication](https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/authentication), あとはtokenを取って**fetch**でブログコンテンツを参照する準備をします.

以下はかなり事例レベルでfittingされてる話なのであまり参考にならないと思いますが, 実装としては

```javascript

const handleRequest = (event) => {
  
  const cache = caches.default;

  switch(url.pathname){
    case "/": {
      // 基本/index.htmlのみ動的にキャッシュを制御する, それ以外は適当に普通にキャッシュしとけばOK
    
      // CMS上にある最新のコンテンツのための一覧を得る
      const res = await fetch("https://~~~~~~~contentfulのAPI~~~~~/");
    
      const cachedRes = await cache.match("jsonのkey", options);
      
      const curJson = await res.json();
      if(cachedRes){
        const cachedJson = cachedRes.json();
        
        // 手元にあるjsonによる, 過去取得してキャッシュしたコンテンツにまつわる一覧のデータを, CMS上にある最新のそれとが一致する時
        if(JSON.stringify(cachedJson) === JSON.stringify(curJson)) {
          return await cache.match("htmlのkey");
      }else{
        // この時はキャッシュされているものが古い
        
        e// 最新のコンテンツにまつわるjsonをキャッシュする
        vent.waitUntil(cache.put("jsonのkey", cachedRes.clone()));
        
      }  // 最新のコンテンツにまつわるjsonをサーバーに投げてhtmlを生成してもらう
        const curHTMLRes = await fetch("~~~serverのurl, この場合cloud run~~~", {
          method: "PUT",
          body: JSON.stringify({
            item: curJson
          })
        })
        
        event.waitUntil(cache.put("htmlのkey", curHTMLRes.clone()));
        return curHTMLRes;
      
    
    }
    default: {
      break
    }
  }
}
```


みたいな感じです.  

正直上のコードを見たところで得られるものは少なく, 参考にもならないと思いますがcloudflare workerを用いてCacheを動的に最適化するということがそこまで難解なことでもなく, それ自体は単純で見慣れたものであるというのは伝わったかと思います.

完全に余談ですが, 僕的にはserverにhtmlを生成してもらうためだけにRequest投げるのは勿体無いんじゃないかなって思っていて, それをなんとかedge-sideでできないかなと考えています.  
wrangler自体はwebpackでbundleさせることができるので, 理論上react-dom/serverくらいなら動くんじゃないかなとは思っています.
今は忙しいのでやらないですが, 気が向いたら実験しては見ます... 

因みにですが僕はこの最適化でSpeedIndexが**15%**削減されました.みんなもやってみてね



