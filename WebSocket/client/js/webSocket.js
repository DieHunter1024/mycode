import eventBus
    from "./eventBus.js"

const ModeCode = {//websocket消息类型
    MSG: 'message',//普通消息
    HEART_BEAT: 'heart_beat'//心跳
}

export default class MyWebSocket extends WebSocket {
    constructor (url, protocols) {
        super(url, protocols);
        return this
    }

    /*
     * 入口函数
     * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
     * @param isReconnect 是否断线重连
     */
    init (heartBeatConfig, isReconnect) {
        this.onopen = this.openHandler//连接上时回调
        this.onclose = this.closeHandler//断开连接时回调
        this.onmessage = this.messageHandler//收到服务端消息
        this.onerror = this.errorHandler//连接出错
        this.heartBeat = heartBeatConfig
        this.isReconnect = isReconnect
        this.reconnectTimer = null//断线重连时间器
        this.webSocketState = false//socket状态 true为已连接
    }

    openHandler () {
        eventBus.emitEvent('changeBtnState', 'open')//触发事件改变按钮样式
        this.webSocketState = true//socket状态设置为连接，做为后面的断线重连的拦截器
        this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time) : ""//是否启动心跳机制
        console.log('开启')
    }

    messageHandler (e) {
        let data = this.getMsg(e)
        switch(data.ModeCode) {
            case ModeCode.MSG://普通消息
                console.log('收到消息' + data.msg)
                break;
            case ModeCode.HEART_BEAT://心跳
                this.webSocketState = true
                console.log('收到心跳响应' + data.msg)
                break;
        }
    }

    closeHandler () {//socket关闭
        eventBus.emitEvent('changeBtnState', 'close')//触发事件改变按钮样式
        this.webSocketState = false//socket状态设置为断线
        console.log('关闭')
    }

    errorHandler () {//socket出错
        eventBus.emitEvent('changeBtnState', 'close')//触发事件改变按钮样式
        this.webSocketState = false//socket状态设置为断线
        this.reconnectWebSocket()//重连
        console.log('出错')
    }

    sendMsg (obj) {
        this.send(JSON.stringify(obj))
    }

    getMsg (e) {
        return JSON.parse(e.data)
    }

    /*
     * 心跳初始函数
     * @param time：心跳时间间隔
     */
    startHeartBeat (time) {
        setTimeout(() => {
            this.sendMsg({
                ModeCode: ModeCode.HEART_BEAT,
                msg: new Date()
            })
            this.waitingServer()
        }, time)
    }

    //延时等待服务端响应，通过webSocketState判断是否连线成功
    waitingServer () {
        this.webSocketState = false
        setTimeout(() => {
            if(this.webSocketState) {
                this.startHeartBeat(this.heartBeat.time)
                return
            }
            console.log('心跳无响应，已断线')
            try {
                this.close()
            } catch(e) {
                console.log('连接已关闭，无需关闭')
            }
            this.reconnectWebSocket()
        }, this.heartBeat.timeout)
    }

    //重连操作
    reconnectWebSocket () {
        if(!this.isReconnect) {
            return;
        }
        this.reconnectTimer = setTimeout(() => {
            eventBus.emitEvent('reconnect')
        }, this.heartBeat.reconnect)
    }
}