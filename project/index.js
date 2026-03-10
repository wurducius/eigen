import { getStore } from "./store"
import { define } from "../src/component/define-component"
import { button, div, input } from "../src/simple/simple"
import { addTd, getBtnClassByView, getTdItemsByView } from "./logic"
import { Component, Id, TdView, Top } from "./constants"

const tdTabs = (x) => {
  const t = div({ class: "row" })
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
  x.appendChild(t)
}

const tdAddForm = (x) => {
  const t = div({ class: "row" })
  const onPressEnter = (event) => {
    if (event.key === "Enter") {
      addTd()
    }
  }
  const inputElement = input({
    id: Id.TdTitle,
    value: "",
    placeholder: "To do item title",
    onkeydown: onPressEnter,
  })
  t.appendChild(inputElement)

  const btn = button(
    {
      onclick: addTd,
    },
    "Add",
  )
  t.appendChild(btn)
  x.appendChild(t)
}

define(
  Component.tdHeader,
  (t) => {
    const container = div({ class: "container" })
    container.appendChild(div({}, "Todo list"))
    tdTabs(container)
    tdAddForm(container)
    t.appendChild(container)
  },
  Top.HEADER,
)

define(
  Component.tdList,
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
