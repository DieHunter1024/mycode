---
title:  Node（六）其他常用内置模块 
date:  2018-11-28 16:27:3107-2710-0409-0712-1209-1809-2906-1509-0911-2304-08 
---
# HTTP模块

跨域：用代理的方式跨域，打个比方，我自己有一个前端，一个后台，小明有一个后台。我的前端需要访问小明的后台就是所谓的跨域，但是如果用我自己的后台使用http请求访问小明的后台，就不用跨域，于是我就可以通过自己的前端用ajax访问自己的后端完成数据请求。·

创建服务器：通过ajax的post传至data中

```javascript
//加载库中http.js，加载进入赋值给变量http，是一个对象
var reg = require("http");
//req就是客户端向服务器端请求的数据
//res就服务器项客户端发送的数据
//reg.createServer创建服务
var server = reg.createServer(function (req, res) {
    var data = "";
//req.on("data")是客户端请求的数据正在接收中的事件
    req.on("data", function (d) {
        data += d;
    });
//req.on("end")是客户端请求的数据接收完毕
    req.on("end", function () {
        var obj = JSON.parse(data);
//头文件，最后的*表示允许所有域访问
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        res.write(JSON.stringify(obj));
        res.end();
    });
});
//侦听事件
server.listen(1024, "localhost", function () {
    console.log("注册服务开启，开始侦听");
});
```

爬虫 获取数据：

```javascript
//引入http模块
const http = require('http');
//发起服务器短的请求
const fs = require('fs');
http.get('http://localhost/test/1.html', (res) => {
    const {
        statusCode
    } = res;//状态码
    const contentType = res.headers['content-type'];//请求的类型
    let error;
    if (statusCode !== 200) {
        error = new Error('状态码错误');
    }
    if (error) {
        console.log(error.message);
        res.resume();// 清除请求缓存
        return;
    }
// 数据处理
    res.setEncoding('utf8');//设置数据的编码格式
    let data = '';
    res.on('data', function (d) {
        data += d;//接收分段信息
    });
    res.on('end', () => {
        // console.log(data);
//接收后写入至本地文件
        fs.writeFile('./test1.html', data, 'utf8', (err) => {
            if (err) {
                throw err
            }
            console.log('下载完成');
        })
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);//出错返回信息
});
```

# URL模块

引入：const url = require('url');

```javascript
let urlstring='http://www.baidu.com:8080/home/login/test?name=wy&ps=wanger#hash'
const myURL = url.parse(urlstring,true);
//parse 将url字符串变成url格式的对象
```

```javascript
 let obj={
	protocol: 'http:',
	slashes: true,
	auth: null,
	host: 'www.baidu.com:8080',
	port: '8080',
	hostname: 'www.baidu.com',
	hash: '#hash',
	search: '?name=wy&ps=wanger',
	query: { name: 'wy', ps: 'wanger' },
	pathname: '/home/login/test',
	path: '/home/login/test?name=wy&ps=wanger',
	href:'http://www.baidu.com:8080/home/login/test?name=wy&ps=wanger#hash' 
}
let result=url.format(obj)
//format将url对象变成url格式的字符
```

# QueryString模块

引入：let qs=require('querystring');

```javascript
parse(query,"%",'@')//将字符串转化为对象
qs.stringify(obj,'@',"!")//将对象转为字符
qs.escape(query)//将query 中的汉字或者特殊字符进行编码
qs.unescape(code)//将query 中的汉字或者特殊字符进行解码
```

# Path模块

引入：const path=require('path');

```javascript
path.join()//实现路径拼接
path.join(__dirname,'./file.js')//__dirname是当前文件的文件夹，可以拼接多个，以逗号隔开：
path.join(__dirname,'../','./hw','mail.js')
path.basename('path')//当前文件名
path.dirname('path')//当前文件夹名
path.extname('path')//拓展名
```

# Events模块

引入：const Event = require('events');

首先要进行以下代码（与其他模块不同）

```javascript
class MyEmitter extends Event {}

// 类的继承

const myEmitter = new MyEmitter();

// 实例化对象 new对象

// 添加对象监听

let callback=(food,food2)=>{

console.log('eat'+food+food2);

}
```

然后，愉快的调用

```javascript
myEmitter.on('eat',callback);//eat是事件名
myEmitter.emit('eat','aaaaa','bbbb')//可以传参
myEmitter.removeAllListeners()//移除所有的事件
myEmitter.removeListener('eat',callback);//移除某个事件
```

# Stream流

首先需要引入：const fs=require('fs');

```javascript
let read=fs.createReadStream('./events.js')// 创建可读的流
let  write=fs.createWriteStream('./events3.js')// 创建可写的流
```

读取Stream流并复制图片的例子

```javascript
const fs = require('fs');
let read = fs.createReadStream('./file/test1.png');//新建可读Stream流文件
let data = '';//外置容器加载数据
read.setEncoding('binary');//转换成图片的格式，默认utf8
read.on('data',(d)=>{
    data+=d;//每次流式传输数据
});
read.on('end',()=>{
    fs.writeFileSync('./file/test2.png',data,'binary');//将数据写入至文件
});
```

读取Stream流并以可写流方式复制图片的例子

```javascript
const fs = require('fs');
let read = fs.createReadStream('./file/test1.png');//新建可读Stream流文件
let change = fs.createWriteStream('./file/test3.png','binary');//新建可写Stream流文件
read.setEncoding('binary');//转换格式（图片）
read.on('data',(d)=>{
    change.write(d);//流式存储,无需等到数据加载完，一边加载一边存储
});
```

读取加写入配合pipe完成复制

```javascript
//达到文件流式复制
const fs=require('fs')
let read = fs.createReadStream('./file/test1.png', 'binary'); //新建可读Stream流文件
let change = fs.createWriteStream('./file/test4.png', 'binary'); //新建可写Stream流文件
read.pipe(change);//将可读流传输至可写流文件中
```

# Zlib模块

引入：const zip = require('zlib');和

const fs = require('fs');

```javascript
const gzip = zip.createGzip();//新建文件压缩
let input = fs.ReadStream('./test1.png');//传入的文件
let output = fs.WriteStream('./test1.gzip');//将压缩好的文件生成
input.pipe(gzip).pipe(output);//pipe流式传输
```