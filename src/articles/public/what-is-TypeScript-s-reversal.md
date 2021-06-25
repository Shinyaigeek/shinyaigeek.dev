---
title: TypeScriptの反変とどう向き合うか
tags: [Programming,JavaScript]
description: |
  お久しぶりです、しにゃいです。
  TypeScript いいですよね、静的型付けにより今あなたが触っているプロジェクトをより安全に進めて行くことができます。
  しかしそんな TypeScript さんもなんだこれは、といってしまうような一見よくわからない挙動をすることがあります。
  この記事ではその中の一つともいえよう反変について扱っておこうかなと思います。
publishedAt: 2019/08/28
updatedAt: 2019/08/28
---

## はじめに
お久しぶりです、しにゃいです。
　TypeScript いいですよね、静的型付けにより今あなたが触っているプロジェクトをより安全に進めて行くことができます。
しかしそんな TypeScript さんもなんだこれは、といってしまうような一見よくわからない挙動をすることがあります。
この記事ではその中の一つともいえよう反変について扱っておこうかなと思います。

## 反変とは
まず反変とはについてから知りましょう。そのために共変、反変という概念を知りましょう。
それぞれ

* 共変:型の順序関係を維持する
* 反変:型の順序関係を反転させる

となっています。
もうちょっと言うと
Cat　⊆ Animal(この例だと真部分集合になりますのでこの記号は不適切ですが)となるような奴に対して、 Cat , Animal に何かしようとなってその時に型の順序関係が維持されるか否かが共変、反変となります。
でもパッと辞書的な意味を見せられてもいまいちピンと来ないですよね。
なので TypeScript さんに共変と反変の例を見せてもらいましょう。

## 教えてTypeScriptさん

```TypeScript
type Animal = "Cat" | "Dog" | "Pig" | "Cow" | "Chicken"
type Cat = "Cat"

declare let cat:Cat;
declare let animal:Animal;

cat = animal; //Error
animal = cat; //OK

declare let catArray:Cat[];
declare let animalArray:Animal[];

catArray = animalArray; // Error
animalArray = catArray; // OK
```

まずこれは共変の一例です。Cat Type に Animal Type を代入しようとしてエラーが生じています。逆に Animal Type に Cat Type を代入してもエラーは生じません。
これは直感的に理解しやすい事象かなとは思います。 Cat Type に Animal Type を代入しようとするともしかすると Cow が入ってくるかもしれませんしこれを弾いてくれるのは感謝の極みでしょう。逆に Animal Type に Cat Type が入り得るのも至極妥当な話といえましょう。
因みに TypeScript はこんなエラーを吐いてくれています。

![25-3](/what-is-TypeScript-s-reversal/25-3.png)

Animal Type を Cat Type へは入れられないよと教えてくれて、その一例として Dog をあげてくれています。因みにこの時Animal Type は Cat Type の SuperType (より上位の概念といった感じ)といったりします(この逆は SubTypeです)。

そして上記の型の理由から catArray は animalArray で置き換え不可能です(なんどもいうように Cow とかがくる可能性があるので)
しかしその逆に animalArray は catArray で置き換え可能です。
そしてその Cat Type から構成される配列と Animal Type から構成される配列とを比較すると型の順序関係が Cat Type と Animal Type の関係から維持されていることがわかり、配列を構成する演算子は共変であるといえましょう。

では次に反変の例を見て見ましょう。

```TypeScript
type Animal = "Cat" | "Dog" | "Pig" | "Cow" | "Chicken"
type Cat = "Cat"

declare let cat:Cat;
declare let animal:Animal;

cat = animal; //Error
animal = cat; //OK

declare let catFunc:(cat:Cat) =>  void;
declare let animalFunc:(animal:Animal) => void;

catFunc = animalFunc; // OK
animalFunc = catFunc; // Error
```

こういう感じになります。
前もって触れておきますが、実は上で Error となっているところはデフォルトの TypeScript さんはスルーします。これはv2.6から追加された　--strictFunctionTypes によってこれを弾いてくれるようになります。もちろん --strict でも弾くことができます。
でも上記の例とは逆に、catFunc に animalFunc を入れると TypeScript はエラーを投げず、 animalFunc に catFunc を投げるとエラーを投げます。これはちょっと直感に反することかもしれません。
だって！！上で！！ Cat Type に Animal Type を入れると！！エラーになるやんゆうてたやん！！ってなるじゃないですか。
実はこれ根本的には共変の時に起こるエラーと雰囲気は変わりません。

![25-4](/what-is-TypeScript-s-reversal/25-4.png)

因みに TypeScript が吐くエラーはこんな感じ。
この時 catFunc の引数である Cat と、 animalFunc の引数である Animal について、 Animal は Cat のSuperTypeですから、より引数として寛容といえましょう。
つまり catFunc は animalFunc で置き換え可能ということです。そしてその逆は不可能ということになります。
もうちょっと詳細にいえば catFunc を animalFunc に置き換えても catFunc が受け取るはずだった Cat Type の引数は全部受け止められます。
でもその逆に　animalFunc を catFunc に置き換えると animalFunc が受け取り得る Dog Type　等の引数を受け止められなくなります。
それがTypeScriptが警告している文面の意味です。
こう考えると逆に --strictFunctionTypes が効いていないと Error が生じないのも変というか型保全性の面から考えると怖い話なような気がしますね(公式曰くただぱっと見ありえそうな感じがするからみたいな理由があった気がする)
一つ誤解しないで欲しいのは TypeScript が反変性をフォローしているのは全然厄介なことではなくて、むしろ型保全性の面から見ればヒューマンエラーをより減らせる素晴らしいことです。
因みにですが反変が起こってエラーが生じたときは TypeScript の吐くエラー文も順序が反転しています。
ていうか基本的に関数引数の型と関数は反変の関係になるっぽい(?)です。(だからこその--strictFunctionTypesなのかなと)

個人的にはこの辺のややこしさと上手く付き合って行くには深いところでの「型を保ったまま置き換えが可能か」という意識と、ゆるふわな浅いところでの「関数引数の型と関数は反変の関係になる」っていう意識を持つとよくて、さすればいい感じに TypeScript とその反変性に向き合って、より安全にコードを無駄に沼にはまったりせず書けるでしょう。