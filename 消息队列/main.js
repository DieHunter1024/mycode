const SyncTask = require('./syncTask')
const AsyncFn = require('./asyncFn')
const eventBus = require('./eventBus')
let syncTask = new SyncTask(this)
let list = []
let asyncFn = new AsyncFn(list)
syncTask.addTask({
    promiseFn: asyncFn.syncFnA,
    weight: 1
})
syncTask.addTask({
    promiseFn: asyncFn.syncFnC,
    weight: 1
})
syncTask.addTask({
    promiseFn: asyncFn.syncFnB,
    weight: 1
})
eventBus.onEvent('finish', eventFn)
function eventFn (e) {
    console.log(e)
    // eventBus.offEvent('finish',eventFn1)
}
function eventFn1 (e) {
    asyncFn.print()
}