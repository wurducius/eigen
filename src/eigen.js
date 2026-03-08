export const Eigen = {
    top: [],
    add: (instance) => {
        Eigen.top.push(instance)
        //    Core.reset()
    },
    reset: () => {
        Eigen.top.forEach((instance) => {
            instance.reset()
        })
    }
}
