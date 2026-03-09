export const handleElement = (id, handler) => {
    const element = document.getElementById(id)
    if (element) {
        handler(element)
    }
}
