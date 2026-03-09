import {getCustomComponentClass} from "./custom-component";
import {getCustomName} from "./constants";

export const define = (name, renderFn, isTop, extendsTagName) =>
        customElements.define(getCustomName(name), getCustomComponentClass(renderFn, {top: isTop}), {extends: extendsTagName ?? "div"})
