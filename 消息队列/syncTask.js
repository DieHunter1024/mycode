const eventBus = require('./eventBus')
const _state = {
    'waiting': "waiting", //状态值，当前有函数正在运行
    'finish': "finish" //状态值，当前队列空闲
}

module.exports = class SyncTask {
    constructor(app) { //app是全局作用域
        this.taskList = [] //任务列表
        this.queueIndex = 0 //队列索引，不能取小于0的权重
        this.state = null //当前队列状态
        return this
    }

    addTask(fnConfig) {
        let item = this.taskList[fnConfig.weight]
        if (!item) { //任务队列未找到该索引时，新建异步队列
            item = []
        }
        this.resetQueueIndex(fnConfig) //传入的方法权重高于即将执行的任务队列索引时，重置索引值
        fnConfig.isRun = false //函数默认值，未执行
        item.push(fnConfig)
        this.taskList[fnConfig.weight] = item
        if (this.state !== _state['waiting']) { //当前队列空闲时，执行队列
            this.queueTask()
        }
    }

    queueTask() {
        let task = this.taskList,
            tiskItem = task[this.queueIndex]
        if (this.queueIndex > task.length - 1) { //执行完数组最后一项时跳出
            return
        }
        if (!tiskItem) {
            this.runNextTick() //避免传入不连续索引值
            return
        }
        this.state = _state['waiting']
        let _taskList = tiskItem.map(item => {
            if (!item.isRun) {
                item.isRun = true
                return item['promiseFn']()
            }
        })
        // console.log(JSON.stringify(task))
        Promise.all(_taskList).then(() => { //在同一权重列表中的函数同时开始执行
            eventBus.emitEvent('finish', this.queueIndex)
            this.runNextTick()
        })
    }

    runNextTick() {
        this.state = _state['finish'] //设置当前队列空闲
        this.queueIndex++
        this.queueTask() //执行下一级权重函数集合
    }

    resetQueueIndex(fnConfig) {
        if (fnConfig.weight <= this.queueIndex) {
            this.queueIndex = fnConfig.weight - 1 //不能赋值为当前索引值，因为函数执行是异步的，设置索引值时函数已经执行了
        }
    }
}