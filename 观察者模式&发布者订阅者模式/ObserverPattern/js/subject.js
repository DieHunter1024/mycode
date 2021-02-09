module.exports = class Subject {
    constructor() {
        this.observerList = []
    }
    subscribe(fn) {
        this.observerList.push(fn)
    }
    fireEvent(e) {
        this.observerList.forEach(item => {
            item(e)
        })
    }
}