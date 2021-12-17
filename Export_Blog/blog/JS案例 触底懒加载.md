---
title:  JS案例：触底懒加载 
date:  2021-03-09 19:13:1003-2303-1312-0203-1202-1109-1209-1103-2811-0309-0512-2611-1703-0502-0203-2103-2311-1111-0711-06 
---
**接着上篇文章：[ajax获取图片列表](https://blog.csdn.net/time_____/article/details/114311580)，我们来实现一下JS的经典案例，懒加载**

**在web应用中，系统的响应速度对用户体验十分重要，其最主要的影响来源于服务端数据库查询，以及DOM渲染。  
数据库查询数据量大的情况下，我们可以进行分页配合前端分页或者懒加载进行优化，而这篇文章主要讲的是如何处理后端百万级数据对DOM渲染造成的影响，当然这也是大厂常问的题。**

**在实现功能前，我们先了解一下懒加载，这是我之前实现的[懒加载](https://blog.csdn.net/time_____/article/details/84639454)，懒加载也就是现在先加载一小部分，当某些条件触发时（触底，触及可视区，滚动条高度到了某个条件），进行延迟加载，解决大量资源同时加载缓慢导致用户体验下降。**

**这里我将使用ajax获取图片列表的流程，从后端一次性传递几万几十万甚至上百万张图片信息（一般情况下后端会做分页处理，这样对服务端性能损耗很大），前端采取触底加载与分页处理解决DOM渲染问题。**

**下面就来实现一下**

**在服务端需要实现两个功能：**

* **根据有限数组根据随机索引取某个单项（图片数量有限，暂时先使用几张图片循环出一定数量的随机图片列表）**
* **服务端接收前端发送的参数决定传递几条数据（这样做就可以不需要修改后端，直接在前端看效果）**

**首先新建图片path，一共5张图片**

```javascript
const picList = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
```

**编写随机数方法，传入数字n产生1-n之间的随机数**

```javascript
function random (count) {
    return Math.floor(Math.random() * count)
}
```

**编写生成图片列表函数，传入数字n，产生长度为n的随机图片数组**

```javascript
function createPicList (len) {
    let _list = []
    for(let i = 0; i < len; i ++) {
        _list.push(picList[random(picList.length)])
    }
    return _list
}
```

**然后在getList接口中将该值返回至前端（通过前端参数使长度可控）**

```javascript
res.write(JSON.stringify(createPicList(data.len)));
```

**最后，打开server，在浏览器中输入[http://127.0.0.1:1024/getList?len=10](http://127.0.0.1:1024/getList?len10)，传递10条，服务端就会返回10条随机图片地址**  
![](https://img-blog.csdnimg.cn/20210304100430568.png)

**此时，服务端就算是大功告成，下面来客户端测试一下性能，修改ajax参数为1000，并添加时间戳记录运行时间**

```javascript
    let date = new Date(),
        serverDate,
        domDate;
    utils.myAjax({
        url: baseUrl + '/getList',
        method: 'get',
        data: {len: 1000},//传递长度为多少的列表（加载几张图片）
        timeout: 10 * 1000
    }).then((data) => {
        serverDate = new Date()
        loadPic.create(loadBox, data)
        domDate = new Date()
        //其他问题损耗时间暂时忽略不计
        console.log('收到请求：', (serverDate - date) / 1000)//后端运行速度+传输速度等等（单位/秒）
        console.log('DOM渲染：', (domDate - serverDate) / 1000)//DOM渲染速度（单位/秒）
    }).catch((err) => {
        console.log(err)
    })
```

**1000张图片，无论是加载速度还是DOM渲染速度都是很可观的**  
![](https://img-blog.csdnimg.cn/20210304102242973.png)

**图片数量升到10000张，后端变化不是很大，但是Dom渲染明显慢了很多**  
![](https://img-blog.csdnimg.cn/20210304102315164.png)  
**把图片数量升至100000，好家伙，CPU和内存直接飚升**  
![](https://img-blog.csdnimg.cn/20210304102802264.png)![](https://img-blog.csdnimg.cn/20210304102857672.png)  
**最后，我作死尝试一下1000000张图片，差点没裂开，后端貌似挺稳健，DOM足足渲染了70秒**  
![](https://img-blog.csdnimg.cn/20210304103512812.png)![](https://img-blog.csdnimg.cn/20210304103553529.png)

**这说明在后端百万级数据数据传递可控条件下，我们得在前端做好优化**

**首先，我们引入之前造的轮子：[发布/订阅busEvent](https://blog.csdn.net/time_____/article/details/113770950)（不引入也行，可以使用回调函数，主要作用是通知渲染view），这里我们需要将node中使用的****module.exports=EventBus.Instance()修改为当前适用的export default EventBus.Instance()**

**然后新建LazyLoad类如下：**

```javascript
import eventBus
    from './eventBus.js'
import Utils
    from './utils.js'

const utils = new Utils()
export default class LazyLoad {
    constructor (pageConfig, ele, data) {
        Object.defineProperties(this, {
            //前端分页功能的分页配置
            'pageConfig': {
                value: pageConfig,
                writable: true
            },
            //待监听滚动的元素
            'ele': {
                value: ele,
                writable: false
            },
            //所有数据，图片列表
            'data': {
                value: data,
                writable: false
            }
        });
        this.init()
    }

    /**
     * 对总列表分页后截取start到end数据，并通知渲染页面
     * @param val  截取的数据
     */
    set pagingData (val) {
        //是否清除上一页
        this.pageConfig.clear ? (utils.clearEle(this.ele), this.ele.scrollTop = 0) : ""
        eventBus.emitEvent('lazyLoadStep', val)//数据翻页后通知渲染层，并将截取的数据传递过去
    }

    /*
     * 初始化函数
     */
    init () {
        this.scrollLoadPage(this.ele)
        this.nextPage()//获取第一页
    }

    /*
     * 翻页功能，若大于总页数则跳出
     */
    nextPage () {
        if(this.pageConfig.page > this.pageConfig.totalPage) {
            console.log('到底了！')
            return
        }
        this.pagingData = this.paging(this.pageConfig, this.data)
        this.pageConfig.page ++
    }

    /*
     * 滚动事件
     */
    scrollLoadPage (ele) {
        ele.addEventListener('scroll', this.loadHandler.bind(this))
    }
    /*
     * 滚动事件回调
     */
    loadHandler (e) {
        if(
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight
        ) {
            this.nextPage()
        }
    }
    /*
     * 分页功能,截取数据
     * @param pageConfig  分页配置属性（page：第几页，pageSize；单页大小，totalPage：总页数,第一页无此属性）
     * @param data 总数据
     * @return data 当前页面截取的数据
     */
    paging (pageConfig, data) {
        let {
            page,
            pageSize
        } = pageConfig
        pageConfig.totalPage = Math.ceil(data.length / pageConfig.pageSize)
        let startIndex = page * pageSize - pageSize
        let endIndex = page * pageSize
        return data.slice(startIndex, endIndex)
    }
}
```

**最后在HTML页面中引入eventBus和lazyLoad，并将之前的loadPic.create函数替换为new LazyLoad(pageConfig, loadBox, data)，并且将loadPic.create放在eventBus的异步处理中便可以得到以下代码：**

```javascript
    import Utils
        from "./js/utils.js"
    import LoadPic
        from './js/loadPic.js'
    import LazyLoad
        from "./js/lazyLoad.js";
    import eventBus
        from './js/eventBus.js'

    let pageConfig = {
        page: 1,//第几页
        pageSize: 30,//每页大小
        clear: false//翻页时是否清空上一页
    }
    let baseUrl = 'http://127.0.0.1:1024'//请求地址
    let picPath = '/static/'//静态文件路径
    let utils = new Utils()
    let loadBox = document.querySelector('#loadBox')//需要进行懒加载的元素
    let loadPic = new LoadPic()
    let lazyLoad;
    let serverDate=new Date(),//服务器响应时间
        domDate;//view渲染时间
    loadPic.baseUrl = baseUrl + picPath
    eventBus.onEvent('lazyLoadStep', function (e) {//监听翻页动作，渲染页面
        domDate = new Date()//初始化view渲染时间
        loadPic.create(loadBox, e)
        console.log('DOM渲染：', (new Date() - domDate) / 1000)//DOM渲染速度（单位/秒）
    })
    utils.myAjax({
        url: baseUrl + '/getList',
        method: 'get',
        data: {len: 1000},//传递长度为多少的列表（加载几张图片）
        timeout: 10 * 1000//请求超时时间
    }).then((data) => {
        console.log('收到请求：', (new Date() - serverDate) / 1000)//后端运行速度+传输速度等等（单位/秒）
        lazyLoad = new LazyLoad(pageConfig, loadBox, data)//初始化懒加载
    }).catch((err) => {
        console.log(err)
    })
```

**至此，一个简单的Ajax请求后端并获取图片列表，并对列表进行分页懒加载图片的小案例完成，我们试试效果**  
![](https://img-blog.csdnimg.cn/20210304153651847.gif)  
**如果把pageConfig中的清空上一页改为true，那就变成了只能看到下一页的懒加载了，但是这么做的好处能减少dom元素较多导致后续内存升高问题**  
![](https://img-blog.csdnimg.cn/20210304154108442.gif)

**最后，感谢看到了最后的你，附上[源码地址](https://gitee.com/DieHunter/myCode/tree/master/%E7%80%91%E5%B8%83%E6%B5%81&%E6%87%92%E5%8A%A0%E8%BD%BD/Third)，希望对你有所帮助。**