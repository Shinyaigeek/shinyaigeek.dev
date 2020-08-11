import { Component } from "solid-js";
import { router } from "../../routing/router";
import { render } from "solid-js/types/dom";

export interface LinkProps {
  href: string;
  label: string | React.ReactElement;
  className?: string;
  id?: string;
}

export const Link: Component<LinkProps> = (props) => {
  const onClick = (evt: MouseEvent) => {
    const meta = evt.metaKey;
    const ctrl = evt.ctrlKey;
    evt.preventDefault();

    router
      .resolve({
        pathname: props.href,
      })
      .then((component) => {
        if (!component || component instanceof Promise) {
          // TODO
          throw new Error("");
        }
        if (document) {
          if (meta || ctrl) {
            window.open(props.href);
          } else {
            history.pushState(null, "", props.href);
            render(component, document.getElementById("app")!);
          }
        } else {
          // TODO
        }
      });
  };

  return (
    <>
      <a
        className={`link ${props.className}`}
        id={props.id || ""}
        href={`${props.href}`}>
        {props.label}
      </a>
    </>
  );
};
