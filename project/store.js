import {Eigen} from "../src/core/eigen";
import {generateId} from "../src/util/math";

const createItem = (title) => ({
    id: generateId(),
    title,
    status: "ready",
    created: new Date(),
    modified: new Date()
})

const store = {
    td: {
        data: {
            items: [],
            view: "ready"
        },
        actions: {
            add: (title) => {
                const nextItem = createItem(title)
                store.td.data.items.push(nextItem)
                Eigen.reset("list")
            },
            complete: (id) => {
                const item = store.td.data.items.find(i => i.id === id)
                if (item) {
                    const nextStatus = item.status === "completed" ? "ready" : "completed"
                    getStore().td.data.items = getStore().td.data.items.map((i) => i.id === item.id ? {...i, status: nextStatus} : i)
                    Eigen.reset("list")
                }
            },
            setView: (nextView) => {
                store.td.data.view = nextView
                Eigen.reset(["header", "list"])
            }
        }
    },
}

export const getStore = () => store
