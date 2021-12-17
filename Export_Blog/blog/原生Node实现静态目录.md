---
title:  原生Node实现静态目录 
date:  2021-03-02 14:19:4408-1606-1710-1412-1011-1910-2607-0304-1907-1303-1701-1303-2503-0712-2808-3001-1002-02 
---
**一个朋友让我实现静态资源托管，之前写的都是直接通过Express或Koa框架实现的，一行代码就可以解决**

```javascript
app.use('/img', express.static(path.join(__dirname, './img')));
```

**恰好最近在看原生node，于是我自己试着实现了一个简单的静态资源托管，同时也为下篇懒加载文章做铺垫**

**首先，项目需要在node环境下运行服务器，搭建配置node参照[这篇文章](https://blog.csdn.net/time_____/article/details/114024145)**

**新建server.js文件执行node代码，在server.js中引入等会要用到的模块http和fs（filesystem）**

```javascript
const http = require('http');
const fs = require('fs');
```

**在server中创建http服务并且监听1024端口**

```javascript
let server = http.createServer((req, res) => {
    
})
server.listen(1024, () => {
    console.log('服务开启！')
})
```

**然后新增方法同步读取文件内容并返回读取结果**

```javascript
function readFile (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "binary", (err, data) => {
            if(err) {
                reject(err);
                return
            }
            resolve(data)
        })
    })
}
```

**最后，在http服务中对请求的url做判断，并调用读取文件的函数**

```javascript
    if(req.url.indexOf('/static/') !== - 1) {//判断请求路径是否包含static目录（简单判断）
        console.log('获取静态文件')
        readFile('.' + req.url).then((data) => {
            res.write(data, "binary");
            res.end();
        })
    } else {
        console.log('其他接口')
        res.write("other");
        res.end();
    }
```

**完整的server.js文件**

```javascript
const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res) => {
    if(req.url.indexOf('/static/') !== - 1) {
        console.log('获取静态文件')
        readFile('.' + req.url).then((data) => {
            res.write(data, "binary");
            res.end();
        })
    } else {
        console.log('其他接口')
        res.write("other");
        res.end();
    }
})

function readFile (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "binary", (err, data) => {
            if(err) {
                reject(err);
                return
            }
            resolve(data)
        })
    })
}

server.listen(1024, () => {
    console.log('服务开启！')
})
```

**server.js完成后，在server目录下创建img文件夹，并放几个静态文件**  
![](https://img-blog.csdnimg.cn/20210302141256926.png)  
**通过node server.js或node server启动服务器**  
![](https://img-blog.csdnimg.cn/20210302141442565.png)  
**在浏览器输入框输入url，我这里是：[http://127.0.0.1:1024/static/1.jpg](http://127.0.0.1:1024/static/1.jpg)和[http://127.0.0.1:1024/static/1.txt](http://127.0.0.1:1024/static/1.txt)**  
![](https://img-blog.csdnimg.cn/20210302141627402.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210302141659812.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**显示出相关资源后就算完成了**