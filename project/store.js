import {Eigen} from "../src/eigen";

const generateId = () => Math.random().toString(36).substr(2, 5)

export const createItem = (title) => ({
    id: String(generateId()),
    title,
    status: "ready",
    created: new Date(),
    modified: new Date()
})

const store = {
    td: {
        data: {
            items: [],
        },
        actions: {
            add: (title) => {
                const nextItem = createItem(title)
                store.td.data.items.push(nextItem)
                Eigen.reset()
            },
            complete: (id) => {
                const item = store.td.data.items.find(i => i.id === id)
                if (item) {
                    const nextStatus = item.status === "completed" ? "ready" : "completed"
                    getStore().td.data.items = getStore().td.data.items.map((i) => i.id === item.id ? {...i, status: nextStatus} : i)
                    Eigen.reset()
                }
            }
        }
    },
}

export const getStore = () => store
