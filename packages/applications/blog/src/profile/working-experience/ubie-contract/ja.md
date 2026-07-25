---
company: Ubie, Inc.
startDate: "2024/01"
endDate: "2025/07"
position: Part-time employee
role: Platform Engineer
technologies: ["Node.js", "TypeScript", "Next.js", "GraphQL", "Nest.js", "Kotlin", "tailwind.css"]
---

日本経済新聞社に在籍しながら業務委託として参画し、成長フェーズにおける技術移行を推進した。

- 症状検索エンジン「ユビー」のバックエンドの Node.js 移行。技術スタックの全社統一・採用力・開発速度の観点から進められた Kotlin から Node.js への移行プロジェクトにて、モジュラーモノリス(20〜30 モジュール規模)の移行実装を担当
  - あわせて、1 クエリあたり 30〜40 分を要していた移行作業を自動化するツールを開発し、約 200 クエリ分の作業を解消。約 1 年をかけて移行を完了させた
- フロントエンド基盤の統合。異なるリポジトリで管理されていた 2 つの Next.js アプリケーションを 1 つへ統合
  - その過程で CSS ライブラリを Tailwind CSS から CSS Modules へ刷新。Tailwind が生成するスタイルを解決して CSS Modules として出力する AST ベースの codemod を開発し、約 1,000 コンポーネントを 8 割程度自動化して移行した
  - 安全に移行を進めるための互換性検証の仕組みもあわせて整備し、移行起因のバグをゼロに抑えて完了させた
