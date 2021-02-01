import { render as _render } from "lit-html"

export const render = (el: unknown, target: Element) => {
    _render(el, target)
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}