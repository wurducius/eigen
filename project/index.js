import {getStore} from "./store";
import {PREFIX} from "../src/constants";
import {define} from "../src/define-component";
import {e} from "../src/render-element";
import {Eigen} from "../src/eigen";

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
                id: Element.TdTitle, value: "", placeholder: "Title"
            })
            t.appendChild(input)
            const btn = e("button", {
                onclick: () => {
                    const inputElement = document.getElementById(Element.TdTitle)
                    if (inputElement) {
                        const title = inputElement.value
                        getStore().actions.td.addTd(title)
                    }
                }
            })
            btn.innerHTML = "Add"
            t.appendChild(btn)
        },
        true
)

define(Component.c, (t) => {
    console.log(getStore().data.td.items)
    getStore().data.td.items.forEach((item) => {
        console.log(item)
        const itemParent = e("div", {is: "efl-d", id: item.id})
        const status = item.status
        const titleElement = e("div")
        titleElement.innerHTML = status === "completed" ? item.title + " (completed)" : item.title
        const btn = e("button", {
            onclick: () => {
                if (status === "completed") {
                    getStore().data.td.items = getStore().data.td.items.map((i) => i.id === item.id ? {...i, status: "ready"} : i)
                } else {
                    getStore().data.td.items = getStore().data.td.items.map((i) => i.id === item.id ? {...i, status: "completed"} : i)
                }
                Eigen.reset()
            }
        })
        btn.innerHTML = "X"
        itemParent.appendChild(titleElement)
        itemParent.appendChild(btn)
        t.appendChild(itemParent)
    })
}, true)
