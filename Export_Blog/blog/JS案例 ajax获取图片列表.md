---
title:  JS案例：ajax获取图片列表 
date:  2021-03-04 15:55:1701-1701-0501-0510-1609-2706-1312-1908-1006-2410-0802-1307-0709-2911-2307-0501-0207-04 
---
**AJAX是个啥？有什么作用？如何实现AJAX？如何使用AJAX？这几个问题我在前端JS的面试题中，遇见了不少，对于前后端分离，单页面渲染流行的今日，ajax似乎变得很重要。**

**那么什么是Ajax？  
Ajax（Asynchronous JavaScript and XML），又被称为异步 JavaScript 和 XML，它不是一门语言，而是web应用的一门技术。要知道，如果在2009年你了解前端的dom操作，ajax技术和一点点JS语法，你就已经可以找到一份不错的web前端的工作了。也正是Ajax技术将前后端分离和单页面渲染流行度提升了很大的空间**

**Ajax有什么作用？  
ajax的作用用官话来讲就是：在不需要刷新页面的情况下，就可以产生局部刷新的效果，也就是在页面不刷新的情况下实现局部渲染，使前后端数据传输得到提升。ajax实现了在浏览器与服务器之间进行http传输（只需要获得少量数据，而不用渲染整个页面），使web程序更快，更小。**

**如何实现AJAX？  
在[W3School](https://www.w3school.com.cn/ajax/index.asp)上有详细文档  
有几点需要注意：**

* **IE低版本浏览器与其他浏览器兼容性问题**
* **GET与POST请求方式的写法问题（GET需要将参数拼接在URL中并且不需要传data，而POST需要传data不需要拼接URL）**
* **同步与异步方式中的请求超时timeout（异步可以填写timeout，而同步会报错）**

**这里我也简单实现一下：  
首先，我们写个将对象属性拼接到url中的函数，方便get方式请求时调用**

```javascript
    /*
     * 将对象属性拼接到url中
     * @param url：接口地址
     * @param obj：需要操作的对象
     * @return string:拼接结果
     */
    function urlJoin (url, obj) {
        let list = []
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                list.push(`${key}=${obj[key]}`)
            }
        }
        return `${url}?${list.join('&')}`
    }
```

**然后就是ajax的基本写法（这里对ajax响应做了一个Promise操作，当然也可以改为回调或者事件监听）**

```javascript
    /*
     * ajax请求方法
     * @param config method：请求类型 url：接口地址 data：输入参数 timeout：超时时间
     * @return Promise:Promise异步处理
     */
    function myAjax (config) {
        let xhr;
        if(window.ActiveXObject) { //ie浏览器
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if(window.XMLHttpRequest) { //其他浏览器
            xhr = new XMLHttpRequest();
        }
        config.method === 'get' ? (function () {//判断get与post等请求方式
            config.url = urlJoin(config.url, config.data);
            config.data = null
        }()) : "";
        //open(请求方式|string，请求路径|string，是否异步|bool)异步一般选择true，false代表同步，选false则会使请求不堵塞,不会等待请求结果,此时的timeout也无意义
        xhr.open(config.method, config.url, config.async || true);
        xhr.send(config.data ? config.data : {})
        config.async ? xhr.timeout = config.timeout || 10 * 1000 : ''//ajax请求超时，默认10秒
        return new Promise((resolve, reject) => {
            xhr.addEventListener('timeout', function () {//超时抛错
                reject(this)
                throw Error('request timeout')
            })
            xhr.addEventListener('load', function () {
                if(xhr.readyState === 4 && xhr.status === 200) {//请求成功
                    resolve(JSON.parse(this.response))
                } else {
                    reject(this)
                }
            })
        })
    }
```

**实现完成后得点个题啊，文章的目的是获取图片列表，接着上篇文章的[nodejs搭建静态目录服务](https://blog.csdn.net/time_____/article/details/114281583)继续往下整  
在上篇文章的其他接口中，新增一个获取图片列表的接口getList**  
![](https://img-blog.csdnimg.cn/2021030315423597.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**这里我优化了一下，处理跨域，摒弃了node旧模块而使用了URL类，于是得到以下代码**

```javascript
let server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')//设置响应头解决跨域
    let url = new URL(req.url, `http://${req.headers.host}`)//解析请求的地址
    let data = urlSplit(url.href)//获取参数
    if(req.url.indexOf('/static/') !== - 1) {
        console.log('获取静态文件')
        readFile('.' + req.url).then((data) => {
            res.write(data, "binary");
            res.end();
        })
    } else {
        switch(url.pathname) {
            case '/getList':
                console.log('获取列表')
                res.write(JSON.stringify(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']));
                res.end();
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain'})
                res.write("not find");
                res.end();
                break;
        }
    }
})
```

**通过访问[http://127.0.0.1:1024/getList](http://127.0.0.1:1024/getList)就可以获取到列表**  
![](https://img-blog.csdnimg.cn/20210303164839769.png)  
**于是我们就可以开始实现view的渲染，新建一个loadPic类，功能是获取静态资源路径并渲染图片（其中utils类是工具类，包括ajax在内，后续在完整项目中可以看到）**

```javascript
import Utils
    from './utils.js';

let utils = new Utils()
export default class LoadPic {
    //静态资源路径
    set baseUrl (val) {
        this._baseUrl = val
    }

    get baseUrl () {
        return this._baseUrl
    }

    //根据数据渲染图片
    create (ele, data) {
        for(let i = 0; i < data.length; i ++) {
            let liBox = utils.createEle('li', {listStyle: 'none'}, {}, ele)
            utils.createEle('img', null, {
                src: `${this.baseUrl}${data[i]}`
            }, liBox)
        }
    }
}
```

**然后我们在JS中使用ajax来获取数据并加载图片**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        lazyLoad</title>
    <style>
        li, li > img {
            float: left;
            height: 200px;
        }
    </style>
</head>
<body>
<ul id="loadBox"></ul>
<script type="module">
    import Utils
        from "./js/utils.js"
    import LoadPic
        from './js/loadPic.js'

    let baseUrl = 'http://127.0.0.1:1024'
    let picPath = '/static/'
    let utils = new Utils()
    let loadBox = document.querySelector('#loadBox')
    let loadPic = new LoadPic()
    loadPic.baseUrl = baseUrl + picPath
    utils.myAjax({
        url: baseUrl + '/getList',
        method: 'get',
        data: {len: 100},
        timeout: 3 * 1000
    }).then((data) => {
        loadPic.create(loadBox, data)
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })

</script>
</body>
</html>
```

**列表效果与之前一样，图片也加载出来了**  
![](https://img-blog.csdnimg.cn/2021030316525169.png)![](https://img-blog.csdnimg.cn/20210303171604984.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**最后附上源码：[gitee地址，](https://gitee.com/DieHunter/myCode/tree/master/Ajax%E8%AF%B7%E6%B1%82node%E6%8E%A5%E5%8F%A3)希望对各位有所帮助**