---
company: 株式会社日本経済新聞社
startDate: "2022/04"
endDate: "2025/07"
position: Full-time employee
role: Software Engineer
technologies: ["Fastly", "swc", "linaria", "React", "Next.js", "Terraform", "Golang", "pnpm", "turborepo"]
entries:
  - title: "モノレポ統合により複雑なマイクロサービスの開発を単純化するアプローチ"
    url: "https://hack.nikkei.com/blog/advent20241212/"
  - title: "ESLint Rule により事業, 技術ドメインに沿った制約と誓約を敷衍させるアプローチのすゝめ"
    url: "https://speakerdeck.com/shinyaigeek/eslint-rule-niyorishi-ye-ji-shu-domeinniyan-tutazhi-yue-toshi-yue-wofu-yan-saseruapurotinosu-me-796c5458-d929-455c-90cf-f4914b91621f"
  - title: "C処理系フレンドリーコードによる「フロントエンド」のコードベース改善のアプローチ"
    url: "https://hack.nikkei.com/blog/advent20231220/"
  - title: "Big “heart” of mud, 10000 lines VCL generated from .vcl.handlebars"
    url: "https://speakerdeck.com/shinyaigeek/big-heart-of-mud-10000-lines-vcl-generated-from-vcl-dot-handlebars"
  - title: "爆速の日経電子版開発の今"
    url: "https://speakerdeck.com/shinyaigeek/bao-su-nori-jing-dian-zi-ban-kai-fa-nojin"
---

プロダクトエンジニアとして、日経電子版の周辺プロダクトの Web 開発に携わる。フロントエンド、BFF 層の開発を行いつつ、事業ドメインに沿ったコードベース上の制約を機械的に縛れる仕組みの導入やコンポーネントカタログのビルド速度の改善など技術的な基盤の改善の面でも貢献する。

その後は Platform Engineer として、日経電子版 Web の技術基盤の開発、改善によるプロダクト開発における技術上の課題解決や周辺 Web プロダクト開発の Enabling に携わる。

- レガシーかつメンテナンス不可能となってしまった技術基盤を抱えるアプリケーションの、Next.js 刷新
  - インフラレベルでの刷新を行うことで、漸進的な移行を実現し移行に伴う障害の防止
  - モダンな技術基盤に移行しスピーディな開発の実現。合わせて仕様の見直しなどによるユーザー体験の向上
  - 機械的な制約を厚く敷く設計、開発をリードし開発上の属人性の排除
- 20弱存在するマイクロサービスにハードコードされていた共通データを、一つの API へと集積しデプロイ頻度の削減
- 20弱 Poly-Repository として散財していた、本質的には同じプロダクトで共通処理を多く持つアプリケーションのモノレポ統合のリード
- ID 基盤での障害発生時においてもサービスを可用にするため、日経電子版の認可処理の改善
- 日経電子版のビルド基盤の改善、35%弱の改善
- 日経電子版の CDN 基盤において静的テストを行える基盤の確立

などなどに携わる.
