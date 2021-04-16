import { Layout } from "../components/Layout/Layout";
import { Divider } from "../components/Divider/Divider";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import { BaseProfile } from "./components/BaseProfile/BaseProfile";
import { GitHubCalender } from "./components/GitHubCalender/GitHubCalender";
import { render } from "lit-html";
import React from "react";
import { css } from "linaria";
import { JobItem } from "./components/JobItem/JobItem";
import { t } from "@lingui/macro";

const profile = css`
  width: 80vw;
  margin: 0 auto;
`;

const title = css`
  font-size: 24px;
  margin: 18px 16px;
`;

const lists = css`
  font-size: 18px;

  li {
    margin: 4px;
  }
`;

export const Profile = Layout(() => {
  return (
    <div className={profile}>
      <div>
        <Shinyaigeek />

        <BaseProfile />

        <Divider />

        <GitHubCalender />

        <Divider />

        <div className="history--study element">
          <span className={title}>{t`education`}</span>
          <ul className={lists}>
            <li>2018年:西大和学園高等学校卒業</li>
            <li>2018年:東京大学文科Ⅲ類入学</li>
            <li>2019年:東京大学工学部システム創成学科内定</li>
            <li>2020年:東京大学工学部システム創成学科進学</li>
            <li>???</li>
          </ul>
        </div>

        <Divider />

        <div className="history--job element">
          <span className={title}>実務経験歴</span>
          <ul>
            <JobItem
              job="合同会社MOSHIMOS"
              term="2018年10月 ~ 2018年12月"
              description="合同会社MOSHIMOSにて, Codeignighterによるバックエンド開発からjQueryによるフロントエンド開発まで幅広く行いました."
              position="Web Application Engineer"
            />
            <JobItem
              job="大手町のメディア企業"
              term="2019年4月 ~ (現在)"
              description="主にフロントエンドの業務に携わっています. Edge ComputingによるUX/DXの改善, リッチな操作感が要求されるアプリケーションのフロントエンド開発, 技術ブログのパフォーマンス改善, アクセシビリティ改善, DXの改善に取り組んでいました."
              position="Web Developer/長期インターン"
            />
            <JobItem
              job="VOYAGE GROUPE"
              term="2020年8月"
              description="TreasureでWeb Application開発のいろはを学び, その後チームを組んでバックエンドはfirebase, go, フロントエンドはPreact, bootstrapでブログ投稿プラットフォームの開発を行っていました.そこでは主にフロントエンドテックリードを担当していました."
              position="Treasure サマーインターン生"
            />
            <JobItem
              job="Wantedly"
              term="2020年8月 ~ 2020年9月"
              description="フロントエンド面の機能拡充に取り組んでいました. React, GraphQL, TypeScript, Styled-Componentを主に扱っていました."
              position="Web Developer/サマーインターン"
            />
            <JobItem
              job="Cybozu"
              term="2020年9月"
              description="一週間の間, チームを組んでCybozuの製品であるkintoneの拡張機能を開発していました. lit-html, parcel, linariaでタイマーアプリ拡張を作りました. チームワークを意識して開発を行っていました."
              position="Web Developer/サマーインターン"
            />
            <JobItem
              job="Recruit"
              term="2020年10月 ~ 2020年11月"
              description="フロントエンドのUI改善, Web 標準動向の調査を行なっていました."
              position="Web Developer/サマーインターン"
            />
          </ul>
        </div>

        <Divider />

        <div className="description">
          <div className={title}>About Me</div>
          <p className="content">
            Web Developerとして活動しています, しにゃい(Shinyaigeek)と言います.
            <br />
            <br />
            大学では, 環境工学, 深層学習,
            画像解析などを専攻しています.(研究テーマは未定)
            <br />
            <br />
            Web Developerとしても活動していて,
            Webの持つUniversalityに惹かれており,
            Webの可能性を拡げていきエンジニア以外にも伝えていきたいというお思いで仕事をしています.
            <br />
            <br />
            Web の持つUniversalityを最大限引き出せるように,
            ロースペックなPCでもアプリケーションが動くようClientでのRuntime
            Costを低減したり, 通信環境が悪くとも動くようI/O Costを低減したり,
            Accesibilityを考えたコードを書いたりとそういった営みが得意です.
            そのためWeb開発においてはServerもEdgeもClientも幅広く触ってはいますが,
            Clientがメインになっています.
            <br />
            <br />
            趣味はプログラミングで, WebとBrowserとUXとASTが好きです.
          </p>
        </div>
      </div>
    </div>
  );
});
