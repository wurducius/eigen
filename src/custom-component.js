import {getStore} from "../project/store";
import {Eigen} from "./eigen";

export const getCustomComponentClass = (renderFm, props) => {
    return class Custom extends HTMLDivElement {
        store
        renderFm
        props
        top

        constructor() {
            super();
            this.store = getStore()
            this.renderFm = renderFm
            this.top = props?.top
            this.props = props

            if (this.top) {
                Eigen.add(this)
            }
        }

        render() {
            this.renderFm(this, this.store, this.props)
        }

        clear() {
            this.innerHTML = ""
        }

        reset() {
            this.clear()
            this.render()
        }

        connectedCallback() {
            this.render()
        }

        disconnectedCallback() {

        }

        adoptedCallback() {

        }

        connectedMoveCallback() {

        }

        attributeChangedCallback() {

        }
    }
}
