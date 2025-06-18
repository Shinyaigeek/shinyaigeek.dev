---
company: Plaid, Inc.
startDate: "2022/02"
endDate: "2022/03"
position: Long-term Internship Student
role: Platform Engineer
technologies: ["TypeScript", "Rollup", "GitHub Actions"]
---

ユーザーエクスペリエンスの大幅な向上につながったサードパーティスクリプトの最適化に注力しました。プラグインシステムのアーキテクチャは本来小さなファイルサイズをサポートしていましたが、追加のチューニングを実装してファイルサイズを5%以上削減しました。具体的には：

- 依存ライブラリのトランスパイラターゲットの見直し
- 不要なポリフィルの除去  
- minifier設定の精緻化と検証
- tree-shakingとminificationの効果を最大化するためのコードベース再構築

将来の肥大化を防ぐため、CI/CDパイプラインにファイルサイズ変更を開発者に通知するメカニズムも導入し、チーム内でファイルサイズ意識の文化を醸成しました。