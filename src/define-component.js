import {getCustomComponentClass} from "./custom-component";

export const define = (name, renderFn, isTop, extendsTagName) =>
        customElements.define(name, getCustomComponentClass(renderFn, {top: isTop}), {extends: extendsTagName ?? "div"})
