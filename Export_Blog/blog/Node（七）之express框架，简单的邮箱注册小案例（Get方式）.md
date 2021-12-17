---
title:  Node（七）之express框架，简单的邮箱注册小案例（Get方式） 
date:  2018-11-29 17:12:5412-1908-0605-2207-0811-2804-2008-0512-1309-0608-2910-2709-0612-0312-0307-2205-14 
---
附上代码：

### HTML部分（需要用到Jq）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="./jquery.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div:nth-child(2) {
        display: none;
      }
      input {
        display: block;
        height: 40px;
        width: 200px;
        margin: 20px auto;
      }
      button:not(#email) {
        display: block;
        height: 30px;
        width: 70px;
        background: lightcoral;
        border: none;
        margin: 0 auto;
      }
      #email {
        display: block;
        height: 30px;
        width: 100px;
        margin: 0 auto;
      }
      ul {
        height: 50px;
        width: 200px;
        background: lightblue;
        margin: 0 auto;
        list-style: none;
      }
      li {
        height: 50px;
        width: 100px;
        float: left;
        text-align: center;
        line-height: 50px;
      }
      li:hover {
        background: lightgreen;
        cursor: pointer;
      }
    </style>
  </head>

  <body>
    <ul>
      <li id="regChange">注册</li>
      <li id="loginChange">登录</li>
    </ul>
    <div id="reg">
      <input type="text" placeholder="邮箱" id="user" />
      <input type="text" placeholder="密码" id="psd" />
      <input type="text" placeholder="验证码" id="sendmail" />
      <button id="email">发送验证码</button> <button id="btn">注册</button>
    </div>
    <div id="login">
      <input type="text" placeholder="用户名" id="loguser" />
      <input type="text" placeholder="密码" id="logpsd" />
      <button id="logbtn">登录</button>
    </div>

    <script>
        //增加监听事件
      btn.addEventListener("click", clickHandler);
      logbtn.addEventListener("click", clickHandler);
      email.addEventListener("click", sendHandler);
      regChange.addEventListener("click", changeHandler);
      loginChange.addEventListener("click", changeHandler);

      function clickHandler(e) {
        if (this.textContent === "注册") {
            //若为空时跳出
          if (!user.value || !psd.value || !sendmail.value) {
            alert("Can't be empty");
            return;
          }
          //点击注册时将邮箱号，密码，验证码传送至后台
          $.get(
            `http://localhost:1024/index/reg?user=${user.value}&psd=${
              psd.value
            }&mail=${sendmail.value}`,
            function(res) {
                //后台返回的对象，若hasUser为真，说明已有用户名，否则注册成功
              if (res.hasUser) {
                alert("注册失败");
                return;
              } else {
                alert("注册成功~");
              }
              //成功后隐藏注册，显示登录
              reg.style.display = "none";
              login.style.display = "block";
            }
          );
        } else if (this.textContent === "登录") {
            // 同注册，不能为空
          if (!loguser.value || !logpsd.value) {
            alert("Can't be empty");
            return;
          }
          //点击登录时将邮箱号，密码传送至后台
          $.get(
            `http://localhost:1024/index/login?user=${loguser.value}&psd=${
              logpsd.value
            }`,
            function(res) {
                //后台返回的对象，若isUser为真，说明正确，并跳转至欢迎页，否则失败
              if (res.isUser) {
                alert("登录成功");
                location.href = "./welcome.html";
              } else {
                alert("用户名或密码不正确");
                return;
              }
            }
          );
        }
      }

      function sendHandler(e) {
        //   点击获取验证码后将验证码发送到后端进行比对
        $.get(`http://localhost:1024/index/sendmail?${user.value}`);
      }

      function changeHandler(e) {
        //   点击上方的注册登录切换
        if (e.target.textContent === "注册") {
          reg.style.display = "block";
          login.style.display = "none";
        } else {
          reg.style.display = "none";
          login.style.display = "block";
        }
      }
    </script>
  </body>
</html>
```

### node后台部分： 需要引入的第三方模块有：express框架，cors，nodemailer，

```javascript
const express = require('express');//引入express框架（需要先下载，官网有教程）
const url = require('url');
const path = require('path');
const fs = require('fs');
const cors = require('cors');//引入cors模块（解决跨域问题）
const app = express();
// const bodyparser = require('body-parser');
const sendMail = require('./send');//这个模块是发送邮件模块（在我第三篇node文章里有）


app.use(cors());
// 下面的类似于http请求的头文件(另一篇文章有写到http请求，也是注册登录)
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");//允许的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");//跨域允许的请求方式 
    next();//是否继续向下执行
})

//注册接口
var count = '';//新建一个空字符存放验证码，可供全局调用
app.get('/index/reg', (req, res) => {
    let search = url.parse(req.url).search;//保存前端传来的数据
    files = path.join(__dirname, './user.txt');//用一个txt来记录用户名和密码
    fs.readFile(files, 'utf8', (err, data) => {
        //读取txt文件，判断是否存在用户名，并对验证码进行判断
        if (data.indexOf(search.split('&')[0]) === -1 && search.split('&')[2].split('=')[1] === count) {
            fs.appendFile(files, search.split('&')[0] + '&' + search.split('&')[1]);//符合条件就将信息存至TXT中，并返回一个对象至前端，表示验证成功（hasUser为真，说明该用户已存在）
            res.send({
                hasUser: false
            });
        } else {
            //不符合条件就返回一个对象至前端，表示验证失败
            res.send({
                hasUser: true
            });
        }

    });
});

//登录接口
app.get('/index/login', (req, res) => {
    let search = url.parse(req.url).search;//保存前端传来的数据
    files = path.join(__dirname, './user.txt');
    //读取txt文件，判断是否存在用户名和对应的密码
    fs.readFile(files, 'utf8', (err, data) => {
        //符合条件就返回一个对象至前端，表示验证失败（isUser为真，说明该用户名与密码不符）
        if (data.indexOf(search) === -1) {
            res.send({
                isUser: false
            });
        } else {
            res.send({
                isUser: true
            });
        }
    });
});

//邮箱验证接口
app.get('/index/sendmail', (req, res) => {
    count = '';//初始化验证码容器
    let Email = url.parse(req.url).query;//获取前端传来的邮箱号
    for (let i = 0; i < 4; i++) {
        count += Math.floor(Math.random() * 10);//生成4个随机数
    }
    sendMail.send(Email, count);//调用邮件发送模块（传入注册的邮箱，验证码）
    res.send(count);
});
//监听服务
app.listen(1024, () => {
    console.log('Server Start~');
});
```

### 附上发送邮件的模块(在我前面的文章中也有)

```javascript
//引入模块
 
const nodemailer = require("nodemailer");
 
//新建对象
 
let obj = {
 
transporter: nodemailer.createTransport({
 
service: "qq", // 运营商 qq邮箱 网易//
 
port: 465,
 
secure: true,
 
auth: {
 
user: "**********@qq.com", //发送方的邮箱
 
pass: "***************" // pop3 授权码
 
}
 
}),
 
//传参（对方的mail地址,内容）
 
send: function(mail, content) {
 
mailOptions = {
 
//发送方的邮箱地址
 
from: '"Hello World~" <***********@qq.com>',
 
to: mail,
 
subject: content,
 
text: content,
 
html: "<h1>" + content + "</h1>"
 
};
 
this.transporter.sendMail(mailOptions, (error, info) => {
 
if (error) {
 
return console.log(error);
 
}
 
console.log("Message sent: %s", info.messageId);
 
});
 
}
 
};
 
//抛出对象以接收
 
module.exports = obj;
```