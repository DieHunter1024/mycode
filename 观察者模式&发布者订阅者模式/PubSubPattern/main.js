const eventBus = require('./js/eventBus')
let list = [],
    count = 0,
    timeTick = setInterval(function () {
        if (count++ > 3) {
            eventBus.offEvent('finish', eventHandler)
            clearInterval(timeTick)
        }
        list.push(count)
        eventBus.emitEvent('finish', {
            list
        })
    }, 1000)

eventBus.onEvent('finish', eventHandler)

function eventHandler(e) {
    console.log(e)
}