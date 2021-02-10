module.exports = class Observer {
    constructor() {
        this.observerList = []
    }
    subscribe(target, fn) {
        target.observerList.push(fn)
    }
    fireEvent(e) {
        this.observerList.forEach(item => {
            item(e)
        })
    }
}