---
title:  使用JS+socket.io+WebRTC+nodejs+express搭建一个简易版远程视频聊天 
date:  2020-03-12 12:37:1108-1704-2406-0304-1909-1303-0311-2003-1406-1701-1503-2705-0904-19 
---
**目录**

[WebRTC](#WebRTC)

[代码原理及流程](#%E4%BB%A3%E7%A0%81%E5%8E%9F%E7%90%86%E5%8F%8A%E6%B5%81%E7%A8%8B)

[源码：git@gitee.com:DieHunter/myCode.git仓库：myCode/videoSteam](#%E6%BA%90%E7%A0%81%EF%BC%9Agit%40gitee.com%3ADieHunter%2FmyCode.git%E4%BB%93%E5%BA%93%EF%BC%9AmyCode%2FvideoSteam)

[前端](#%E5%89%8D%E7%AB%AF)

[先附上HTML和CSS](#%E5%85%88%E9%99%84%E4%B8%8AHTML%E5%92%8CCSS)

[完整的socket.js](#%E5%AE%8C%E6%95%B4%E7%9A%84socket.js)

[完整的userList.js（创建用户在线列表，添加邀请事件，初始化聊天室）](#%E5%AE%8C%E6%95%B4%E7%9A%84userList.js%EF%BC%88%E5%88%9B%E5%BB%BA%E7%94%A8%E6%88%B7%E5%9C%A8%E7%BA%BF%E5%88%97%E8%A1%A8%EF%BC%8C%E6%B7%BB%E5%8A%A0%E9%82%80%E8%AF%B7%E4%BA%8B%E4%BB%B6%EF%BC%8C%E5%88%9D%E5%A7%8B%E5%8C%96%E8%81%8A%E5%A4%A9%E5%AE%A4%EF%BC%89)

[遇到的问题](#%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)

[优化后完整的video.js](#%E4%BC%98%E5%8C%96%E5%90%8E%E5%AE%8C%E6%95%B4%E7%9A%84video.js)

[服务端](#%E6%9C%8D%E5%8A%A1%E7%AB%AF)

[完整的server.js](#%E5%AE%8C%E6%95%B4%E7%9A%84server.js)

[实现效果](#%E5%AE%9E%E7%8E%B0%E6%95%88%E6%9E%9C)

[注意：](#%E6%B3%A8%E6%84%8F%EF%BC%9A)

---

## **WebRTC**

**网页即时通信，**是**Web Real-Time Communication**的缩写，它支持**peer-to-peer（浏览器与浏览器之间）**进行视频，音频传输，并保证传输质量，将其发送至本地**audio**标签，**video**标签或发送到另一个浏览器中，本文使用到**navigator.mediaDevices**，**RTCPeerConnection**对象配合**socket+node**构建远程实时视频聊天功能，文章有一个不足之处，后面会讲到。

**相关文档：**  
**[MediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices)  
[WebRTC API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)**

**参考文章：**  
[**https://rtcdeveloper.com/t/topic/13777**](https://rtcdeveloper.com/t/topic/13777)

## 代码原理及流程

![](https://img-blog.csdnimg.cn/20200311214302905.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### 源码：[https://gitee.com/DieHunter/myCode/tree/master/videoSteam](https://gitee.com/DieHunter/myCode/tree/master/videoSteam)

## **前端**

要实现点对点就需要用到socket长链接从服务端进行寻呼  
这是我以前的一篇关于socket简单使用的小案例：**[https://blog.csdn.net/time\_\_\_\_\_/article/details/86748679](https://blog.csdn.net/time_____/article/details/86748679)**  
首先引入**[socket.io](https://cdn.bootcss.com/socket.io/2.3.0/socket.io.js)**，这里我将前端js分成三部分，分别是socket.js（socket相关操作），userList.js（页面操作）,video.js（视频聊天）

![](https://img-blog.csdnimg.cn/20200311200304249.png)

### 先附上HTML和CSS

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./style/main.css">
    <script src="./js/socket.io.js"></script>
    <script src="./js/socket.js"></script>
    <script src="./js/userList.js"></script>
    <script src="./js/video.js"></script>
</head>

<body>
    <div id="login" hidden class="loginBox">
        <input id="userName" autocomplete="false" class="userName" type="text" placeholder="请输入英文用户名">
        <button id="submit">提交</button>
    </div>
    <div id="chatBox" class="chatBox" hidden>
        <h1 id="myName" class="myName"></h1>
        <ul id="userList" class="userList"></ul>
    </div>
    <div id="videoChat" hidden class="videoChat">
        <button id="back" hidden>结束</button>
        <video id="myVideo" src="" class="myVideo"></video>
        <video id="otherVideo" src="" class="otherVideo"></video>
    </div>
    <script>
        checkToken()

        function checkToken() { //判断用户是否已有用户名
            if (localStorage.token) {
                login.hidden = true
                chatBox.hidden = false
                initSocket(localStorage.token) //初始化socket连接
            } else {
                login.hidden = false
                chatBox.hidden = true
                submit.addEventListener('click', function (e) {
                    initSocket(userName.value) //初始化socket连接
                })
            }
        }
    </script>
</body>

</html>
```

```css
* {
    margin: 0;
    padding: 0;
}

.loginBox {
    width: 300px;
    height: 200px;
    margin: 50px auto 0;
}

.userName,
.loginBox button {
    width: 300px;
    height: 60px;
    border-radius: 10px;
    outline: none;
    font-size: 26px;
}

.userName {
    border: 1px solid lightcoral;
    text-align: center;
}

.loginBox button {
    margin-top: 30px;
    display: block;
}

input::placeholder {
    font-size: 26px;
    text-align: center;
}

.chatBox {
    width: 200px;
    margin: 50px auto 0;
    position: relative;
}

.myName {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-size: 40px;
    text-align: center;
    line-height: 50px;
    background: lightcoral;
}

.userList {
    height: 500px;
    width: 100%;
    padding-top: 50px;
    overflow-y: scroll;
    list-style: none;
}

.userList>li {
    background: lightblue;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
}

.videoChat {
    background: lightgreen;
    width: 500px;
    height: 400px;
    margin: 50px auto 0;
}

.videoChat button {
    width: 500px;
    height: 60px;
    border-radius: 10px;
    outline: none;
    float: left;
    font-size: 26px;
}

.myVideo,.otherVideo{
    width: 250px;
    height: 250px;
    float: left;
    overflow: hidden;
}
```

**大致效果**

![](https://img-blog.csdnimg.cn/20200311220142550.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20200311220245995.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20200311220259218.png)

**socket.js**  
首先建立socket连接，添加连接和断开的事件

```javascript
let socket //供其他页面调用

function initSocket(token) {//获取到用户输入的id并传到服务端
    socket = io('http://127.0.0.1:1024?token=' + token, {
        autoConnect: false
    });
    socket.open();
    socket.on('open', socketOpen); //连接登录
    socket.on('disconnect', socketClose); //连接断开
}

function socketClose(reason) { //主动或被动关闭socket
    console.log(reason)
    localStorage.removeItem("token")
}

function socketOpen(data) { //socket开启
    if (!data.result) { //当服务端找到相同id时跳出连接
        console.log(data.msg)
        return;
    }
createChatList(data) //创建用户列表
    localStorage.setItem('token', data.token)
    login.hidden = true
    chatBox.hidden = false
    videoChat.hidden = true
    myName.textContent = localStorage.token
}
```

之后在socket中添加几个事件监听

```javascript
    socket.on('dataChange', createChatList); //新增人员
    socket.on('inviteVideoHandler', inviteVideoHandler); //被邀请视频
    socket.on('askVideoHandler', askVideoHandler); //视频邀请结果
    socket.on('ice', getIce); //从服务端接收ice
    socket.on('offer', getOffer); //从服务端接收offer
    socket.on('answer', getAnswer); //从服务端接收answer
    socket.on('break', stopVideoStream) //挂断视频通话
```

若用户接到对方邀请时，弹出确认框，并将结果返回给对方

```javascript
function inviteVideoHandler(data) { //当用户被邀请时执行
    let allow = 0
    if (isCalling) {
        allow = -1 //正在通话
    } else {
        let res = confirm(data.msg);
        if (res) {
            allow = 1
            startVideoChat(data.token) //用户点击同意后开始初始化视频聊天
            localStorage.setItem('roomNo', data.roomNo) //将房间号保存
        }
    }
    socket.emit('askVideo', {
        myId: localStorage.token,
        otherId: data.token,
        type: 'askVideo',
        allow
    });
}
```

当收到返回邀请结果时，后端创建视频聊天房间后，开始初始化聊天室

```javascript
function askVideoHandler(data) { //获取被邀请用户的回复
    console.log(data.msg)
    if (data.allow == -1) return //通话中
    if (data.allow) {
        localStorage.setItem('roomNo', data.roomNo) //将房间号保存
        startVideoChat(data.token)
    }
}
```

当用户挂断时

```javascript
function breakVideoConnect(e) {
    console.log(localStorage.getItem('roomNo'))
    socket.emit('_break', {
        roomNo: localStorage.getItem('roomNo')
    });
}
```

* ### 完整的socket.js

  ```javascript
  let socket //供其他页面调用

  function initSocket(token) {//获取到用户输入的id并传到服务端
      socket = io('http://127.0.0.1:1024?token=' + token, {
          autoConnect: false
      });
      socket.open();
      socket.on('open', socketOpen); //连接登录
      socket.on('disconnect', socketClose); //连接断开
      socket.on('dataChange', createChatList); //新增人员
      socket.on('inviteVideoHandler', inviteVideoHandler); //被邀请视频
      socket.on('askVideoHandler', askVideoHandler); //视频邀请结果
      socket.on('ice', getIce); //从服务端接收ice
      socket.on('offer', getOffer); //从服务端接收offer
      socket.on('answer', getAnswer); //从服务端接收answer
      socket.on('break', stopVideoStream) //挂断视频通话
  }

  function socketClose(reason) { //主动或被动关闭socket
      console.log(reason)
      localStorage.removeItem("token")
  }

  function socketOpen(data) { //socket开启
      if (!data.result) { //当服务端找到相同id时跳出连接
          console.log(data.msg)
          return;
      }
      createChatList(data) //创建用户列表
      localStorage.setItem('token', data.token)
      login.hidden = true
      chatBox.hidden = false
      videoChat.hidden = true
      myName.textContent = localStorage.token
  }

  function inviteVideoHandler(data) { //当用户被邀请时执行
      let allow = 0
      if (isCalling) {
          allow = -1 //正在通话
      } else {
          let res = confirm(data.msg);
          if (res) {
              allow = 1
              startVideoChat(data.token) //用户点击同意后开始初始化视频聊天
              localStorage.setItem('roomNo', data.roomNo) //将房间号保存
          }
      }
      socket.emit('askVideo', {
          myId: localStorage.token,
          otherId: data.token,
          type: 'askVideo',
          allow
      });
  }

  function askVideoHandler(data) { //获取被邀请用户的回复
      console.log(data.msg)
      if (data.allow == -1) return //通话中
      if (data.allow) {
          localStorage.setItem('roomNo', data.roomNo) //将房间号保存
          startVideoChat(data.token)
      }
  }

  function breakVideoConnect(e) {
      console.log(localStorage.getItem('roomNo'))
      socket.emit('_break', {
          roomNo: localStorage.getItem('roomNo')
      });
  }
  ```
* ### 完整的userList.js（创建用户在线列表，添加邀请事件，初始化聊天室）

```javascript
function createChatList(data) { //新建用户列表
    console.log(data.msg)
    let userData = data.userIds
    let userList = document.querySelector('#userList')
    if (userList) {
        userList.remove()
        userList = null
    }
    userList = createEle('ul', {}, {
        id: 'userList',
        className: 'userList'
    })
    chatBox.appendChild(userList)
    for (let key in userData) {
        if (userData[key] != localStorage.token) {
            var li = createEle('li', {}, {
                textContent: userData[key]
            })
            li.addEventListener('click', videoStart)
            userList.appendChild(li)
        }
    }
}

function createEle(ele, style, attribute) { //新增标签，设置属性及样式
    let element = document.createElement(ele)
    if (style) {
        for (let key in style) {
            element.style[key] = style[key];
        }
    }
    if (attribute) {
        for (let key in attribute) {
            element[key] = attribute[key];
        }
    }
    return element
}

function videoStart(e) { //用户点击列表某个用户时发送邀请至服务端
    socket.emit('inviteVideo', {
        myId: localStorage.token,
        otherId: this.textContent,
        type: 'inviteVideo'
    });
}

function startVideoChat(otherId) { //初始化视频聊天
    videoChat.hidden = false
    login.hidden = true
    chatBox.hidden = true
    localStorage.setItem('otherId', otherId) //将对方的id保存
    startVideoStream()
}
```

**video.js**

初始化媒体对象，并将Stream存到全局，这里由于navigator.mediaDevices.getUserMedia是异步方法，需要同步执行，先获取stream，然后进行后续操作

```javascript
async function createMedia() { //同步创建本地媒体流
    if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
    }
    console.log(stream)
    let video = document.querySelector('#myVideo');
    video.srcObject = stream; //将媒体流输出到本地video以显示自己
    video.onloadedmetadata = function (e) {
        video.play();
    };
    createPeerConnection()
}
```

创建stream后，初始化RTCPeerConnection，用于建立视频连接，同样需要同步获取，并且在peer获取之后发送offer给对方

```javascript

async function createPeerConnection() { //同步初始化描述文件并添加事件
    if (!peer) {
        peer = new RTCPeerConnection()
    }
    await stream.getTracks().forEach(async track => {
        await peer.addTrack(track, stream); //将本地流附属至peer中
    });
    // await peer.addStream(stream); //旧方法（将本地流附属至peer中）
    peer.addEventListener('addstream', setVideo) //当peer收到其他流时显示另一个video以显示对方
    peer.addEventListener('icecandidate', sendIce) //获取到candidate时，将其发送至服务端，传至对方
    peer.addEventListener('negotiationneeded', sendOffer) //双方约定的协商被完成时才触发该方法
}
```

当收到对方发送过来的stream时，即触发addstream事件时，通过setVideo将对方的视频流放到本地video中

```javascript
function setVideo(data) { //播放对方的视频流
    console.log(data.stream)
    let back = document.getElementById('back')
    back.hidden = false //显示挂断按钮
    back.addEventListener('click', breakVideoConnect) //挂断事件
    isCalling = true //正在通话
    let video = document.querySelector('#otherVideo');
    video.srcObject = data.stream;
    video.onloadedmetadata = function (e) {
        video.play();
    };
}
```

创建offer，保存本地offer，并发送offer给对方

```javascript
async function sendOffer() { //同步发送offer到服务端，发送给对方
    let offer = await peer.createOffer();
    await peer.setLocalDescription(offer); //peer本地附属offer
    socket.emit('_offer', {
        streamData: offer
    });
}
```

收到对方的offer后，保存远程offer，但是这里有一个小问题，如果peer还没有创建好，也就是如果对方先创建，就会马上发offer过来，这时我们这边的peer可能还没有创建成功，如果直接调用setRemoteDescription的话会报错，所以可以用try catch来调用，或使用if(!peer) return的方式运行

```javascript
async function getOffer(data) { //接收到offer后，返回answer给对方
    await peer.setRemoteDescription(data.streamData); //peer远程附属offer
    sendAnswer()
}


//优化后
async function getOffer(data) { //接收到offer后，返回answer给对方
    if (!peer) return //等待对方响应，也可以用try catch
    await peer.setRemoteDescription(data.streamData); //peer远程附属offer
    sendAnswer()
}
```

创建answer，保存本地answer，发送answer给对方

```javascript
async function sendAnswer() {
    let answer = await peer.createAnswer();
    await peer.setLocalDescription(answer); //peer附属本地answer
    socket.emit('_answer', {
        streamData: answer
    });
}
```

接收到answer时，保存本地answer

```javascript
async function getAnswer(data) { //接收到answer后，peer远程附属answer
    await peer.setRemoteDescription(data.streamData);
}
```

peer触发icecandidate事件时，即本地触发过setLocalDescription时，也就是将本地offer和本地answer保存时，触发方法

```javascript
function sendIce(e) { //setLocalDescription触发时，发送ICE给对方
    if (e.candidate) {
        socket.emit('_ice', {
            streamData: e.candidate
        });
    }
}
```

接收对方的ICE，但是这里有一个和上面一样的小问题如果在ICE事件中，peer还没有创建好，也就是如果对方先创建，就会马上发offer过来，这时我们这边的peer可能还没有创建成功，如果直接调用addIceCandidate的话会报错，所以可以用try catch来调用，或使用if(!peer) return的方式运行

```javascript
async function getIce(data) { //获取对方的ICE
    var candidate = new RTCIceCandidate(data.streamData)
    await peer.addIceCandidate(candidate)
}

//优化后

async function getIce(data) { //获取对方的ICE
    if (!peer) return //等待对方响应，也可以用try catch
    var candidate = new RTCIceCandidate(data.streamData)
    await peer.addIceCandidate(candidate)
}
```

### 遇到的问题

最后是挂断的方法，这里有个小问题，**当挂断时，原来的stream无法删除，导致摄像头虽然没有调用，但是导航栏仍然会有摄像头图标（没有真正关闭），下一次打开时会传输前面的流（叠加），网上没有解决方式，如果有知道的同学，希望能补充优化，感谢**

```javascript
function stopVideoStream(data) { //停止传输视频流
    console.log(data.msg)
    stream.getTracks().forEach(async function (track) { //这里得到视频或音频对象
        await track.stop();
        await stream.removeTrack(track)
        stream = null
    })
    peer.close();
    peer = null;
    isCalling = false
    videoChat.hidden = true
    login.hidden = true
    chatBox.hidden = false
}
```

* ### 优化后完整的video.js

  ```javascript
  var stream, peer, isCalling = false //初始化要发送的流,和描述文件,通话状态
  function startVideoStream(e) { //开始传输视频流
      createMedia()
  }

  function stopVideoStream(data) { //停止传输视频流
      console.log(data.msg)
      stream.getTracks().forEach(async function (track) { //这里得到视频或音频对象
          await track.stop();
          await stream.removeTrack(track)
          stream = null
      })
      peer.close();
      peer = null;
      isCalling = false
      videoChat.hidden = true
      login.hidden = true
      chatBox.hidden = false
  }

  async function createMedia() { //同步创建本地媒体流
      if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
          })
      }
      console.log(stream)
      let video = document.querySelector('#myVideo');
      video.srcObject = stream; //将媒体流输出到本地video以显示自己
      video.onloadedmetadata = function (e) {
          video.play();
      };
      createPeerConnection()
  }

  async function createPeerConnection() { //同步初始化描述文件并添加事件
      if (!peer) {
          peer = new RTCPeerConnection()
      }
      await stream.getTracks().forEach(async track => {
          await peer.addTrack(track, stream); //将本地流附属至peer中
      });
      // await peer.addStream(stream); //旧方法（将本地流附属至peer中）
      peer.addEventListener('addstream', setVideo) //当peer收到其他流时显示另一个video以显示对方
      peer.addEventListener('icecandidate', sendIce) //获取到candidate时，将其发送至服务端，传至对方
      peer.addEventListener('negotiationneeded', sendOffer) //双方约定的协商被完成时才触发该方法
  }

  function setVideo(data) { //播放对方的视频流
      console.log(data.stream)
      let back = document.getElementById('back')
      back.hidden = false //显示挂断按钮
      back.addEventListener('click', breakVideoConnect) //挂断事件
      isCalling = true //正在通话
      let video = document.querySelector('#otherVideo');
      video.srcObject = data.stream;
      video.onloadedmetadata = function (e) {
          video.play();
      };
  }

  async function sendOffer() { //同步发送offer到服务端，发送给对方
      let offer = await peer.createOffer();
      await peer.setLocalDescription(offer); //peer本地附属offer
      socket.emit('_offer', {
          streamData: offer
      });
  }

  async function getOffer(data) { //接收到offer后，返回answer给对方
      if (!peer) return //等待对方响应，也可以用try catch
      await peer.setRemoteDescription(data.streamData); //peer远程附属offer
      sendAnswer()
  }

  async function sendAnswer() {
      let answer = await peer.createAnswer();
      await peer.setLocalDescription(answer); //peer附属本地answer
      socket.emit('_answer', {
          streamData: answer
      });
  }

  async function getAnswer(data) { //接收到answer后，peer远程附属answer
      await peer.setRemoteDescription(data.streamData);
  }

  function sendIce(e) { //setLocalDescription触发时，发送ICE给对方
      if (!e || !e.candidate) return
      socket.emit('_ice', {
          streamData: e.candidate
      });
  }

  async function getIce(data) { //获取对方的ICE
      if (!peer) return //等待对方响应，也可以用try catch
      var candidate = new RTCIceCandidate(data.streamData)
      await peer.addIceCandidate(candidate)
  }
  ```

## **服务端**

后端部分同样使用socketio进行通信  
首先在npm初始化后下载express，socket.io

```
npm i express --save-dev
npm i socket.io --save-dev
```

之后引入至server.js中

```javascript
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
```

并监听1024端口

```javascript
server.listen(1024, function () {
    console.log('Socket Open')
});
```

**配置socket**  
给socket添加一些事件

```javascript
io.on('connect', socket => {
    let {
        token
    } = socket.handshake.query
    socket.on('disconnect', (exit) => { //socket断开
        delFormList(token) //清除用户
        broadCast(socket, token, 'leave') //广播给其他用户
    })
});
```

这样，我们最简单的一个socket就搭好了

### 完整的server.js

```javascript
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
let userList = {} //用户列表，所有连接的用户
let userIds = {} //用户id列表，显示到前端
let roomList = {} //房间列表，视频聊天
io.on('connect', socket => {
    let {
        token
    } = socket.handshake.query
    socket.on('disconnect', (exit) => { //socket断开
        delFormList(token) //清除用户
        broadCast(socket, token, 'leave') //广播给其他用户
    })
    socket.on('inviteVideo', inviteVideoHandler) //邀请用户
    socket.on('askVideo', inviteVideoHandler); //回应用户是否邀请成功
    if (userList[token]) { //找到相同用户名就跳出函数
        socket.emit('open', {
            result: 0,
            msg: token + '已存在'
        });
        socket.disconnect()
        return;
    }
    addToList(token, socket) //用户连接时，添加到userList
    broadCast(socket, token, 'enter') //广告其他用户，有人加入
});

function addToList(key, item) { //添加到userList
    item.emit('open', {
        result: 1,
        msg: '你已加入聊天',
        userIds,
        token: key
    });
    userList[key] = item
    userIds[key] = key
}

function delFormList(key) { //断开时，删除用户
    delete userList[key];
    delete userIds[key]
}

function broadCast(target, token, type) { //广播功能
    let msg = '加入聊天'
    if (type !== 'enter') {
        msg = '离开聊天'
    }
    target.broadcast.emit('dataChange', {
        result: 1,
        msg: token + msg,
        userIds
    });
}

function inviteVideoHandler(data) { //邀请方法
    let {
        myId,
        otherId,
        type,
        allow
    } = data, msg = '邀请你进入聊天室', event = 'inviteVideoHandler', roomNo = otherId //默认房间号为邀请方id
    if (type == 'askVideo') {
        event = 'askVideoHandler'
        if (allow == 1) {
            addRoom(myId, otherId)
            roomNo = myId //保存房间号
            msg = '接受了你的邀请'
        } else if (allow == -1) {
            msg = '正在通话'
        } else {
            msg = '拒绝了你的邀请'
        }
    }
    userList[otherId].emit(event, {
        msg: myId + msg,
        token: myId,
        allow,
        roomNo
    });
}

async function addRoom(myId, otherId) { //用户同意后添加到视频聊天室，只做1对1聊天功能
    roomList[myId] = [userList[myId], userList[otherId]]
    startVideoChat(roomList[myId])
}

function startVideoChat(roomItem) { //视频聊天初始化
    for (let i = 0; i < roomItem.length; i++) {
        roomItem[i].room = roomItem
        roomItem[i].id = i
        roomItem[i].on('_ice', _iceHandler)
        roomItem[i].on('_offer', _offerHandler)
        roomItem[i].on('_answer', _answerHandler)
        roomItem[i].on('_break', _breakRoom)

    }
}

function _iceHandler(data) { //用户发送ice到服务端，服务端转发给另一个用户
    let id = this.id == 0 ? 1 : 0 //判断用户二者其一
    this.room[id].emit('ice', data);
}

function _offerHandler(data) { //用户发送offer到服务端，服务端转发给另一个用户
    let id = this.id == 0 ? 1 : 0
    this.room[id].emit('offer', data);
}

function _answerHandler(data) { //用户发送answer到服务端，服务端转发给另一个用户
    let id = this.id == 0 ? 1 : 0
    this.room[id].emit('answer', data);
}

function _breakRoom(data) { //挂断聊天
    for (let i = 0; i < roomList[data.roomNo].length || 0; i++) {
        roomList[data.roomNo][i].emit('break', {
            msg: '聊天挂断'
        });
    }
}
server.listen(1024, function () {
    console.log('Socket Open')
});
```

### 实现效果

分别在我方发送stream之前打印stream，收到对方stream后打印stream，我们会发现，双方的stream互换了位置，也就是说整个媒体对象进行了交换

![](https://img-blog.csdnimg.cn/20200312095925878.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20200312095925915.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

和同事在两台电脑上测试效果

![](https://img-blog.csdnimg.cn/2020031210313496.gif)

### 注意：

前端项目必须运行在本地或者https服务下，因为navigator.mediaDevices.getUserMedia需要运行在安全模式下，用户第一次使用需要授权摄像头或音频权限，所以双方电脑需要有相关功能

看到这里，希望留下你宝贵的建议