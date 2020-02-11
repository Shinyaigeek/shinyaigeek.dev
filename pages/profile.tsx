import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import { Icon, Button, Divider, } from "antd";

import "../style/profile.scss"

interface Props {
  setShowContactModal:Function
}

const Profile: NextPage<Props> = (props:Props) => {
  return (
    <div className="profile">
      <Head>
        <title>しにゃいの学習帳｜プロフィール</title>
        <meta
          name="description"
          content="しにゃいのブログ。主に技術のことについて語ります。Node.jsが好き"
        />
        <meta http-equiv="content-language" content="ja" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="しにゃい" />
        <meta property="og:url" content="https://www.shinyaigeek.com" />
        <meta property="og:title" content="しにゃいの学習帳" />
        <meta
          property="og:description"
          content="しにゃいのブログ。主に技術のことについて語ります。Node.jsが好き"
        />
        <meta
          property="og:image"
          content="/static/icon.png"
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:site" content="@Shinyaigeek" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/static/icon.png" />
      </Head>
      <div>
        <img src="/static/icon.png" alt="icon"/>
        <div className="name">しにゃい/Shinyaigeek</div>
        <div className="social">
          <div className="twitter">
            <Icon type="twitter" style={{ color: "#38A1F3" }} />:
            <a href="https://twitter.com/Shinyaigeek">@Shinyaigeek</a>
          </div>

          <div className="github">
            <Icon type="github" style={{ color: "#000" }} />:
            <a href="https://github.com/Shinyaigeek">@Shinyaigeek</a>
          </div>

          <div className="linkedin">
            <Icon type="linkedin" style={{ color: "#0077B5" }} theme="filled" />
            :<a href="https://www.linkedin.com/in/shinyaigeek/">@Shinyaigeek</a>
          </div>
        </div>

        <Button
          type="primary"
          shape="round"
          icon="mail"
          size="large"
          style={{ margin: "12px auto", display: "block" }}
          onClick={() => props.setShowContactModal()}
        >
          Contact Me
        </Button>

        <Divider />

        <div className="history--study">
          <span className="title">学歴</span>
          <ul>
            <li>2018年:西大和学園高等学校卒業</li>
            <li>2018年:東京大学文科Ⅲ類入学</li>
            <li>2019年:東京大学工学部システム創成学科内定</li>
            <li>???</li>
          </ul>
        </div>

        <Divider />

        <div className="history--job">
          <span className="title">実務経験歴</span>
          <ul>
            <li>東京総合研究所 webエンジニア</li>
            HTML/CSS/JavaScript/jQuery/PHP
            <li>合同会社MOSHIMOS エンジニア</li>
            PHP/Codeigniter/JavaScript/MySQL
            <li>フリーランス(略)</li>
            React.js/Vue.js/Next.js/Express/Ruby on Rails/C/C++/Qt
            <li>???(規定上オフレコのみ)</li>
            React.js/Node.js/TypeScript/firebase
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

export default Profile;
