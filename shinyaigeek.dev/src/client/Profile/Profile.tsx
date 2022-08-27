import { Layout } from "../components/Layout/Layout";
import { Divider } from "../components/Divider/Divider";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import { BaseProfile } from "./components/BaseProfile/BaseProfile";
import { GitHubCalender } from "./components/GitHubCalender/GitHubCalender";
import React from "react";
import { JobItem } from "./components/JobItem/JobItem";
import { t } from "@lingui/macro";
import { Card, CardShowcase } from "./components/Card/Card";
import profile from "./Profile.module.scss";

export const Profile = Layout(() => {
  return (
    <div className={profile.profile}>
      <div>
        <Shinyaigeek />

        <BaseProfile />

        <Divider />

        <GitHubCalender />

        <Divider />

        <div className="description">
          <div className={profile.title}>About Me</div>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: t`aboutme_content` }}
          ></p>
        </div>

        <Divider />

        <div className="history--study element">
          <span className={profile.title}>{t`education`}</span>
          <ul className={profile.lists}>
            <li>2018: {t`graduate_nishiyamato`}</li>
            <li>2018: {t`enroll_univ_tokyo`}</li>
            <li>2019: {t`will_major_in_system`}</li>
            <li>2020: {t`major_in_system`}</li>
            <li>2022: {t`graduate_utokyo`}</li>
          </ul>
        </div>

        <Divider />

        <div className="history--job element">
          <span className={profile.title}>{t`working_experience`}</span>
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

        <div className="interests">
          <div className={profile.title}>Specialities</div>
          <p className="content">
            <CardShowcase>
              {specialities.map((speciality) => (
                <Card
                  title={speciality.title}
                  img={speciality.img ?? "/assets/static/placeholder.png"}
                />
              ))}
            </CardShowcase>
          </p>
        </div>
      </div>
    </div>
  );
});

interface Speciality {
  title: string;
  img?: string;
}

const specialities: Speciality[] = [
  {
    title: "JavaScript",
    img: "/assets/static/javascript.png",
  },

  {
    title: "TypeScript",
    img: "/assets/static/typescript.png",
  },
  {
    title: "React",
    img: "/assets/static/react.png",
  },
  {
    title: "Rust",
    img: "/assets/static/rust.png",
  },
  {
    title: "Fastly",
    img: "/assets/static/fastly.png",
  },
  {
    title: "CloudFlare",
    img: "/assets/static/cloudflare.png",
  },
  {
    title: "Web Performance",
  },
  {
    title: "Browser",
  },
  {
    title: "Network",
  },
  {
    title: "Web Frontend Tooling",
  },
];
