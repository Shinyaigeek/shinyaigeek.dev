import { render } from "lit-html";
import { path2prefetchPath } from "./path2prefetchPath";
import Post from "../Post/Post";
import { Profile } from "../Profile/Profile";
import Home from "../Home/Home";

// TODO: type safe key
export const __shinyaigeek_prefetch: {
  [k: string]: any;
} = {};

export const registerPrefetch = () => {
  const homeAnchor = document.getElementById("link2Home");
  if (homeAnchor) {
    fetch("/prefetch/home").then((res) => {
      homeAnchor.addEventListener("click", (evt) => {
        evt.preventDefault();
        res.json().then((json) => {
          __shinyaigeek_prefetch["home"] = json;
          evt.preventDefault();
          document.title = "しにゃいの学習帳";
          history.pushState(null, "しにゃいの学習帳", "/");
          render(
            <Home items={json.items} prev={json.prev} next={json.next} />,
            document.getElementById("_app")!
          );
        });
      });
    });
  }
  const profileAnchor = document.getElementById("link2profile");
  if (profileAnchor) {
    profileAnchor.addEventListener("click", (evt) => {
      evt.preventDefault();
      document.title = "プロフィール | しにゃいの学習帳";
      history.pushState(null, "プロフィール | しにゃいの学習帳", "/profile");
      render(<Profile />, document.getElementById("_app")!);
    });
  }
  // TODO polyfill
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    if (entry.target.getAttribute("href") === "/profile") {
      return;
    }
    const prefetchPath = path2prefetchPath(entry.target.getAttribute("href"));
    if (prefetchPath) {
      if (!__shinyaigeek_prefetch[prefetchPath]) {
        fetch(prefetchPath).then((res) => {
          res.json().then((json) => {
            __shinyaigeek_prefetch[prefetchPath] = json;
            entry.target.addEventListener("click", (evt) => {
              evt.preventDefault();
              const fields = json.fields;
              console.log(json);
              document.title = fields.title;
              history.pushState(
                null,
                fields.title,
                entry.target.getAttribute("href")
              );
              render(
                <Post fields={fields} />,
                document.getElementById("_app")!
              );
            });
          });
        });
      }
    }
  }, {});

  const linkTags = document.querySelectorAll("a");
  Array.from(linkTags).forEach((link) => {
    observer.observe(link);
  });
};