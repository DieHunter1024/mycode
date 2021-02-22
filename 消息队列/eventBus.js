class EventBus {
    constructor () {
        this._eventList = {}
    }

    static Instance () {//返回当前实例的单例
        if(!EventBus._instance) {
            Object.defineProperty(EventBus, "_instance", {
                value: new EventBus()
            });
        }
        return EventBus._instance;
    }

    onEvent (type, fn) {
        if(!this._eventList[type]) {
            this._eventList[type] = []
        }
        this._eventList[type].push(fn)
    }

    emitEvent (type, data) {
        if(this._eventList[type]) {
            for(let i = 0; i < this._eventList[type].length; i ++) {
                this._eventList[type][i] && this._eventList[type][i](data)
            }
        }
    }

    offEvent (type, fn) {
        for(let i = 0; i < this._eventList[type].length; i ++) {
            if(this._eventList[type][i] && this._eventList[type][i] === fn) {
                this._eventList[type][i] = null
            }
        }
    }
}

module.exports = EventBus.Instance()