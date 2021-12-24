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
// 优点：简洁方便，子类拥有父类及父类 prototype 上属性
// 缺点1：子类通过prototype继承父类,只能父类单向传递属性给子类，无法向父类传递参数。为什么要向父类传递参数？如果父类中的某属性对参数有依赖关系，此时子类继承父类就需要在 new SuperClass() 时传参
// 缺点2：当父类原型上的属性改变时，所有子类实例相对应的属性都会对应改变，即继承的属性都有引用关系
// 缺点3：子类只能继承一个父类（因为继承方式是直接修改子类的prototype，如果再次修改，会将其覆盖）
// function classInheritance(superClass, subClass) {
//   subClass.prototype = new superClass();
// }
// function SuperClass(props) {
//   this.state = props;
//   this.info = { color: "red" };
// }
// SuperClass.prototype = {
//   name: "Car",
// };
// classInheritance(SuperClass, SubClass);
// function SubClass() {
//   this.price = 1000;
// }
// let BMW = new SubClass();
// let BenZ = new SubClass();
// console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__); // { price: 1000 } { state: undefined, info: { color: 'red' } } { name: 'Car' }
// console.log(BenZ.name, BenZ.info); // Car { color: 'red' }
// BMW.info.color = "blue";
// console.log(BenZ.name, BenZ.info); // Car { color: 'blue' }
// console.log(BMW instanceof SubClass) // true
// console.log(BMW instanceof SuperClass) // true

// 构造函数继承
// 在 SubClass 构造函数中使用 SuperClass.call 直接运行 SuperClass 构造函数，然而直接执行构造函数和使用 new 实例化构造函数二者是完全不同的：
// 前者（直接执行构造函数）在下方代码中会将 SuperClass 构造函数里初始化的属性带到 SubClass 中,而 SuperClass.prototype 中的 name 属性并未带到 SubClass 中;
// 而后者（使用 new 实例化构造函数）则会将 SuperClass.prototype 中的属性带到 SuperClass 实例化对象的 __proto__ 上
// 所以其优点是:
// 可以在 SuperClass 执行时传参数
// 可以继承多个父类
// 继承同一个父类的子类的属性之间不会有引用关系（因为父类构造函数的执行是在每个子类中call(this)了，从而在父类构造函数执行时，this分别代表着每个子类）
// 缺点：父类prototype上的属性无法继承，只能继承父类构造函数的属性,正是因为这点,父类的构造函数无法复用;
// 针对父类的构造函数无法复用的理解：SuperClass 每次执行都会在每个子类 SubClass 重新初始化 this.属性 或 this.函数,这些属性是属于每个子类单独的,而倘若这些函数或者属性在 SuperClass 的 prototype 上，那么如果子类能继承父类，则所有子类用公共属性的都是父类的
// function SuperClass(props) {
//   this.state = props;
//   this.info = { color: "red" };
// }
// SuperClass.prototype = {
//   name: "Car",
// };
// function SuperClass2() {
//   this.size = 'small';
// }
// // 注意：构造函数使用 call 会重写子类同名属性，要写在子类的最开始
// function SubClass() {
//   SuperClass.call(this, ...arguments);
//   SuperClass2.call(this, ...arguments);
//   this.price = 1000;
// }
// SubClass.prototype.name = "Small Car";
// let BMW = new SubClass(true);
// let BenZ = new SubClass(false);
// console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__);
// // SubClass {
// //   state: true,
// //   info: { color: 'red' },
// //   size: 'small',
// //   price: 1000
// // } SubClass { name: 'Small Car' } {}
// console.log(BenZ.name, BenZ.info, BenZ.state); // Small Car { color: 'red' } false
// BMW.info.color = "blue";
// console.log(BenZ.name, BenZ.info); // Small Car { color: 'red' }
// console.log(BMW instanceof SubClass) // true
// console.log(BMW instanceof SuperClass) // false

// 组合继承

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
  SuperClass.call(this, ...arguments);
  this.price = 1000;
}
SubClass.prototype.name = "Small Car";
let BMW = new SubClass(true);
let BenZ = new SubClass(false);

console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__);
console.log(BenZ.name, BenZ.info, BenZ.state);
BMW.info.color = "blue";
console.log(BenZ.name, BenZ.info);
console.log(BMW instanceof SubClass) // true
console.log(BMW instanceof SuperClass) // true