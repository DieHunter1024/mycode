import { decoratorMessageCenter, MessageCenter } from "event-message-center"
import {
    ITaskQueue, IQueueList, IQueues, IState, IQueueTemp
} from "./type"
@decoratorMessageCenter
class TaskQueue implements ITaskQueue {
    readonly fix: string = `@~&$`
    maxLen: number
    queues: IQueueList
    queueTemp: IQueueTemp
    state: IState
    messageCenter: MessageCenter
    constructor({ maxLen }) {
        this.maxLen = maxLen
        this.clear()
        this.init()
    }
    private init = () => {
        this.messageCenter.on("push:handler", this.run)
        this.messageCenter.on("run:success:handler", this.run)
        this.messageCenter.on("run:error:handler", this.run)
    }
    push = (queue: IQueues) => {
        this.checkHandler(queue)
        const { resolve, reject, promise } = this.defer()
        const queueName = this.fixStr(queue.name)
        this.queues = this.queues.concat(queue.children.map(i => ({ ...i, name: queueName })))
        this.queueTemp[queueName] = { ...queue, result: [] }
        this.messageCenter.emit("push:handler", reject)
        this.messageCenter.on(queueName, resolve)
        return promise
    }
    unshift = (length) => {
        return this.queues.splice(0, length)
    }
    run = async (reject) => {
        if (this.stateProxy() === 'pending') return void 0
        if (this.queues.length === 0) return this.stateProxy("idle")
        this.stateProxy("pending")
        const queues = this.unshift(this.maxLen)
        try {
            const res = await Promise.all(queues.map(async i => await i.defer(i.params)))
            this.finish(res, queues)
            this.stateProxy("fulfilled")
            return this.messageCenter.emit("run:success:handler", res)
        } catch (error) {
            this.stateProxy("rejected")
            reject && reject(error)
            return this.messageCenter.emit("run:error:handler", error)
        }
    }
    clear = () => {
        this.queues = []
        this.queueTemp = {}
        this.stateProxy("idle")
        this.messageCenter.clear()
    }
    private finish = (res, queues) => {
        const { queueTemp } = this
        queues.forEach((it, i) => {
            const item = queueTemp[it.name]
            item?.result.push(res[i])
            if (item?.result?.length === item?.children?.length) {
                this.messageCenter.emit(it.name, item?.result)
                queueTemp[it.name] = null
            }
        });
    }

    private stateProxy = (state?: IState) => {
        state && (this.state = state)
        return this.state
    }
    /**
     * 检查参数是否符合标准
     * @param queue 队列或队列集合
     */
    private checkHandler(queue: IQueues) {
        if (!queue) {
            throw new ReferenceError('queue is not defined')
        }
        if (!(queue.children instanceof Array) || typeof queue !== "object") {
            throw new TypeError(`queue should be an object and queue.children should be an array`);
        }
        const noFn = i => !i.defer || typeof i.defer !== "function"
        if (queue.children?.length === 0) throw new Error('queue.children.length can not be 0')
        if (queue.children?.find((i) => noFn(i))) throw new Error('queueList should have defer')
    }
    private fixStr(str) {
        return `${this.fix}${str}`
    }
    private defer = () => {
        let resolve, reject
        return {
            promise: new Promise<void>((_resolve, _reject) => {
                resolve = _resolve
                reject = _reject
            }),
            resolve, reject
        }
    }
}
const syncFn = (args) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve(args)
        }, 1000);
    })
};

const createFnList = (length, name) => {
    const task = {
        name, children: []
    }
    while (length--) {
        task.children.push({
            defer: syncFn, params: 'args'
        })
    }
    return task
}
const taskQueue = new TaskQueue({ maxLen: 3 })
const task = createFnList(10, "task1")
const task2 = createFnList(2, "task2")
const task3 = createFnList(4, "task3")
const task4 = createFnList(11, "task4")
taskQueue.push(task).then((res) => {
    console.log(res)
})
taskQueue.push(task2).then((res) => {
    console.log(res)
})
taskQueue.push(task3).then((res) => {
    console.log(res)
})
taskQueue.push(task4).then((res) => {
    console.log(res)
})




