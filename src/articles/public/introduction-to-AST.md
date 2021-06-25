---
title: ASTで僕の考えた最強のDXを実現する 〜自分のDXは自分で守っていけ〜
tags: [JavaScript,AST]
description: |
  ASTイジイジするのはいいぞ！！
  * 難しくない
  * 自分のDXを自分で守るというエキサイティングな体験ができる
  * 触れる範囲が広がる
  * プログラミングをやる限りお世話になる

  と良いことづくめで最高なので布教したい

  また, このブログは [https://docs.google.com/presentation/d/1Ykka2_NvseClPO2J_oFqRUb_sD6rZfYBU-XWnsdTn9U/edit?usp=sharing](https://docs.google.com/presentation/d/1Ykka2_NvseClPO2J_oFqRUb_sD6rZfYBU-XWnsdTn9U/edit?usp=sharing) の補助資料です. まあこの記事の方を読めば大丈夫です大丈夫です.
publishedAt: 2020/09/12
updatedAt: 2020/09/12
---

## TL;DR

ASTイジイジするのはいいぞ！！
* 難しくない
* 自分のDXを自分で守るというエキサイティングな体験ができる
* 触れる範囲が広がる
* プログラミングをやる限りお世話になる

と良いことづくめで最高なので布教したい

また, このブログは [https://docs.google.com/presentation/d/1Ykka2_NvseClPO2J_oFqRUb_sD6rZfYBU-XWnsdTn9U/edit?usp=sharing](https://docs.google.com/presentation/d/1Ykka2_NvseClPO2J_oFqRUb_sD6rZfYBU-XWnsdTn9U/edit?usp=sharing) の補助資料です. まあこの記事の方を読めば大丈夫です大丈夫です.

## AST とは

ASTとは **A**bstract **S**ntax **T**ree の略です. 日本語でいうと **抽象構文木** というやつです.
**Tree** とあるように, プログラムの文法構造を **Tree** 構造で表現したものになります.
Tree 構造なので, それぞれのプログラムの節々を **Node** と言います.

```javascript

if( hoge === "bar" ) {
  foga();
}

```

例えばですが, 上記のコードの AST はどのようなものになるか見てみましょう.

![ast](/assets/introduction-to-AST/ast-tree.png)

if文を分解してみましょう.
if文は「もし〜〜なら、〜〜する」ということを記述できますね。
コードを見てみると、「もし hoge が "bar" という string literal 値だったら, fuga という関数を引数なしで実行する」という感じですね.
AST上だと、まず `ifStatement` という Node が登場します.
そして, その `if` の子の Node として, `if` 文の「条件式」や, その「条件を満たす時に実行される処理」が入ります。
そして条件式の中を見ていきましょう.
条件式の中は、まず `Binary Expression` という Node が登場します. これは二項演算式で, 二つの値を比較したり, ということをしているということがわかりますね(図では簡略のため省略しています)
で, `Binary Expression` で具体的に何をしているかという話になるのですが, 
* 等しいかどうか
* `hoge` という変数
* "bar" という string literal値

ということになりますね.

このブログ(発表)では, ASTをイジイジするアプローチから code に対して介入し何らかの mutation を行なっていくプロセスを解説していきます.

## ASTが使われているもの

![ast-tool](/assets/introduction-to-AST/ast-tool.png)

JSでいえば, babel, eslint, prettier, webpack, などなど, 私たちの開発者体験を潤す様々なツールがASTを用いています.

僕はJSばかり書いているのでJSの例しか出せませんが, エンジニアがプログラムを扱う以上, ほぼほぼ必ずどこかでお世話になっているといっても過言はないはずです.

## ASTでコードをいじいじするときのあれこれ

![ast-process](/assets/introduction-to-AST/ast-overview.png)

大まかに分けて以下の三つのプロセスがあります。
* parse: JS -> AST
* transform: transform AST
* unparse: AST -> JS

`parse` の段階で, JavaScriptのソースコードを AST へと変換します.
`transform` の段階で, AST の中身を弄っていきます.
そして最後に `unparse` の段階で transform された AST を JavaScript のソースコードへと変換してくれます.

![ast_process2](/assets/introduction-to-AST/transform.png)

また, 多くの場合先人の弛まぬ努力のおかげで, `parse`, `unparse` についてはライブラリがほぼほぼ担ってくれていて, 実装者がこのプロセスについて考えることは少ないです.

では実際に `parse` と `unparse` だけ試してみましょう. 

## ASTを試してみる

次のコードを試してみましょう。実行環境は Node.js 上です.

```javascript
const { parse } = require("@babel/parser");

const code = `
if(hoge === "bar") {
  fuga();
}
`

// JSをASTにparseする
const ast = parser(code);

console.dir(ast, { depth: null });
```

するとこんな出力が出ると思います。(隅から隅まで読まなくても大丈夫です)

```javascript
Node {
  type: 'File',
  start: 0,
  end: 34,
  loc: SourceLocation {
    start: Position { line: 1, column: 0 },
    end: Position { line: 5, column: 0 },
    filename: undefined,
    identifierName: undefined
  },
  range: undefined,
  leadingComments: undefined,
  trailingComments: undefined,
  innerComments: undefined,
  extra: undefined,
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 34,
    loc: SourceLocation {
      start: Position { line: 1, column: 0 },
      end: Position { line: 5, column: 0 },
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    sourceType: 'script',
    interpreter: null,
    body: [
      Node {
        type: 'IfStatement',
        start: 1,
        end: 33,
        loc: SourceLocation {
          start: Position { line: 2, column: 0 },
          end: Position { line: 4, column: 1 },
          filename: undefined,
          identifierName: undefined
        },
        range: undefined,
        leadingComments: undefined,
        trailingComments: undefined,
        innerComments: undefined,
        extra: undefined,
        test: Node {
          type: 'BinaryExpression',
          start: 4,
          end: 18,
          loc: SourceLocation {
            start: Position { line: 2, column: 3 },
            end: Position { line: 2, column: 17 },
            filename: undefined,
            identifierName: undefined
          },
          range: undefined,
          leadingComments: undefined,
          trailingComments: undefined,
          innerComments: undefined,
          extra: undefined,
          left: Node {
            type: 'Identifier',
            start: 4,
            end: 8,
            loc: SourceLocation {
              start: Position { line: 2, column: 3 },
              end: Position { line: 2, column: 7 },
              filename: undefined,
              identifierName: 'hoge'
            },
            range: undefined,
            leadingComments: undefined,
            trailingComments: undefined,
            innerComments: undefined,
            extra: undefined,
            name: 'hoge'
          },
          operator: '===',
          right: Node {
            type: 'StringLiteral',
            start: 13,
            end: 18,
            loc: SourceLocation {
              start: Position { line: 2, column: 12 },
              end: Position { line: 2, column: 17 },
              filename: undefined,
              identifierName: undefined
            },
            range: undefined,
            leadingComments: undefined,
            trailingComments: undefined,
            innerComments: undefined,
            extra: { rawValue: 'bar', raw: '"bar"' },
            value: 'bar'
          }
        },
        consequent: Node {
          type: 'BlockStatement',
          start: 20,
          end: 33,
          loc: SourceLocation {
            start: Position { line: 2, column: 19 },
            end: Position { line: 4, column: 1 },
            filename: undefined,
            identifierName: undefined
          },
          range: undefined,
          leadingComments: undefined,
          trailingComments: undefined,
          innerComments: undefined,
          extra: undefined,
          body: [
            Node {
              type: 'ExpressionStatement',
              start: 24,
              end: 31,
              loc: SourceLocation {
                start: Position { line: 3, column: 2 },
                end: Position { line: 3, column: 9 },
                filename: undefined,
                identifierName: undefined
              },
              range: undefined,
              leadingComments: undefined,
              trailingComments: undefined,
              innerComments: undefined,
              extra: undefined,
              expression: Node {
                type: 'CallExpression',
                start: 24,
                end: 30,
                loc: SourceLocation {
                  start: Position { line: 3, column: 2 },
                  end: Position { line: 3, column: 8 },
                  filename: undefined,
                  identifierName: undefined
                },
                range: undefined,
                leadingComments: undefined,
                trailingComments: undefined,
                innerComments: undefined,
                extra: undefined,
                callee: Node {
                  type: 'Identifier',
                  start: 24,
                  end: 28,
                  loc: SourceLocation {
                    start: Position { line: 3, column: 2 },
                    end: Position { line: 3, column: 6 },
                    filename: undefined,
                    identifierName: 'fuga'
                  },
                  range: undefined,
                  leadingComments: undefined,
                  trailingComments: undefined,
                  innerComments: undefined,
                  extra: undefined,
                  name: 'fuga'
                },
                arguments: []
              }
            }
          ],
          directives: []
        },
        alternate: null
      }
    ],
    directives: []
  },
  comments: []
}
```

確かに, `ifStatement` のなかに, `test` (図で言うところの条件) があり, さらに `consequent` (図で言うところのthen) があり, `test` の中に `BinaryExpression` (図で言うところの二項演算子) があって, となっていることを確認できると思います.

ライブラリに乗っかるだけで, JavaScriptのソースコードを AST へと簡単に `parse` できたのが体感できたと思います.

次に `unparse` もやってみましょう.
先ほどのコードを次のように書き換えてみてください.

```javascript
const { parse } = require("@babel/parser");
const { default: generate } = require("@babel/generator");

const code = `
if(hoge === "bar") {
  fuga();
}
`

const ast = parser(code);

// ASTをJSへとunparseする
const { code: output } = generate(ast);

console.log(output)

```

```javascript
if (hoge === "bar") {
  fuga();
}
```

このような, 入力したcodeと全く同じcodeが出力されたと思います. 簡単ですね.

では次に実際にコードをいじいじしてみましょう.

今回は簡単に, 変数を全部絵文字にしてくれる君を作ってみます.

今回やりたいことの下準備として, 以下のようなclassを用意してください.
これはtextを渡すと絵文字に変換してくれる君です.
以前変換したことのあるtextを渡すと, そのときの絵文字を返してくれるようにしています.
このコード自体はこのブログの本旨から外れるので読む必要はないです.

```javascript

class Text2Emoji {
  emojis;
  textMap;
  baseNumber;
  idx;

  constructor(props) {
    if(props.emojis.length < 1) {
        throw new Error("emojis should be more than 1")
    }
    this.emojis = props.emojis;
    this.textMap = new Map();
    this.textMap.set();
    this.baseNumber = this.emojis.length;
    this.idx = 0;
  }

  convert(text) {
    if (this._isRegistered(text)) {
      return this.textMap.get(text);
    }

    const emoji = this._num2Emoji(this.idx);
    this.idx += 1;
    this.textMap.set(text, emoji);
    return emoji;

  }

  _isRegistered(text) {
    return !!this.textMap.get(text);
  }

  _num2Emoji(num) {
    const convertedNum = num.toString(this.baseNumber).split("");
    const key = convertedNum.map((el) => this.emojis[el]).join("");
    return key
  }
}

module.exports = {
  Text2Emoji
}

```

では, `transform` の部分のコードを書いていきましょう.
まずこのコードを実行してみてください.

```javascript
const { parse } = require("@babel/parser");
const { default: generate } = require("@babel/generator");
// transform に必要な @babel/traverse をimport
const { default: traverse } = require("@babel/traverse");

// いじいじする対象のコード
const code = `
const NAME = "Shinyaigeek";
const JOB = "frontend engineer";
const INTERESTS =  ["web performance", "AST", "Usability"]
const AGE= 21;

const hey = () => {
    return \`Hi!! there!! My name is \${NAME}. I'm \${JOB}. I'm \${AGE} years old.My interests are \${INTERESTS.map(interest => interest + "/")}\`
}

console.log(hey());
`

const ast = parser(code);

const visitor = {};

// ASTを走査して, 特定Nodeについて処理を行う
traverse(ast, visitor);

const { code: output } = generate(ast);

console.log(output)
```

そうすると, さっき実行したJavaScriptと同じ出力がされたと思います.
`transform` で, astに対して破壊的変更を行い, その結果のASTを `generate` 関数に渡すのですが, 今回は変換の処理を何もしていません.

次に変換の処理を書いていきます.

`@babel/traverse` だと, visitor patternを採用しています.
visitor patternと言うのは, 走査対象の特定部分に **訪問** していく `visitor object` に処理を記述して, その処理を特定部分で実行していく, と言うパターンのことです.
テレビの集金を例に出すと, あるテレビ局の電波を受診している家庭に, 取り立て人が **訪問** して, 料金を取り立てると言う **処理** を実行していくと言うことになりますね.
取り立て人は, テレビ局の電波を受診していない家庭では取り立てと言う **処理** は実行しないですね.

百聞は一見にしかずということで, 早速実際にコードを書いて試していきましょう.
次のコードを実行してみてください.

```javascript
const { parse } = require("@babel/parser");
const { default: generate } = require("@babel/generator");
const { default: traverse } = require("@babel/traverse");

const code = `
const NAME = "Shinyaigeek";
const JOB = "frontend engineer";
const INTERESTS =  ["web performance", "AST", "Usability"]
const AGE= 21;

const hey = () => {
    return \`Hi!! there!! My name is \${NAME}. I'm \${JOB}. I'm \${AGE} years old.My interests are \${INTERESTS.map(interest => interest + "/")}\`
}

console.log(hey());
`

const ast = parse(code);

const { code: output } = generate(ast);

// visitor patternを書き込んでいく
const visitor = {
    // Identifier に訪問する visitor オブジェクト
    Identifier(nodePath) {
        // visitor objectで行う処理
        console.log(nodePath.node.type + ": " + nodePath.node.name)
    }
};

traverse(ast, visitor);
```

すると次のような出力が出ると思います.

```cli
Identifier: NAME
Identifier: JOB
Identifier: INTERESTS
Identifier: AGE
Identifier: hey
Identifier: NAME
Identifier: JOB
Identifier: AGE
Identifier: INTERESTS
Identifier: map
Identifier: interest
Identifier: interest
Identifier: console
Identifier: log
Identifier: hey
```

これで全ての識別子に **訪問** して, その識別子の名前をlogで出力しているというのがわかりますね.
次に, log に出すだけではなく, 実際に AST の transform を行なっていきましょう.

次のコードを実行してみてください.

```javascript
const { parse } = require("@babel/parser");
const { default: generate } = require("@babel/generator");
const { default: traverse } = require("@babel/traverse");
const { Text2Emoji } = require("./Text2Emoji");

// textを絵文字にしてくれる君
const converter = new Text2Emoji({
  emojis: ["🐈", "🦍", "🐵", "🐶"]
})

const code = `
const NAME = "Shinyaigeek";
const JOB = "frontend engineer";
const INTERESTS =  ["web performance", "AST", "Usability"]
const AGE= 21;

const hey = () => {
    return \`Hi!! there!! My name is \${NAME}. I'm \${JOB}. I'm \${AGE} years old.My interests are \${INTERESTS.map(interest => interest + "/")}\`
}

console.log(hey());
`

const ast = parse(code);

const { code: output } = generate(ast);

const visitor = {
    Identifier(nodePath) {
        // visitor objectで行う処理
        // 識別子の名前を絵文字にする
        const emoji = converter.convert(nodePath.node.name);
        // 訪問した識別子を, 名前が絵文字になった識別子に置き換える
        nodePath.replaceWith(
          identifier(emoji)
        )
        // 名前がすでに絵文字になった識別子を再度訪問しないように, skip する
        nodePath.skip();
    }
};

traverse(ast, visitor);

const { code: output } = generate(ast)
console.log(output);
```

するとこのような出力が出たと思います.

```javascript
const 🐈 = "Shinyaigeek";
const 🦍 = "frontend engineer";
const 🐵 = ["web performance", "AST", "Usability"];
const 🐶 = 21;

const 🦍🐈 = () => {
  return `Hi!! there!! My name is ${🐈}. I'm ${🦍}. I'm ${🐶} years old.My interests are ${🐵.🦍🦍((🦍🐵) => 🦍🐵 + "/")}`;
};

🦍🐶.🐵🐈(🦍🐈());
```

お！！識別子が絵文字に変換されてくれてますね！！
各識別子がちゃんと対応していることを確認してみてください.

今回は変数全部絵文字にする君というかなりしょうもないツールを作っただけですが, 賢い人ならあれもできそうこれもできそうと, 何かアイディアが浮かび上がったかもしれませんね.

## まとめ

ASTを触れるようになると, 自分の開発者体験を自分で守っていくというエキサイティングな体験ができるようになります.
Let's AST!!