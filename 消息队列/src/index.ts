import { decoratorMessageCenter, MessageCenter } from "event-message-center"
import {
    ITaskQueue, IQueueList, IQueues, IState, IQueueTemp, ITaskQueueProps
} from "./type"
@decoratorMessageCenter
export class TaskQueue implements ITaskQueue {
    readonly fix: string = `@~&$`
    readonly messageCenter: MessageCenter
    props: ITaskQueueProps
    queues: IQueueList
    queueTemp: IQueueTemp
    state: IState
    /**
     * @param props: {maxLen:并发峰值} 削峰
     */
    constructor(props: ITaskQueueProps) {
        this.clear()
        props && this.defineProps(props, "props")
        this.init()
    }
    /**
     * 初始化
     */
    private init = () => {
        this.messageCenter.on("push:handler", this.run)
        this.messageCenter.on("run:success:handler", this.run)
        this.messageCenter.on("run:success:handler", this.finish)
        this.messageCenter.on("run:error:handler", this.run)
        this.messageCenter.on("run:error:handler", this.finish)
    }
    private defineProps = (props, key) => {
        Object.defineProperty(this, key, { value: props })
    }
    /**
     * 进入队列
     * @param queue: IQueues 单个队列
     * @returns promise: Promise<void> 当前队列执行结束的异步操作
     */
    push = (queue: IQueues) => {
        this.checkHandler(queue)
        const { resolve, reject, promise } = this.defer()
        const queueName = this.fixStr(queue.name)
        this.queues = this.queues.concat(queue.children.map(defer => ({ defer, name: queueName })))
        this.queueTemp[queueName] = { ...queue, result: [] }
        this.messageCenter.emit("push:handler", reject)
        this.messageCenter.on(queueName, resolve)
        return promise
    }
    /**
     * 移出队列
     * @param length 移出数量
     * @returns queues 移出的队列
     */
    unshift = (length) => {
        return this.queues.splice(0, length)
    }
    /**
     * 异步执行队列:函数的思路是无限递归,通过当前队列状态和数量判断是否执行
     * @param reject 异常函数
     * @returns void 0
     */
    run = async ({ reject }) => {
        if (this.stateProxy() === 'pending') return void 0
        if (this.queues.length === 0) return this.stateProxy("idle")
        this.stateProxy("pending")
        const queues = this.unshift(this.props?.maxLen ?? 10)
        try {
            const res = await Promise.all(queues.map((item, i) => item.defer().catch(error => error)))
            return this.handlerSuccess({ res, queues })
        } catch (error) {
            return this.handlerError({ reject, error, queues })
        }
    }
    /**
     * 初始化整个队列，清除所有数据
     */
    clear = () => {
        this.queues = []
        this.queueTemp = {}
        this.props = null
        this.stateProxy("idle")
        this.messageCenter.clear()
    }
    /**
     * 处理每次队列执行完成后的数据
     * @param data { res, queues, error } 运行结束后的返回值及削峰后的初始队列，一一对应
     */
    private finish = ({ res = [], queues, error = 'err' }) => {
        const { queueTemp } = this
        queues.forEach((it, i) => {
            const item = queueTemp[it.name]
            item?.result.push(res[i] ?? error)
            if (item?.result?.length === item?.children?.length) {
                this.messageCenter.emit(it.name, item?.result)
                queueTemp[it.name] = null
            }
        });
    }
    /**
     * 单次队列执行成功
     * @param data { res, queues }
     * @returns 
     */
    private handlerSuccess = (data) => {
        this.stateProxy("fulfilled")
        return this.messageCenter.emit("run:success:handler", data)
    }
    /**
     * 单次队列执行失败
     * @param data { res, queues, error }
     * @returns 
     */
    private handlerError = (data) => {
        const { reject, error } = data
        this.stateProxy("rejected")
        reject && typeof reject === "function" && reject(error)
        return this.messageCenter.emit("run:error:handler", data)
    }
    /**
     * 设置、获取当前队列的状态
     * @param state 队列状态，有值就修改当前状态，无值就获取当前状态
     * @returns srate 队列的状态
     */
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
        const noFn = i => !i || typeof i !== "function"
        if (queue.children?.length === 0) throw new Error('queue.children.length can not be 0')
        if (queue.children?.find((i) => noFn(i))) throw new Error('queueList should have defer')
    }/**
     * 混淆字符串
     * @param str 需要混淆的字符 
     * @returns 混淆产物
     */
    private fixStr(str) {
        return `${this.fix}${str}`
    }
    /**
     * 优化Promise，避免Promise嵌套
     * @returns {Promise,resolve,reject}
     */
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
/**
 * 装饰器用法
 * @param opts  同TaskQueue中constructor
 * @returns 混入类原型中
 */
export const decoratorTaskQueue = (opts: ITaskQueueProps): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction) => {
        if (!target.prototype.taskQueue) {
            target.prototype.taskQueue = new TaskQueue(opts)
        }
    }
}

export default TaskQueue;