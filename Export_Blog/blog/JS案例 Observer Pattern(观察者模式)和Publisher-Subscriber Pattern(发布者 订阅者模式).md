---
title:  JS案例：Observer Pattern(观察者模式)和Publisher-Subscriber Pattern(发布者/订阅者模式) 
date:  2021-02-11 15:02:1512-0205-1406-1103-0503-2309-0709-1110-0110-1507-0408-1008-2801-1603-2403-2901-0805-0708-2612-17 
---
### **发布/订阅模式和观察者模式一样吗？**

**在许多地方我们都能见到基于这二者或者说基于某种设计模式的框架，函数或插件**

**在浏览器中使用addEventListener(type,fn)对dom元素进行事件委托，事件监听用户的异步操作  
Android中也有一个事件发布/订阅的轻量级框架：EventBus，原理与web相似  
Socket.io的许多方法也是基于此类模式，监听与触发事件，批量广播等  
在Node中同样也有一个events事件触发器解决异步操作的同步响应**

**那么其二者有什么区别吗，下面两张图可以简单描述他们的过程（发布者/订阅者模式我直接用事件的侦听（addeventlistener）与事件的派遣（dispatchevent）来形容帮助理解）**  
![](https://img-blog.csdnimg.cn/20210209212521379.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210209221110581.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### **Observer Pattern(观察者模式)：**

**Subject(主题，或者叫被观察者)：当状态发送变化时，需要通知队列中关联对象  
Observer(观察者)：当Subject发送消息时，通过回调获得信息  
Observer(观察者)将事件（记做fn回调）丢给Subject(被观察者)，然后就开始监视着他的一举一动，当Subject(被观察者)的（异步）任务完成后，同步触发事件fn回调将消息传输给Observer(观察者)后，完成一个完整的周期**

**实现过程：  
Observer.js：**

```javascript
module.exports = class Observer { //定义观察者类，每个实例化后的观察者拥有订阅（subscribe）功能
    constructor() {}
    /**
     * 订阅
     * @param target 被观察者Subject的实例对象
     * @param fn 订阅注册的回调
     */
    subscribe(target, fn) {
        target.observerList.push(fn)
    }
}
```

**Subject.js：**

```javascript
module.exports = class Subject { //定义被观察者类，每个实例化后拥有注册的观察者回调的列表（observerList）和触发回调（fireEvent）功能
    constructor() {
        this.observerList = []
    }
    /**
     * 触发
     * @param e 被观察者传递给观察者的参数
     */
    fireEvent(e) {
        this.observerList.forEach(item => {
            item(e)
        })
    }
}
```

**main.js（使用场景）**

```javascript
const Observer = require('./js/observer');
const Subject = require('./js/subject')

class MyObserver extends Observer {}
class MySubject extends Subject {}

// 实例化两个观察者，同时对一个subject进行监听
const observer = new MyObserver()
const observer2 = new MyObserver()
const subject = new MySubject()

observer.subscribe(subject, (e) => {
    console.log(e) //hello world
})
observer2.subscribe(subject, (e) => {
    console.log(e) //hello world
})
// 延时激活观察者注册的函数，传递参数
setTimeout(subject.fireEvent.bind(subject, 'hello world'), 1000)
```

### **Publisher-Subscriber Pattern(发布者/订阅者模式)：**

**Subscriber(订阅者)：将事件注册到事件调度中心（Event Channel或者可以看做EventBus(事件总线)）  
Publisher(发布者)：触发调度中心的事件  
Event Channel(调度中心)，与Vue和Android中的EventBus(事件总线)相似：得到Publisher(发布者)的消息后，统一处理Subscriber(订阅者)注册的事件  
Subscriber(订阅者)通过on将事件注册到Event Channel(调度中心)，并与Event Channel通过回调进行数据传递，当Subscriber(订阅者)触发Event Channel(调度中心)的事件并将数据传递至其中时，调度中心会激活之前与Subscriber(订阅者)建立的联系，通过emit发送数据，订阅者收到数据后完成一个周期**

**实现过程：  
eventBus.js**

```javascript
// 发布/订阅设计模式(Pub/Sub)
class EventBus {
    constructor() {
        this._eventList = {} //调度中心列表
    }

    static Instance() { //返回当前类的实例的单例
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, "_instance", {
                value: new EventBus()
            });
        }
        return EventBus._instance;
    }
    /**
     * 注册事件至调度中心
     * @param type 事件类型，特指具体事件名
     * @param fn 事件注册的回调
     */
    onEvent(type, fn) { //订阅者
        if (!this.isKeyInObj(this._eventList, type)) { //若调度中心未找到该事件的队列，则新建某个事件列表（可以对某个类型的事件注册多个回调函数）
            Object.defineProperty(this._eventList, type, {
                value: [],
                writable: true,
                enumerable: true,
                configurable: true
            })
        }
        this._eventList[type].push(fn)
    }
    /**
     * 触发调度中心的某个或者某些该事件类型下注册的函数
     * @param type 事件类型，特指具体事件名
     * @param data 发布者传递的参数
     */
    emitEvent(type, data) { //发布者
        if (this.isKeyInObj(this._eventList, type)) {
            for (let i = 0; i < this._eventList[type].length; i++) {
                this._eventList[type][i] && this._eventList[type][i](data)
            }
        }
    }
    offEvent(type, fn) { //销毁监听
        for (let i = 0; i < this._eventList[type].length; i++) {
            if (this._eventList[type][i] && this._eventList[type][i] === fn) {
                this._eventList[type][i] = null
            }
        }
    }
    /**
     * 检查对象是否包含该属性，除原型链
     * @param obj 被检查对象
     * @param key 被检查对象的属性
     */
    isKeyInObj(obj, key) {
        if (Object.hasOwnProperty.call(obj, key)) {
            return true
        }
        return false
    }
}

module.exports = EventBus.Instance()
```

**main.js**

```javascript
const EventBus = require('./js/eventBus')
let list = [], //记录异步操作
    count = 0, //计数器
    timeTick = setInterval(function () {
        if (count++ > 3) { //当执行到一定时间时，销毁事件、定时器
            EventBus.offEvent('finish', eventHandler)
            clearInterval(timeTick)
        }
        list.push(count)
        EventBus.emitEvent('finish', {
            list
        })
    }, 1000)

EventBus.onEvent('finish', eventHandler)

function eventHandler(e) {
    console.log(e)
    // { list: [ 1 ] }
    // { list: [ 1, 2 ] }
    // { list: [ 1, 2, 3 ] }
    // { list: [ 1, 2, 3, 4 ] }
}
```

**总结：发布者/订阅者模式实际上是基于观察者模式上优化实现的，然而其二者的区别还是有的**

**观察者模式：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新  
优点：观察者和被观察者是抽象耦合的，其二者建立了一套触发机制，松耦合  
缺点：二者之间循环依赖，如果关系复杂，如观察者数量过多，还是会造成性能问题，解决方式是避免同步执行造成线程阻塞**

**发布者/订阅者模式：与观察者模式类似，但是核心区别是发布者与订阅者互相无耦合，并不知道通知与被通知的对方的具体身份，而是将注册的函数放在统一的调度中心进行管理  
优点：发布者/订阅者完全解耦，可扩展性高，常应用在分布式，紧耦合服务中  
缺点：发布者解耦订阅者，这点既是主要优点，亦是缺点，打个比方，在Socket中，倘若服务端发送消息给客户端，不会在意是否发送成功，此时需要客户端返回接收到了消息才能算是保证了代码的可靠性和可用性**

**相关源码：[码云地址](https://gitee.com/DieHunter/myCode/tree/master/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F&%E5%8F%91%E5%B8%83%E8%80%85%E8%AE%A2%E9%98%85%E8%80%85%E6%A8%A1%E5%BC%8F)**