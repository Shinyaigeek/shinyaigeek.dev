---
title: "Open Knowledge Format (OKF) をざっくり"
description: "Google Cloud が公開した, 人にもエージェントにも読める「知識」のフォーマット OKF を, 仕様 v0.2 に沿って数枚でまとめたもの."
publishedAt: "2026-11-18"
tags: ["AI", "Agent", "OKF", "Markdown"]
---

# Open Knowledge Format (OKF) をざっくり

人にもエージェントにも読める「知識」のフォーマット

---

## OKF とは

- 2026 年 6 月に Google Cloud が公開した, 知識を表現するためのオープンな仕様
- 中身は **YAML frontmatter 付き Markdown のディレクトリ**, それだけ
- SDK も runtime もデータベースも要らない. `cat` できれば読めて, `git clone` できれば配れる
- 今は v0.2. [GoogleCloudPlatform/open-knowledge-format](https://github.com/GoogleCloudPlatform/open-knowledge-format) で Apache-2.0

---

## なぜ要るのか

エージェントに足りないのは, モデルの賢さより組織のコンテキストです. スキーマ, メトリクスの定義, runbook. それがカタログや wiki, 人の頭の中に散らばっていて, みんな同じ「文脈集め」をゼロからやっています.

`AGENTS.md` や LLM Wiki のような「Markdown で知識を持つ」やり方を, 互いに読める形に揃えたのが OKF です.

> The answer to this problem isn't another knowledge service. You need a format.

---

## Bundle と Concept

```text
bundle/
  index.md        # 目次. 1 階層ずつ辿るための入口
  log.md          # 更新履歴. 新しい順
  tables/
    index.md
    orders.md     # 1 ファイル = 1 Concept
```

- 配布の単位が **Bundle**, 知識 1 つ分が **Concept**
- Concept ID はパスから `.md` を外したもの. パスがそのまま ID になる
- `index.md` と `log.md` は予約名で, Concept には使えない

---

## 1 Concept = 1 Markdown

```markdown
---
type: BigQuery Table
title: Orders
description: One row per completed customer order.
tags: [sales, revenue]
---
Joined with [customers](/tables/customers.md) on `customer_id`.
```

必須なのは `type` だけで, 値も中央で登録されたりしません. 知らない `type` や知らないキーが来ても, 読む側は弾いてはいけない決まりです.

---

## リンクで graph になる

- Concept 同士は普通の Markdown リンクで繋ぐ. ディレクトリの親子より豊かな関係が書ける
- 推奨は `/tables/customers.md` のような bundle 起点の絶対パス. ファイルを動かしても壊れにくい
- 関係の種類 (join する, 依存する, ...) はリンクではなく周りの文章で書く
- リンク切れは不正ではない. まだ書かれていない知識, という扱い

---

## v0.2: 信じていいのかを frontmatter に

エージェントが書き続ける知識を, 読む側が信じていいのか判断できるように, 3 つの問いへの答えを frontmatter に持たせます.

- **どこから来たのか**: `sources`. 信頼度のスコアは持たず, `author` や `usage_count` のような客観的なシグナルだけを記録する
- **誰が確かめたのか**: `verified`. ここから unverified / machine-confirmed / human-reviewed の 3 段階が導ける
- **まだ正しいのか**: `status` (draft / stable / deprecated) と `stale_after`

---

## v0.2 の frontmatter

```yaml
sources:
  - id: ga4-schema
    resource: https://developers.google.com/analytics/bigquery/export-schema
    author: team:ga4-docs
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-20T22:53:05Z }
verified: { by: human:ahormati, at: 2026-06-25T09:00:00Z }
status: stable
stale_after: 2026-09-23T00:00:00Z
```

`human:` で始まる actor が `verified` にいれば human-reviewed です.

---

## Attested Computation

「この数字は決められたやり方で計算されたのか」を確かめるための Concept です.

- SQL などの計算を Concept に固定し, エージェントはパラメータの値しか埋められない
- 実行すると receipt (job id や実際に流れた SQL) が返る
- LLM を使わない attester が receipt を検査して判定する

`verified` は定義の確認, attestation は 1 回の実行の確認で, 両方要ります.

---

## 触ってみた感想

- このブログも `llms.txt` を置き, 全ページを `index.md` として配っているので, 「パスが ID, Markdown と frontmatter, `index.md` で少しずつ辿る」という形はかなり馴染みがある
- 仕様が小さく, 必須が `type` だけなのは採用しやすい. 一方で `type` を誰も揃えないので, Bundle ごとに語彙がばらけそう
- 「format であって platform ではない」と言い切っているのが良い. Bundle が git に乗るので, 知識のレビューがそのまま PR のレビューになる

---

## 参考

- [OKF v0.2 の仕様 (SPEC.md)](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md)
- [Introducing the Open Knowledge Format (Google Cloud Blog)](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
- [Karpathy の LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
