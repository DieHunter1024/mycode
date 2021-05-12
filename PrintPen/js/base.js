export default class Base {
    constructor(ele) {
        this.ele = ele
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