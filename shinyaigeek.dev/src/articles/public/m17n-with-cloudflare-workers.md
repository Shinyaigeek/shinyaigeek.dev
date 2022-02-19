---
title: cloudflare workers で多言語対応を行う
tags: [Programming,CDN,CloudFlare]
description: |
  弊ブログで多言語対応を行なった。その際 cloudflare workers を利用したが体験が良かったのでメモとして残しておく。
publishedAt: 2022/02/19
updatedAt: 2022/02/19
---

こんにちは、しにゃいです。卒業論文を無事倒し入社まで暇になり、暇つぶしに気になってる OSS にPRを投げていたところ、そのメンテナやPRで会話した人から Twitter でDMが飛んでくる機会が増え、また cloudflare のアナリティクスを見ても最近如実に国外からのアクセスが増えていました。クローラーbotの存在を考えても明らかに数が増加していたためこれなら弊ブログ(shinyaigeek.dev)も多言語対応を進めた方がいいんだろうな、という気持ちになり多言語対応を進めました。要件の中にあった, HTTP Request Header の "accept-language" を見てよしなにコンテンツを振り分ける, という処理に cloudflare workers を利用したのですが、30分程度いじいじしたらいい感じにできて体験が良かったので備忘録程度に書いておこうと思い本記事の執筆を始めました。

## ブログの構成

まず弊ブログの構成から述べていきます。弊ブログはコンポーネントを JSX で記述し、記事自体は markdown で書いています。それをオレオレ静的サイトビルダーでHTMLとしてVPSに立てたh2oサーバーから配信しています。ブログにそこまでの機能は求めておらず、ブログの場合はページ遷移も少ないだろうという想定から hydration は行わず、React 抜きのWebページになっています。一部動的に JavaScript を使っている部分がありますが、そこは customElements でカプセル化しています。

ひとまず対応する言語はデフォルトの日本語と、英語として、ビルドするときに英語用のHTML、日本語用のHTMLの二種類を吐き出すようにしました。JSも使っていないため完全にURLベースで英語用のページ、日本語用のページを振り分けるようにしています。サブドメインとして "en.shinyaigeek.dev" と "ja.shinyaigeek.dev" を用意し、前者からは英語用のページ、後者からは日本語用のページを配信するようにしています。また "shinyaigeek.dev"、"www.shinyaigeek.dev" からは日本語用のページを配信するようにしています。

## 技術選定

まずHTTP Request を見て "accept-language" によってよしなにHTMLを振り分けるかよしなにリダイレクトさせるか、という選択肢がありました。よしなにHTMLを振り分ける方式だとshared cache周りが面倒になる、また、振り分けも cloudflare worker でURL Rewritesを行えばその心配は無くなりますが、静的なWebページとして運用している以上あるURLを叩くと同じResponseが返される、というようにしたかったのでこの方針は取らずによしなにリダイレクトさせるようにしました。HTTP Requestを送信してきたクライアントにリダイレクトしてもらうためにはもちろん301 HTTP Responseを返却する必要があります。それをOrigin Serverから返却する、といったことももちろん可能なのですが現状Origin Serverは日本にしかなく、"accept-language" で英語になるようなユーザー、すなわちこの対応で掬い上げたいクライアントは多くが日本国外からHTTP Requestを飛ばしてくると想定すると、地理的な要因で生じ得る遅延をなくしたく、cloudflare workers を用いてネットワークエッジで捌いてしまおう、となりました。

## やり方

至極単純です。 "accept-language" をパースしてよしなにより好まれる言語を決定する君はnpmにいくつか出ていますので、最も適格なものをインストールして、振り分けるだけです。

- [accept-language](https://www.npmjs.com/package/accept-language)
- [accept-language-parser](https://www.npmjs.com/package/accept-language-parser)
- [resolve-accept-language](https://www.npmjs.com/package/resolve-accept-language)


注意点としては、
- HTML 以外への HTTP Request については特に何もしない
 - 今回はRequestのURLが `.html` で終わるか, `/` で終わる時をターゲットとしました
- 無限ループに注意する
 - en 向けのページにリダイレクトしてそれに応じてそのクライアントからHTTP Requestが飛んできてそれによってまた以下のような cloudflare workers が発火してまた en 向けのページにリダイレクトして...という無限ループは生じ得ます
 - 本ブログでは en 向けのページ、ja向けのページはそれぞれ別ドメインにしてあり、そのドメインへの HTTP Request にはそもそも cloudflare workers が発火しないようになっています。これは上記の無限ループ対策でもありますが、こうしたURLにアクセスしてくる人は accept-language 関係なくその言語で読みたいであろう、という意図もあります。
 - 例えばサブドメインではなく pathname に `/en/` といったprefixをつけて対応している人は注意が必要になるでしょう。

以下に簡単なコードを載せておきます。

### コード

```typescript
import resolveAcceptLanguage from 'resolve-accept-language'

const handler = function (event: FetchEvent) {
  // HTTP Request からURLを取得
  const { url } = event.request
  // URLから pathname とクエリを取得
  const { pathname, search } = new URL(url)

  // HTMLに対してのHTTP Requestではない時は特に何もしない
  if (!pathname.endsWith('.html') && !pathname.endsWith('/')) {
    return fetch(event.request)
  }

  //  HTTP Request Headerからaccept-languageを取得
  const acceptLanguage = event.request.headers.get('accept-language')
  if (!acceptLanguage) {
    return fetch(event.request)
  }
  // 言語を決定する
  const preferredLanguage = resolveAcceptLanguage(
    acceptLanguage,
    ['en-US', 'ja-JP'],
    'ja-JP',
  )

  // 英語が好ましいとなったときは "en.shinyaigeek.dev" にリダイレクトする
  if (preferedLanguage === 'en-US') {
    return Response.redirect(
      `https://en.shinyaigeek.dev${pathname}${search}`,
      301,
    )
  }

  return fetch(event.request)
}

addEventListener('fetch', (event) => {
  event.respondWith(handler(event))
})
```

## まとめ

一才のフレームワークを使わずにブログを作っているので、こうした多言語対応も自分で考えてあれこれしなければいけないですが、修行になって楽しいですね。また最近は cloudflare workers や Compute@Edge など、フロントエンドエンジニアがサクッと reverse proxy 的なことをしかも馴染みあるJSで制御できるようになっていていい時代です。また一切フレームワークを使わずに力技で対応しているので、実はこういうこともした方がいいよ、これはこうした方がいい、などあれば教えていただけると幸いです。
