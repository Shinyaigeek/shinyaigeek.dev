---
title: Treeche, Tree-Shakable Checker for JavaScript/TypeScript Application to reduce bundle size
tags: [Programming, JavaScript, DX, Frontend]
description: bundle size を減らすことに有用な, JavaScript/TypeScript 製 module が tree-shakable かどうかをチェックするnpmモジュール、treeche を開発したのでそれの紹介記事.
publishedAt: 2022/08/27
updatedAt: 2022/08/27
---

## Treeche とは？

Treecheとは、**Tree** -Shakable **Che** ckerの略です. JavaScript/TypeScript module が Tree-Shakable かどうかを確認するためのツールです. バンドルサイズの削減やそれによるUserExperienceの最適化に有用です.

[https://github.com/Shinyaigeek/treeche](https://github.com/Shinyaigeek/treeche)

## Example

```typescript
// this is not tree-shakable because have side-effect

const currentYear = new Date().getFullYear();

export function getCurrentYear() {
    return `Year ${currentYear}`
}
```

上記のような module は副作用を有しているため, tree-shakable ではありません。

このような場合、Treeche は以下のような出力をします.

```shell
🚨 ~/application/side_effect.ts is not tree-shakable due to the following code:


const currentYear = new Date().getFullYear();
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

下記のように, 副作用のある module を副作用のない module に修正して

```typescript
export function getCurrentYear(currentDate: Date) {
    return `Year ${currentDate.getFullYear()}`
}
```

treeche を実行すると下記のような出力がなされます.

```shell
Congratulation 🎉 All files are tree-shakeable ✨
```

## JavaScript の module バンドルにおいて副作用とは何なのか

ECMAScript のモジュールコンテキストにおける副作用とは, module の外部に影響を与えるコードのことを指します. 例えば、以下のようにモジュールのトップレベルで `window` オブジェクトに変数を設定するのは副作用です. module は import 時に実行されるため, module の top-level で `window` オブジェクトなどに mutation が加えられていると, module の import 時に実行される必要があります.

```javascript
window.m = 1;
export mod() {
    return 1;
}
```

もちろん, この処理が `init` のような module から export される関数の中で実行された場合は, import 時にこれが実行されないので、副作用はなくなります。

## なぜ副作用で bundle-size が大きくなるのか？

rollup の REPL で bundler の挙動を確認することができます。

URL: [https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmV4cG9ydCUyMGZ1bmN0aW9uJTIwZnVnYSgpJTIwJTdCJTVDbiU1Q3RyZXR1cm4lMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lN0QlMjIlN0QlNUQlMkMlMjJvcHRpb25zJTIyJTNBJTdCJTIyZm9ybWF0JTIyJTNBJTIyZXMlMjIlMkMlMjJuYW1lJTIyJTNBJTIybXlCdW5kbGUlMjIlMkMlMjJhbWQlMjIlM0ElN0IlMjJpZCUyMiUzQSUyMiUyMiU3RCUyQyUyMmdsb2JhbHMlMjIlM0ElN0IlN0QlN0QlMkMlMjJleGFtcGxlJTIyJTNBbnVsbCU3RA==](https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyM)


**main.js**
```javascript
import { hoge } from "./mod";

console.log(hoge())
```

**mod.js**
```javascript
export function hoge() {
	return 1;
}

export function fuga() {
	return new Date().getFullYear();
}
```

上記のようなコードを rollup で bundle した結果は以下のようになります.
```javascript
function hoge() {
	return 1;
}

console.log(hoge());
```

`mod.js` 内の `fuga` 関数が bundle の結果に存在しないのは, bundler が `main.js` が `fuga` 関数をインポートしていない(そしてもちろん使っていない)ことを知っているからで, そのため `fuga` 関数をバンドル出力に含める必要がなく, バンドルサイズの減少につながります。

しかし以下のように `mod.js` を編集するとどうなるでしょう.
```javascript
export function hoge() {
	return 1;
}

const _fuga = new Date().getFullYear();

export function fuga() {
	return _fuga;
}
```

バンドルされた出力は、上記のようになります。
```javascript
function hoge() {
	return 1;
}

new Date().getFullYear();

console.log(hoge());
```

[https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmNvbnN0JTIwX2Z1Z2ElMjAlM0QlMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lNUNuZXhwb3J0JTIwZnVuY3Rpb24lMjBmdWdhKCklMjAlN0IlNUNuJTVDdHJldHVybiUyMF9mdWdhJTNCJTVDbiU3RCUyMiU3RCU1RCUyQyUyMm9wdGlvbnMlMjIlM0ElN0IlMjJmb3JtYXQlMjIlM0ElMjJlcyUyMiUyQyUyMm5hbWUlMjIlM0ElMjJteUJ1bmRsZSUyMiUyQyUyMmFtZCUyMiUzQSU3QiUyMmlkJTIyJTNBJTIyJTIyJTdEJTJDJTIyZ2xvYmFscyUyMiUzQSU3QiU3RCU3RCUyQyUyMmV4YW1wbGUlMjIlM0FudWxsJTdE](https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ)

バンドルされている出力に不要な `new Date().getFullYear()` が含まれていることを確認できますね. なぜなら `mod.js` が `new Date().getFullYear()` という副作用を孕むからです. JavaScript では、import されたモジュールは import 時に実行されるので、`new Date().getFullYear()` のような副作用のあるコードはそもそも実行されるべきであるため, bundler が削除することができません. しかしそもそも `fuga` 関数を import しないのであれば、`new Date().getFullYear()` がバンドルされた出力に含まれる必要はありません. なぜなら、もう一方の関数 `hoge` は `const _fuga = new Date().getFullYear()` を必要としないためです. なので理想としては `new Date().getFullYear()` というコードが出力からなくなっているべきです. 

## How to use?

Treecheをグローバルインストールして使うのみです.

```shell
npm install treeche -g
treeche "**/*.ts" --excludes "node_modules" "**/*.test.ts"
```

argument に入力のファイルを取ることができます. ここには Node glob pattern を利用することができます. また `--excludes` option で, 特定のファイル, フォルダを除外することができます. test ファイルや node_modules はノイズになるのでこれを用いて除外することが想定されています. また argument を省略した上で, `--entry-point` で単一のファイルを指定すると, そこを entrypoint として bundle した上で, その上で副作用があるかチェックしてくれます.

## オプション

|kind|name|description|example|
|:--:|:--:|:--:|:--:|
|argument|inputs|input files to check tree-shakable. you can use Node glob pattern| treeche "src/**/*.ts"|
|option|excludes|excludes files to filter from inputs. you can use Node glob pattern| treeche "src/**/*.ts" --e "node_modules"|
|option|entry point|the unique entry point to check tree-shakable. if you specify input with this, treeche will bundle so you can check tree-shakable also in node_modules| treeche --entry-point ./src/main.ts|

## 動作原理は？

動作原理はとても単純で, Treeche は JavaScript module bundler である rollup を内部で実行し、下記のように option で指定した入力モジュールを import している仮想エントリポイントコードをバンドルします。

```javascript

import  "./your-module"

```

"./your-module" に副作用がある場合, import 以外のコードも出力されます. それをチェックしています.

## Feedback

これは欲しいと思ってサクッと作った試験的なものですので, 多分バグがあります. 先に謝っておきます. バグや要望などあればフィードバックいただけると嬉しいです！
