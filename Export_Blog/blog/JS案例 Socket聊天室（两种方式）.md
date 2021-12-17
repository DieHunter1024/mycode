---
title:  JS案例：Socket聊天室（两种方式） 
date:  2019-02-02 14:56:1107-2012-3009-1112-0110-3009-2104-2702-2209-0607-1008-0410-2303-0801-0706-19 
---
## 一.socket轮询（每隔一段时间向后端请求一次，增加服务器压力）:

由于socket连接时采用ws/wss协议，页面必须放在服务器端，所以首先用node产生一个静态文件夹，方便通过IP直接访问

### static.js:

```javascript
const express = require('express');//这里要引入express
const app = express();
const path = require('path');
app.use('/main', express.static(path.join(__dirname, './html')));//设置静态文件夹
app.listen(2048, () => {//端口号不能与socket监听的端口号一样
    console.log('static 2048 Server Start~');
})
```

在html界面做一些简单的布局以及socket数据请求：

### index.html：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
  <style>
    #text {
        width: 350px;
        height: 30px;
      }
      #netName {
        width: 150px;
        height: 30px;
      }
    </style>
</head>

<body>
  <textarea name="" id="msg" cols="80" rows="30" readonly></textarea><br />
  <input id="netName" type="text" placeholder="名称" />
  <input id="text" type="text" placeholder="消息" />
  <button onclick="clickHandler()">发送</button>
  <script>
    setInterval(sendMsg, 1000); //这里做轮询请求
    function sendMsg(data) { //封装WebSocket请求函数
      if (!data) {
        data = {
          err: 1
        }; //根据参数判断是否符合数据规范
      }
      var ws = new WebSocket("ws://192.168.1.4:1024"); //使用ws协议对1024端口进行请求
      ws.onopen = function () {
        ws.send(JSON.stringify(data));
      };
      ws.onmessage = getData;
    }

    function getData(evt) { //将请求成功后返回的数据接收
      var received_msg = evt.data;
      var val = JSON.parse(evt.data).join("\n");
      msg.value = val;
    }
    document.addEventListener("keyup", e => { //回车键发送
      if (e.keyCode !== 13) return;
      clickHandler(e);
    });

    function clickHandler() { //点击Button时将数据发送到服务端
      if (netName.value.trim().length == 0 || text.value.trim().length == 0)
        return;
      var obj = {
        err: 0,
        netName: netName.value,
        msg: text.value
      };
      sendMsg(obj);
      text.value = ""; //每次发送后将内容制空
    }
  </script>
</body>

</html>
```

## Client.js（客户端）

```javascript
const WebSocket = require('ws');//这里引入一个模块ws

const ws = new WebSocket('ws://192.168.1.4:1024');//对1024端口进行监听
 
ws.on('open', function() {
  console.log('Client is listening on port 1024');
});
ws.on('message', function(msg) {
    ws.send(msg);//获取到前端传来的数据后，直接向服务端传递
});
ws.on('close',function(){ 
    console.log('Client close')
}); 
```

## Server.js

```javascript
const static = require('./static')//引入刚刚创建的static静态目录
const client = require('./client')//引入客户端
const WebSocket = require('ws');
let list = [];
const wss = new WebSocket.Server({//对1024端口进行监听
    port: 1024
}, () => {
    console.log('Server is listening on port 1024');
});

wss.on('connection', function (ws) {
    ws.on('message', function (msg) {//对数据过滤和处理
        if(!JSON.parse(msg).err){
            list.push(JSON.parse(msg).netName + ' 说: ' + JSON.parse(msg).msg)
        }
        ws.send(JSON.stringify(list));//将数据传到前端
    });
});
```

## 二.socketio长链接（与轮询不同，使前后端通过事件处理机制时刻保持连接状态）

同样产生一个静态文件夹：

### static.js:

```javascript
const express = require('express');
const app = express();
const path = require('path');
app.use('/main', express.static(path.join(__dirname, './static')));
app.listen(2048, () => {
    console.log('static 2048 Server Start~');
})
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
  <style>
    #text {
        width: 350px;
        height: 30px;
      }
      #netName {
        width: 150px;
        height: 30px;
      }
    </style>
  <script src="./socket.io.js"></script>
  <!-- 首先用npm下载socketio并且使用socket.io-client中的socket.io.js -->
</head>

<body>
  <textarea name="" id="msg" cols="80" rows="30" readonly></textarea><br />
  <input id="netName" type="text" placeholder="名称" />
  <input id="text" type="text" placeholder="消息" />
  <button onclick="clickHandler()">发送</button>
  <script>
    var socket = io.connect('http://192.168.1.4:1024'); //建立http连接
    var list = [] //本地聊天记录缓存

    function clickHandler() {
      if (netName.value.trim().length == 0 || text.value.trim().length == 0)
        return; //过滤输入框
      var obj = {
        netName: netName.value,
        msg: text.value
      };
      list.push(obj.netName + ' 说: ' + obj.msg)
      socket.emit('send', obj)//触发send事件
      getData(list);
      text.value = "";
    }
    socket.on('msg', function (msg) {//添加msg监听事件
      list = msg;
      getData(list)
    })

    function getData(arr) {//将聊天记录放至area标签
      msg.value = arr.join('\n');
    }
  </script>
</body>

</html>
```

### Server.js:

```javascript
const static = require("./static");//引入刚刚创建的static静态目录
let list = [];//聊天记录缓存
var express = require("express");
var app = express();
var server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connection", function(client) {
  client.on("send", data => {//添加send监听事件
    list.push(data.netName + " 说: " + data.msg);//将前端事件传过来的参数进行处理
    sendList(list, client);//将数据通过事件发送到前端
  });
});
function sendList(list, target) {
  target.broadcast.emit("msg", list);//触发msg事件
}
server.listen(1024, "192.168.1.4", () => {
  console.log("Connect Success At 1024");
});
```