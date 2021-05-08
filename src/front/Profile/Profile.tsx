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
            <li>2018: {t`graduate_nishiyamato`}</li>
            <li>2018: {t`enroll_univ_tokyo`}</li>
            <li>2019: {t`will_major_in_system`}</li>
            <li>2020: {t`major_in_system`}</li>
            <li>???</li>
          </ul>
        </div>

        <Divider />

        <div className="history--job element">
          <span className={title}>{t`working_experience`}</span>
          <ul>
            {JobItem({
              job: t`certain_news_media_company`,
              term: "2019/04 ~",
              description: t`certain_news_media_company_description`,
              position: t`certain_news_media_company_position`,
            })}
            {JobItem({
              job: t`recruit`,
              term: "2020/10 ~ 2020/11",
              description: t`recruit_description`,
              position: t`recruit_position`,
            })}
            {JobItem({
              job: t`cybozu`,
              term: "2020/09",
              description: t`cybozu_description`,
              position: t`cybozu_position`,
            })}
            {JobItem({
              job: t`wantedly`,
              term: "2020/08 ~ 2020/09",
              description: t`wantedly_description`,
              position: t`wantedly_position`,
            })}
            {JobItem({
              job: t`voyage_group`,
              term: "2020/08",
              description: t`voyage_group_description`,
              position: t`voyage_group_position`,
            })}
            {JobItem({
              job: t`moshimos`,
              term: "2018/10 ~ 2018/12",
              description: t`moshimos_description`,
              position: t`moshimos_position`,
            })}
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
