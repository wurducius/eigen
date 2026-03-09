import { getCustomComponentClass } from "./custom-component"
import { EIGEN_CUSTOM_COMPONENT_PREFIX } from "../constants"

export const getCustomName = (name) => `${EIGEN_CUSTOM_COMPONENT_PREFIX}${name}`

export const define = (name, renderFn, isTop, extendsTagName) =>
  customElements.define(getCustomName(name), getCustomComponentClass(renderFn, { top: isTop }), {
    extends: extendsTagName ?? "div",
  })
