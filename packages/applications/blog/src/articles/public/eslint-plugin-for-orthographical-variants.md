---
title: コードの表記揺れを縛るESLintプラグイン
tags: [Programming, JavaScript, DX, Frontend]
description: コードの表記揺れを縛るESLint Pluginを作ったので供養する.
publishedAt: 2022/03/15
updatedAt: 2022/03/15
---

## これは何

コードの表記揺れを縛るESLint Pluginを作った. 大体作り終えてテスト描いてる途中にいやコスト対効果が薄いなこれとなってしまい, 面白くもなければ技術的にすごくもない, かと言って便利というわけでもないいい感じに湿気る怪物を産んでしまったのでその供養.

## plugin の概要

上述の通りコードの表記揺れを縛るESLint Pluginです.

https://github.com/Shinyaigeek/eslint-plugin-ban-orthographical-variant


```json
{
  "Audio": {
    "synonyms": ["Speech", "Music"]
  },
  "Video": {
    "synonyms": ["Movie", "TV Show", "Game", "Animation", "Documentary"]
  },
  "Image": {
    "synonyms": ["Photo", "Drawing", "Painting", "Photograph", "Illustration"]
  }
}
```

こういう感じの辞書ファイルを用意しておくと, 

```javascript
const audioPath = "hoge"; // ok
const musicPath = "hoge"; // warning!
```

こういうJavaScript/TypeScriptにおけるコード中の表記ゆれを縛ってくれるESLint Pluginです. 縛る対象としては宣言可能なId的なやつほぼ全部で, 
- 変数名
- 関数名
- class 名
- メソッド名
- enum 名
- interface 名
- etc...

などなど, 多分大体網羅できてる気がします.

## モチベーション

コードの表記揺れ, 複数の手で作られるようなコードベースだとそこまで珍しいものでもないですが, 我々エンジニアという生き物は何事にも意味を見出そうとしてしまうため, 単なる表記揺れの意味を考えてしまったり, 地味に検索abilityも落ちるので辛いです. また事業ドメインの単語が, コードベース中だと別の言葉になってしまっている, と言ったこともたま〜によくあり, そうなると新しくプロジェクトに参画した人にとっては意味のわからない謎になってしまいます.

そもそも事業ドメインの単語が多いと辛いよね, という話もあり, 辞書ファイルをみんなで管理している, と言った例も見かけます. これは辞書ファイルを管理するついでにこの表記揺れもしばれると嬉しいのでは, と思い作りました.

## 仕組み

わざわざ書くほどのものでもないですが, 

1. eslint の持つ AST 中の特定の Node にアクセスする
2. 変数名を取得する
3. 表記揺れチェック


という感じです.

```typescript
    VariableDeclarator(node) {
        const identifier = node.id;

        const variableNames = getVariableNameFromBindingName(identifier);

        const dictionaryPath = getDictionaryPath(options[0].dictionaryPath);
        const dictionary = getDictionary(dictionaryPath);
        for (const variableName of variableNames) {
          lintWithVariable(
            variableName,
            dictionary,
            (originWord, synomsysWord) =>
              report({
                node,
                messageId: "banOrthographicalVariant",
                data: {
                  originWord,
                  synomsysWord,
                },
              })
          );
        }
      },
```

上記のコードは一例ですが, VariableDeclarator (=変数宣言) の node にアクセスしています.

VariableDeclarator のにおける `node.id` は

- `Identifier`
```javascript
const hoge = "hoge";
```
- `ArrayPattern`
```javascript
const [hoge] = ["hoge"];
```
- `ObjectPattern`
```javascript
const { hoge } = { hoge: "hoge" };
```

の3通り取り得ます. それぞれの場合においていい感じに変数名に当たるものを全て取得します. (`ObjectPattern` や `ArrayPattern` はネスとされていることもあるので再帰的に取得する必要があります)

あとは辞書ファイルをロードして表記揺れかどうか判定するだけです.

どんな感じに動いているかは, 僕の描きかけのテストを見てください. https://github.com/Shinyaigeek/eslint-plugin-ban-orthographical-variant/blob/main/src/__tests__/ban-orthographical-variant.test.ts

## なぜいらないの？

テストのためにmock用の辞書ファイル書いてたらそもそも辞書ファイル書きたくないことに気づいてしまった, やるならここをハックすべきだった気がする.