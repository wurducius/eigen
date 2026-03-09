import { getStore } from "./store"
import { define } from "../src/component/define-component"
import { button, div, input } from "../src/simple/simple"
import { handleElement } from "../src/util/dom"

const Component = {
  c: "c",
  input: "input",
}

const Element = {
  TdTitle: "td-add-input",
}

const addTd = () => {
  handleElement(Element.TdTitle, (inputElement) => {
    const title = inputElement.value
    if (title) {
      inputElement.value = ""
      getStore().td.actions.add(title)
      inputElement.focus()
    } else {
      alert("Todo title is empty.")
    }
  })
}

const getTitleByView = (view) => {
  if (view === "all") {
    return "All"
  } else if (view === "ready") {
    return "Ready"
  } else {
    return "Completed"
  }
}

const getBtnClassByView = (view, current) => {
  if (view === current) {
    return "btn-view-current"
  } else {
    return undefined
  }
}

define(
  Component.input,
  (t) => {
    const inputElement = input({
      id: Element.TdTitle,
      value: "",
      placeholder: "To do item title",
      onkeydown: (event) => {
        if (event.key === "Enter") {
          addTd()
        }
      },
    })
    t.appendChild(inputElement)

    const btn = button({ onclick: addTd }, "Add")
    t.appendChild(btn)

    const view = getStore().td.data.view

    const btnViewReady = button(
      { onclick: () => getStore().td.actions.setView("ready"), class: getBtnClassByView(view, "ready") },
      "Ready",
    )
    t.appendChild(btnViewReady)
    const btnViewCompleted = button(
      {
        onclick: () => getStore().td.actions.setView("completed"),
        class: getBtnClassByView(view, "completed"),
      },
      "Completed",
    )
    t.appendChild(btnViewCompleted)
    const btnViewAll = button(
      { onclick: () => getStore().td.actions.setView("all"), class: getBtnClassByView(view, "all") },
      "All",
    )
    t.appendChild(btnViewAll)

    const viewTitle = div(undefined, getTitleByView(getStore().td.data.view))
    t.appendChild(viewTitle)
  },
  "header",
)

const getTdItemsByView = (items, view) => {
  if (view === "all") {
    return items
  } else if (view === "ready") {
    return items.filter((item) => item.status === "ready")
  } else {
    return items.filter((item) => item.status === "completed")
  }
}

define(
  Component.c,
  (t) => {
    const view = getStore().td.data.view
    getTdItemsByView(getStore().td.data.items, view).forEach((item) => {
      const isCompleted = item.status === "completed"

      const itemParent = div({ id: item.id, class: "td-item-parent" })
      t.appendChild(itemParent)

      const itemTitle = isCompleted && view !== "completed" ? item.title + " (completed)" : item.title
      const titleElement = div(undefined, itemTitle)
      itemParent.appendChild(titleElement)

      const onClickComplete = () => {
        getStore().td.actions.complete(item.id)
      }
      const btn = button({ onclick: onClickComplete }, "X")
      itemParent.appendChild(btn)
    })
  },
  "list",
)
