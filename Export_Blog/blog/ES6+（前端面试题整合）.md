---
title:  ES6+（前端面试题整合） 
date:  2020-11-23 09:09:2704-1912-1411-2506-1509-0404-2508-1810-2909-0611-1407-3008-0708-2010-1705-1105-3103-0105-1508-18 
---
**谈一谈let与var和const的区别**

**let为ES6新添加申明变量的命令，它类似于var，但是有以下不同：**

* **let命令不存在变量提升，如果在let前使用，会导致报错**
* **let暂时性死区的本质，其实还是块级作用域必须“先声明后使用”的性质，let 暂时性死区的原因：var 会变量提升，let 不会。**
* **let，const和class声明的全局变量不是全局对象的属性**
* **const可以在多个模块间共享**
* **const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）**
* **const只是保证变量名指向的地址不变，并不保证该地址的数据不变**

**说说箭头函数的特点**

* **箭头函数不属于普通的 function，所以没有独立的上下文。**
* **箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。**
* **由于箭头函数没有自己的this，函数对象中的call、apply、bind三个方法，无法"覆盖"箭头函数中的this值。**
* **箭头函数没有原本(传统)的函数有的隐藏arguments对象。**
* **箭头函数不能当作generators使用，使用yield会产生错误。**

**在以下场景中不要使用箭头函数去定义：**

**1\. 定义对象方法、定义原型方法、定义构造函数、定义事件回调函数。**

**2\. 箭头函数里不但没有 this，也没有 arguments, super**

**对Symbol，Map和Set的理解**

**Symbol 是一种特殊的、不可变的数据类型，可以作为对象属性的标识符使用，即使使用同样的参数实例化symbol，得到的symbol实例也不会相等**

```javascript
let _symbol1 = Symbol('test');
let _symbol2 = Symbol('test');
console.log(_symbol1 == _symbol2);//false
```

**Map对象保存键值对，有点类似于Object，但是Object的键只能是字符串或者Symbols，而Map可以是任何值**

```javascript
        let myMap = new Map()
        let str1 = 'dog'
        let str2 = 'cat'
        myMap.set(str1, '汪')
        myMap.set(str2, '喵')
        console.log(myMap) // {0: {"dog" => "汪"}1: {"cat" => "喵"}}
        console.log(myMap.get(str1)) // 汪
```

**Set 对象允许你存储任何类型的唯一值（数组去重），有点类似于Array，Set中的元素只会出现一次**

```javascript
        let mySet = new Set()
        mySet.add('hello')
        mySet.add('1')
        mySet.add('2')
        mySet.add('2')
        console.log(mySet) // {0: "hello",1: "1",2: "2"}
```

**使用ES6如何监测数组变化（proxy监测读写）**

```javascript
        let list = [1, 2, 3]
        // 代理
        let _proxy = new Proxy(list, {
            set: function (target, prop, val, rec) {
                console.log('写入')
                target[prop] = val
                return true
            },
            get: function (target, prop) {
                console.log('读取')
                return target[prop]
            }
        })
        _proxy[0] = 4 // 写入
        console.log(_proxy[1]) // 读取
```

**JS有哪些处理异步的方法**

**回调函数：回调是一个函数被作为一个参数传递到另一个函数里，在那个函数执行完后再执行**

**优点：简单，方便，实用，易懂  
缺点：当逻辑复杂时，会产生回调函数地狱，耦合度高，流程会很混乱**

```javascript
        // 回调
        let cb = (props) => {
            console.log(props) // 2
        }
        let init = (props) => {
            // 异步操作
            setTimeout(() => {
                cb(props) // 异步传参
            }, 1000)
        }
        init(2)
        console.log(1) // 1
```

**事件发布/订阅：采用事件驱动模式，任务的执行取决于某一个事件是否发生**

**优点：事件监听方式相对回调实现了代码的解耦，对模块化开发很友好  
缺点：每次执行任务都需要发布/订阅事件**

```javascript
        // 事件发布/订阅
        let cb = (event) => {
            console.log(event.props) // 2
        }
        let init = (props) => {
            // 异步操作
            setTimeout(() => {
                let event = new Event('myEvent')
                event.props = props // 异步传参
                document.dispatchEvent(event)
            }, 1000)
        }
        init(2)
        console.log(1) // 1
        document.addEventListener('myEvent', cb)
```

**Promise：Promise是异步编程，它将异步操作以同步的方式表现出来，避免回调地狱的产生**

**优点：避免回调地狱，链式调用，函数思路清晰，逻辑相对前两者更强  
缺点：理解性差，异步操作在promise构造函数内部**

```javascript
        // ES6  Promise
        let init = (props) => {
            return new Promise((resolve, reject) => {
                // 异步操作
                setTimeout(() => {
                    resolve(props)
                }, 1000)
            })
        }
        init(2).then((res) => {
            console.log(res) // 2
        })
        console.log(1) // 1
```

**Generator：generator（生成器）是ES6标准引入Python的新的数据类型**

**优点：取消链式调用的then，和发布/订阅模式非常相似，对于理解同步操作很直观  
缺点：多个异步函数时不够直观，原函数需要通过next去维护外部函数的yield**

```javascript
        // ES6  Generator
        const fn = init(2)
        let cb = (props) => {
            console.log(props) // 2
        }
        function* init(props) {
            // 异步操作
            yield setTimeout(() => {
                fn.next()
            }, 500)
            yield setTimeout(() => {
                fn.next()
            }, 500)
            cb(props)
        }
        fn.next()
        console.log(1) // 1
```

**async/await：`async函数是generator函数的语法糖，函数（function关键字）前添加async关键字，函数中通过await等待异步执行`**

**优点：同步流程清晰，简洁，异步操作可以返回promise对象，后续操作更方便  
缺点：JS的执行器功能较其他co模块较弱**

```javascript
        // ES6+  async/await
        let cb = (props) => {
            console.log(props) // 2
        }
        let cb2 = (props) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(props)
                }, 1000)
            })
        }
        async function init(props) {
            // 异步操作
            let num2 = await cb2(props)
            cb(num2)
        }
        init(2)
        console.log(1) // 1
```

**ES6中的class关键字跟function什么区别**

* **在function定义的构造函数中，其prototype.constructor属性指向构造器自身，在class定义的类中，constructor其实也相当于定义在prototype属性上**
* **function如果重复定义，会覆盖之前定义的方法，而class重复定义则会报错**
* **class中定义的方法不可用Object.keys(Point.prototype)枚举到，function构造器原型方法可被Object.keys(Point.prototype)枚举到**
* **class没有变量提升，也就是说，必须先定义class，再使用，而function定义后，会被提升至当前作用域顶端**
* **class定义的类没有私有方法和私有属性，function可以通过闭包实现私有方法和属性**

**ES6新增哪些数组方法**

**find()：返回数组中第一个满足条件的元素（如果有的话）， 如果没有，则返回 undefined  
findIndex()：返回数组中第一个满足条件的元素的索引（如果有的话）， 如果没有，则返回 -1  
keys()：返回一个数组索引的迭代器  
values()：返回一个数组迭代器对象，该对象包含数组中每个索引的值  
entries()：返回一个数组迭代器对象，该对象包含数组中每个索引的键值对**

**for in****和 for of 的****区别**

**for in适合用于遍历对象，for of可以用来遍历数组，类数组对象，argument，字符串，Map和Set**

**for in 遍历数组时会有以下问题：**

* **index索引为字符串型数字，不能直接进行几何运算**
* **遍历顺序有可能不是按照实际数组的内部顺序**
* **使用for in会遍历数组所有的可枚举属性，包括原型，原型上的方法和属性**

**所以for in 不适合遍历数组，而适合用于遍历对象**

**而for of****遍历数组时****：**

**只会遍历数组内的元素，而不包括数组的原型属性method和索引name**

**CommonJS 中的 require/exports 和 ES6 中的 import/export 区别**

* **CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用**
* **CommonJS模块是运行时加载，ES6模块是编译时输出接口，ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高**
* **CommonJS模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。而Es6模块的运行机制与CommonJS不一样。JS引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，在根据引用到被加载的那个模块里面去取值。ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。**
* **require/exports是CommonJS在Node中实现的，import/export是ES6的模块**
* **require/exports是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而ES6模块是异步导入，因为用于浏览器，需要下载文件，如果也采用导入会对渲染有很大影响**
* **ES6模块的设计思想，是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，ES6模块会编译成 require/exports 来执行的**
* **export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能**

**尝试实现Promise**

**[https://blog.csdn.net/time\_\_\_\_\_/article/details/109721703](https://blog.csdn.net/time_____/article/details/109721703)**

**Object.is()与“==”，“===”的区别**

**“==”会在比较时进行类型转换**

**“===”比较时不进行隐式类型转换**

**Object.is()在三等号判等的基础上特别处理了NaN、-0和+0，保证-0和+0不再相同，但Object.is(NaN,NaN)会返回true**

**ES6中为何出现Class**

**Class的功能实际上在ES5都能实现，可以算是ES6的语法糖，其作用是使JS语法清晰，更像面向对象语法**

**基础写法**

```javascript
        class MyEvent extends EventTarget { // 继承EventTarget
            constructor(e) {
                super(e) // 父类的构造函数
                this.consoleThis() // 执行函数
            }
            consoleThis() {
                console.log(this)
            }
        }
        let myEvent = new MyEvent(document) // EventTarget
```

**ES6语法糖的对象的属性简写和属性名表达式是什么**

**属性简写：对象的字面量可以直接写入与之名称相同的变量和函数**

```javascript
        let name = '小明'
        function showName() {
            console.log(this.name)
        }
        let person = {
            name,
            showName
        }
        console.log(person.name)// 小明
        person.showName()// 小明
```

**属性名表达式简写：ES6允许把表达式放在方括号内，作为对象的属性名**

```javascript
        let num = 0
        let obj = {
            "1": 'a',
            "2": 'b',
            "3": 'c'
        }
        console.log(obj[++num]) // a
        console.log(obj[++num]) // b
        console.log(obj[++num]) // c
```

**谈谈解构赋值的理解**

**解构赋值是对赋值运算符的扩展，是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值**

```javascript
        // 数组
        let [a, b, c] = [1, 2, 3];
        console.log(a, b, c) // 1,2,3
        // 对象
        let {
            d,
            e,
            f
        } = {
            d: 4,
            e: 5
        };
        console.log(d, e, f) // 4,5,undefined
```

**使用ES6如何合并多个对象，复制对象**

**ES6中的对象新增（...）拓展运算符，用于取出参数对象所有可遍历属性然后拷贝到当前对象**

**ES6新增对象拷贝方法：Object.assign(target, source1，source2，source3， ···)，将源对象的所有可枚举属性复制到目标对象中，即，将source1，source2，source3......复制到target中**

**合并：**

```javascript
        let name = {
            name: '小明'
        }
        let age = {
            age: 20
        }
        let hobby = {
            hobby: 'music'
        }
        let person = {// 拓展运算符
            ...name,
            ...age,
            ...hobby
        }
        console.log(person)// age: 20,hobby: "music",name: "小明"

        Object.assign(person, name, age, hobby)// 对象拷贝
        console.log(person) // age: 20,hobby: "music",name: "小明"
```

**复制：**

```javascript
        let list = [1, 2, 3, 4, 5]
        let list2 = [...list]// 拓展运算符
        Object.assign(list2, list)// 对象拷贝
        let index = 0
        do {
            list[index] += 10
        } while (index++ < list.length - 1)
        console.log(list, list2) // [11, 12, 13, 14, 15]  [1, 2, 3, 4, 5]
```

**如何控制类中属性的读写性**

**setter...getter...**

```javascript
        class Animal {
            constructor() {
                this._dog = '小黑'
                this._cat = '小黄'
            }
            set cat(val) { // 只写
                this._cat = val
            }
            get dog() { // 只读
                return this._dog
            }
        }
        let animal = new Animal()
        animal.dog = '小白'
        animal.cat = '小灰'
        console.log(animal.dog, animal.cat) // 小黑 undefined
        console.log(animal._dog, animal._cat) // 小黑 小灰
```

**Object.defineProperty（）修改对象只读**

```javascript
        class Animal {
            constructor() {
                this.dog = '小白'
            }
        }
        let animal = new Animal()
        Object.defineProperty(animal, 'dog', {
            writable: false, // 可写，false为只读
        });
        animal.dog = '小黑'
        console.log(animal.dog) // 小白
```