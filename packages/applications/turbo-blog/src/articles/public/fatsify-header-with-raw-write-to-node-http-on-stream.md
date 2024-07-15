---
title: fastifyでstreamを配信する時生のnode/httpに書き込むとResponse Headerが書き込まれなくなる問題
tags: [JavaScript,Nodejs, HTTP]
description: |
  fastifyの `reply.header(key, value)` は header に書き込まれるべき key-value を呼び出されたタイミングで HTTP Response に書き込むのではなく, `res.send` のタイミングで書き込んでいます.
  Stream を配信する際, `reply.raw.write` を呼び出してしまっていると Header は暗黙的に flush されてしまっており書き込めなくなってしまいます.

  workaroundとしては, `reply.raw.write` の前に `reply.raw.setHeader` を呼び出し header の書き込みを fastify に任せるのではなく自分で担ってしまいこれを回避するのが良さそう.
publishedAt: 2021/03/21
updatedAt: 2021/03/21
---

## TL:DR;

fastifyの `reply.header(key, value)` は header に書き込まれるべき key-value を呼び出されたタイミングで HTTP Response に書き込むのではなく, `res.send` のタイミングで書き込んでいます.
Stream を配信する際, `reply.raw.write` を呼び出してしまっていると Header は暗黙的に flush されてしまっており書き込めなくなってしまいます.

workaroundとしては, `reply.raw.write` の前に `reply.raw.setHeader` を呼び出し header の書き込みを fastify に任せるのではなく自分で担ってしまいこれを回避するのが良さそう.

## どんな問題?

小ネタです.

[fastify](https://www.fastify.io/) を利用して stream を配信し, `reply.raw/write` で body の書き込みをしてしまうと, `reply.header()` で set した Header が反映されていないというエッジケースを踏んでいました.

具体的な事例を挙げる(ここは飛ばしてもいいです)と, ReactDOM/server の renderToNodeStream を利用して stream を配信することで読み込み速度の向上を図っていました.
しかしその場合生成されるマークアップには `<!DOCTYPE html>` が含まれていません.
`DOCTYPE` を指定することで, ブラウザがクオークモードで動作することを防ぐことができます. [[1]](#refer-1)
できることならばこの `DOCTYPE` も含めて配信したいですが, renderToNodeStream から返ってくる Readable Stream にこの String 値を書き込むのは当然厳しいため, workaraund的に node/http の response.write で DOCTYPE を書き込んでいました.
fastify だと `Reply.raw` で node の `http.ServerResponse` にアクセスし直接 header や body を書き込むことができます. [[2]](#refer-2)
一方 ETag や Cache-Control を書き込むために `Reply.headers()` を利用しますが, これで書き込んだはずの header field が反映されていないということが起きました.

エッジケース of エッジケースという感じがしますね.

再現レポは https://github.com/Shinyaigeek/test-fasity-header/blob/master/main.js ここで可能です, `/stream_prefix` にアクセスすると `res.header()` で set したはずの `Content-Type: text/html` が set されておらず text/plain として表示されることがわかります. これは直感に反しますね.
`/stream_prefix_raw` にアクセスすると, しっかり　text/html として表示されることがわかります.
これと `/stream_prefix` との違いは Header の set を fastify に任せているか `node/http` にアクセスして自分でやってるかだけです.

## なぜこんなことが生じているのか

fastify が Response Header を書き込むタイミングが `reply.header()` が呼ばれたタイミングではなく, `reply.send(body)` が呼ばれ body が配信される直前であることに起因しています.

https://github.com/fastify/fastify/blob/master/lib/reply.js#L222 (2021/3/21時点)

```javascript
Reply.prototype.header = function (key, value) {
  const _key = key.toLowerCase()

  // default the value to ''
  value = value === undefined ? '' : value

  if (this[kReplyHeaders][_key] && _key === 'set-cookie') {
    // https://tools.ietf.org/html/rfc7230#section-3.2.2
    if (typeof this[kReplyHeaders][_key] === 'string') {
      this[kReplyHeaders][_key] = [this[kReplyHeaders][_key]]
    }
    if (Array.isArray(value)) {
      Array.prototype.push.apply(this[kReplyHeaders][_key], value)
    } else {
      this[kReplyHeaders][_key].push(value)
    }
  } else {
    this[kReplyHeaders][_key] = value
  }
  return this
}
```

fastify の `reply.header` の処理を見ると, これが呼ばれたタイミングで `http/ServerResponse` に書き込んでいるのではなく, `this[kReplyHeaders]` に格納しているということがわかります.

ではどのタイミングで `http/ServerResponse` に書き込んでいるかというと, `reply.send` が呼ばれると `onSendHook` という関数が呼ばれます. その中でユーザー定義の hook 関数があればそれを呼び出した後, なければ直ちに `onSendEnd` という関数を呼びます.
その中で header や body の書き込みが行われます.

https://github.com/fastify/fastify/blob/master/lib/reply.js#L391
(見やすいように一部割愛しています)

```javascript
function onSendEnd (reply, payload) {
  const res = reply.raw
  const req = reply.request
  const statusCode = res.statusCode

  if (typeof payload.pipe === 'function') {
    sendStream(payload, res, reply)
    return
  }

  reply[kReplySent] = true

  res.writeHead(statusCode, reply[kReplyHeaders])

  res.end(payload, null, null)
}
```

payload が stream であるときはそれを `sendStream` に引き渡し, そうでないときは　`reply.header()` で書き込んだ `kreplyHeaders` を元に Header を書き込んでから payload を配信していることがわかります.
stream でないときは Header が書き込まれるのは `reply.header()` が呼ばれたタイミングではなく payload が配信される直前であることがわかりました.

では `sendStream` の処理ものぞいてみましょう.

https://github.com/fastify/fastify/blob/master/lib/reply.js#L444
(見やすいように一部割愛しています)

```javascript
function sendStream (payload, res, reply) {

  if (!res.headersSent) {
    for (const key in reply[kReplyHeaders]) {
      res.setHeader(key, reply[kReplyHeaders][key])
    }
  }
  payload.pipe(res)
}
```

`res.headersSent` が false であれば Headerを書き込んでから, そうでなければ直ちに stream である payload に `http/ServerResponse` を pipe することで stream を配信しています.

ここまで書けば大体の人がお気づきかと思いますが, 冒頭の

> [fastify](https://www.fastify.io/) を利用して stream を配信し, `reply.raw/write` で body の書き込みをしてしまうと, `reply.header()` で set した Header が反映されていないというエッジケースを踏んでいました.

の問題は `res.headersSent` が true なため生じていました.

なぜそうなるかというと, `reply.raw` から　`http/ServerResponse` にアクセスし, `reply.raw.write` を呼び出して body を書き込んでしまうと Header は暗黙的に flush されてしまい書き込めなくなってしまいます, Header -> Body であることを考えるとある種当たり前のことですね. [[3]](#refer-3)

## 解決策

fastify にPRを出すという形での根本的な解決を図るアプローチは思いつかず, workaround 的に `reply.send`, `reply.raw.write` を呼び出す前に `reply.raw.setHeader` から Header を書き込んでしまうというので解決できました.
ただこの方法だとheaderをfastifyが内部的にキャッシュしてくれなくなるのがちょっと辛い...
(ちょっと辛いからなんとかしたい...)

```javascript

app.get("/", (req, res) => {
  const stream = getMarkupStream();

  // res.header("hoge", "asdf") 
  res.raw.setHeader("hoge", "asdf");

  res.raw.write("<!DOCTYPE html>");

  res.send(stream);
})

```

## 終わりに

マサカリ待ってます :pray:

## 参考

* <p id="refer-1">\[1] Page lacks the HTML doctype, thus triggering quirks mode (https://web.dev/doctype/) 閲覧日: 2020/3/21</p>
* <p id="refer-2">\[2] Fastify Docs Reply .raw (https://www.fastify.io/docs/latest/Reply/#raw) 閲覧日: 2020/3/21</p>
* <p id="refer-3">\[3] node http ServerResponse write (https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback) 閲覧日: 2020/3/21</p>