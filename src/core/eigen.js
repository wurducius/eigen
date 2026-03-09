export const Eigen = {
    top: {},
    allTop: [],
    add: (keys, instance) => {
        if (typeof keys === "boolean" && keys) {
            Eigen.allTop.push(instance);
        } else if (keys) {
            if (Array.isArray(keys)) {
                keys.forEach((key) => {
                    if (Eigen.top[key]) {
                        Eigen.top[key].push(instance);
                    } else {
                        Eigen.top[key] = [instance]
                    }
                })
            } else {
                if (Eigen.top[keys]) {
                    Eigen.top[keys].push(instance);
                } else {
                    Eigen.top[keys] = [instance]
                }
            }
        }
    },
    reset: (keys) => {
        Eigen.allTop.forEach((instance) => {
            instance.reset()
        })
        if (keys) {
            if (Array.isArray(keys)) {
                keys.forEach((key) => {
                    Eigen.top[key]?.forEach((instance) => {
                        instance.reset()
                    })
                })
            } else {
                Eigen.top[keys]?.forEach((instance) => {
                    instance.reset()
                })
            }
        }
    }
}
