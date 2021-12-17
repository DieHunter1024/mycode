---
title:  JS案例：Ajax实现简单局域网聊天室 
date:  2018-11-30 10:58:3407-2006-0803-2205-1104-1006-0604-0911-0108-0606-1301-2601-2304-0501-21 
---
利用Ajax将数据提交到后台，再由后台发送到前端，渲染内容

代码如下：

## HTML：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            *{margin: 0;padding: 0;}
    #textBox{width: 800px;height: 600px;border: 1px solid black;margin: 50px 0;font-size: 20px;}
    </style>
    </head>

    <body>
        <textarea id="textBox"></textarea><br>
        <input type="text">:<input type="text" style="width:600px;"><button>Send</button>
        <script>
            var names = document.querySelectorAll("input")[0];
            var msgs = document.querySelectorAll("input")[1];
            var box = document.getElementById("textBox");
            var btn = document.querySelectorAll("button")[0];
            //设置刷新时间为一秒一次
            setInterval(loadHandler, 1000);
            // 点击发送。监听事件
            btn.addEventListener("click", sendText);
            // 点击后执行Ajax
            function loadHandler(data) {
                if (!data) {
                    data = {
                        id: 2
                    };
                }
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", startPost);
                xhr.open("POST", "http://10.9.48.155:1024/"); //这里一定是主机的IP地址
                xhr.send(JSON.stringify(data));

            }



            function startPost(e) {
                box.value = (JSON.parse(this.response)).resu.join("\n"); //将后台拼接好的数据返回到聊天面板
            }

            function sendText(e) {
                // 将从输入框获取的内容添加到对象发送到后端
                if (names.value.length === 0) return;
                if (msgs.value.length === 0) return;
                var obj = {
                    id: 1,
                    user: names.value,
                    mas: msgs.value
                }
                loadHandler(obj);
            }
        </script>
    </body>

</html>
```

## node代码：

```javascript
var http = require("http");//获取http请求（前面的文章有详细注释）
var arr = []; //新建消息容器，存放消息集

var server = http.createServer(function (req, res) {
    var data = "";
    req.on("data", function (d) {
        data += d;
    });
    req.on("end", function () {
        var obj = JSON.parse(data);
        //解析对象，将user和msg取出
        if (obj.id === 1) {
            arr.push(obj.user + ":" + obj.mas);
        }
        // 返回数组和错误信息（没有则为空）
        var result = {
            resu: arr,
            error: null
        };
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        res.write(JSON.stringify(result));//将打包好的对象传到前端
        res.end();
    });
});
// 监听服务
server.listen(1024, "10.9.48.155", function () {
    console.log("侦听开始");
})
```