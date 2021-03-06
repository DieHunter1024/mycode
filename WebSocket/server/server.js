const http = require('http');
const WebSocket = require('ws');
const port = 1024
const route = '/ws/'
const server = http.createServer()

class WebSocketServer extends WebSocket.Server {
    constructor () {
        super(...arguments);
        this.webSocketClient = {}
        this.on('connection', this.connectHandler);
    }

    set ws (val) {
        this._ws = val
        val.on('error', this.errorHandler)
        val.on('close', this.closeHandler)
        val.on('message', this.messageHandler)
    }

    get ws () {
        return this._ws
    }

    connectHandler (ws) {
        this.ws = ws
        console.info('客户端已连接')
    }

    messageHandler (e) {
        console.info('接收客户端消息')
        console.log(e)
    }

    errorHandler (e) {
        console.info('客户端出错')
        console.log(e)
    }

    closeHandler (e) {
        console.info('客户端已断开')
        console.log(e)
    }

    addClient (item) {
        if(!this.webSocketClient[item['name']]) {
            this.webSocketClient[item['name']] = item
        } else {
            console.log(item['name'] + '客户端已存在')
        }
    }

}

const webSocketServer = new WebSocketServer({noServer: true})
server.on("upgrade", (req, socket, head) => {
    let params = urlSplit(req.url)
    if(!checkUrl(params.baseUrl, route)) {//未按标准
        socket.write('未按照标准访问');
        socket.destroy();
        return;
    }
    webSocketServer.handleUpgrade(req, socket, head, function (ws) {
        ws.name = params.obj.name
        webSocketServer.emit('connection', ws, req);
    });
})
server.listen(port, () => {
    console.log('服务开启')
})

//验证url标准
function checkUrl (url, key) {
    return - ~ url.indexOf(key)
}

//拆分url变成对象
function urlSplit (url) {
    if(url.indexOf('?') === - 1) {
        return {}
    }
    let list = url.split('?')[1].split('&');
    let len = list.length;
    let obj = {}
    for(let i = 0; i < len; i ++) {
        let key = list[i].split('=')[0];
        obj[key] = list[i].split('=')[1];
    }
    return {
        baseUrl: url.split('?')[0],
        obj
    }
}