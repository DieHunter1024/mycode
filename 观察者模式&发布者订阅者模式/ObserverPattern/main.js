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