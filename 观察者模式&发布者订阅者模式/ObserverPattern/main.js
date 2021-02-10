const Observer = require('./js/observer');
class MyObserver extends Observer {}
const observerA = new MyObserver()
const observerB = new MyObserver()
const observerC = new MyObserver()
observerA.subscribe(observerA, function (e) {
    console.log(e.target + 'observerA')
})
observerB.subscribe(observerA, function (e) {
    console.log(e.target + 'observerB')
})
observerC.subscribe(observerA, function (e) {
    console.log(e.target + 'observerC')
})
setTimeout(observerA.fireEvent.bind(observerA, {
    target: 'name:'
}), 1000)