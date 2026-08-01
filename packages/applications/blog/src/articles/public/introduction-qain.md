---
title: qain, スタイルの回帰を「何がどう変わったか」で報告するテストツールを作った
tags: [Programming, TypeScript, Frontend, DX, CSS, OSS]
description: ピクセル VRT は2枚の画像が違うことしか教えてくれない. Chromium が描画のときに参照している構造体を CDP で吸い出し, 意味の単位で差分を取るスタイル回帰テストツール qain を作ったのでその紹介.
publishedAt: 2026/08/01
updatedAt: 2026/08/01
---

## これは何

こんにちは, [しにゃい/Shinyaigeek](https://twitter.com/Shinyaigeek) です.

ブラウザ向けのセマンティックなスタイル回帰テストツール, qain を作りました. ページのスクリーンショットではなく, Chromium がコンテンツを描画するときに参照している構造体を JSON のスナップショットとして取り, 2つのスナップショットをプロパティ単位で差分するツールです. スナップショットに入るのは, HTML と CSS から解決された computed style, レイアウトボックス, ペイント順, 合成後の背景色といったもので, ブラウザが「これをここにこう描く」と決めた後の値になります.

[https://github.com/Shinyaigeek/qain](https://github.com/Shinyaigeek/qain)

ドキュメントと, 実際に触れるデモ, ブラウザ内 playground はこちらにあります.

- [shinyaigeek.github.io/qain](https://shinyaigeek.github.io/qain/)
- [shinyaigeek.github.io/qain/docs](https://shinyaigeek.github.io/qain/docs/)

## モチベーション

VRT の主流はスクリーンショット差分です. Percy や Chromatic はそれをクラウドでやってレビューキューを前に置き, Playwright の `toHaveScreenshot` や BackstopJS はゴールデンイメージ相手にローカルでやる, という違いはあれど, どちらにせよ返ってくる答えは赤いピクセルの乗った画像です. ここに課題感を持っていました.

課題は2つあります.

1つは, 答えが画像であること自体から来るものです. 変わった場所は分かっても, 何がどう変わったのか, なぜ変わったのかまでは分からないので, 結局2枚のスクリーンショットを並べて目を細める作業になります. しかもピクセルを見ている以上どうしても flaky で, OS やマシンが違えばフォントのレンダリングは変わりますし, アンチエイリアスや 1px のカーニング差でも平気で赤くなります. 誰も直すつもりのない差分でテストが落ち続けると, threshold を緩めるか, 落ちたのを見なかったことにするかのどちらかに倒れがちです.

そして昨今, 全く新しい課題感が出てきました. その「目を細める」作業はコーディングエージェントに投げられません. `diff.png` を LLM に渡して「この回帰の原因はどの CSS 宣言ですか」と聞くのは, かなり無理のある問い方です. 人間にとっては不便なだけで済んでいたものが, エージェント相手だとそのまま壁になります.

なので qain は別の単位で答えることにしました. プロパティです.

## Example

`examples/` に請求ページと, それを4通りに壊すコミットを置いてあります. 下に貼ってあるのは, その2つを `qain diff --replay` に食わせて出てきた HTML をそのまま埋め込んだものです. スライダーを動かすと before と after が入れ替わりますし, 原因になったノードは赤, 巻き込まれただけのノードは灰色で囲ってあります.

<iframe src="/assets/introduction-qain/replay.html" title="qain のリプレイ (before / after をフェードで比較する)" loading="lazy" sandbox="allow-scripts" style="width:100%;height:min(720px, 80vh);border:0;border-radius:8px"></iframe>

同じものが [shinyaigeek.github.io/qain](https://shinyaigeek.github.io/qain/) にもあって, あちらは CI が `examples/` から毎回生成し直しています. ブラウザ内 playground もそちらです.

で, ピクセル差分が「どこかが赤い」で止まるところ, qain の出力はこうなります.

```
default state
  html > body > header > span[data-testid=plan-badge]
    z-index: 2 → 0
    paint order: 4 → 3 (stacking changed)
    ← .badge { z-index: 2 → 0 }  theme.regressed.css:21:3
  html > body > main > section[data-testid=usage-card] > p[data-testid=usage-note]
    color: rgb(107, 114, 128) → rgb(199, 203, 212)
    contrast 4.83 → 1.63  ✗ falls below WCAG AA-normal
    ← .muted { color: rgb(107, 114, 128) → rgb(199, 203, 212) }  theme.regressed.css:30:3
  html > body > main > div > button[data-testid=pay]
    resized 0px × +12px
    ← .btn { padding: 8px 16px → 14px 16px }  theme.regressed.css:4:3
  ...

:hover
  html > body > main > div > button[data-testid=pay]
    background-color: rgb(29, 78, 216) → rgb(37, 99, 235)
    contrast 6.7 → 5.17
    ← .btn-primary:hover { background: rgb(29, 78, 216) → rgb(37, 99, 235) }  theme.regressed.css:15:3
  ...

39 changes: 14 primary, 25 derived
```

回帰が4つ, それぞれにセレクタ・値・`file:line` の原因が付いていて, 「上のボタンが大きくなったからずれただけ」の 25 要素は結果 (derived) として畳まれています. 同じコミットはユーティリティクラス名も全部リハッシュしているのですが, そちらについて qain は何も報告しません. レンダリング結果が 1px も変わっていないからです.

## How to use?

```sh
npx playwright install chromium    # qain は実 Chromium を CDP で駆動する
npx @qain/cli snap https://example.com --rules -o page.json
```

これだけで, ブラウザが開ける URL であればスタイルスナップショットが取れます. あとは変更前後で2回撮って diff するだけです.

```sh
qain snap http://localhost:3000 --rules --replay -o before.json
# ... コードを変更 ...
qain snap http://localhost:3000 --rules --replay -o after.json
qain diff before.json after.json --omit-derived
```

diff が空でないとき exit code は 1 になるので, CI やエージェントがそのままゲートに使えます. `--json` で構造化データ, `--html report.html` で単体で開ける HTML レポートも出せます.

アサーションとして書きたい場合は, 各テストランナー向けの matcher を用意してあります. ベースラインの置き場所と更新の作法は, それぞれのランナーの流儀に合わせました.

**Playwright**

```ts
import { expect, test } from "@qain/playwright";

test("home page styles", async ({ page }) => {
    await page.goto("/");
    await expect(page).toMatchStyleSnapshot({ states: ["hover", "focus-visible"] });
});
```

**Vitest browser mode**

```ts
import { render } from "vitest-browser-react";
import { test } from "vitest";
import { expect } from "@qain/vitest";

test("primary button", async () => {
    render(<Button variant="primary">Pay</Button>);
    await expect(document.body).toMatchStyleSnapshot({ states: ["hover", "focus-visible"] });
});
```

**Storybook test runner**

```ts
// .storybook/test-runner.ts
import { matchStyleSnapshot } from "@qain/storybook";

export default {
    async postVisit(page, context) {
        await matchStyleSnapshot(page, context);
    },
};
```

Storybook を使っているなら, test-runner の `postVisit` に一行足すだけで全ての story がスタイルテストになります. 一方でコンポーネント単位の VRT の自然な置き場所は, すでに実 Chromium で1コンポーネントをマウントしている `@vitest/browser` だと思っていて, `@qain/vitest` はそこを狙ったものです. Storybook を起動しなくていいですし, テストごとに並列に走ります.

## 思想

DOM と CSS をそのまま記録して突き合わせる, というのを素朴にやると使い物になりません. といっても, 網羅的に見ること自体が悪いわけではないです. `getComputedStyle` が返す 420 個を全部比較するのは, 見落としがないという意味ではむしろ正しい. 困るのは返り方の方でした.

例えば `--brand` のような CSS 変数を1つ書き換えると, それを参照している要素の `color` も `border-color` も `fill` も一斉に別の値になります. ここで数百件の差分が出ること自体は正しくて, 実際に数百箇所の描画が変わっています. ただ, その数百件が同じ重みでフラットに並ぶと, 「1行の編集と, その結果」という構造だけが落ちます. 知りたいのはたいていそっちです. そこで qain は, 出てきた差分を隠して件数を減らすことはしません. 代わりに, その数百件に原因と結果の関係を付けます.

ここで qain が置いている前提は, DOM 要素それ自体は変わりうる, というものです. ライブラリによってはクラス名がビルドのたびに書き換わりますし, リストの先頭に `<div>` が挿さることもありますし, マークアップの都合でタグが差し替わることもあります. 一方で「何をどう描画しようとしているか」は, そういう変更では変わりません. 見たいのは後者だけなので, 比較の単位も後者に寄せています.

だから `class` は記録だけして比較していません. Tailwind の JIT や CSS Modules のように, ライブラリによってはビルドのたびにクラス文字列が書き換わりますが, 描画されるものは同一なので.

要素の対応付けも, DOM 上の位置を捨てて key で行っています. `data-testid` → `id` → アクセシブルな role + name → 兄弟内の序数, の順です. これによってリストの先頭に `<div>` を1つ挿しても, 報告は1要素の追加で済みます.

記録するプロパティ自体は, 420 個から 60 個ほどに絞っています. この集合を projection と呼んでいて, 落としているのは2種類だけです.

1つは, レイアウトボックスが既に語っているものです. `padding` や `margin`, `width`, `height`, `inset`, `flex-basis` あたりは全部, 最終的に要素の矩形 (bounds) に解決されます. bounds はどのみち記録しているので, 両方を持つと, ボタンの `padding` を 8px から 14px に変えたときに「`padding` が変わった」と「高さが 12px 増えた」の2件が出てきます. 起きたことは1つなので, 結果である bounds の側だけを見て, 落とした原因の側は次の節の `--rules` で取り直します. もう1つは, 変わっても人間が気づかないものです. `math-depth` や `-webkit-locale`, `text-rendering`, font-synthesis 系は, 実際のところピクセルまで届きません.

冒頭に書いた原因と結果のラベルが, primary と derived です. さっきのボタンが 12px 高くなると, その下にあるものは全部 12px 下にずれます. ずれた要素がそれぞれ「位置が変わった」と報告してくると, 1つの回帰が数十件に膨らみます. そこで qain は, 自分の理由で変わった要素 (primary) と, 他の要素に押された結果そうなった要素 (derived) を分けています. 子に合わせて大きくなっただけの親も derived ですし, `color` を1つ変えたときに追随する `border-color` や `caret-color` のような `currentColor` 由来のプロパティも, 原因である `color` の1件にまとめます. `--omit-derived` を付けると原因だけが残るので, 普段はこれで見ています. 表示を畳んでいるだけなので, 外せば derived も全部出てきます.

もう一つ, ピクセルを捨てても消えない flaky さがあります. OS やマシンが違えばフォントのレンダリングは変わりますし, webfont は遅れて差し替わるので, 撮るタイミングによっては全要素の `font-family` が変わったように見えます. こういうものは構造の側で吸収する方針にしました. スナップショットは `document.fonts.ready` を待ってから撮りますし, サブピクセルのボックス移動は `--tolerance` (デフォルトは 0.5px) 未満なら変更として扱いません. 吸収する場所をツール側に決めておかないと, 結局は個々のテストに ignore が生えていくことになります.

## 原因の CSS ルールを名指しする

`--rules` を付けると, マッチした CSS 宣言をスナップショットと一緒に記録します. diff はそれを使って, 変更の原因になった行を指せるようになります.

```
button[data-testid=submit]
  resized 0px × +24px
  ← .btn { padding: 8px 16px → 20px 16px }  buttons.css:3:3
```

前の節で, `padding` は projection に入れていないと書きました. ボックスが結果を報告してくれるので意図的に外しているのですが, その落とした原因の側を, ここで著者が書いた宣言から買い戻している格好です. しかも変更があったノードについてだけ.

名指しするときは, `!important` やインラインスタイルまで含めてカスケードを解決した上で, 実際に効いている宣言を選びます. 報告も著者が書いた粒度に戻していて, `padding-top` が変わった場合でも `padding: 8px 16px → 14px 16px` と, 元の宣言の形で出ます. 擬似状態は状態ごとに帰属するので, hover の回帰なら `.btn-primary:hover` の方が名指しされます. 平常時の `.btn` は指しません.

原因の宣言が本当に存在しないこともあります. ラベルが長くなってボタンが広がった, といったときです. そういうときは `width` にたまたま言及しているルールを冤罪で指さず, `no CSS declaration on this node changed` と言うようにしました. derived な変更は原因が別ノードにあるので, そもそも帰属しません.

コストは1ノードあたり CDP 1往復と, スナップショットサイズ3倍程度. なので opt-in にしてあります.

## 擬似状態

`:hover` や `:focus-visible` を CDP で強制した状態のスナップショットが撮れます. 実ポインタ入力を合成しないとこれができないピクセル VRT に対して, 地味に効く差だと思っています.

ただしページ上の全ボタンが一斉に `:hover` になっている状態は, ブラウザでは決して起こりません. それが安全なのは hover が hover 対象の外に影響しない場合だけなので, `strategy: 'auto'` (デフォルト) はまず bulk で1枚撮り, 強制したサブツリーの外が動いたり restyle されていないかを検証した上で, していたら黙って要素ごとの撮影にフォールバックします. `padding` を変える `:hover` は兄弟を押しのけますし, `.btn:hover ~ .panel` は hover されていないノードを restyle します. どちらも検出されます. 当て推量はしません.

## リプレイ

`qain view` は, スナップショットからページそのものを組み立て直します. 画像は1枚も使いません. しかもこの再構築は厳密です.

```sh
qain snap http://localhost:3000 --replay -o page.json
qain view page.json -o page.html
```

下は `examples/baselines/home.qain.json` を `qain view` に通した出力をそのまま貼ったものです. 画像ではないので, テキストは選択できますし, ⌘/Ctrl + スクロールで拡大しても字は潰れません.

<iframe src="/assets/introduction-qain/view.html" title="qain view でスナップショットから組み立て直したページ" loading="lazy" sandbox="allow-scripts" style="width:100%;height:min(560px, 70vh);border:0;border-radius:8px"></iframe>

肝はリプレイが二度とレイアウトを走らせないことで, 各要素は Chromium がくれた矩形に, テキストは行ごとに Chromium がくれた矩形に置かれます (`--replay` がそれを記録します. `DOMSnapshot` がボックスと一緒に返してくれます). カスケードもリフローもビューポート依存もないので, 記録した内容と微妙に違うものが出てくる余地がありません. 再構築したページが元のページとピクセル一致することは, e2e テストでアサートしています.

projection が `padding` を省略できるのも同じ理屈です. ボタンのテキスト行はボーダーボックスの 18px 内側に座っていて, そのオフセットが padding そのもの, つまり既に解決済みなわけです. margin も flex の分配もテキスト配置も, 折り返された段落の改行位置も, 全部同じ経路で戻ってきます.

`qain diff a.json b.json --replay out.html` は, before / after 両方の再構築を1ページに書き出します. 並べて見るか, 不透明度スライダーで重ねるか. 4px のズレは2枚を並べても見えませんが, フェードで重ねると一発で分かります.

## コントラスト

Chromium は合成後の背景色 (`blendedBackgroundColors`) を報告してくれるので, qain は目に実際に届く色に対して WCAG コントラストを計算できます. 青の上に半透明の白いパネルを重ねたとき, 計算に入るのは `rgb(128, 128, 255)` で, 宣言に書いた `rgba(255, 255, 255, 0.5)` の方は使いません. 閾値をまたいだ比率は名前付きで報告されます.

## GitHub Action

`qain-diff` action は, リポジトリにコミットされたベースラインを見張ります. PR がベースラインを変更したら merge-base 版と差分を取り, 1つの sticky comment に before / after / diff のスクショ付きでセマンティック diff を貼ります. push のたびにその場で更新され, 差分が消えたら (変更が revert されたら) コメント自体を消します.

見張るファイルを教える必要はなく, PR が実際に変更したファイルを glob と突き合わせます.

```yaml
- uses: Shinyaigeek/qain/.github/actions/qain-diff@v0.0.3
  with:
      pattern: |
          **/__qain__/*.qain.json
          **/qain-snapshots/*.qain.json
```

`fail-on-diff` はデフォルト off です. ベースラインの更新はたいてい意図的なものなので, ブロックするより説明する方が正しいだろう, という判断でした.

## できないこと

トレードオフはもちろんあります. qain が見ているのは描画に使われる値であって, ピクセルそのものは見ていません.

- グラデーションの内部, 画像の内容, アンチエイリアスそのものの回帰は見えません. 目のために `qain shot` はありますが, ピクセル完全性そのものがテスト対象なら, 素直にピクセル VRT を使うべきです
- Chromium 専用です. `DOMSnapshot.captureSnapshot` と `CSS.forcePseudoState` に Firefox / WebKit の等価物がなく, qain はその両方の上に建っています. ここはピクセル系ツールに負けています
- 回転とスキューはリプレイできません. `bounds` は transform 適用後ですが軸平行なので, 回転した要素はバウンディングボックスとして再現されます
- 擬似要素は帰属できません. `::before` のルールはホストの `pseudoElements` の下に来ますが, まだ読んでいません
- CSS-in-JS はソースまで辿れません. emotion や chakra はランタイムに `<style>` を注入するので, `--rules` はその注入されたシートを指します. `file:line` は本物ですが, それを吐いた `.tsx` のレシピではありません

## UI ライブラリを上げるとき

作ってみて一番効いているのが, UI ライブラリのバージョンを上げる場面です. 上げて見た目が変わっていないことを確かめたい, というのはよくある話ですが, ピクセル差分だとその確認が「赤い箇所が何箇所かある, これは意図した変化なのか」を1つずつ人間が判断する作業になります. qain なら変わったプロパティと, その原因になった宣言が並ぶので, 「この 12px はライブラリ側の `.btn` の `padding` が変わったせいだ」と読めます. 意図した変更なのかどうかを差分の中身で判断できるようになったので, アップデート自体を堅実に踏めるようになりました.

そこに破壊的な変更が含まれていた場合も, 今度は qain 自身がハーネスになります. `qain diff` は差分が空でない限り exit code 1 を返すので, コーディングエージェントに「これが 0 になるまで直して」と投げれば, 直す, 撮り直す, まだ残っている, というループを自分で回し続けられます. しかもエージェントに渡るのは, どのノードのどのプロパティが, どの宣言のせいで変わったかまで書かれたテキストです. 次に何を触ればいいかをエージェント自身が決められるので, `diff.png` を見せて「いい感じにして」と頼むのとは, ループの回り方がだいぶ変わります.

## Feedback

qain は, スタイル回帰の答えを画像ではなくプロパティで返します. クラウドもレビューキューもゴールデンイメージも要らず, あるのは JSON 2つとテキストレポートと exit code だけ. 人間が読めて, そのまま LLM にも渡せる形が欲しかった, というのが結局のところ一番大きな動機でした.

まだ v0.0.4 で, 荒いところは色々あります. `npx @qain/cli snap <url>` は URL さえあれば試せるので, バグや要望などあればフィードバックいただけると嬉しいです.

```sh
pnpm add -D @qain/cli         # CLI
pnpm add -D @qain/playwright  # Playwright matcher
pnpm add -D @qain/vitest      # Vitest browser-mode matcher
pnpm add -D @qain/storybook   # Storybook test-runner matcher
pnpm add -D @qain/core        # library
```
