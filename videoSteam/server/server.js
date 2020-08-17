const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// 配置https
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync('cert.key'),
//   cert: fs.readFileSync('cert.pem')
// };
// const server = require('https').createServer(options,app);

let userList = {}; //用户列表，所有连接的用户
let userIds = {}; //用户id列表，显示到前端
let roomList = {}; //房间列表，视频聊天
io.on("connect", (socket) => {
  let { token } = socket.handshake.query;
  socket.on("disconnect", (exit) => {
    //socket断开
    delFormList(token); //清除用户
    broadCast(socket, token, "leave"); //广播给其他用户
  });
  socket.on("inviteVideo", inviteVideoHandler); //邀请用户
  socket.on("askVideo", inviteVideoHandler); //回应用户是否邀请成功
  if (userList[token]) {
    //找到相同用户名就跳出函数
    socket.emit("open", {
      result: 0,
      msg: token + "已存在",
    });
    socket.disconnect();
    return;
  }
  addToList(token, socket); //用户连接时，添加到userList
  broadCast(socket, token, "enter"); //广告其他用户，有人加入
});

function addToList(key, item) {
  //添加到userList
  item.emit("open", {
    result: 1,
    msg: "你已加入聊天",
    userIds,
    token: key,
  });
  userList[key] = item;
  userIds[key] = key;
}

function delFormList(key) {
  //断开时，删除用户
  delete userList[key];
  delete userIds[key];
}

function broadCast(target, token, type) {
  //广播功能
  let msg = "加入聊天";
  if (type !== "enter") {
    msg = "离开聊天";
  }
  target.broadcast.emit("dataChange", {
    result: 1,
    msg: token + msg,
    userIds,
  });
}

function inviteVideoHandler(data) {
  //邀请方法
  let { myId, otherId, type, allow } = data,
    msg = "邀请你进入聊天室",
    event = "inviteVideoHandler",
    roomNo = otherId; //默认房间号为邀请方id
  if (type == "askVideo") {
    event = "askVideoHandler";
    if (allow == 1) {
      addRoom(myId, otherId);
      roomNo = myId; //保存房间号
      msg = "接受了你的邀请";
    } else if (allow == -1) {
      msg = "正在通话";
    } else {
      msg = "拒绝了你的邀请";
    }
  }
  userList[otherId].emit(event, {
    msg: myId + msg,
    token: myId,
    allow,
    roomNo,
  });
}

async function addRoom(myId, otherId) {
  //用户同意后添加到视频聊天室，只做1对1聊天功能
  roomList[myId] = [userList[myId], userList[otherId]];
  startVideoChat(roomList[myId]);
}

function startVideoChat(roomItem) {
  //视频聊天初始化
  for (let i = 0; i < roomItem.length; i++) {
    roomItem[i].room = roomItem;
    roomItem[i].id = i;
    roomItem[i].on("_ice", _iceHandler);
    roomItem[i].on("_offer", _offerHandler);
    roomItem[i].on("_answer", _answerHandler);
    roomItem[i].on("_break", _breakRoom);
  }
}

function _iceHandler(data) {
  //用户发送ice到服务端，服务端转发给另一个用户
  let id = this.id == 0 ? 1 : 0; //判断用户二者其一
  this.room[id].emit("ice", data);
}

function _offerHandler(data) {
  //用户发送offer到服务端，服务端转发给另一个用户
  let id = this.id == 0 ? 1 : 0;
  this.room[id].emit("offer", data);
}

function _answerHandler(data) {
  //用户发送answer到服务端，服务端转发给另一个用户
  let id = this.id == 0 ? 1 : 0;
  this.room[id].emit("answer", data);
}

function _breakRoom(data) {
  //挂断聊天
  for (let i = 0; i < roomList[data.roomNo].length || 0; i++) {
    roomList[data.roomNo][i].emit("break", {
      msg: "聊天挂断",
    });
  }
}
server.listen(1024, function () {
  console.log("Socket Open");
});
