---
title:  JS基础篇（前端面试题整合）（二） 
date:  2020-11-04 16:01:0507-0505-2811-0302-1105-1111-0706-2811-06 
---
**如何创建函数**

* **第一种（函数声明）： function sum1(num1,num2){ return num1+num2; }**
* **第二种（函数表达式）： var sum2 = function(num1,num2){ return num1+num2; }**
* **第三种（函数对象方式）： var sum3 = new Function("num1","num2","return num1+num2");**

**三种弹窗的单词以及三种弹窗的功能**

```javascript
1.alert  
//弹出对话框并输出一段提示信息  
    function ale() {  
        //弹出一个对话框  
        alert("提示信息！");  
  
    }  
  
2.confirm
    //弹出一个询问框，有确定和取消按钮  
    function firm() {  
        //利用对话框返回的值 （true 或者 false）  
        if (confirm("你确定提交吗？")) {  
            alert("点击了确定");  
        }  
        else {  
            alert("点击了取消");  
        }  
  
    }  
  
3.prompt
    //弹出一个输入框，输入一段文字，可以提交  
    function prom() {  
        var name = prompt("请输入您的名字", ""); //将输入的内容赋给变量 name ，  
  
        //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值  
        if (name)//如果返回的有内容  
        {  
            alert("欢迎您：" + name)  
        }  
    }
```

**JavaScript的循环语句**

**for,for..in,while,do...while**

**减低页面加载时间的方法**

**1、压缩css、js文件  
2、合并js、css文件，减少http请求  
3、外部js、css文件放在最底下  
4、减少dom操作，尽可能用变量替代不必要的dom操作**

**对象有哪些原生方法**

* **Object.hasOwnProperty( ) 检查属性是否被继承**
* **Object.isPrototypeOf( ) 一个对象是否是另一个对象的原型**
* **Object.propertyIsEnumerable( ) 是否可以通过for/in循环看到属性**
* **Object.toLocaleString( ) 返回对象的本地字符串表示**
* **Object.toString( ) 定义一个对象的字符串表示**
* **Object.valueOf( ) 指定对象的原始值**

**JS 怎么实现一个类。怎么实例化这个类**

**严格来讲js中并没有类的概念，不过js中的函数可以作为构造函数来使用，通过new来实例化，其实函数本身也是一个对象。**

**外部JS文件出现中文字符，会出现什么问题，怎么解决**

**会出现乱码，加charset=”utf-8”;**

**target与currentTarget区别**

**target在事件流的目标阶段；  
currentTarget在事件流的捕获，目标及冒泡阶段。  
只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。**

**DOM的增删改查操作**

**创建新节点**

* **createDocumentFragment() //创建一个DOM片段**
* **createElement() //创建一个具体的元素**
* **createTextNode() //创建一个文本节点**

**添加、移除、替换、插入**

* **appendChild()**
* **removeChild()**
* **replaceChild()**
* **insertBefore() //在已有的子节点前插入一个新的子节点**

**查找**

* **getElementsByTagName() //通过标签名称**
* **getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)**
* **getElementById() //通过元素Id，唯一性**
* **queryselector()//es6新增的，可选择id（#ele），class（.ele），tagName（ele）等**

**documen.write和 innerHTML区别**

**document.write只能重绘整个页面  
innerHTML可以重绘页面的一部分**

**Ajax 解决浏览器缓存问题？**

**1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")  
2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")  
3、在URL后面加上一个随机数： "fresh=" + Math.random();  
4、在URL后面加上时间戳："nowtime=" + new Date().getTime();  
5、如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。**

**bind，call和apply的区别**

**bind方法:**

* **语法：bind(thisObj，Object1,Object2...)**
* **定义：调用一个对象的一个方法，以另一个对象替换当前对象。**
* ****说明：**bind**方法会返回执行上下文被改变的函数而不会立即执行****

**call方法:**

* **语法：call(thisObj，Object1,Object2...)**
* **定义：调用一个对象的一个方法，以另一个对象替换当前对象。**
* ****说明： call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。****

**apply方法：**

* **语法：apply(thisObj，\[argArray\])**
* **定义：应用某一对象的一个方法，用另一个对象替换当前对象。**
* **说明： 如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。**

**javascript的本地对象，内置对象和宿主对象**

* **本地对象为array obj regexp等可以new实例化**
* **内置对象为gload Math 等不可以实例化的**
* **宿主为浏览器自带的document,window 等**

**列举浏览器对象模型BOM里常用的对象，并列举window对象的常用方法**

**对象：window, document, location, screen, history, navigator  
方法：alert(), confirm(), prompt(), open(), close()**

**iframe的优缺点**

**优点：  
1\. 解决加载缓慢的第三方内容如图标和广告等的加载问题  
2\. Security sandbox  
3\. 并行加载脚本  
缺点：  
1\. iframe会阻塞主页面的Onload事件  
2\. 即时内容为空，加载也需要时间  
3\. 没有语意**

**Cookie的弊端**

* **Cookie数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。**
* **安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。**
* **有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。**

**谈谈js精度问题**

**由于计算机是用二进制来存储和处理数字，不能精确表示浮点数，而JavaScript是一种弱类型的脚本语言，没有相应的封装类来处理浮点数运算，直接计算会导致运算精度丢失，c#的decimal和Java的BigDecimal之所以没有出现精度差异，只是因为在其内部作了相应处理，把这种精度差异给屏蔽掉了，而javascript是一种弱类型的脚本语言，本身并没有对计算精度做相应的处理，这就需要我们另外想办法处理了。所以0.1+0.2！==0.3。  
为了避免产生精度差异，把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完毕再降级（除以10的n次幂），这是大部分编程语言处理精度差异的通用方法。**

**js哪些值会强制转换为false**

**在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所 有值都转为 true，包括所有对象。**

**link添加预加载预渲染**

**预加载：强制浏览器请求资源，并且不会阻塞 onload 事件， 可以使用以下代码开启预加载  
<link rel="preload" href="http://test.com">  
预渲染:可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染  
<link rel="prerender" href="http://test.com">**

**JS事件的offsetX、offsetY、clientX、clientY、pageX、pageY、screenX、screenY的区别**

**offsetX、offsetY: 鼠标相对于事件源元素（srcElement）的X，Y坐标**

**clientX、clientY: 鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。**

**pageX、pagey: 类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持，IE事件中没有这2个属性**

**screenX、screenY: 鼠标相对于用户显示器屏幕左上角的X，Y坐标。**