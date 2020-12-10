import { render } from "lit-html";
import { path2prefetchPath } from "./path2prefetchPath";
import Post from "../Post/Post";

// TODO: type safe key
export const __shinyaigeek_prefetch: {
  [k: string]: any;
} = {};

export const registerPrefetch = () => {
  // TODO polyfill
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    const prefetchPath = path2prefetchPath(entry.target.getAttribute("href"));
    if (prefetchPath) {
      if (!__shinyaigeek_prefetch[prefetchPath]) {
        fetch(prefetchPath).then((res) => {
          res.json().then((json) => {
            __shinyaigeek_prefetch[prefetchPath] = json;
            entry.target.addEventListener("click", (evt) => {
              evt.preventDefault();
              const fields = json.fields
              console.log(json)
              document.title = fields.title
              history.pushState(null, fields.title, entry.target.getAttribute("href"))
              render(<Post fields={fields} />, document.getElementById("_app")!);
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
