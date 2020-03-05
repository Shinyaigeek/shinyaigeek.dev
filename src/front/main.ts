import emailjs from "emailjs-com";

const handleHamburger = () => {
  const target = document.getElementById("hamburger--menu")!;
  const drawer = document.getElementById("drawer")!;
  if (target.className === "hamburger--menu__trigger") {
    target.className = "hamburger--menu__trigger__active";
    drawer.className = "drawer--active";
  } else {
    target.className = "hamburger--menu__trigger";
    drawer.className = "drawer";
  }
};

const handleMailForm = () => {
  const target = document.getElementById("modal--mailform")!;
  const layer = document.getElementById("layer")!;
  if (target.className === "modal--mailform") {
    target.className = "modal--mailform__active";
    layer.className = "layer--active";
  } else {
    target.className = "modal--mailform";
    layer.className = "layer";
  }
};

const mailSubmit = async () => {
  const template_params = {
    reply_to: (document.getElementById(
      "mailform--name__form"
    ) as HTMLInputElement).value,
    subject: (document.getElementById(
      "mailform--subject__form"
    ) as HTMLInputElement).value,
    from_name: (document.getElementById(
      "mailform--mailaddress__form"
    ) as HTMLInputElement).value,
    message_html: (document.getElementById(
      "mailform--textarea"
    ) as HTMLInputElement).value,
    url: location.href
  };
  const service_id = "default_service";
  const template_id = "template_vmKwN61k";
  const user_id = "user_lxYZJTHqNDAhtluEIHAmV";
  await emailjs
    .send(service_id, template_id, template_params, user_id)
    .then(() => {
      // notification.open({
      //   icon: (
      //     // <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      //     <CheckCircleOutlined />
      //   ),
      //   message: (
      //     <div className="contact--message">
      //       メッセージの送信に成功しました！
      //     </div>
      //   ),
      //   placement: "bottomRight"
      // });
    })
    .catch(() => {
      //   notification.open({
      //     message: (
      //       <div className="contact--message">
      //         <div>メッセージの送信に失敗しました</div>
      //         <div
      //           className="contact--message__again"
      //           onClick={() => this.props.setShowContactModal()}
      //         >
      //           Again?
      //         </div>
      //       </div>
      //     ),
      //     //   icon: <Icon type="warning" theme="twoTone" twoToneColor="#eb2f96" />,
      //     icon: <WarningOutlined />,
      //     placement: "bottomRight"
      //   });
    });
};

const mount = () => {
  document
    .getElementById("hamburger--menu")!
    .addEventListener("click", e => handleHamburger());

  document
    .getElementById("header--contents__contact")!
    .addEventListener("click", e => handleMailForm());

  document
    .getElementById("header--modal__contact")!
    .addEventListener("click", e => handleMailForm());

  document
    .getElementById("thatsme--contact")!
    .addEventListener("click", e => handleMailForm());

  document
    .getElementById("layer")!
    .addEventListener("click", e => handleMailForm());
};

mount();
