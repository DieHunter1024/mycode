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