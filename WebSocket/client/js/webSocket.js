export default class MyWebSocket extends WebSocket {
    constructor (url, protocols) {
        super(url, protocols);
        this.onopen = this.openHandler
        this.onclose = this.closeHandler
        this.onmessage = this.messageHandler
        this.onerror = this.errorHandler
    }

    openHandler (e) {
        console.log('开启')
        console.log(e)
    }

    messageHandler (e) {
        console.log('通信')
        console.log(e)
    }

    closeHandler (e) {
        console.log('关闭')
        console.log(e)
    }

    errorHandler (e) {
        console.log('出错')
        console.log(this)
        console.log(e)
    }
}