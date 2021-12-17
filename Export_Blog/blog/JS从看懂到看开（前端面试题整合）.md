---
title:  JS从看懂到看开（前端面试题整合） 
date:  2020-11-11 11:11:1311-2311-0711-0611-0311-2601-1602-1104-2803-0511-2811-1712-0202-0203-2103-1203-2312-11 
---
**解释一下为何\[ \] == !\[ \] // ---> true**

**首先看一张图**

![](https://img-blog.csdnimg.cn/2020110610052125.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**！\[ \] 是 false  
原式：\[ \] == false  
根据第八条，false通过tonumber（）转换为0  
原式：\[ \] == 0  
根据第十条，\[ \]通过ToPrimitive()转换为' '  
原式：' ' == 0  
根据第六条  
原式：0 == 0**

**尝试实现new**

```javascript
        function ObjectClass() {//对象
            console.log(arguments[0])
        }
        ObjectClass.prototype.constructor = ObjectClass

        function create() {
            // 创建一个空的对象
            var obj = {}
            // 获得构造函数
            var _constructor = this
            // 链接到原型
            obj.__proto__ = _constructor.prototype
            // 绑定 this，执行构造函数
            var result = _constructor.apply(obj, arguments)
            // 确保 new 出来的是个对象
            return typeof result === 'object' ? result : obj
        }
        create.call(ObjectClass, 'hello world')//实例化
```

**拓展typeof功能使其支持更多类型（array，object，null区分），并解释一下typeof null为何是object**

```javascript
        function myTypeOf(target) {
            var _type = typeof (target)
            var temp = {
                "[object Object]": 'object',
                "[object Array]": 'array',
                "[object Number]": 'number',
                "[object String]": 'string',
                "[object Boolean]": 'boolean'
            }
            if (target === null) {
                return 'null'
            } else if (_type == 'object') {
                var str = Object.prototype.toString.call(target)//根据toString区分
                return temp[str]
            } else {
                return _type
            }
        }
        console.log(myTypeOf('hello')) //string
        console.log(myTypeOf(111)) // number
        console.log(myTypeOf(true)) // boolean
        console.log(myTypeOf({})) // object
        console.log(myTypeOf([])) // array
        console.log(myTypeOf(null)) // null
        console.log(myTypeOf(undefined)) // undefined
        console.log(myTypeOf(Symbol())) // symbol
```

**typeof null为何是object**

**因为在早期js初版本中，操作系统使用的是32位，出于性能考虑，使用低位存储变量类型，object的类型前三位是000，而null是全0，从而系统将null误判为object**

**instanceof是什么？尝试实现一下**

**用官话来讲：instanceof用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上**

**通俗来讲，a instanceof b也就是判断a是否是由b实例化得来的**

**实现：**

```javascript
        function ObjectClass() {}
        ObjectClass.prototype.constructor = ObjectClass
        var _objectClass = new ObjectClass()

        function myInstanceof(orgProto, tag) { //org前者，实例化对象, tag后者，类
            var tagProto = tag.prototype
            orgProto = orgProto.__proto__
            for (;;) { //死循环查询原型链上是否有类的原型
                if (orgProto === null) {
                    return false
                }
                if (orgProto === tagProto) {
                    return true
                }
                orgProto = orgProto.__proto__
            }
        }
        console.log(myInstanceof(Object, Function)) // true
        console.log(myInstanceof(Object, Object)) // true
        console.log(myInstanceof(String, Object)) // true
        console.log(myInstanceof(_objectClass, Object)) // true
        console.log(myInstanceof(String, String)) // false
        console.log(myInstanceof(Boolean, Boolean)) // false
```

**解释以下代码分别在控制台显示什么，并简单说明**

**有一个对象Car，分别对以下四种情况进行作答**

```javascript
Car.prototype.name = 'BMW'

function Car() {}
```

**1.实例化对象时打印BMW，因为Car.prototype.name = 'BMW'，实例化的car本身没有name属性，于是会在Car的原型上找。此时将Car.prototype.name = 'Benz'，实例化后的car.name也会等于Benz，因为name是基本数据类型（原始值），当值发送变化，实例化后的对象也会改变**

```javascript
        var car = new Car()
        console.log(car.name) //BMW
        Car.prototype.name = 'Benz'
        console.log(car.name) //Benz
```

**2.实例化对象时打印Benz，因为在实例化之前就已经改变构造函数原型上的name值**

```javascript
        Car.prototype.name = 'Benz'
        var car = new Car()
        console.log(car.name) //Benz
```

**3.第一个log的BMW与上述一样，第二个log依然打印BMW的原因是，这里将Car.prototype直接改变成另一个对象，由于对象是引用数据类型（引用值），指向的是内存地址而不是值，new之前和new之后的实例对象引用的name地址不同**

```javascript
        var car = new Car()
        console.log(car.name) //BMW
        Car.prototype = {
            name: 'Benz'
        }
        console.log(car.name) //BMW
```

**4.和上述相同，原因是修改了prototype，改变的是引用地址，new之前和new之后的实例对象引用的name地址不同**

```javascript
        Car.prototype = {
            name: 'Benz'
        }
        var car = new Car()
        console.log(car.name) //Benz
```

**写一个函数，计算字符串Unicode总长度（例如：abcd，打印4，qwerdf，打印6）**

**需要注意的是，英文字符占1个字节，中文字符占两个字节**

```javascript
        function unicodeLength(str) {
            for (var i = 0, count = 0; i < str.length; i++) {
                console.log(str.charCodeAt(i))
                if (str.charCodeAt(i) > 255) { //中文字符
                    count += 2
                } else { //英文字符
                    count++
                }
            }
            return count
        }
        console.log(unicodeLength('hello，1024，你好')) //17
```

**实现一下js中window自带的isNaN()函数**

**注意点：如果直接使用NaN==NaN来判断，会返回false，需要将NaN转换成字符串，再来判断**

```javascript
        isNaN('asda') //window下的原函数
        console.log(isNaN(13)) //false
        console.log(isNaN('aaa')) //true

        function myIsNaN(number) {
            return "" + Number(number) == "NaN" ? true : false
        }
        console.log(myIsNaN(32323)) //false
        console.log(myIsNaN('aaa')) //true
```

**实现数组push()方法**

```javascript
        function myPush() {
            for (var i = 0; i < arguments.length; i++) {
                this[this.length] = arguments[i]
            }
            return this.length
        }
        Array.prototype.myPush = myPush
        var list = [1, 2, 3, 4, 5]
        var item = 6
        console.log(list.myPush(item)) //6
        console.log(list) //[1, 2, 3, 4, 5, 6]
```

**实现数组乱序（提示：使用Array.sort）**

**Array.sort((a,b)=>{})中a-b升序，b-a降序**

```javascript
        Array.prototype.random = random

        function random() {
            this.sort(function () {
                return Math.random() - 0.5
            })
            return this
        }
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(list.random())//[3, 2, 6, 4, 9, 8, 1, 5, 7] 结果每次都不同
```

**以下代码在控制台显示什么？说明原因**

```javascript
        var obj = {
            "0": 'a',
            "1": 'b',
            "2": 'c',
            "length": 3,
            "push": Array.prototype.push
        }
        obj.push(1, 2, 3)
        console.log(obj)
```

**打印结果是**

```javascript
        {
            0: "a"
            1: "b"
            2: "c"
            3: 1
            4: 2
            5: 3
            length: 6
        }
```

**原因：说明原因之前先看一段Array.prototype.push的源码：**

```javascript
function ArrayPush () {  
var n = TO_UNIT32(this.length);  
var m = %_ArgumentsLength();  
for (var i = 0; i < m; i++) {
    this[i + n ] = %_Arguments(i);
  }  this.length = n + m;
  return this.length;
}
```

**push的原理是在原对象后面将push的内容遍历进去，获取this.length并且在此基础上加上push的个数，这就不难解释为何push了三个数后length为6**

**解释以下代码打印为undefined的原因**

```javascript
        var num = 123;
        num.item = 'abc'
        console.log(num.item) //undefined
```

**第一步：var num = 123**

**第二步：num.item = 'abc'//隐式转换，相当于new Number(num).item = 'abc'（包装类生成引用类型数据），此时底层会判定此时的num是原始值，不存在属性值，所以执行delete（num.item）**

**第三步：打印undefined**

**使用JS原生实现function中的call，apply，bind函数**

**call:**

```javascript
        Function.prototype.myCall = function () {
            var _this = arguments[0] || window; //第一项是需要this指向的对象
            _this._function = this //this是要执行的函数，改变指向为_this
            var args = [] //把除this之外的所有参数放在args中
            for (var i = 1; i < arguments.length; i++) { //i = 1，第二项到最后一项是参数
                args[i - 1] = arguments[i]
            }
            return eval("_this._function(" + args + ")") //eval能将数组隐式拆分，效果与join相似，但二者区别很大，return将函数执行结果返回
            delete _this._function //执行完成后删除当前_function,这个_function用来放this
        }
        var a = 'window'
        var obj1 = {
            a: 'obj1',
            fn: function () {
                console.log(this.a)
                console.log(arguments)
            }
        }
        var obj2 = {
            a: 'obj2'
        }
        obj1.fn.myCall(obj2, 1, 2, 3, 4) //obj2  arguments[1, 2, 3, 4]
        obj1.fn.myCall(this, 3, 2, 1) //window  arguments[3, 2, 1]
```

**apply（调用上面的myCall实现即可）:**

```javascript
        Function.prototype.myApply = function () {
            var _this = arguments[0] || window; //第一项是需要this指向的对象
            _this._function = this //this是要执行的函数，改变指向为_this
            return eval("_this._function.myCall(_this, " + arguments[1] + ")") //eval能将数组隐式拆分，效果与join相似，但二者区别很大，return将函数执行结果返回
            delete _this._function //执行完成后删除当前_function,这个_function用来放this
        }
        var a = 'window'
        var obj1 = {
            a: 'obj1',
            fn: function () {
                console.log(this.a)
                console.log(arguments)
            }
        }
        var obj2 = {
            a: 'obj2'
        }
        obj1.fn.myApply(obj2, [1, 2, 3, 4]) //obj2  arguments[1, 2, 3, 4]
        obj1.fn.myApply(this, [3, 2, 1]) //window  arguments[3, 2, 1]
```

**bind（继续调用上面myApply）:**

```javascript
        Function.prototype.myBind = function () {
            var t = this;
            var _this = arguments[0] || window; //第一项是需要this指向的对象
            var args = Array.prototype.slice.myApply(arguments, [
                1], ) //这项的目的是为了去除第一项arguments[0]，就与上面的myCall中的遍历作用相同，Array.prototype.slice传一个参数，slice(start,end)表示删除第start到end项并返回删除后的数组，这里我们只用截取，不用删除，这里是删除第一项（由于用的是myApply，第二个参数是数组所以用[1]）并返回删除后的数组
            return function () {
                return t.myApply(_this, args)
            }
        }
        var a = 'window'
        var obj1 = {
            a: 'obj1',
            fn: function () {
                console.log(this.a)
                console.log(arguments)
            }
        }
        var obj2 = {
            a: 'obj2'
        }
        obj1.fn.myBind(obj2, 1, 2, 3, 4)() //obj2  arguments[1, 2, 3, 4]
        obj1.fn.myBind(this, 3, 2, 1)() //window  arguments[3, 2, 1]
```

**对mvvm，mvp和mvc的理解**

**Model–View–ViewModel(MVVM)，Model-View-Presenter（MVP）和Model–View-Controller（MVC）都是软件架构设计模式**

**相同的地方**

* **Model 是指任何一个领域模型(domain model)，一般做数据处理，可以理解为数据库，用来存放应用的所有数据对象。模型不必知晓视图和控制器的细节，模型只需包含数据及直接和这些数据相关的逻辑。任何事件处理代码、视图模版，以及那些和模型无关的逻辑都应当隔离在模型之外，它代表了真实情况的内容（一个面向对象的方法），或表示内容（以数据为中心的方法）的数据访问层**
* **View就是用户界面（UI），视图层是呈现给用户的，用户与之产生交互。在javaScript应用中，视图大都是由html、css和JavaScript模版组成的。除了模版中简单的条件语句之外，视图不应当包含任何其他逻辑。事实上和模型类似，视图也应该从应用的其他部分中解耦出来**

**不同的地方**

* **MVC的Controller控制器是模型和视图的纽带。控制器从视图获得事件和输入，对它们进行处理，并相应地更新视图。当页面加载时，控制器会给视图添加事件监听，比如监听表单提交和按钮单击。然后当用户和应用产生交互时，控制器中的事件触发器就开始工作。**
* **MVVM的ViewModel是一个公开公共属性和命令的抽象的view。取代了 MVC 模式的 controller，或 MVP 模式的任命者(presenter)，MVVM 有一个驱动。 在 viewmodel 中，这种驱动传达视图和数据绑定的通信。此 viewmodel 已被描述为该 model 中的数据的状态。**
* **MVP的Presenter负责逻辑的处理，在MVP中View并不直接使用Model，它们之间的通信是通过Presenter来进行的，所有的交互都发生在Presenter内部，而 在MVC中View会直接从Model中读取数据而不是通过Controller。**

**谈谈对前端页面渲染的理解（过程，原理，性能，重绘和回流）**

**页面渲染分为以下步骤  
1\. 处理HTML语句标签并构建 DOM 树  
2\. 处理CSS语句并构建CSSOM树  
3\. 将处理好的DOM与CSSOM合并成一个渲染树  
4\. 根据渲染树来布局，计算每个节点的位置样式等等  
5\. 调GPU（显卡）绘制页面，合成图层，最后显示在浏览器**

**在处理CSSOM时，会暂时堵塞DOM渲染，并且扁平层级关系有利于渲染速度，越详细的样式选择器，会导致页面渲染越慢  
CSS加载会影响JS文件或语句加载，JS需要等待CSS解析完毕后运行**

**document中的DOMContentLoaded和Load的区别​​：前者只需HTML加载完成后，就会触发，后者需要等HTML，CSS，JS都加载完成才会触发​​​​​**

**图层概念：普通文档流就是一个图层，特定的属性可以生成一个新的图层。 不同的图层渲染互不影响，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。但也不能生成过多的图层，会引起反作用  
以下CSS属性可以生成新图层：**

* **3D 变换：translate3d、translateZ**
* **will-change**
* **video、iframe 标签**
* **通过动画实现的 opacity 动画转换**
* **position: fixed**

**重绘（Repaint）和回流（Reflow）  
重绘是当节点需要更改外观而不会影响布局的，比如改变color就叫称为重绘回流是布局或者几何属性需要改变就称为回流。  
回流必定会发生重绘，重绘不一定会引发回流。  
回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。**

**所以以下几个动作可能会导致性能问题：**

* **改变 window 大小**
* **改变字体**
* **添加或删除样式**
* **文字改变**
* **定位或者浮动**
* **盒模型**

**如何减少重绘和回流**

* **使用 translate 替代 top**
* **使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发 回流（改变了布局）**
* **把DOM离线后修改，比如：先把DOM给display:none（回流），然后你修改100次，然后再把它显示出来**
* **不要把 DOM 结点的属性值放在一个循环里当成循环里的变量**
* **不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局**
* **动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用requestAnimationFrame**
* **CSS 选择符从右往左匹配查找，避免 DOM 深度过深**
* **将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对 于 video 标签，浏览器会自动将该节点变为图层。**

**谈谈对前端继承的理解**

**原型链继承，子类实例继承的属性有，子类构造函数的属性，父类构造函数的属性，父类原型上的属性  
缺点：无法向父类传参，当父类原型上的属性改变时，所以子类实例相对应的属性都会对应改变**

```javascript
        function Father() {
            this.name = "father";
            this.sex = "man"
        }
        Father.prototype.hobby = 'fish'

        function Son() {
            this.name = "son";
        }
        // 原型链继承
        Son.prototype = new Father()
        var son1 = new Son()
        var son2 = new Son()
        Father.prototype.hobby = 'dog' //缺点，修改父类prototype上的属性时，所有子类都会随之修改
        console.log(son1.hobby) // dog
        console.log(son2.hobby) // dog
        console.log(son1 instanceof Father) // true
```

**构造函数继承（通过call，apply），子类可继承多个父类，可传参给父类  
缺点：每个实例都有父类的构造函数，父类prototype上的属性无法继承**

```javascript
        // 构造函数继承（通过call，apply）
        function Father() {
            this.name = "father";
            this.sex = "man"
        }
        Father.prototype.hobby = 'fish'
        function Son(sex) {
            Father.call(this, sex) //可继承多个父类,但是每个实例都有父类的构造函数
            this.name = "son";
        }
        var son = new Son('woman')
        console.log(son.sex) //woman,可传参给父类
        console.log(son.hobby) //undefined，缺点，父类prototype上的属性无法继承
        console.log(son instanceof Father) // false
```

**组合继承，上述两者的结合，解决了上面的缺点和问题（常用）  
缺点：Father.call()和new Father()执行了两次父类构造函数，增加了性能损耗，父类的原型上的constructor指向了子类，此时需要在实例化父类（new Father）后在实例化子类（new Son）之前添加一句话：Father.prototype.constructor=Father**

```javascript
        // 组合继承
        function Father(sex) {
            this.name = "father";
            this.sex = sex
        }
        Father.prototype.hobby = 'fish'

        function Son(sex) {
            Father.call(this, sex) //可继承多个父类
            this.name = "son";
        }
        Son.prototype = new Father()
        Father.prototype.constructor = Father //解决父类的原型上的constructor指向了子类
        var son = new Son('woman')
        console.log(son.sex) //woman,可传参给父类
        console.log(son.hobby) //fish
        console.log(son instanceof Father) // true
```

**原型式继承，和Object.create相似，通过函数进行继承，会继承父类所有属性  
缺点：父类原型上的属性发生变化时，所有子类对应属性都会改变，子类无法直接修改属性，复用性较差**

```javascript
        // 原型式继承
        function Father() {
            this.name = "father";
            this.sex = 'man'
        }
        Father.prototype.hobby = 'fish'

        function Son() {
            this.name = "son";
        }

        function inherit(father) {
            function Fn() {}
            Fn.prototype = father;
            return new Fn() //类似于复制了father这个对象
        }
        var father = new Father()
        var son1 = inherit(father)
        Father.prototype.hobby = 'dog' //缺点，修改父类prototype上的属性时，所有子类都会随之修改
        var son2 = inherit(father)
        console.log(son1.sex) //man
        console.log(son1.hobby) //dog
        console.log(son2.hobby) //dog
        console.log(son1 instanceof Father) // true
```

**寄生式继承，继承父类所有属性，并且可以添加子类自己的属性方法  
缺点：代码复用率低**

```javascript
        function Father(sex) {
            this.name = "father";
            this.sex = sex //实例传参
        }
        Father.prototype.hobby = 'fish'

        function Son() {
            this.name = "son";
        }
        Object.prototype.myCreate = function (obj) {//实现Object.create
            function Fn() {}
            Fn.prototype = obj;
            return new Fn()
        }

        function inherit(father) {
            var _father = Object.myCreate(father)//克隆对象
            _father.getInfo = function () {//增强子类，修改属性，产生子类独有的方法和属性，但是耦合高，复用性差，不同子类的写法各不同
                console.log(_father.name)
                console.log(_father.hobby)
                console.log(_father.sex)
            }
            return _father;
        }
        var father = new Father('woman')
        var son = inherit(father)
        son.getInfo() //father，fish，woman
```

**寄生式组合继承，继承父类所有属性，解决调用两次父类构造函数问题：一次是在创建子类型原型，一次在子类内部（理论上是最理想的继承）**

```javascript
        // 寄生式组合继承
        function Father(sex) {
            this.name = "father";
            this.sex = sex //实例传参
        }
        Father.prototype.hobby = 'fish'
        Father.prototype.getName = function () {
            console.log(this.name)
        }

        function Son(sex) {
            console.log(this.superClass) //Father
            Father.call(this, sex); //构造函数继承传递参数
            this.name = "son";
            this.hobby = "dog";
        }
        Son.prototype.getName = function () {
            console.log(this.name)
        }

        function Grandson(sex) {
            console.log(this.superClass) //Son
            Son.call(this, sex); //构造函数继承传递参数
            this.name = "grandson";
            this.hobby = "cat";
        }

        var inherit = (function () {
            function F() {} //使用闭包产生私有函数，使每个子类继承的父类属性无引用关系
            return function (father, son) {
                F.prototype = father.prototype; //私有函数取出父类的原型
                son.prototype = new F();
                son.prototype.superClass = father; //子类的超类指向父类，子类通过this.superClass调用Father
                son.prototype.constructor = son;
            }
        }())
        inherit(Father, Son)
        inherit(Son, Grandson)
        var father = new Father('fatherMan')
        var son = new Son('sonMan')
        var grandson = new Grandson('grandsonMan')
        console.log(son instanceof Father) //true
        console.log(grandson instanceof Son) //true
        console.log(grandson instanceof Father) //true
        console.log(father.sex) //fatherMan
        console.log(son.sex) //sonMan
        console.log(grandson.sex) //grandsonMan
        console.log(father.hobby) //fish
        console.log(son.hobby) //dog
        console.log(grandson.hobby) //cat
        father.getName() //father
        son.getName() //son
        grandson.getName() //grandson
```