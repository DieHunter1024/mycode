export default class Base {
    constructor(ele, dom, window) {
        this.ele = ele
        this.dom = dom
        this.window = window
        return this;
    }

    clearDefaultEvent(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    getClient(target) {
        return {
            x: target.clientX,
            y: target.clientY
        }
    }
}