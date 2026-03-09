import { getStore, TdView, Top } from "./store"
import { define } from "../src/component/define-component"
import { button, div, input } from "../src/simple/simple"
import { addTd, getBtnClassByView, getTdItemsByView, getTitleByView } from "./logic"

const Component = {
  c: "c",
  input: "input",
}

const Element = {
  TdTitle: "td-add-input",
}

define(
  Component.input,
  (t) => {
    const onPressEnter = (event) => {
      if (event.key === "Enter") {
        addTd()
      }
    }
    const inputElement = input({
      id: Element.TdTitle,
      value: "",
      placeholder: "To do item title",
      onkeydown: onPressEnter,
    })
    t.appendChild(inputElement)

    const btn = button({ onclick: addTd }, "Add")
    t.appendChild(btn)

    const view = getStore().td.data.view

    const btnViewReady = button(
      { onclick: () => getStore().td.actions.setView(TdView.READY), class: getBtnClassByView(view, TdView.READY) },
      "Ready",
    )
    t.appendChild(btnViewReady)
    const btnViewCompleted = button(
      {
        onclick: () => getStore().td.actions.setView(TdView.COMPLETED),
        class: getBtnClassByView(view, TdView.COMPLETED),
      },
      "Completed",
    )
    t.appendChild(btnViewCompleted)
    const btnViewAll = button(
      { onclick: () => getStore().td.actions.setView(TdView.ALL), class: getBtnClassByView(view, TdView.ALL) },
      "All",
    )
    t.appendChild(btnViewAll)

    const viewTitle = div(undefined, getTitleByView(getStore().td.data.view))
    t.appendChild(viewTitle)
  },
  Top.HEADER,
)

define(
  Component.c,
  (t) => {
    const view = getStore().td.data.view
    getTdItemsByView(getStore().td.data.items, view).forEach((item) => {
      const isCompleted = item.status === TdView.COMPLETED

      const itemParent = div({ id: item.id, class: "td-item-parent" })
      t.appendChild(itemParent)

      const itemTitle = isCompleted && view !== TdView.COMPLETED ? item.title + " (completed)" : item.title
      const titleElement = div(undefined, itemTitle)
      itemParent.appendChild(titleElement)

      const onClickComplete = () => {
        getStore().td.actions.complete(item.id)
      }
      const btn = button({ onclick: onClickComplete }, "X")
      itemParent.appendChild(btn)
    })
  },
  Top.LIST,
)
