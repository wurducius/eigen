const renderElement = (element) => (children) => {
    if (typeof children === "string") {
        element.innerHTML = element.innerHTML + children
    } else {
        element.appendChild(children)
    }
}

export const e = (tagName, attributes, children) => {
    const element = document.createElement(tagName);
    if (attributes) {
        Object.keys(attributes).forEach(attributeName => {
            const attributeValue = attributes[attributeName]
            element.setAttribute(attributeName, attributeValue)
        })
    }
    if (children) {
        if (Array.isArray(children)) {
       //     children.forEach(renderElement(element))
        }
    }else {
     //   renderElement(element)(children)
    }
    return element
}
