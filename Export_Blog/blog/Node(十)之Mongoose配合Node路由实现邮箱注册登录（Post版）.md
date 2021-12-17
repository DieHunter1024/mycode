---
title:  Node(十)之Mongoose配合Node路由实现邮箱注册登录（Post版） 
date:  2018-12-02 15:36:2202-0211-0703-1203-2303-2102-1111-1111-0611-1703-0504-2811-2311-0312-0211-28 
---
## 首先新建一个HTML：（引入jq）

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
      div:nth-child(3) {
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
            alert("不能为空");
            return;
          }
          //点击注册时将邮箱号，密码，验证码传送至后台
          $.post("http://localhost:1024/main/reg", {
              email: user.value,
              password: psd.value,
              mailnum: sendmail.value
            },
            function (res) {
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
            alert("不能为空");
            return;
          }
          //点击登录时将邮箱号，密码传送至后台
          $.post("http://localhost:1024/main/login", {
              email: loguser.value,
              password: logpsd.value
            },
            function (res) {
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
        $.post("http://localhost:1024/main/sendmail", {
          email: user.value
        });
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

## 新建set文件夹，在文件夹中新建几个js文件：

## main.js(连接mongoose数据库)

```javascript
const mongoose = require('mongoose');//引入mongoose
mongoose.connect('mongodb://localhost:27017/UserList', {
    useNewUrlParser: true
});//连接数据库
let db = mongoose.connection;
db.on("error", function (error) {
    console.log("错误：" + error);
});

db.on("open", function () {
    console.log("连接成功");
});

db.on('disconnected', function () {
    console.log('连接断开');
});
module.exports = mongoose;//抛出mongose对象
```

## mod.js（实例化Schema，新建数据库）

```javascript
const mongoose = require('./main');//引入main模块
const Schema = mongoose.Schema;//新建schema对象
let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});//实例化对象
let userModel = mongoose.model('allUser', userSchema);//新建数据库
module.exports = userModel;//抛出模块
```

## send.js（邮件发送模块）

```javascript
const nodemailer = require("nodemailer");
let obj = {
  transporter: nodemailer.createTransport({
    service: "qq", // 运营商  qq邮箱 网易//
    port: 465,
    secure: true,
    auth: {
      user: "*******@qq.com", //发送方的邮箱
      pass: "********" // pop3 授权码
    }
  }),
  send: function(mail, content,callback) {
    mailOptions = {
      from: '"Hello World~" <******@qq.com>',
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
      callback();
    });
  }
};
module.exports = obj;
```

## reg.js（创建注册模块）

```javascript
const express = require('express');
const router = express.Router(); //新建路由
const Model = require('./mod'); //传入数据库对象
const sendMail = require('./send'); //传入邮件发送的模块对象
var count = ""; //新建一个空字符存放验证码，可供全局调用
//用post方法传输数据
router.post('/reg', (req, res) => {
    //保存前端传来的数据
    var mail = req.body.email;
    var psd = req.body.password;
    var mailnum = req.body.mailnum;
    //使用Model对象连接数据库
    Model.find({// 查询邮箱
        'email': mail
    }).then((data) => {
        //若返回的邮箱找到或验证码不对，则抛错
        if (data.length >= 1 || mailnum !== count) {
            res.send({
                hasUser: true
            });
            return;
        }
        res.send({
            hasUser: false
        })
        Model.insertMany({//反之将邮箱插入到数据库
            'email': mail,
            'password': psd
        }).then((result) => {
            console.log(result);
        })
    }).catch((err) => {
        console.log(err);
    });
});

//邮箱验证接口
router.post("/sendmail", (req, res) => {
    count = ""; //初始化验证码容器
    var mail = req.body.email; //获取前端传来的邮箱号
    for (let i = 0; i < 4; i++) {
        count += Math.floor(Math.random() * 10); //生成4个随机数
    }
    var callback = () => {
        console.log("发送成功");
    };
    sendMail.send(mail, count, callback); //调用邮件发送模块
    res.send('send');
});

module.exports = router;
```

## login.js（登录模块）

```javascript
const express = require('express');
const router = express.Router();//新建路由
const Model = require('./mod');//获取数据库对象

router.post('/login', (req, res) => {//路由地址
    //保存前端传来的数据
    var mail = req.body.email;
    var psd = req.body.password;
    Model.find({
        // 查询是否有该用户，若用户邮箱和密码符合，则抛出正确，否则抛出错误对象
        'email': mail,
        'password': psd
    }).then((data) => {
        if (data.length >= 1) {
            res.send({
                isUser: true
            });
        } else {
            res.send({
                isUser: false
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = router;
```

## 然后在set文件夹外面新建一个服务（server.js），将所有的模块拼接：

```javascript
const express = require('express');
const app = express();
const cors = require("cors"); //引入cors模块（解决跨域问题）
var bodyParser = require('body-parser');

app.use(cors());
// 下面的类似于http请求的头文件(另一篇文章有写到http请求，也是注册登录)
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
    next(); //是否继续向下执行
});
//解决post传输的数据格式问题
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
// 路由选择导入注册
const reg = require('../set/reg.js');
app.use('/main', reg);
// 路由选择导入登录
const login = require('../set/login.js');
app.use('/main', login);
// 开启监听
app.listen(1024, () => {
    console.log('Server Start~');
});
```

### 最后运行server.js实现注册登录

## 注意：案例需要用到monogoDB，Jq，mongoose模块，express模块，nodemailer模块，cors模块，  
body-parser模块