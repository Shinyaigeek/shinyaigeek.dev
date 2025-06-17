---
company: 株式会社日本経済新聞社
startDate: "2019/04"
endDate: "2022/03"
position: Long-term Internship Student
role: Web Frontend Engineer
technologies: ["React", "TypeScript", "styled-components", "SCSS", "Next.js", "Fastly Compute"]
entries:
  - title: "羽田空港の国内線ターミナルで動画広告 NIKKEI RUSHでニュースとともに"
    url: "https://marketing.nikkei.com/column/001494.html"
  - title: "Compute@Edge で機械学習モデルを動かす"
    url: "https://speakerdeck.com/hsano/compute-at-edge-deji-jie-xue-xi-moderuwodong-kasu"
  - title: "Compute@Edge は GraphQL Server の夢を見るか"
    url: "https://hack.nikkei.com/blog/advent20211206/"
---

hack.nikkei.comの技術基盤刷新を主導しました。古いインフラはDXが劣化しており、技術ブログ執筆に影響し、パフォーマンス問題でUXも悪化していました。Next.jsベースの基盤に再構築し、執筆体験とページ読み込み速度を大幅に改善しました。この取り組みによりアドベントカレンダーや発表資料を直接hack.nikkeiで公開できるようになり、技術ブランドを強化しました。

また、日経電子版のニュース動画生成機能の開発も主導しました。バックエンドから送られる順序、テキスト、背景、アニメーションを指定したJSONデータに基づいて、豊富なCSSアニメーションを使ってニュース動画をレンダリングするフロントエンドプラットフォームを構築しました。複雑なアニメーションを独立して宣言的に設定できる基盤を設計し、誰でも簡単に新しいアニメーションを開発できるようにしました。さらに、静的リンターとコンポーネントカタログを確立してリグレッション検出を促進しました。

これらのアニメーションの高品質と拡張性、およびほぼすべての記事でアニメーションコンテンツを生成する能力は、社内外で大きな賞賛を受けました。この成功により最終的に羽田空港のサイネージで動画が配信されることになりました。

最後に、Fastly Computeの技術検証を実施しました。User AgentとIP情報を活用して匿名ユーザーのエッジコンピューティングベースのレコメンデーションを実現するため、Fastly Computeプラットフォームでtensorflow.jsを実行する実現可能性を探りました。