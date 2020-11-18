import { Layout } from "../components/Layout/Layout";
import { Divider } from "../components/Divider/Divider";
import { Shinyaigeek } from "../components/Shinyaigeek/Shinyaigeek";
import { BaseProfile } from "./components/BaseProfile/BaseProfile";
import { GitHubCalender } from "./components/GitHubCalender/GitHubCalender";
import { render } from "lit-html";
import React from "react"

export const Profile = () => {
  return (
    <div className="profile">
      <div>
        <Shinyaigeek
          // styles={{
          //   height: "300px",
          //   width: "300px",
          //   margin: "0 auto",
          // }}
        />

        <BaseProfile />

        <Divider />

        <GitHubCalender />

        <Divider />

        <div className="history--study element">
          <span className="title">学歴</span>
          <ul>
            <li>2018年:西大和学園高等学校卒業</li>
            <li>2018年:東京大学文科Ⅲ類入学</li>
            <li>2019年:東京大学工学部システム創成学科内定</li>
            <li>2020年:東京大学工学部システム創成学科進学</li>
            <li>???</li>
          </ul>
        </div>

        <Divider />

        <div className="history--job element">
          <span className="title">実務経験歴</span>
          <ul>
            <li>東京総合研究所 webエンジニア</li>
            HTML/CSS/JavaScript/jQuery/PHP
            <li>合同会社MOSHIMOS エンジニア</li>
            PHP/Codeigniter/JavaScript/MySQL
            <li>フリーランス(略)</li>
            React/Vue.js/Next.js/Express/Ruby on Rails/C/C++/Qt
            <li>バナナ新聞社(仮)</li>
            React/Node.js/TypeScript/firebase/Django
          </ul>
        </div>

        <Divider />

        <div className="description">
          <div className="title">About Me</div>
          <p className="content">
            初めまして, 大手町で元気にweb developerをやっています.<br />
            web技術そのもの, そしてwebのエコシステムに興味関心があります.<br />
            web技術全般 ( server | edge | front )-side を触っていて, 特にfrontendをよくやっています.<br />
            web app作成, web app, mediaのパフォーマンスチューニングがほんの少しだけできます.<br />
            OSS にも関心があります<br />
            絶賛就職活動中です.
          </p>
        </div>
      </div>
    </div>
  );
};
