import React from "react";
import { Layout } from "../components/Layout";
import { Divider } from "../components/Divider";
import { MyIcon } from "../components/MyIcon";
import { BaseProfile } from "../components/BaseProfile";
import { GitHubCalender } from "../components/GitHubCalender";

const Profile = () => {
  return (
    <div className="profile">
      <div>
        <MyIcon
          styles={{
            height: "300px",
            width: "300px",
            margin: "0 auto",
          }}
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
            <li>ジャングル新聞社(仮)</li>
            React/Node.js/TypeScript/firebase/Django
          </ul>
        </div>

        <Divider />

        <div className="description">
          <div className="title">About Boku</div>
          初めまして。
          <br />
          しにゃいといいます。大学生をしながら大手町にてコード書いています。
          <br />
          主にweb系が、特にフロントエンドがちょっと出来ます。
          <br />
          お仕事の連絡については連絡して頂ければ考えます。
          <br />
          ただそのお仕事の内容や時期によって僕の力がフルに発揮できない、つまり僕の技術力やタスクによっては誠に恐縮ながらお断りさせて事もいただく事もあります。
          <br />
        </div>
      </div>
    </div>
  );
};

export default Layout(Profile);
