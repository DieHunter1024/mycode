const { Inherit } = require("./lib/inherit");
const { newClass } = require("./lib/new");
// new的使用
// global.name = "小暗";
// function Person() {
//   console.log(this.name);
// }
// Person.prototype = {
//   name: "小明",
//   constructor: Person,
// };
// const fnReturn = Person(); // 小暗
// const newReturn = new Person(); // 小明
// const myNew = newClass.call(Person);
// console.log(fnReturn); // undefined
// console.log(newReturn.name, newReturn.__proto__, newReturn.prototype); // 小明 { name: '小明' } undefined
// console.log(myNew.name, myNew.__proto__, myNew.prototype); // 小明 { name: '小明' } undefined

// 继承的使用

// 类式继承
// 结合 new 的原理可以知道: 类式继承实际上是通过 new 将 SuperClass.prototype 绑定到 SuperClass.__proto__ 上，然后赋值给 SubClass.prototype,当实例化 SubClass 时，SubClass.__proto__ 上也会带有 SuperClass 及其原型链上的属性，即 SubClass 实例化对象上有以下属性：SuperClass.prototype 上的属性（实例化对象.__proto__.__proto__），SuperClass 构造函数上的属性（实例化对象.__proto__），SubClass 构造函数上的属性（实例化对象）
// 缺点1：子类通过prototype继承父类,只能父类单向传递属性给子类，无法向父类传递参数。为什么要向父类传递参数？如果父类中的某属性对参数有依赖关系，此时子类继承父类就需要在 new SuperClass() 时传参
// 缺点2：
function classInheritance(superClass, subClass) {
  subClass.prototype = new superClass();
}
function SuperClass(props) {
  this.state = props;
  this.info = { color: "red" };
}
SuperClass.prototype = {
  name: "Car",
};
classInheritance(SuperClass, SubClass);
function SubClass() {
  this.price = 1000;
}
let BMW = new SubClass();
let BenZ = new SubClass();
console.log(BenZ.name, BenZ.info); // Car { color: 'red' }
BMW.info.color = "blue";
console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__); // { price: 1000 } { state: undefined, info: { color: 'blue' } } { name: 'Car' }
console.log(BenZ.name, BenZ.info); // Car { color: 'blue' }
