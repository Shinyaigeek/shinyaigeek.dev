import { path2prefetchPath } from "./path2prefetchPath";
import Post from "../Post/Post";
import { Profile } from "../Profile/Profile";
import Home from "../Home/Home";
import { registerGitHubCalendar } from "../registerGitHubCalendar";

// TODO: type safe key
export const __shinyaigeek_prefetch: {
  [k: string]: any;
} = {};

export const registerPrefetch = () => {
  const homeAnchors = Array.from(document.getElementsByClassName("link2Home"));
  if (homeAnchors.length > 0) {
    if (!__shinyaigeek_prefetch["home"]) {
      fetch("/prefetch/home").then((res) => {
        res.json().then((json) => {
          homeAnchors.forEach((homeAnchor) => {
            homeAnchor.addEventListener("click", (evt) => {
              evt.preventDefault();
              __shinyaigeek_prefetch["home"] = json;
              evt.preventDefault();
              document.title = "shinyaigeek.dev";
              history.pushState(null, "shinyaigeek.dev", "/");
              <Home items={json.items} prev={json.prev} next={json.next} />;
            });
          });
        });
      });
    } else {
      homeAnchors.forEach((homeAnchor) => {
        homeAnchor.addEventListener("click", (evt) => {
          evt.preventDefault();
          evt.preventDefault();
          document.title = "shinyaigeek.dev";
          history.pushState(null, "shinyaigeek.dev", "/");
          <Home
            items={__shinyaigeek_prefetch["home"].items}
            prev={__shinyaigeek_prefetch["home"].prev}
            next={__shinyaigeek_prefetch["home"].next}
          />;
        });
      });
    }
  }
  const profileAnchor = document.getElementById("link2profile");
  if (profileAnchor) {
    profileAnchor.addEventListener("click", (evt) => {
      evt.preventDefault();
      document.title = "プロフィール | shinyaigeek.dev";
      history.pushState(null, "プロフィール | shinyaigeek.dev", "/profile");
      <Profile />;
      registerGitHubCalendar();
    });
  }
  // TODO polyfill
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    if (entry.target.getAttribute("href") === "/profile") {
      return;
    }
    if (entry.target.getAttribute("href")?.startsWith("#")) {
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
              <Post fields={fields} />;
            });
          });
        });
      } else {
        entry.target.addEventListener("click", (evt) => {
          evt.preventDefault();
          const fields = __shinyaigeek_prefetch[prefetchPath].fields;
          document.title = fields.title;
          history.pushState(
            null,
            fields.title,
            entry.target.getAttribute("href")
          );
          <Post fields={fields} />;
        });
      }
    }
  }, {});

  const linkTags = document.querySelectorAll("a");
  Array.from(linkTags).forEach((link) => {
    observer.observe(link);
  });
};
