import { getBlogPosts } from "../../../util/getBlogPosts";
import { getBlogPost } from "../../../util/getBlogPost";
import { ReactElement } from "react";

interface Props {
  to: "/" | "/post" | "/profile";
  postId: string;
  children: ReactElement;
}

export const Link = (props: Props) => {
  return (
    <a
      onClick={async (evt) => {
        evt.preventDefault();
        const meta = evt.metaKey;
        const ctrl = evt.ctrlKey;
        if(meta || ctrl) {
            window.open(props.to)
        }
        if (props.to === "/") {
          const json = await getBlogPosts({
            slug: "/",
          });
          if (json) {
          }
        } else if (props.to === "/post") {
          getBlogPost(props.postId);
        } else {
        }
      }}>
      {props.children}
    </a>
  );
};
