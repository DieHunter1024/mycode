---
title:  浅析MVVM原理，实现一个mini-vue 
date:  2021-08-08 23:07:4205-1108-0604-3003-2106-2609-1510-1208-2910-3006-29 
---
**目录**

[前言](#main-toc)

[MVVM](#MVVM)

[mini-vue实现](#%E5%8A%9F%E8%83%BD%E5%AE%9E%E7%8E%B0)

[Compile（指令解析）](#Compile%EF%BC%88%E6%8C%87%E4%BB%A4%E8%A7%A3%E6%9E%90%EF%BC%89)

[Updater（视图更新）](#updater)

[Proxy（代理data）](#proxy)

[Observer（数据劫持）](#observer)

[Dep（调度中心）](#dep)

[Watcher（数据观察）](#watcher)

[函数的连接](#%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%9E%E6%8E%A5)

[写在最后](#%E5%86%99%E5%9C%A8%E6%9C%80%E5%90%8E)

---

## **前言**

**MVVM实际上是MVC的改进版，其立足于MVP框架。使用Vue时，我们会体会到其与React的区别，绑定表单数据时react对输入框读写需要input事件设置state，以及value绑定，而vue则只需将数据与model绑定即可，这种数据驱动视图却与视图解耦的编程方式使用起来很方便。以前面试官问vue原理，若能说出双向绑定实现和Object.defineProperty就已经够了，现在随着对vue深入的学习，面试官已经不仅仅局限于此。所以，为了深入体验mvvm模式，我实现了一个mini-vue。**

## **MVVM**

**在开始前，我们先试着参照下图实现一个简单的双向绑定案例**

![](https://img-blog.csdnimg.cn/20210806143347529.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**DOM通过eventListener修改Model，Model通过修改data驱动视图**

![](https://img-blog.csdnimg.cn/20210806144123455.gif)

**在html>body中添加以下代码就可以实现**

```javascript
    <input id="input-box" type="text">
    <div id="show-text"></div>
    <script>
        const showText = document.querySelector('#show-text')
        const inputBox = document.querySelector('#input-box')
        class VM {
            data = {
                value: ''
            }
            constructor() {
                Object.defineProperty(this.data, 'value', {
                    set(v) {
                        showText.textContent = v
                    },
                    get() {
                        return showText.textContent
                    }
                })
            }
        }

        const vm = new VM()
        inputBox.addEventListener('input', function (e) {
            vm.data.value = e.target.value
            console.log(vm.data.value)
        })
    </script>
```

**在上述代码中，我们可以使用Object.defineProperty将data和textContent的值绑定，从而达到数据驱动视图的效果，那么这样就够了吗？**

## mini-vue实现

**下面是双向绑定的流程  
![](https://img-blog.csdnimg.cn/2021080611515858.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)**  
**通过上图我们可以得知：new MVVM后会进行两步操作，一是compile指令解析，将v-if,@click,{{ }}解析出来，获取data中的数据，并且都与watcher绑定，第一次初始化和watcher监听到数据变化时会执行updater，重新渲染页面，二是observer数据劫持，将data中的数据通过defineProperty添加读写监听，并将数据变化与watcher绑定在一起，那么此时watcher就是连接数据变化和视图更新的枢纽。**

**下面我们一步一步实现上述代码**

### **Compile（**指令解析**）**

**我们回顾一下vue是如何使用的，标签中各种v-if，v-show，v-html，以及@click等等属性，绑定着data中的属性和methods中的函数**

```html
    <div id="app">
        <span v-text='title.name'></span>
        <div v-if='isRender'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </div>
        <ul>
            <li v-if='isRender'>{{info.name}}---{{info.age}}---{{modelData}}---{{inputVal.item.value}}</li>
            <li v-show='isShow'>{{info.age}}</li>
            <li v-if='isRender'>{{modelData}}</li>
            <li v-show='isShow'>{{inputVal.item.value}}</li>
        </ul>
        <span v-text='inputVal.item.value'></span>
        <div v-html='htmlTemp'></div>
        <div v-show='isShow'>world</div>
        <button v-on:click='handlerShow'>点击显示</button>
        <button @click='handlerRender'>点击渲染</button>
        <input v-model='modelData' type="text">
        <input v-model='inputVal.item.value' type="text">
    </div>
```

**而实例化vue则是将数据和函数初始化到vue中**

```javascript
        let vm = new Vue({
            el: '#app',
            data: {
                title: {
                    name: 'hello'
                },
                info: {
                    name: '张三',
                    age: 23,
                },
                isShow: true,
                isRender: true,
                modelData: 123,
                htmlTemp: '<span style="color:red;">html</span>',
                inputVal: {
                    item: {
                        value: 'abc'
                    }
                }
            },
            methods: {
                handlerShow() {
                    this.isShow = !this.isShow
                },
                handlerRender() {
                    this.isRender = !this.isRender
                }
            },
        })
```

**那么，我们要如何去让js识别这些指令并渲染视图呢  
首先，创建标签碎片，将Dom元素获取到DocumentFragment中，以便于解析指令及根据指令对视图响应，其次，将标签属性分离，每种指令对应一种响应方式（updater）。最后绑定watcher监听到数据变化时，再次触发updater  
以下是compile.js，用来解析标签内容和属性**

```javascript
// 指令解析器
const textRegex = /\{\{(.+?)\}\}/g //解析{{}}的正则
class Compile {
    constructor(elem, vm) {
        this.elem = isElemNode(elem) === '1' ? elem : document.querySelector(elem)
        this.vm = vm
        const fragment = this.createFragment(this.elem)
        this.getTemp(fragment, this.vm)
        this.elem.appendChild(fragment);
    }
    // 递归子元素，查找所有元素
    getTemp(fragment, vm) {
        const fragmentChild = Array.from(fragment.childNodes)
        fragmentChild.forEach(item => {
            this.filterElem(item, vm)
            item.childNodes && item.childNodes.length && this.getTemp(item, vm)
        })
    }
    // 创建标签碎片，将dom元素添加到标签碎片中
    createFragment(elem) {
        const fragment = document.createDocumentFragment();
        while (elem.firstChild) {
            fragment.append(elem.firstChild)
        }
        return fragment
    }

    // 针对不同元素节点进行分离
    filterElem(elem, vm) {
        switch (isElemNode(elem)) {
            case 1: //元素节点
                this.renderNode(elem, vm)
                break;
            case 3: //文本节点
                this.renderText(elem, vm)
                break;
        }
    }
    // 渲染文本，主要解析‘{{}}’及多个‘{{}}’
    renderText(elem, vm) {
        textRegex.test(elem.textContent) && updater(elem, vm, elem.textContent, 'text-content')
    }
    // 渲染标签
    renderNode(elem, vm) {
        //取出所有属性和值
        Array.from(elem.attributes).forEach(attr => {
            const {
                name,
                value
            } = attr;
            // 过滤‘v-’和‘@’操作，并移除标签属性
            name.startsWith('v-') ? (this.compileV_Command(elem, vm, name, value), removeAttr(elem, name)) : name.startsWith('@') ? (this.compileEventComment(elem, vm, name.split('@')[1], value), removeAttr(elem, name)) : null
        })
    }
    // v- 指令解析,指令
    compileV_Command(elem, vm, name, value) {
        const key = name.split('v-')
        const eventCommand = key[1] && key[1].split(':')[1]
        // v-model事件
        key[1] === 'model' && this.compileEventComment(elem, vm, 'input', value, e => {
            setDeepData(vm, value, e.target.value)
        })
        // 过滤指令是否为事件
        eventCommand ? this.compileEventComment(elem, vm, eventCommand, value) : updater(elem, vm, value, key[1])
    }
    // @ 指令解析,事件
    compileEventComment(elem, vm, name, value, fn) {
        !fn && elem.addEventListener(name, vm.options.methods[value].bind(vm))
        fn && elem.addEventListener(name, fn.bind(vm))
    }
}
```

### Updater（视图更新）

**指令解析完后自然需要updater.js，对当前元素进行下一步渲染，在此之前，我们的值需要从vue.data中取，这样才能将data数据绑定到标签中，lodash有两个函数一个是\_.get()，另一个是\_.set()，作用是获取和设置对象某一层某个值，所以我们需要在utils（工具函数）中实现一下**

**utils.js**

```javascript
//lodash中的 _.get()，获取对象多级属性
function getDeepData(object, path, defaultValue) {
    const paths = path.split('.')
    for (const i of paths) { //逐层遍历path
        object = object[i]
        if (object === undefined) { //不能用 '!object' null，0，false等等会等于false
            return defaultValue
        }
    }
    return object
}
//lodash中的 _.set()，赋值对象某级属性
function setDeepData(object, path, value) {
    const paths = path.split('.')
    const last = paths[paths.length - 1]//为何要在length - 1时赋值：因为object的引用关系使得我们可以一级一级赋值，而当最后一项是基本类型时，无法将引用的值赋给原始的object
    let _obj = object
    for (const i of paths) {
        last === i && (_obj[last] = value)
        _obj = _obj[i]
    }
}
// 移除属性值
function removeAttr(elem, key) {
    elem.removeAttribute(key)
}
// 获取标签类型
function isElemNode(elem) {
    return elem.nodeType
}
```

**updater.js**

```javascript
// 更新视图,标签中指令属性处理
function updater(elem, vm, value, type) {
    switch (type) {
        case 'text':
                elem.textContent = getDeepData(vm.data, value)
            break;
        case 'text-content':
                elem.textContent = value.replace(textRegex, (..._) => getDeepData(vm.data, _[1]))
            break;
        case 'html':
                elem.innerHTML = getDeepData(vm.data, value)
            break;
        case 'model':
                elem.value = getDeepData(vm.data, value)
            break;
        case 'if':
            const temp = document.createTextNode('')
            elem.parentNode.insertBefore(temp, elem);
                getDeepData(vm.data, value) ? temp.parentNode.insertBefore(elem, temp) : temp.parentNode.removeChild(elem)
            break;
        case 'show':
                elem.hidden = !getDeepData(vm.data, value)
            break;
    }
}
```

**完成这一步后，我们在vue.js中调用**

```javascript
class VueDemo {
    constructor(options) {
        this.options = options //配置信息
        this.data = options.data;
        // 判断options.el是否存在
        (this.el = options.el) && Object.defineProperties(this, {
            compile: {
                value: new Compile(options.el, this) //指令解析器
            }
        })
    }
}
```

**效果出来了，指令被解析出来并且在页面中显示**

![](https://img-blog.csdnimg.cn/20210808210242262.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### **Proxy（代理data）**

**我们虽然将vue.data中的数据渲染到了页面，但是还是需要通过this.data来获取数据，而vue可以中直接通过this来拿到数据，此时我们需要新建一个proxy.js将this.data代理到this上**

```javascript
// data数据代理到vue
class DataProxy {
    constructor(data, vm) {
        for (const key in data) {
            Object.defineProperty(vm, key, {
                get() {
                    return data[key];
                },
                set(val) {
                    data[key] = val;
                }
            })
        }
        return data
    }
}
```

**在vue.js中调用，并将updater.js中的vm.data改成vm**

```javascript
class VueDemo {
    constructor(options) {
        this.options = options //配置信息
        this.$data = options.data;
        // 判断options.el是否存在
        (this.el = options.el) && Object.defineProperties(this, {
            proxy: {
                value: new DataProxy(options.data, this) //data代理到this
            },
            compile: {
                value: new Compile(options.el, this) //指令解析器
            }
        })
    }
}
```

**写到这里，compile和updater已经实现了，接下来将是数据劫持的实现方式**  
![](https://img-blog.csdnimg.cn/20210808211540592.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### Observer（数据劫持）

**这一步的作用是将data中的数据都加上读写响应控制，给所有数据绑定可以更新视图的函数**

```javascript
// 发布模式
class Observer {
    constructor(data) {
        this.initObserver(data)
    }
    // 劫持所有数据
    initObserver(data) {
        if (data && typeof data === 'object') {
            for (const key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    // 响应拦截器，递归监听所有层级
    defineReactive(data, key, val) {
        this.initObserver(val) //劫持子项
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            configurable: false, // 不能被定义
            get: _ =>  val,//初始化获取值时对dep绑定
            set: newVal => val = newVal
        })
    }
}
```

### Dep（调度中心）

**watcher的作用是将上面的observer与视图的刷新函数updater进行连接，当observer监测到数据变化时会通过dep告诉watcher，watcher就会执行updater更新视图，于是，我们需要先实现observer与watcher之间的观察者dep，我们先假定watcher中更新视图的函数名字叫compareVal，将watcher注册到调度中心中**

```javascript
// 调度中心（观察者模式）
class Dep {
    observerList = [] //调度中心,存放与属性绑定的事件
    //触发所有与该属性绑定的事件
    fireEvent() {
        this.observerList.forEach(target => {
            target.compareVal()
        })
    }
    //注册事件
    subscribe(target) {
        target.compareVal && this.observerList.push(target)
    }
}
```

### **Watcher（数据观察）**

**watcher的作用是连接observer和compile，使数据和视图绑定  
以下是watcher.js的实现**

```javascript
// 订阅模式(比较绑定值的变化)
class Watcher {
    constructor(vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.oldVal = getDeepData(this.vm, this.val)
        update() //首次渲染初始化
    }
    // 对比数据，更新视图
    compareVal() {
        const newVal = getDeepData(this.vm, this.val);
        newVal !== this.oldVal && (this.update(), this.oldVal = newVal) //更新视图后将新值赋到oldVal上
    }
}
```

### **函数的连接**

**我们来回顾一下以上功能的实现**  
![](https://img-blog.csdnimg.cn/20210808220840105.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**整个流程中的函数部分已经全部实现，只剩下如何将他们联系在一起，这时如果你对整个功能实现还有些模糊，那请认真分析一下这张流程图，并继续看下去吧**

**首先我们把watcher和指令解析以及updater之间的关系实现。  
在updater中给予每一个指令一个watcher，将更新视图操作绑定到watcher中，由compareVal来更新视图**

```javascript
// 更新视图,标签中指令属性处理
function updater(elem, vm, value, type) {
    switch (type) {
        case 'text':
            new Watcher(vm, value, _ => {
                elem.textContent = getDeepData(vm, value)
            })
            break;
        case 'text-content':
            value.replace(textRegex, (..._) => { //外面的content.replace获取所有{{}}中的属性
                new Watcher(vm, _[1], _ => { //里面的content.replace获取data中绑定的值
                    elem.textContent = value.replace(textRegex, (..._) => getDeepData(vm, _[1]))
                })
            })
            break;
        case 'html':
            new Watcher(vm, value, _ => {
                elem.innerHTML = getDeepData(vm, value)
            })
            break;
        case 'model':
            new Watcher(vm, value, _ => {
                elem.value = getDeepData(vm, value)
            })
            break;
        case 'if':
            const temp = document.createTextNode('')
            elem.parentNode.insertBefore(temp, elem);
            new Watcher(vm, value, _ => {
                getDeepData(vm, value) ? temp.parentNode.insertBefore(elem, temp) : temp.parentNode.removeChild(elem)
            })
            break;
        case 'show':
            new Watcher(vm, value, _ => {
                elem.hidden = !getDeepData(vm, value)
            })
            break;
    }
}
```

**那么如何告诉watcher数据发生了改变呢？  
在watcher中我们获取oldvalue时采用this.oldVal = getDeepData(this.vm, this.val)  
这个操作会使observer中data属性的get被触发，此时如果我们将watcher注册到dep中即可对所有数据变化进行监听，然鹅，在实现的时候，发现了一些问题，由于defineReactive将data所有属性都监听了，导致取属性时使用{{info.name}}时，data.info和data.info.name都会被劫持，而我们只需要info.name，所以，当dep注册watcher时需要设置一个开关，并且在observer中根据开关添加监听，修改的watcher和observer如下：  
watcher.js**

```javascript
// 订阅模式(比较绑定值的变化)
class Watcher {
    constructor(vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.oldVal = this.getOldVal() //获取初始值，触发observer中属性的get
        update() //首次渲染初始化
    }
    getOldVal() {
        Dep.target = this //将watcher暂存到Dep上，在Observer中通过dep.subscribe将watcher传到dep的observerList（调度中心）中，后续当值发送修改时通过fireEvent触发watcher.compareVal来更新视图
        const oldVal = getDeepData(this.vm, this.val) //触发Observer中的getter，将watcher注册到dep中
        Dep.target = null
        return oldVal
    }
    // 对比数据，更新视图
    compareVal() {
        const newVal = getDeepData(this.vm, this.val);
        newVal !== this.oldVal && (this.update(), this.oldVal = newVal) //更新视图后将新值赋到oldVal上
    }

}
```

**observer.js中的defineReactive**

```javascript
    // 响应拦截器，递归监听所有层级
    defineReactive(data, key, val) {
        this.initObserver(val) //劫持子项
        const dep = new Dep() //将observer与watcher连接，当watcher触发数据变化后，将watcher中的回调函数注册到dep中
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            configurable: false, // 不能被定义
            get: _ => {
                Dep.target && dep.subscribe(Dep.target); //获取属性值时,将watcher中的回调函数注册到dep中（在页面初始化时调用）
                return val
            },
            set: newVal => newVal !== val && (val = newVal) //设置属性时，对比新值和旧值有无差别
        })
    }
```

**现在，我们只剩下当数据发生改变时，如何通知watcher，因为上述的defineReactive中已经将watcher注册到了dep，此时我们只需在数据变化时也就是defineReactive的set中对数据更新进行响应，当某条数据被设置时，我们将dep中watcher触发即可**

```javascript
    // 响应拦截器，递归监听所有层级
    defineReactive(data, key, val) {
        this.initObserver(val) //劫持子项
        const dep = new Dep() //将observer与watcher连接，当watcher触发数据变化后，将watcher中的回调函数注册到dep中
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            configurable: false, // 不能被定义
            get: _ => {
                Dep.target && dep.subscribe(Dep.target); //获取属性值时,将watcher中的回调函数注册到dep中（在页面初始化时调用）
                return val
            },
            set: newVal => newVal !== val && (val = newVal, this.initObserver(newVal), dep.fireEvent()) //设置属性时，对比新值和旧值有无差别，若修改的值是引用型时，将属性重新注册到dep中,并更新视图
        })
    }
```

**至此，流程图中的所有功能均已实现，让我们在vue.js中实例化observer试试效果**

```javascript
class VueDemo {
    constructor(options) {
        this.options = options //配置信息
        this.$data = options.data;
        // 判断options.el是否存在
        (this.el = options.el) && Object.defineProperties(this, {
            //observer和compile的顺序不要错，否则监听不到compile中的数据
            observer: {
                value: new Observer(options.data) // 数据监听器
            },
            proxy: {
                value: new DataProxy(options.data, this) //data代理到this
            },
            compile: {
                value: new Compile(options.el, this) //指令解析器
            }
        })
    }
}
```

![](https://img-blog.csdnimg.cn/20210808225030888.gif)

## 写在最后

**感谢你看到了最后，希望文章能对你有帮助，同时也欢迎你提出宝贵的建议**

**最后附上[源码地址](https://gitee.com/DieHunter/myCode/tree/master/Vue%E5%8E%9F%E7%90%86)  
喜欢这篇文章别忘了点个赞，你的支持是作者创作的动力**