import {getStore} from "./store";
import {PREFIX} from "../src/constants";
import {define} from "../src/define-component";
import {e} from "../src/render-element";

const Component = {
    c: `${PREFIX}c`,
    d: `${PREFIX}d`,
    input: `${PREFIX}input`,
}

const Element = {
    TdTitle: "td-add-input"
}

define(Component.input, (t) => {
            const input = e("input", {
                id: Element.TdTitle, value: getStore().data.td.addTitle, placeholder: "Title", onchange: (e) => {
                    getStore().data.td.addTitle = e.target.value
                }
            })
            t.appendChild(input)
            const btn = document.createElement("button")
            btn.setAttribute("type", "button")
            btn.onclick = () => {
                const inputElement = document.getElementById(Element.TdTitle)
                if (inputElement) {
                    const title = inputElement.value
                    getStore().actions.td.addTd(title)
                }
            }
            btn.innerHTML = "Add"
            t.appendChild(btn)
        },
        true
)

define(Component.c, (t) => {
    getStore().data.td.items.forEach((item) => {
        const element = e("div", { is: "efl-d", id: item.id})
        element.innerHTML = item.title ?? ""
        t.appendChild(element)
    })}, true)

define(Component.d, (t) => {
    const id = t.getAttribute("id")
    const item = getStore().data.td.items.find((item) => item.id === id)
    if (item) {
        t.innerHTML = item.title
    }
})
