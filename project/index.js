import {getStore} from "./store";
import {getCustomName} from "../src/constants";
import {define} from "../src/define-component";
import {button, div, input} from "../src/simple/simple";
import {handleElement} from "../src/dom";

const Component = {
    c: "c",
    d: "d",
    input: "input",
}

const Element = {
    TdTitle: "td-add-input"
}

const addTd = () => {
    handleElement(Element.TdTitle, (inputElement) => {
        const title = inputElement.value
        if (title) {
            inputElement.value = ""
            getStore().td.actions.add(title)
        } else {
            alert("Todo title is empty.")
        }
    })
}

define(Component.input, (t) => {
            const inputElement = input({id: Element.TdTitle, value: "", placeholder: "Title"})
            t.appendChild(inputElement)

            const btn = button({onclick: addTd}, "Add")
            t.appendChild(btn)
        },
        true
)

define(Component.c, (t) => {
    getStore().td.data.items.forEach((item) => {
        const isCompleted = item.status === "completed"

        const itemParent = div({is: getCustomName(Component.d), id: item.id, class: "td-item-parent"})
        t.appendChild(itemParent)

        const itemTitle = isCompleted ? item.title + " (completed)" : item.title
        const titleElement = div(undefined, itemTitle)
        itemParent.appendChild(titleElement)

        const onClickComplete = () => {
            getStore().td.actions.complete(item.id)
        }
        const btn = button({onclick: onClickComplete}, "X")
        itemParent.appendChild(btn)
    })
}, true)
