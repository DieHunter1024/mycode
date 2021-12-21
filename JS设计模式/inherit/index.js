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
function SuperClass() {
  this.info = { color: "red" };
}
SuperClass.prototype = {
  name: "Car",
};
function SubClass() {}
// 类式继承
Inherit("classInheritance")(SuperClass, SubClass);
let BMW = new SubClass();
let BenZ = new SubClass();
console.log(BenZ.name, BenZ.info);
BMW.info.color = "blue";
console.log(BMW.name, BMW.info);
console.log(BenZ.name, BenZ.info);
