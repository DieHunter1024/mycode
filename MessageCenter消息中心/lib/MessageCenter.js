const MessageCenter = class {
    constructor() {
        this._eventList = {} //调度中心列表
    }
    static Instance() { //返回当前类的实例的单例
        !MessageCenter._instance && Object.defineProperty(MessageCenter, "_instance", {
            value: new MessageCenter()
        });
        return MessageCenter._instance;
    }
    on(type, handler) {
        if (!checkArgs(type, handler)) {
            return
        }
        //若调度中心未找到该事件的队列，则新建某个事件列表（可以对某个类型的事件注册多个回调函数）
        !isKeyInObj(this._eventList, type) && (this._eventList[type] = new Array())
        this._eventList[type].push(handler)
    }
    un(type, handler) {
        if (!type) {
            return
        }
        const fnList = this._eventList[type]
        if (type && (!handler || typeof handler !== 'function')) {
            this._eventList[type] = null
            return
        }
        for (let i = 0; i < fnList.length; i++) {
            fnList[i] && fnList[i] === handler && (this._eventList[type][i] = null)
        }
    }
    once(type, handler) {
        if (!checkArgs(type, handler)) {
            return
        }
        const _handler = (args) => {
            this.un(type, _handler)
            handler(args)
        }
        this.on(type, _handler)
    }
    emit(type, module) {
        if (!type) {
            return
        }
        const fnList = this._eventList[type]
        if (!fnList) {
            return
        }
        isKeyInObj(this._eventList, type) && fnList.map(_ => _ && _(module))
    }
    clear() {
        this._eventList = {}
    }
}

/**
 * 检查对象是否包含该属性，除原型链
 * @param obj 被检查对象
 * @param key 被检查对象的属性
 */
function isKeyInObj(obj, key) {
    return Object.hasOwnProperty.call(obj, key)
}
/**
 * 检查参数是否符合标准
 * @param type 事件名
 * @param handler 事件钩子
 */
function checkArgs(type, handler) {
    if (!type) {
        return
    }
    if (!handler || typeof handler !== 'function') {
        throw new Error('handler is not defined or not a function at arguements[1]')
    }
    return true
}
exports.MessageCenter = (function () {
    return MessageCenter.Instance()
})()