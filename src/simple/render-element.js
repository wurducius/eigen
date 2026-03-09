import { EIGEN_RENDER_TEXT_CONTENT_SEPARATOR } from "../constants"

const HTML_PROPERTY_HANDLERS = ["onchange", "onblur", "onclick", "onkeydown", "onkeyup"]

const renderAttributes = (element, attributes) => {
  if (attributes) {
    Object.keys(attributes).forEach((attributeName) => {
      const attributeValue = attributes[attributeName]
      if (HTML_PROPERTY_HANDLERS.includes(attributeName)) {
        element[attributeName] = attributeValue
      } else {
        element.setAttribute(attributeName, attributeValue)
      }
    })
  }
}

const renderChild = (element) => (children) => {
  if (children) {
    if (typeof children === "string") {
      if (element.innerHTML) {
        element.innerHTML = element.innerHTML + EIGEN_RENDER_TEXT_CONTENT_SEPARATOR + children
      } else {
        element.innerHTML = children
      }
    } else {
      element.appendChild(children)
    }
  }
}

const renderChildren = (element, children) => {
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(renderChild(element))
    } else {
      renderChild(element)(children)
    }
  }
}

export const eImpl = (tagName) => (attributes, children) => {
  const element = document.createElement(tagName)
  renderAttributes(element, attributes)
  renderChildren(element, children)
  return element
}

export const e = (tagName, attributes, children) => eImpl(tagName)(attributes, children)
