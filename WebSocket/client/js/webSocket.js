import eventBus
    from "./eventBus.js"

const ModeCode = {
    MSG: 'message',
    HEART_BEAT: 'heart_beat'
}

export default class MyWebSocket extends WebSocket {
    constructor (url, protocols) {
        super(url, protocols);
        return this
    }

    init (heartBeatConfig, isReconnect) {
        this.onopen = this.openHandler
        this.onclose = this.closeHandler
        this.onmessage = this.messageHandler
        this.onerror = this.errorHandler
        this.heartBeat = heartBeatConfig
        this.isReconnect = isReconnect
        this.reconnectTimer = null
        this.webSocketState = false
    }

    openHandler () {
        eventBus.emitEvent('changeBtnState', 'open')
        this.webSocketState = true
        this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time) : ""
        console.log('开启')
    }

    messageHandler (e) {
        let data = this.getMsg(e)
        switch(data.ModeCode) {
            case ModeCode.MSG:
                console.log('收到消息' + data.msg)
                break;
            case ModeCode.HEART_BEAT:
                this.webSocketState = true
                console.log('收到心跳响应' + data.msg)
                break;
        }
    }

    closeHandler () {
        eventBus.emitEvent('changeBtnState', 'close')
        this.webSocketState = false
        console.log('关闭')
    }

    errorHandler () {
        eventBus.emitEvent('changeBtnState', 'close')
        this.webSocketState = false
        this.reconnectWebSocket()
        console.log('出错')
    }

    sendMsg (obj) {
        this.send(JSON.stringify(obj))
    }

    getMsg (e) {
        return JSON.parse(e.data)
    }

    startHeartBeat (time) {
        setTimeout(() => {
            this.sendMsg({
                ModeCode: ModeCode.HEART_BEAT,
                msg: new Date()
            })
            this.waitingServer()
        }, time)
    }

    waitingServer () {
        this.webSocketState = false
        setTimeout(() => {
            if(this.webSocketState) {
                this.startHeartBeat(this.heartBeat.time)
                return
            }
            console.log('心跳无响应，已断线')
            this.close()
            this.reconnectWebSocket()
        }, this.heartBeat.timeout)
    }

    reconnectWebSocket () {
        if(!this.isReconnect) {
            return;
        }
        this.reconnectTimer = setTimeout(() => {
            eventBus.emitEvent('reconnect')
        }, this.heartBeat.reconnect)
    }
}