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
    data: {
        td: {
            itemIds: [],
            items: [],
            addTitle: "",
        }
    },
    actions: {
        td: {
            saveTd: (item) => {
                store.data.td.items.push(item)
                store.data.td.itemIds.push(item.id)
                Eigen.reset()
            },
            mergeTd: (item) => {
                const savedId = store.data.td.itemIds.find(s => s === item.id)
                let result = {}
                if (savedId) {
                    const savedIndex = store.data.td.items.findIndex(item => item.id === savedId)
                    const saved = store.data.td.items[savedIndex]
                    result = { ...saved, ...item }
                    store.data.td.items[savedIndex] = { ...result }
                } else {
                    result = item
                    store.actions.td.saveTd(item.title)
                }
                store.actions.td.saveTd(result)
            },
            addTd: (title) => {
                if (title) {
                    store.actions.td.resetTdTitle()
                    const nextItem = createItem(title)
                    store.actions.td.saveTd(nextItem)
                } else {
                    alert("Todo title is empty.")
                }
            },
            setTdTitle: (title) => {
                store.data.td.addTitle = title
            },
            resetTdTitle: () => {
                store.actions.td.setTdTitle("")
            },
            modifyTd: (title) => {
                const nextItem = createItem(title)
            },
        },
    }
}

export const getStore = () => store
