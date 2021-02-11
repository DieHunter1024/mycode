const EventBus = require('./js/eventBus')
let list = [], //记录异步操作
    count = 0, //计数器
    timeTick = setInterval(function () {
        if (count++ > 3) { //当执行到一定时间时，销毁事件、定时器
            EventBus.offEvent('finish', eventHandler)
            clearInterval(timeTick)
        }
        list.push(count)
        EventBus.emitEvent('finish', {
            list
        })
    }, 1000)

EventBus.onEvent('finish', eventHandler)

function eventHandler(e) {
    console.log(e)
    // { list: [ 1 ] }
    // { list: [ 1, 2 ] }
    // { list: [ 1, 2, 3 ] }
    // { list: [ 1, 2, 3, 4 ] }
}