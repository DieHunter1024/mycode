// 发布/订阅设计模式(Pub/Sub)
class EventBus {
    constructor() {
        this._eventList = {} //存放观察者列表
    }

    static Instance() { //返回当前实例的单例
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, "_instance", {
                value: new EventBus()
            });
        }
        return EventBus._instance;
    }

    onEvent(type, fn) { //订阅者
        if (!this._eventList[type]) {
            this._eventList[type] = []
        }
        this._eventList[type].push(fn)
    }

    emitEvent(type, data) { //发布者
        if (this._eventList[type]) {
            for (let i = 0; i < this._eventList[type].length; i++) {
                this._eventList[type][i] && this._eventList[type][i](data)
            }
        }
    }

    offEvent(type, fn) { //销毁监听
        for (let i = 0; i < this._eventList[type].length; i++) {
            if (this._eventList[type][i] && this._eventList[type][i] === fn) {
                this._eventList[type][i] = null
            }
        }
    }
}

module.exports = EventBus.Instance()