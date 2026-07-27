---
title: "TypeScript Tips & Tricks"
publishedAt: "2024-01-15"
tags: ["TypeScript", "JavaScript", "Tips"]
---

# TypeScript Tips & Tricks

TypeScriptをより効率的に使うためのちょっとしたテクニック集です

---

## 1. Union Types の活用

```typescript
type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      return "読み込み中...";
    case "success":
      return "成功しました！";
    case "error":
      return "エラーが発生しました";
  }
}
```

型安全性を保ちながら、わかりやすいコードが書けます

---

## 2. Optional Chaining

```typescript
const user = {
  profile: {
    name: "太郎",
    address: {
      city: "東京"
    }
  }
};

// 安全にネストされたプロパティにアクセス
const city = user.profile?.address?.city;
```

`?.` を使うことで、`undefined` や `null` チェックが簡潔に書けます

---

## 3. Template Literal Types

```typescript
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ClassName = `${Color}-${Size}`;
// "red-small" | "red-medium" | ... | "blue-large"
```

文字列リテラル型を組み合わせて、強力な型定義ができます

---

## 4. まとめ

- Union Types で型安全性を向上
- Optional Chaining でnull安全なコード
- Template Literal Types で柔軟な文字列型

TypeScriptの型システムを活用して、より安全で読みやすいコードを書きましょう！

---

## 参考リンク

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

Happy coding! 🚀