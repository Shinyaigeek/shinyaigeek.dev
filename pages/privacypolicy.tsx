import React from "react";
import { NextPage } from "next";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";
import Head from "next/head";

const PripacyPolicy: NextPage<WithRouterProps> = () => {
  return (
    <div>
      <Head>
        <title>しにゃいの学習帳</title>
        <meta name="description" content="webが大好きな大学生のブログ" />
        <meta http-equiv="content-language" content="ja" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="しにゃい" />
        <meta property="og:url" content="https://www.shinyaigeek.com" />
        <meta property="og:title" content="しにゃいの学習帳" />
        <meta property="og:description" content="webが大好きな大学生のブログ" />
        <meta
          property="og:image"
          content="https://wwwc.shinyaigeek.com/icon.png"
        />
        <meta name="twitter:site" content="@Shinyaigeek" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/static/icon.png" />
      </Head>
      <h4>広告の配信について</h4>
      当サイトは第三者配信の広告サービス「Google Adsense
      グーグルアドセンス」を利用しています。
      <br />
      <br />
      広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
      <br />
      <br />
      Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「広告
      – ポリシーと規約 – Google」をご覧ください。
      <br />
      <br />
      また、[サイト名]は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      <br />
      <br />
      第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
      <br />
      <br />
      <h4>アクセス解析ツールについて</h4>
      当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
      <br />
      <br />
      このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはここをクリックしてください。
      <br />
      <br />
      <h4>当サイトへのコメントについて</h4>
      当サイトでは、スパム・荒らしへの対応として、コメントの際に使用されたIPアドレスを記録しています。
      <br />
      <br />
      これはブログの標準機能としてサポートされている機能で、スパム・荒らしへの対応以外にこのIPアドレスを使用することはありません。また、メールアドレスとURLの入力に関しては、任意となっております。全てのコメントは管理人が事前にその内容を確認し、承認した上での掲載となりますことをあらかじめご了承下さい。加えて、次の各号に掲げる内容を含むコメントは管理人の裁量によって承認せず、削除する事があります。
      <br />
      <br />
      ・特定の自然人または法人を誹謗し、中傷するもの。
      <br />
      <br />
      ・極度にわいせつな内容を含むもの。
      <br />
      <br />
      ・禁制品の取引に関するものや、他者を害する行為の依頼など、法律によって禁止されている物品、行為の依頼や斡旋などに関するもの。
      <br />
      <br />
      ・その他、公序良俗に反し、または管理人によって承認すべきでないと認められるもの。
      <br />
      <br />
      <h4>免責事項</h4>
      当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
      <br />
      <br />
      当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
      <br />
      <br />
      当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
      <br />
      <br />
      当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      <br />
    </div>
  );
};

export default withRouter(PripacyPolicy);
