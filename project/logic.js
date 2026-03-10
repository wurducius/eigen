import { getStore } from "./store"
import { handleElement } from "../src/util/dom"
import { Id, TdView } from "./constants"

export const addTd = () => {
  handleElement(Id.TdTitle, (inputElement) => {
    const title = inputElement.value
    if (title) {
      inputElement.value = ""
      getStore().td.actions.add(title)
      inputElement.focus()
    } else {
      logError("Todo title is empty.")
    }
  })
}

export const getBtnClassByView = (view, current) => {
  if (view === current) {
    return "btn-view-current"
  } else {
    return undefined
  }
}

export const getTdItemsByView = (items, view) => {
  if (view === TdView.ALL) {
    return items
  } else if (view === TdView.READY) {
    return items.filter((item) => item.status === TdView.READY)
  } else {
    return items.filter((item) => item.status === TdView.COMPLETED)
  }
}

const logError = (msg) => {
  alert(msg)
}
