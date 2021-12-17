---
title:  JS基础篇（前端面试题整合）（一） 
date:  2020-11-03 16:02:2704-1707-1509-0612-2908-0208-0303-0105-2609-1706-1510-0701-0405-0208-1706-2807-1803-0708-0511-23 
---
**typeof返回的数据类型**

* **undefined**
* **string**
* **boolean**
* **number**
* **object**
* **function**
* **symbol**

**js数据类型**

**基本六种**

* **string 字符串**
* **number 数字**
* **boolean 布尔**
* **Null 空**
* **undefined 未定义**
* **Object 引用类型**
* **es6新增 symbol类型**

**”==”和“===”的区别**

**前者会强制转换类型 后者不会**

**有哪些强制类型转换和隐式类型转换**

**强制：parseInt(),parseFloat(),Number()  
隐式：== ,!=**

**解决js兼容性问题**

* **Ajax兼容**

```javascript
var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
```

* **获取键盘e.key信息**

```javascript
        e.keyCode || e.which
```

* ****获取非行间样式****

```javascript
        // IE： currentStyle[attr]
        // 标准： getComputedStyle[attr]
        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr]
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        }
```

* **事件监听和解绑**

```javascript
        addEventListener() //普通
        attachEvent() //IE
        removeEventListener() //普通
        detachEvent() //IE
```

* **使用 event对象**

```javascript
function eventHandler(event) {
    event = event || window.event
}
```

* **获取滚动条属性**

```javascript
var scrollTop = document.documentElment.scrollTop || document.body.scrollTop
```

* **阻止浏览器默认行为**

```javascript
        function eventHandler(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
```

* **事件冒泡**

```javascript

        function eventHandler(event) {
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble()
            }
        }
```

**事件流**

**冒泡型事件流：事件的传播是从最特定的事件目标到最不特定的事件目标。即从DOM树的叶子到根。就子元素向父元素触发  
捕获型事件流：事件的传播是从最不特定的事件目标到最特定的事件目标。 即从DOM树的根到叶子。就是父元素向子元素触发 优点：  
（1）可以大量节省内存占用  
（2）可以实现当新新增对象时，无需在对其进行绑定**

**事件委托**

**可以为同样元素绑定多次同一事件  
可以确定是冒泡还是捕获  
动态创建元素，可以创建元素的函数体外部为其添加  
把某个事件加到父元素上提高程序执行效率**

**浏览器的事件机制**

**事件捕获阶段---处于目标阶段---事件的冒泡阶段----事件的默认阶段**

**事件绑定和普通事件的区别**

* **普通添加事件的方法：**

```javascript
var btn = document.getElementById("ele");
 btn.onclick = function(){
   alert(1); 
}
 btn.onclick = function(){
   alert(2); 
} 
```

**执行上面的代码只会alert 2**

* **事件绑定方式添加事件：**

```javascript
var btn = document.getElementById("ele");
btn.addEventListener("click",function(){
    alert(1);
},false);
btn.addEventListener("click",function(){
    alert(2);
},false);

```

**执行上面的代码会先alert 1 再 alert 2**

* **普通添加事件的方法不支持添加多个事件，最下面的事件会覆盖上面的，而事件绑定 （addEventListener）方式添加事件可以添加多个。**
* **addEventListener不兼容低版本IE**
* **普通事件无法取消（无函数方式取消，使用置空和置为false）**
* **addEventLisntener还支持事件冒泡+事件捕获**

**eval的理解**

* **可以将字符串生成语句执行，一般执行动态js语句**
* **eval的使用场合：有时候我们预先不知道要执行什么语句，只有当条件和参数给时才知到执行什么语句，这时候eval就派上用场了 eval和json.parse的谁更高效？**
* **是json.parse**
* **因为evel他是转化在解析而json.parse是直接解析**
* **应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。**

**数组的方法**

* **push() 从队尾添加,改变原数组**
* **pop() 移除数组末尾最后一项,返回移除的项**
* **shift() 删除数组第一项,返回删除元素的值,如果数组为空返回undefined**
* **unshift() 添加头部,改变原数组**
* **sort() 数组排序,参数为一个匿名函数,如果匿名函数返回正值,则升序排列,反之相反**
* **reverse() 翻转数组项的顺序 原数组改变**
* **concat() 将参数添加到原数组,将参数添加到数组的末尾,并返回一个新数组,不改变原数组**
* **slice() 返回原数组中指定开始下标到结束下标之间的项组成的新数组,slice接受两个参数,如果致谢一个参数,slice方法返回从该参数到数组末尾的所有项,如果有两个参数,该方法返回起始位置和结束位置之间的项,但不包括结束位置的项**
* **splice() 可以实现删除,插入,替换 删除(可以删除任意属相的项,只需要指定2个参数,要删除的第一项的位置和要删除的项) 插入,替换(可以向指定位置插入任意数量的项,只需提供3个参数:起始位置,0(要删除的项),插入的项),splice()方法始终都会返回一个数组,数组中包括从原数组中删除的项,如果没有删除任何项则返回一个空数组**
* **map() 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组**
* **some() 判断数组中是否存在满足条件的项,只要有一项满足条件,就返回true**
* **every() 判断数组中每一项都是否满足条件,只有所有选项都满足条件,才会返回true**
* **filter() 过滤功能,数组中的每一项运行给定函数,返回满足过滤条件组成的数组**
* **forEach() 对数组进行循环遍历,对数组中的每一项运行给定函数,这个方法没有返回值,参数都是function类型,默认有传参功能,参数分别是,便利的数组内容,对应的索引,数组本身**
* **indexOf() 接受两个参数,要查找的项和表示查找起点位置的索引,返回查找的项在数组的位置,没找到的情况下返回-1**

**伪数组转成真数组的方法**

* **Array.from()**
* **Array.prototype.slice.call();**
* **循环并push到新数组**
* **解构赋值：list=\[...\_list\]（es6）**

**window.onload与$(document).ready()的区别**

* **执行时间 window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 $(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕.**
* **编写个数不同 window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个 $(document).ready()可以同时编写多个，并且都可以得到执行**
* **简化写法 window.onload没有简化写法 $(document).ready(function(){})可以简写成$(function(){});**

**this的理解**

**this代表函数运行时，自动生成的一个内部对象，只能在函数内部使用，随着函数使用场合的不同，this的值会发生变化。但有一个总的原则就是，谁调用它，它就指向谁。一般在这几种情况下会用到它.**

* **单纯的函数调用；**
* **作为对象方法的调用；**
* **作为构造函数调用；**
* **apply调用，apply（）是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象，当它的参数为空时，默认调用全局对象**

**跨域机制是什么，解决方式**

**因为同源策略的诞生,只能访问相同端口,协议,域名的网站,所以我们要进行跨域，以下是常见解决方式**

* **通过JsonP(动态创建一个script标签,通过src属性,设置一个端口号,通过接口上的某个参数向服务器传送一个函数,通过之歌回调函数接受服务器返回的数据)**
* **通过修改document.domain来跨子域**
* **使用window.name来进行跨域**
* **cors**
* **反向代理**
* **webSocket**

**get和post的区别**

**共同点：**

* **无论是get还是post，都是可以发送数据，也可以接受数据**

**区别：**

* **get是以url方式传递数据，而post是以http请求中的body部分传递数据 ，所以说post更安全**
* **get传递数据时，直接再浏览器地址栏可以看到；而post可以使用开发者工具中看到**
* **get传递数据，中文不会被编码或有可能出现乱码，而post不会**
* **get在IE下会走缓存，而post不会**

**js如何创建一个对象**

**对象的字面量创建 var obj= {}  
创建实例对象 var obj = new Object（）  
构造函数的模式 function fn(){}, new fn()  
工厂模式 用一个函数，通过传参数返回对象**

```javascript
function createObj(name,age,family) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.family = family;
    return o;
}
```

**原型模式**

```javascript
function Obj() {
}

Obj.prototype.name = "Obj";
Obj.prototype.age = 10;
var obj= new Obj()
```

**混合模式**

```javascript
function createObj(name,age) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    return o;
}

createObj.prototype.name = "Obj";
createObj.prototype.age = 10;
var _obj= new createObj()
```

**null，undefined 的区别**

* **null表示一个对象是“没有值”的值，也就是值为“空”；**
* **undefined表示一个变量声明了没有初始化(赋值)；**
* **undefined不是一个有效的JSON，而null是；**
* **undefined的类型(typeof)是undefined； null的类型(typeof)是object；**
* **Javascript将未赋值的变量默认值设为undefined； Javascript不会将变量设为null。null是用来让程序员表明某个用var声明的变量时没有值的。**
* **null == undefined // true null === undefined // false**

**对****JSON 的了解**

**JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。  
它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小  
JSON字符串转换为JSON对象:**

* **var obj =eval('('+ str +')');**
* **var obj = str.parseJSON();**
* **var obj = JSON.parse(str);**

**JSON对象转换为JSON字符串：**

* **var last=obj.toJSONString();**
* **var last=JSON.stringify(obj);**

**js延迟加载的方式有哪些？**

**defer和async、动态创建DOM方式（用得最多）、按需异步载入js**