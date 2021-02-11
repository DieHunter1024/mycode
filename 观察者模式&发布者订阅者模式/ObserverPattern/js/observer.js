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