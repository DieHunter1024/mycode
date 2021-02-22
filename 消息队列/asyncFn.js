module.exports = class AsyncFn {
    constructor () {
    }

    syncFnA () {
        return new Promise((res) => {
            setTimeout(() => {
                res('A')
            }, 500)
        })
    }

    syncFnB () {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('B')
            }, 1500)
        })
    }

    syncFnC () {
        return new Promise((res) => {
            setTimeout(() => {
                res('C')
            }, 1000)
        })
    }
}
