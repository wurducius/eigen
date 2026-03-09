import { Eigen } from "../src/core/eigen"
import { generateId } from "../src/util/math"

export const Top = {
  HEADER: "header",
  LIST: "list",
}

export const TdView = {
  READY: "ready",
  COMPLETED: "completed",
  ALL: "all",
}

const createItem = (title) => ({
  id: generateId(),
  title,
  status: TdView.READY,
  created: new Date(),
  modified: new Date(),
})

const store = {
  td: {
    data: {
      items: [],
      view: TdView.READY,
    },
    actions: {
      add: (title) => {
        const nextItem = createItem(title)
        store.td.data.items.push(nextItem)
        Eigen.reset(Top.LIST)
      },
      complete: (id) => {
        const item = store.td.data.items.find((i) => i.id === id)
        if (item) {
          const nextStatus = item.status === TdView.COMPLETED ? TdView.READY : TdView.COMPLETEDe
          getStore().td.data.items = getStore().td.data.items.map((i) =>
            i.id === item.id ? { ...i, status: nextStatus } : i,
          )
          Eigen.reset(Top.LIST)
        }
      },
      setView: (nextView) => {
        store.td.data.view = nextView
        Eigen.reset([Top.HEADER, Top.LIST])
      },
    },
  },
}

export const getStore = () => store
