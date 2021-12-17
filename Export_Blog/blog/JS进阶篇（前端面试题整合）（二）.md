---
title:  JS进阶篇（前端面试题整合）（二） 
date:  2020-11-07 18:41:1112-1508-0110-2906-1906-0611-0606-0611-1208-3105-1805-0405-2105-1708-0206-1102-2203-0508-1907-22 
---
**Ajax 是什么? 如何创建一个Ajax？**

**AJAX全称是Asychronous JavaScript And Xml（异步的 JavaScript 和 XML）  
它的作用是用来实现客户端与服务器端的异步通信效果，实现页面的局部刷新，早期的浏览器并不能原生支持ajax，可以使用隐藏帧（iframe）方式变相实现异步效果，后来的浏览器提供了对ajax的原生支持  
其主要通过XMLHttpRequest(标准浏览器)、ActiveXObject(IE浏览器)对象实现异步通信效果  
实现方式（[gitee上的案例](https://gitee.com/DieHunter/myCode/blob/master/Tools/methods.js)）：**

```javascript
var xhr =null;//创建对象 
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();
}else{
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.open(“方式”,”地址”,”标志位”);//初始化请求 
xhr.setRequestHeader(“”,””);//设置http头信息 
xhr.onreadystatechange =function(){}//指定回调函数 
xhr.send();//发送请求 
```

**Ajax的优缺点**

**优点：**

* **通过异步模式，提升了用户体验**
* **优化了浏览器和服务器之间的传输，按需获取数据，减少不必要的数据往返，减少了带宽占用**
* ****Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。****

**缺点：**

* **ajax不支持浏览器back按钮**
* **安全问题 AJAX暴露了与服务器交互的细节**
* **对搜索引擎的支持比较弱**
* **破坏了程序的异常机制。**

**一个页面从输入 URL 到页面加载显示完成，发生了什么？**

* **当发送一个 URL 请求时，不管这个 URL 是 Web 页面的 URL 还是 Web 页面上每个资源的 URL，浏览器都会开启一个线程来处理这个请求，同时在远程 DNS 服务器上启动一个 DNS 查询。这能使浏览器获得请求对应的 IP 地址。**
* **浏览器与远程 Web 服务器通过 TCP 三次握手协商来建立一个 TCP/IP 连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这三个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，而后服务器应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。**
* **一旦 TCP/IP 连接建立，浏览器会通过该连接向远程服务器发送 HTTP 的 GET 请求。远程服务器找到资源并使用 HTTP 响应返回该资源，值为 200 的 HTTP 响应状态表示一个正确的响应。**
* **此时，Web 服务器提供资源服务，客户端开始下载资源。**
* **后续HTML页面解析参照[前端面试题整合（JS进阶篇）（一）](https://blog.csdn.net/time_____/article/details/109472503)的**“**html页面怎么解析的？它加载顺序是什么？**”

**JQuery一个对象为何可以同时绑定多个事件**

**低层实现方式是使用addEventListner或attachEvent兼容不同的浏览器实现事件的绑定，这样可以给同一个对象注册多个事件**

**对页面某个节点的拖曳**

**1\. 给需要拖拽的节点绑定mousedown, mousemove, mouseup事件  
2\. mousedown事件触发后，开始拖拽  
3\. mousemove时，需要通过event.clientX和clientY获取拖拽位置，并实时更新位置  
4\. mouseup时，拖拽结束  
5\. 需要注意浏览器边界的情况**

**[gitee上的案例](https://gitee.com/DieHunter/myCode/blob/master/Tools/methods.js)**

```javascript
        function mouseMove(ele, parent) {
            ele.addEventListener('mousedown', moveHandler);
            ele.style.position = 'absolute'
            function moveHandler(e) {
                if (e.type === 'mousedown') {
                    parent.ele = this;
                    parent.point = {
                        x: e.offsetX,
                        y: e.offsetY
                    }
                    parent.addEventListener('mousemove', moveHandler);
                    parent.addEventListener('mouseup', moveHandler);
                } else if (e.type === 'mousemove') {
                    this.ele.style.left = e.x - this.point.x + "px";
                    this.ele.style.top = e.y - this.point.y + "px";
                } else if (e.type === 'mouseup') {
                    parent.removeEventListener("mousemove", moveHandler);
                    parent.ele = null;
                    parent.point = null;
                }
            }
        }
```

**new操作符具体干了什么**

1. **创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。**
2. **属性和方法被加入到 this 引用的对象中。**
3. **新创建的对象由 this 所引用，并且最后隐式的返回 this**

**以下是模拟操作：**

```javascript
new TestObj('str')=function(){
    let obj={};  //创建一个空对象
    obj.__proto__=TestObj.prototype;
    //把该对象的原型指向构造函数的原型对象，就建立起原型了：obj->Animal.prototype->Object.prototype->null
    return TestObj.call(obj,arguments);// 绑定this到实例化的对象上
}
```

**前端开发的优化问题**

**（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。  
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数  
（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。  
（4） 当需要设置的样式很多时设置className而不是直接操作style。  
（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。  
（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。  
（7） 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。  
（8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。**

**fetch和Ajax有什么不同**

* **XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好**
* **fetch 是浏览器提供的一个新的 web API，它用来代替 Ajax（XMLHttpRequest），其提供了更优雅的接口，更灵活强大的功能。**
* **Fetch 优点主要有：****语法简洁，更加语义化**，**基于标准 Promise 实现，支持 async/await**

**如何编写高性能的Javascript**

* **使用 DocumentFragment 优化多次 append**
* **通过模板元素 clone，替代 createElement**
* **使用一次 innerHTML 赋值代替构建 dom 元素**
* **使用 firstChild 和 nextSibling 代替 childNodes 遍历 dom 元素**
* **使用 Array 做为 StringBuffer ，代替字符串拼接的操作**
* **将循环控制量保存到局部变量**
* **顺序无关的遍历时，用 while 替代 for**
* **将条件分支，按可能性顺序从高到低排列**
* **在同一条件子的多（ >2 ）条件分支时，使用 switch 优于 if**
* **使用三目运算符替代条件分支**
* **需要不断执行的时候，优先考虑使用 setInterval**

**定时器setInterval有一个有名函数fn，setInterval（fn,500）与setInterval（fn(),500）有什么区别？**

**第一个是重复执行每500毫秒执行一次，后面一个只执行一次。**

**简述一下浏览器内核**

**浏览器内核又可以分成两部分：渲染引擎和 JS 引擎。它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。JS 引擎则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果。**

**JavaScript的属性元数据有哪些？**

* **writable:true属性值可修改**
* **enumerable:true属性可枚举**
* **configurable:true属性可重新配置**
* **writable:false属性值不可修改**
* **enumerable:false属性不可枚举**
* **configurable:false 属性不可重新配置**

**懒加载（瀑布流）的实现原理**

**意义：懒加载的主要目的是作为服务器前端优化，减少请求数或延迟请求数实现原理：先加载一部分数据，当触发某个条件时利用异步加载剩余的数据，新得到的数据，不会影响有数据的显示，同时最大程度上减少服务器的资源消耗  
实现方式：  
（1）延迟加载，使用setTimeOut或setInterval进行加载延迟  
（2）符合某些条件，或触发了某些事件才开始异步下载  
（3）可视区加载**

**我的[懒加载文章](https://blog.csdn.net/time_____/article/details/84639454)，以及[源码地址](https://gitee.com/DieHunter/myCode/tree/master/%E7%80%91%E5%B8%83%E6%B5%81)**

**js实现数组去重**

**双层循环，外层循环元素，内层循环时比较值，****如果有相同的值则跳过，不相同则push进数组**

```javascript
        class MyArray extends Array {
            constructor() {
                super(...arguments)
            }
            distinct() {
                var myArr = this,
                    list = []
                for (var i = 0; i < myArr.length; i++) {
                    for (var j = i + 1; j < myArr.length; j++) {
                        if (myArr[i] === myArr[j]) {
                            j = ++i;
                        }
                    }
                    list.push(myArr[i]);
                }
                return list;
            }
        }
        var _arr = new MyArray(4, 5, 6, 7, 7, 7, 1, 1, 1, 2, 2, 2, 5, 8, 5, 2, 4, 4, 4, 6, 9);
        console.log(_arr.distinct()); //[7, 1, 8, 5, 2, 4, 6, 9]
```

**利用对象的属性不能相同的特点进行去重**

```javascript
        class MyArray extends Array {
            constructor() {
                super(...arguments)
            }
            distinct() {
                var myArr = this,
                    list = [],
                    obj = {}
                for (var i = 0; i < myArr.length; i++) {
                    obj[myArr[i]] || (obj[myArr[i]] = 1,
                        list.push(myArr[i])) //如果能查找到，证明数组元素重复了
                }
                return list;
            }
        }
        var _arr = new MyArray(4, 5, 6, 7, 7, 7, 1, 1, 1, 2, 2, 2, 5, 8, 5, 2, 4, 4, 4, 6, 9);
        console.log(_arr.distinct()); //[4, 5, 6, 7, 1, 2, 8, 9]
```

**Set数据结构，它类似于数组，其成员的值都是唯一的**

```javascript
        function dedupe(array) {
            return Array.from(new Set(array));
        }
        console.log(dedupe([1, 1, 2, 3])) //[1,2,3]
```

**实现快速排序和冒泡排序**

**快速排序****：选取位置在数组中间的一个数，然后比它小的放在left\[\]的一个新数组里面，比他大的放在right\[\]的一个新数组里面，以此类推，重复执行这个过程，利用递归的思想，直至执行到left\[\]和right\[\]里面都只有一个数**  
**冒泡排序：两两比较，前面的比后面的大，则换位。第一轮list.length-1次，挑出最大的；第二轮list.length-1-1次，挑出第二大的。以此往复**

```javascript
        class MyArray extends Array {
            constructor() {
                super(...arguments)
            }
            quickSort(list) { //快速排序
                var myArr = this,
                    listConfig = {
                        midItem: myArr[parseInt(myArr.length / 2)],
                        leftList: new MyArray(),
                        rightList: new MyArray()
                    }
                if (myArr.length <= 1) {
                    return myArr
                };
                for (var i = 0; i < myArr.length; i++) {
                    myArr[i] < listConfig.midItem ? listConfig.leftList.push(myArr[i]) : myArr[i] > listConfig
                        .midItem ? listConfig.rightList.push(myArr[i]) : '';
                }
                return listConfig.leftList.quickSort().concat([listConfig.midItem], listConfig.rightList
                    .quickSort()); //递归
            }
            bubbleSort() { //冒泡排序
                for (var i = 0; i < this.length - 1; i++) {
                    for (var j = 0; j < this.length - 1 - i; j++) {
                        if (this[j] > this[j + 1]) {
                            var item = this[j];
                            this[j] = this[j + 1];
                            this[j + 1] = item;
                        }
                    }
                }
                return this
            }
        }
        var quickSortArray = new MyArray(19, 15, 18, 17, 11, 21, 14, 61, 13, 10, 25);
        var bubbleSortArray = new MyArray(9, 5, 8, 7, 1, 2, 4, 6, 3, 10, 25);
        console.log(quickSortArray.quickSort()); //[10, 11, 13, 14, 15, 17, 18, 19, 21, 25, 61]
        console.log(bubbleSortArray.bubbleSort()); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25]
```

**谈谈节流和防抖，如何实现**

**节流：使频繁执行的函数，定时执行，高频率函数执行时，使执行率减少，每n秒才能执行一次，打个比方：每隔1秒钟，会执行5次滚动条滚动事件，我只让它每一秒执行一次（案例：网站中的返回顶部）**

**防抖：使频繁执行的函数，延时执行，高频率函数执行时，n秒内只执行一次，在事件内多次执行会延时，打个比方：用户在输入框中输入字符，当用户一直在输入时，我们做个延时，当用户输入完毕后会有一段时间停顿，若这个停顿时间大于我们的我们延时时间，我们就进行下一步操作，反之则不进行并且一直延时（案例：搜索引擎搜索输入框）**

**区别：对于高频率执行函数，节流是每隔规定时间都会执行一次，防抖是只在规定时间外的最后一次执行**

**实现过程：**

```javascript
        var count = 0
        class OptimizeEvent {
            constructor() {}
            throttle(fn, time) { //节流
                var canDo = true
                return function (e) {
                    if (!canDo) {
                        return false
                    }
                    canDo = false
                    setTimeout(() => {
                        fn.call(this)
                        canDo = true
                    }, time)
                }
            }
            debounce(fn, time) { //防抖
                var _timer = null
                return function () {
                    if (_timer) {
                        clearTimeout(_timer)
                        _timer = null
                    }
                    _timer = setTimeout(fn, time)
                }
            }
        }
        var _event = new OptimizeEvent()
        inputBox.addEventListener('input', _event.debounce(function () {
            showBox.textContent = inputBox.value
        }, 1000))
        document.addEventListener('scroll', _event.throttle(function () {
            console.log(count++)
        }, 1000))
```

**谈谈深拷贝的实现**

**深拷贝相对浅拷贝不同的是，深拷贝内所有引用类型属性值都是在新开辟的内存地址，被拷贝的原数据发生改变时不会影响复制后的对象。**

**常见方法**

* **JSON.parse(),JSON.stringify()**
* **jQury的$.extend(true,{},obj)**
* **lodash的****\_.cloneDeep**

* **[我的深复制文章](https://blog.csdn.net/time_____/article/details/85392699)**

  ```javascript

  			function deepClone(org, tag) {
  				var tag = tag || {}; //初始化要复制的对象
  				var name = Object.getOwnPropertyNames(org); //获取该对象的属性名，以字符串数组返回
  				for (var i = 0; i < name.length; i++) { //遍历对象
  					var desc = Object.getOwnPropertyDescriptor(org, name[i]); //获取对象的属性描述对象，无引用关系，返回另一个对象，改变时原对象不发生变化(复制的关键)
  					if (typeof desc.value === 'object' && desc.value !== null) { //若遍历的每一项非空且为对象，则为引用值，则进行下一步
  						var obj = desc.value.toString() === '[object Object]' ? {} : []; //判断是数组还是对象
  						Object.defineProperty(tag, name[i], { //设置对象属性值，前三个的值是返回true或false
  							configurable: desc.configurable, //是否可删除可替换
  							enumerable: desc.enumerable, //是否可枚举可遍历
  							writable: desc.writable, //是否可写入
  							value: obj //对象的值
  						});
  						copyObj(desc.value, obj); //再次执行函数
  					} else {
  						Object.defineProperty(tag, name[i], desc); //否则直接将该对象的属性值进行复制(原始值)
  					}
  				}
  				return tag;
  			}
  ```

  **常用的对象方法有哪些**

* **添加或更改对象属性  
Object.defineProperty(object, property, descriptor)**

* **添加或更改多个对象属性  
Object.defineProperties(object, descriptors)**

* **访问属性  
Object.getOwnPropertyDescriptor(object, property)**

* **以数组返回所有属性  
Object.getOwnPropertyNames(object)**

* **以数组返回所有可枚举的属性  
Object.keys(object)**

* **访问原型  
Object.getPrototypeOf(object)**

* **阻止向对象添加属性  
Object.preventExtensions(object)**

* **如果可将属性添加到对象，则返回 true  
Object.isExtensible(object)**

* **防止更改对象属性（而不是值）  
Object.seal(object)**

* **如果对象被密封，则返回 true  
Object.isSealed(object)**

* **防止对对象进行任何更改  
Object.freeze(object)**

* **如果对象被冻结，则返回 true  
Object.isFrozen(object)**

**实现以下输出**

```javascript
       var a = ?
        if (a == 1&& a == 2 && a == 3) {
            console.log('回答正确')
        }
        // 打印回答正确
```

```javascript
    class ConsoleA{
        constructor(){
            this.num = 0
            this.valueOf()
        }
        valueOf(){
            return this.num++
        }
    }
    var a = new ConsoleA()
        if (a == 1&& a == 2 && a == 3) {
            console.log('回答正确')
        }
        // 打印回答正确
```

**因为直接调用a==1会进行隐式类型转换从而调用object的valueOf函数**

**思考以下代码输出，为什么？**

```javascript
var num = 9
switch (num) {
    default:
        console.log('default')
    case 1:
        console.log(1)
    case 2:
        console.log(2)
        break
}
```

**输出 default 1 2  
一般情况下default放在switch最后，作为类似于else的作用，而写在switch最上面就相当于if(true)，而switch的特点是进入case之后不break跳出来就会一直执行而不做条件判断，所以后面case中的代码都会运行**