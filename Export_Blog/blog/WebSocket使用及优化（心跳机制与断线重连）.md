---
title:  WebSocket使用及优化（心跳机制与断线重连） 
date:  2021-03-13 20:40:1509-1403-1208-0403-2607-2202-2711-1401-1411-0104-2801-0310-1209-1204-1703-0503-1408-1007-13 
---
**WebSocket在2008年被提出，其通信协议于2011被制定为标准  
与http不同，websocket支持全双工通信（即：在客户端和服务之间双向通信）在websocket问世之前，客户端与服务器通常采用http轮询和Comet等方式保持长链接  
然而，这么做无疑会对服务端造成资源消耗，因为HTTP请求包含较长的头文件，只传递了少许的有用信息，十分消耗资源。  
于是websocket便诞生了，它不仅节省资源和带宽，更是能实现长链接作用，只需客户端主动与服务端握手一次，即可进行实时通信，实现推送技术。**

**之前我也写过相关的文章：[Socket聊天室](https://blog.csdn.net/time_____/article/details/86748679)，[使用JS+socket.io+WebRTC+nodejs+express搭建一个简易版远程视频聊天](https://blog.csdn.net/time_____/article/details/104801205)，但是用到的模块都是socket.io，而且没有深入优化，在平时工作上真正用到时发现事情并不简单。有时前端或者后端会断线而对方不知道，像弱网或者后端服务器重启时，前端并不能保证一直连接**  
**所以这篇文章，我们就来使用websocket做一个简单的demo，并且加上心跳和断线重连功能**

**首先是服务端，采用node+[ws模块](https://github.com/websockets/ws)搭建websocket服务，在server文件夹下新建server.js，并在npm初始化后，下载ws模块**

```
npm init -y
npm i ws
```

**引入ws模块，并搭建一个简单的websocket服务**

```javascript
const WebSocket = require('ws');
const port = 1024//端口
const pathname = '/ws/'//访问路径

new WebSocket.Server({port}, function () {
    console.log('websocket服务开启')
}).on('connection', connectHandler)

function connectHandler (ws) {
    console.log('客户端连接')
    ws.on('error', errorHandler)
    ws.on('close', closeHandler)
    ws.on('message', messageHandler)
}

function messageHandler (e) {
    console.info('接收客户端消息')
    this.send(e)
}

function errorHandler (e) {
    console.info('客户端出错')
}

function closeHandler (e) {
    console.info('客户端已断开')
}
```

**前端部分也搭建个ws访问客户端**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        Title</title>
</head>
<body>
<script type="module">
    const name = 'test'//连接用户名
    let wsUrl = 'ws://127.0.0.1:1024/ws/?name=' + name
    const ws = new WebSocket(wsUrl)
    ws.onopen = function (e) {
        console.log('开启')
        ws.send(JSON.stringify({
            ModeCode: "message",
            msg: 'hello'
        }))
    }//连接上时回调
    ws.onclose = function (e) {
        console.log('关闭')
    }//断开连接时回调
    ws.onmessage = function (e) {
        let data = JSON.parse(e.data)
        console.log('收到消息' + data.msg)
        ws.close()
    }//收到服务端消息
    ws.onerror = function (e) {
        console.log('出错')
    }//连接出错
</script>
</body>
</html>
```

**前端打印结果：**  
![](https://img-blog.csdnimg.cn/20210309165409626.png)  
**服务端打印结果：**  
![](https://img-blog.csdnimg.cn/20210309165448717.png)  
**有以上效果说明一个最简单的ws连接就实现了，下面，我们优化一下，为了降低耦合，我们先引入[eventBus](https://blog.csdn.net/time_____/article/details/113770950)发布订阅，然后新建一个websocket类继承自原生WebSocket，因为，我们要在里面做心跳和重连  
在服务端，我们先把server完善一下，通过http的upgrade过滤验证ws连接  
在原有的服务端增加http服务并做好路径验证**

```javascript
const http = require('http');
const server = http.createServer()

server.on("upgrade", (req, socket, head) => {//通过http.server过滤数据
    let url = new URL(req.url, `http://${req.headers.host}`)
    let name = url.searchParams.get('name')//获取连接标识
    if(!checkUrl(url.pathname, pathname)) {//未按标准
        socket.write('未按照标准访问');
        socket.destroy();
        return;
    }
})
server.listen(port, () => {
    console.log('服务开启')
})

//验证url标准
function checkUrl (url, key) {//判断url是否包含key
    return - ~ url.indexOf(key)
}
```

**完成httpServer后，我们再完善一下websocket服务，将每一个连接的用户都通过代理保存并实现增删，得到以下完整的服务端**

```javascript
const http = require('http');
const WebSocket = require('ws');
const port = 1024//端口
const pathname = '/ws/'//访问路径
const server = http.createServer()

class WebSocketServer extends WebSocket.Server {
    constructor () {
        super(...arguments);
        this.webSocketClient = {}//存放已连接的客户端
    }

    set ws (val) {//代理当前的ws，赋值时将其初始化
        this._ws = val
        val.t = this;
        val.on('error', this.errorHandler)
        val.on('close', this.closeHandler)
        val.on('message', this.messageHandler)
    }

    get ws () {
        return this._ws
    }

    messageHandler (e) {
        console.info('接收客户端消息')
        let data = JSON.parse(e)
        switch(data.ModeCode) {
            case 'message':
                console.log('收到消息' + data.msg)
                this.send(e)
                break;
            case 'heart_beat':
                console.log(`收到${this.name}心跳${data.msg}`)
                this.send(e)
                break;
        }
    }

    errorHandler (e) {
        this.t.removeClient(this)
        console.info('客户端出错')
    }

    closeHandler (e) {
        this.t.removeClient(this)
        console.info('客户端已断开')
    }

    addClient (item) {//设备上线时添加到客户端列表
        if(this.webSocketClient[item['name']]) {
            console.log(item['name'] + '客户端已存在')
            this.webSocketClient[item['name']].close()
        }
        console.log(item['name'] + '客户端已添加')
        this.webSocketClient[item['name']] = item
    }

    removeClient (item) {//设备断线时从客户端列表删除
        if(!this.webSocketClient[item['name']]) {
            console.log(item['name'] + '客户端不存在')
            return;
        }
        console.log(item['name'] + '客户端已移除')
        this.webSocketClient[item['name']] = null
    }
}

const webSocketServer = new WebSocketServer({noServer: true})
server.on("upgrade", (req, socket, head) => {//通过http.server过滤数据
    let url = new URL(req.url, `http://${req.headers.host}`)
    let name = url.searchParams.get('name')//获取连接标识
    if(!checkUrl(url.pathname, pathname)) {//未按标准
        socket.write('未按照标准访问');
        socket.destroy();
        return;
    }
    webSocketServer.handleUpgrade(req, socket, head, function (ws) {
        ws.name = name//添加索引，方便在客户端列表查询某个socket连接
        webSocketServer.addClient(ws);
        webSocketServer.ws = ws
    });
})
server.listen(port, () => {
    console.log('服务开启')
})

//验证url标准
function checkUrl (url, key) {//判断url是否包含key
    return - ~ url.indexOf(key)
}
```

**当连接断开时，只有客户端主动访问服务端才能实现重连，所以客户端的功能要比服务端更多一些，我们把客户端的websocket完善优化一下，添加一些简单的控制功能（连接，发消息，断开）的按钮，这里有一点需要注意：在下次连接之前一定要先关闭当前连接，否则会导致多个客户端同时连接，消耗性能**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        Title</title>
</head>
<body>
<button id="connect">
    连接
</button>
<button disabled
        id="sendMessage">
    发送
</button>
<button disabled
        id="destroy">
    关闭
</button>
<script type="module">
    const name = 'test'//连接用户名
    let connect = document.querySelector('#connect'),//连接按钮
        sendMessage = document.querySelector('#sendMessage'),//发送按钮
        destroy = document.querySelector('#destroy'),//关闭按钮
        wsUrl = 'ws://127.0.0.1:1024/ws/?name=' + name,//连接地址
        ws;

    connect.addEventListener('click', connectWebSocket)
    sendMessage.addEventListener('click', function (e) {
        ws.send(JSON.stringify({
            ModeCode: "message",
            msg: 'hello'
        }))
    })
    destroy.addEventListener('click', function (e) {
        ws.close()
        ws = null
    })

    function connectWebSocket () {
        if(!ws) {//第一次执行，初始化或ws断开时可执行
            ws = new WebSocket(wsUrl)
            initWebSocket()
        }
    }

    function initWebSocket () {
        ws.onopen = function (e) {
            setButtonState('open')
            console.log('开启')
        }//连接上时回调
        ws.onclose = function (e) {
            setButtonState('close')
            console.log('关闭')
        }//断开连接时回调
        ws.onmessage = function (e) {
            let data = JSON.parse(e.data)
            console.log('收到消息' + data.msg)
        }//收到服务端消息
        ws.onerror = function (e) {
            setButtonState('close')
            console.log('出错')
        }//连接出错
    }

    /*
  * 设置按钮是否可点击
  * @param state：open表示开启状态，close表示关闭状态
  */
    function setButtonState (state) {
        switch(state) {
            case 'open':
                connect.disabled = true
                sendMessage.disabled = false
                destroy.disabled = false
                break;
            case 'close':
                connect.disabled = false
                sendMessage.disabled = true
                destroy.disabled = true
                break;
        }
    }
</script>
</body>
</html>
```

**效果如下：**  
![](https://img-blog.csdnimg.cn/2021030920045814.gif)

**到了这一步，我们websocket的demo已经可以手动运行，在此基础上，我们将其封装一下，并且通过eventBus对外进行通信就可以用了，具体流程将与接下来的心跳一起实现  
websocket心跳机制：顾名思义，就是客户端每隔一段时间向服务端发送一个特有的心跳消息，每次服务端收到消息后只需将消息返回，此时，若二者还保持连接，则客户端就会收到消息，若没收到，则说明连接断开，此时，客户端就要主动重连，完成一个周期  
心跳的实现也很简单，只需在第一次连接时用回调函数做延时处理，此时还需要设置一个心跳超时时间，若某时间段内客户端发送了消息，而服务端未返回，则认定为断线。下面，我就来实现一下心跳**

```javascript
    //this.heartBeat  --->  time：心跳时间间隔 timeout：心跳超时间隔
    /*
     * 心跳初始函数
     * @param time：心跳时间间隔
     */
    function startHeartBeat (time) {
        setTimeout(() => {
            this.sendMsg({
                ModeCode: ModeCode.HEART_BEAT,
                msg: new Date()
            })
            this.waitingServer()
        }, time)
    }
    //延时等待服务端响应，通过webSocketState判断是否连线成功
    function waitingServer () {
        this.webSocketState = false//在线状态
        setTimeout(() => {
            if(this.webSocketState) {
                this.startHeartBeat(this.heartBeat.time)
                return
            }
            console.log('心跳无响应，已断线')
            this.close()
            //重连操作
        }, this.heartBeat.timeout)
    }
```

**心跳实现完成后，只需要在ws.onopen中调用即可，效果如下：**  
![](https://img-blog.csdnimg.cn/20210309202721940.gif)  
  
**然后是重连部分，其实只需要新建一个延时回调，与心跳相似，只不过它是在连接失败时使用的，这里就不多做说明。以下是完整版的代码：  
websocket部分：**

```javascript
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
```

**index.html部分：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        Title</title>
</head>
<body>
<button id="connect">
    连接
</button>
<button disabled
        id="sendMessage">
    发送
</button>
<button disabled
        id="destroy">
    关闭
</button>
<script type="module">
    import eventBus
        from "./js/eventBus.js"
    import MyWebSocket
        from './js/webSocket.js'

    const name = 'test'//连接用户名
    let connect = document.querySelector('#connect')
    let sendMessage = document.querySelector('#sendMessage')
    let destroy = document.querySelector('#destroy')
    let myWebSocket,
        wsUrl = 'ws://127.0.0.1:1024/ws/?name=' + name

    eventBus.onEvent('changeBtnState', setButtonState)//设置按钮样式
    eventBus.onEvent('reconnect', reconnectWebSocket)//接收重连消息
    connect.addEventListener('click', reconnectWebSocket)
    sendMessage.addEventListener('click', function (e) {
        myWebSocket.sendMsg({
            ModeCode: "message",
            msg: 'hello'
        })
    })
    destroy.addEventListener('click', function (e) {
        myWebSocket.close()
    })

    function reconnectWebSocket () {
        if(!myWebSocket) {//第一次执行，初始化
            connectWebSocket()
        }
        if(myWebSocket && myWebSocket.reconnectTimer) {//防止多个websocket同时执行
            clearTimeout(myWebSocket.reconnectTimer)
            myWebSocket.reconnectTimer = null
            connectWebSocket()
        }
    }

    function connectWebSocket () {
        myWebSocket = new MyWebSocket(wsUrl);
        myWebSocket.init({//time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时
            time: 30 * 1000,
            timeout: 3 * 1000,
            reconnect: 10 * 1000
        }, true)
    }

    /*
     * 设置按钮是否可点击
     * @param state：open表示开启状态，close表示关闭状态
     */
    function setButtonState (state) {
        switch(state) {
            case 'open':
                connect.disabled = true
                sendMessage.disabled = false
                destroy.disabled = false
                break;
            case 'close':
                connect.disabled = false
                sendMessage.disabled = true
                destroy.disabled = true
                break;
        }
    }
</script>
</body>
</html>
```

**最终实现的效果如下，即使后端服务关闭，或者是断网状态，客户端都能保持重连状态**  
![](https://img-blog.csdnimg.cn/20210309210551664.gif)  
**最后，感谢你看到了这里，文章有任何问题欢迎大佬指出与讨论  
附上源码：[Gitee](https://gitee.com/DieHunter/myCode/tree/master/WebSocket)**