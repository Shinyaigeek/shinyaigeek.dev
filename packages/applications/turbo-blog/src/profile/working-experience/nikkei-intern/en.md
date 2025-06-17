---
company: Nikkei, Inc.
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

I spearheaded the technical foundation overhaul of hack.nikkei.com. The outdated infrastructure had degraded developer experience, impacting technical blog authoring, and poor user experience due to performance issues. I re-architected the platform to a Next.js-based foundation, significantly improving the authoring experience and page load speeds. This initiative enabled the publication of Advent Calendars and presentation materials directly on hack.nikkei.com, enhancing our technical brand.

I also led the development of the news video generation feature for Nikkei Wave (https://apps.apple.com/jp/app/nikkei-wave/id1521762085). I built the frontend platform responsible for rendering news videos using extensive CSS animations, based on JSON data from the backend that specified the order, text, background, and animation for each segment. I engineered a foundation that allowed for independent and declarative configuration of complex animations, making it easy for anyone to develop new animations. Furthermore, I established static linters and a component catalog to facilitate regression detection.

The high quality and extensibility of these animations, coupled with the ability to generate animated content for almost every article, earned significant praise both internally and externally. This success ultimately led to the videos being distributed to Haneda Airport signage.

Lastly, I conducted technical validation for Fastly Compute. I explored the feasibility of running tensorflow.js on the Fastly Compute platform to achieve edge computing-based recommendations for anonymous users, leveraging their User Agent and IP information.