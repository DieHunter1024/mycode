---
title:  Node.js(三)发送邮件模块（第三方模块） 
date:  2018-11-27 16:14:5712-0301-3109-0511-2812-0303-1202-0406-0311-2003-1612-0303-0502-0211-3004-0903-1310-0810-17 
---
模块文件：首先用Npm下载一个由Andris Reinman大佬的第三方模块nodemailer

修改了一下他的模块生成一个js文件：

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

//然后再新建一个js文件用来调用模块

```javascript
const sendMassage = require("./send.js");

sendMassage.send("*********@qq.com","Hello World~");
```

运行这个js文件，就可以给对方发送电子邮件啦