---
title:  Node（十一）mongoose配合Node实现注册登录(注册上传头像，登录成功后显示用户信息) 
date:  2018-12-03 17:34:5307-0812-0806-2103-1011-1812-0301-1503-2206-2303-1208-2009-1212-1208-3008-1311-0709-03 
---
### 需要引入的模块和框架：JQ，monogoDB，mongoose模块，express模块，nodemailer模块，cors模块，multer模块，body-parser模块。

文件夹（大致）结构如下：

![](https://img-blog.csdnimg.cn/20181203171617714.png)

css：主页样式；

get\_pic： 临时文件存放；

img：默认头像路径；

js：首页的js；

main：入口server文件（终端执行的）；

node\_moudules:下载的模块和框架；

savePic：保存静态文件；

set：注册，登录，mongoose初始，邮件发送等模块；

index：主页；

首先，主页的Html，Css，Js文件：

## Html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="./jquery.js"></script>
    <link rel="stylesheet" href="./css/main.css">
  </head>
  <body>
    <ul id="list">
      <li id="regChange">注册</li>
      <li id="loginChange">登录</li>
    </ul>
    <div id="reg">
      <input type="file" name="img" id="fileData">
      <button id="send">上传头像</button>
      <img id="headImg" src="">
      <input type="text" placeholder="邮箱" id="user" />
      <input type="text" placeholder="密码" id="psd" />
      <input type="text" placeholder="验证码" id="sendmail" />
      <button id="email">发送验证码</button>
      <button id="btn">注册</button>
    </div>
    <div id="login">
      <input type="text" placeholder="用户名" id="loguser" />
      <input type="text" placeholder="密码" id="logpsd" />
      <button id="logbtn">登录</button>
    </div>
    <script src="./js/main.js"></script>
  </body>

</html>
```

## Css

```css
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
  #send{
    display: inline-block;
    
  }
  #headImg{
    display: block;
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
  table{
    margin: 50px auto 0;
  }
  td{
    text-align: center;
    border: 1px solid lightcoral;
  }
  td img{
    vertical-align: top;
  }
```

## Js

```javascript

//主页js文件


//增加监听事件
btn.addEventListener("click", clickHandler); //注册
logbtn.addEventListener("click", clickHandler); //登录
email.addEventListener("click", sendHandler); //发送验证码
regChange.addEventListener("click", changeHandler); //切换登录注册
loginChange.addEventListener("click", changeHandler);
$('#send').on('click', sendHead);
webAdd = 'http://localhost:1024/main';
var table; //新建登陆成功后的表格

function sendHead(e) { //上传文件
    var picData = new FormData(); //实例化文件对象
    picData.append("sendImg", $("#fileData")[0].files[0]); //将上传文件的添加到文件中
    $.ajax({ //ajax方式上传至后台
        url: webAdd + '/head',
        type: 'POST',
        data: picData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (!data.error) {
                alert('Success');
                headImg.src = data.data; //成功时将图片显示
                headImg.style.width = '100px';
            }
        },
        error: function () {
            alert('Error');
        }
    });
}

function clickHandler(e) {
    if (this.textContent === "注册") {
        //若为空时跳出
        if (!user.value || !psd.value || !sendmail.value) {
            alert("输入不能为空");
            return;
        }
        var AllData = {
            email: user.value,
            password: psd.value,
            mailnum: sendmail.value,
            headPic: headImg.src
        };
        //点击注册时将邮箱号，密码，验证码，头像传送至后台
        $.post(webAdd + '/reg', AllData,
            function (res) {
                //后台返回的对象，若hasUser为真，说明已有用户名，否则注册成功
                if (res.hasUser) {
                    // location.reload();
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
        $.post(webAdd + '/login', {
                email: loguser.value,
                password: logpsd.value
            },
            function (res) {
                //后台返回的对象，若isUser为真，说明正确，并跳转至欢迎页，否则失败
                if (res.isUser) {
                    alert("登录成功");
                    login.style.display = "none";
                    list.style.display = 'none';
                    createTab(document.body, res.data[0]); //若登陆成功，创建用户表格
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
    $.post(webAdd + '/sendmail', {
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

function createTab(parent, data) {//新建表格函数
    if (table) {
        table.remove();//若表格存在，删除表格
    }
    table = document.createElement('table');
    for (var str in data) {//根据遍历数据创建表格
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        if (str === 'head') {
            td.textContent = '头像:'
            var img = new Image();
            img.src = data[str];
            td.appendChild(img);
        } else {
            td.textContent = str + ':' + data[str];
        }
        tr.appendChild(td);
        table.appendChild(tr);
    }

    parent.appendChild(table);
}
```

之后是其他模块：

## mongoose的Schema：

```javascript
const mongoose = require('./main'); //引入main模块
const Schema = mongoose.Schema; //新建schema对象
let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    head: {
        type: String,
        required: true
    }
}); //实例化对象
let userModel = mongoose.model('allUser', userSchema); //新建数据库
module.exports = userModel; //抛出模块
```

## mongoose数据库连接：

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

## 电子邮件验证模块：

```javascript
const nodemailer = require("nodemailer");
let obj = {
  transporter: nodemailer.createTransport({
    service: "qq", // 运营商  qq邮箱 网易//
    port: 465,
    secure: true,
    auth: {
      user: "********@qq.com", //发送方的邮箱
      pass: "**********" // pop3 授权码
    }
  }),
  send: function(mail, content,callback) {
    mailOptions = {
      from: '"Hello World~" <**********@qq.com>',
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

## 头像上传：

```javascript
const express = require('express');
const router = express.Router(); //新建路由
var multer = require('multer'); //文件获取储存的第三方模块
const fs = require('fs');
const path = require('path');
var upload = multer({
    dest: '../get_pic/'
}); //将头像临时文件夹
router.post('/head', upload.single('sendImg'), (req, res) => { //路由地址
    //读取传输的头像
    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            throw ('Load_Err');
        }
        let type = req.file.mimetype.split('/')[1]; //获取文件类型名
        let name = new Date().getTime() + parseInt(Math.random() * Math.random() * 1000000); //使用时间戳和随机数生成随机名，并且连成完整的文件名
        //保存文件至savePic文件夹
        let filename = name + '.' + type;
        fs.writeFile(path.join(__dirname, '../savePic/' + filename), data, (err) => {
            // 返回信息给前端
            if (err) {
                res.send({
                    err: 1,
                    msg: '上传失败'
                });
                //保存图片后删除临时文件
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.log('删除失败');
                    }
                });
                return;
            }
            res.send({
                err: 0,
                msg: '上传成功',
                data: 'savePic/' + filename
            });
            //保存图片后删除临时文件
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log('删除失败');
                }
            });
        });
    });


});
module.exports = router;
```

## 注册：

```javascript
const express = require('express');
const router = express.Router(); //新建路由
const Model = require('./mod'); //传入数据库对象
const fs = require('fs');
const path = require('path');
const sendMail = require('./send'); //传入邮件发送的模块对象
var count = ""; //新建一个空字符存放验证码，可供全局调用
//用post方法传输数据
router.post('/reg', (req, res) => {
    //保存前端传来的数据
    var mail = req.body.email;
    var psd = req.body.password;
    var mailnum = req.body.mailnum;
    var headUrl = req.body.headPic;
    //使用Model对象连接数据库
    Model.find({ // 查询邮箱
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
        });
        //若前端传了图片，则保存上传的图片，否则使用默认图片
        if (headUrl==='http://localhost:1024/') {
            headUrl = 'http://localhost:1024/img/cat.gif';
        }
        Model.insertMany({ //反之将邮箱插入到数据库
            'email': mail,
            'password': psd,
            'head':headUrl
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

## 登录：

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
                isUser: true,
                data:data
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

## 最后server.js

```javascript
const express = require('express');
const app = express();
const cors = require("cors"); //引入cors模块（解决跨域问题）
const path = require('path');
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
//创建静态文件目录
app.use(express.static(path.join(__dirname, '../../user_info')));
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
// 路由选择上传图片模块
const head = require('../set/sendhead.js');
app.use('/main', head);
// 开启监听
app.listen(1024, () => {
    console.log('Server Start~');
});
```