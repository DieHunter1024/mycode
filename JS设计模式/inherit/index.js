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
// 类式继承（原型链继承）
// 结合 new 的原理可以知道: 类式继承实际上是通过 new 将 SuperClass.prototype 绑定到 SuperClass.__proto__ 上，然后赋值给 SubClass.prototype,当实例化 SubClass 时，SubClass.__proto__ 上也会带有 SuperClass 及其原型链上的属性，即 SubClass 实例化对象上有以下属性：SuperClass.prototype 上的属性（实例化对象.__proto__.__proto__），SuperClass 构造函数上的属性（实例化对象.__proto__），SubClass 构造函数上的属性（实例化对象）
// 优点：简洁方便，子类拥有父类及父类 prototype 上属性
// 缺点1：子类通过prototype继承父类,只能父类单向传递属性给子类，无法向父类传递参数。为什么要向父类传递参数？如果父类中的某属性对参数有依赖关系，此时子类继承父类就需要在 new SuperClass() 时传参
// 缺点2：当父类原型上的属性改变时，所有子类实例相对应的引用属性都会对应改变，即继承的引用类型的属性都有引用关系
// 缺点3：子类只能继承一个父类（因为继承方式是直接修改子类的prototype，如果再次修改，会将其覆盖）
// 缺点4：继承语句前不能修改子类的 prototype 因为此类继承会覆盖子类原型()
// function classInheritance(SuperClass, SubClass) {
//   SubClass.prototype = new SuperClass();
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
// const BMW = new SubClass();
// const BenZ = new SubClass();
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
// 缺点：父类 prototype 上的属性无法继承，只能继承父类构造函数的属性,正是因为这点,父类的函数无法复用（指无法复用父类 prototype 中的函数，只能通过父类构造函数将函数放在子类中）
// 针对父类的函数无法复用的理解：
// 父类 SuperClass 每次在子类 SubClass 中执行都会在每个子类重新初始化 this.属性 或 this.函数,这些属性是属于每个子类单独的,这样既增加了性能负担又使父类原型中的公共属性无法复用；
// 而倘若这些函数或者属性在 SuperClass 的 prototype 上，并且子类能继承父类，则所有子类用公共属性的都是父类的，此时就达到了复用效果，而类式继承却能够实现这个效果，于是就有了下面的组合继承
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
// const BMW = new SubClass(true);
// const BenZ = new SubClass(false);
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
// 构造函数继承不能继承父类原型上的属性，而类式继承无法传参给父类，组合继承正好将两者规避了
// 然而组合继承在实例化父类和执行父类构造函数时执行了两次 SuperClass ，实际上类式继承是为了解决构造函数继承上的父类的 prototype 无法被子类继承的问题，看代码可以得知，new SuperClass() 确实会将父类的 prototype 继承到子类中，但是也会将 SuperClass 构造函数中的操作又执行一遍(具体可看 console.log(++count) 执行了3次)，而且类式继承是将子类的原型直接替换掉，所以无法继承多个父类的问题也被延续下来了（但是可以在父类上多加一次继承，使多个类形成原型链关系，达到多继承的目的，即A,B,C三个类，A要继承B和C，那么让A继承B再继承C）
// 优点：解决类式继承和构造函数继承的主要问题
// 缺点：父类构造函数执行两遍，性能损耗
// function classInheritance(superClass, subClass) {
//   subClass.prototype = new superClass();
// }
// let count = 0;
// function SuperClass(props) {
//   this.state = props;
//   this.info = { color: "red" };
//   console.log(++count);// 打印 1 2 3
// }
// SuperClass.prototype = {
//   name: "Car",
// };
// classInheritance(SuperClass, SubClass);
// function SubClass() {
//   SuperClass.call(this, ...arguments);
//   this.price = 1000;
// }
// SubClass.prototype.name = "Small Car";
// const BMW = new SubClass(true);
// const BenZ = new SubClass(false);

// console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__);
// // { state: true, info: { color: 'red' }, price: 1000 } { state: undefined, info: { color: 'red' }, name: 'Small Car' } { name: 'Car' }
// console.log(BenZ.name, BenZ.info, BenZ.state); // Small Car { color: 'red' } false
// BMW.info.color = "blue";
// console.log(BenZ.name, BenZ.info); // Small Car { color: 'red' }
// console.log(BMW instanceof SubClass); // true
// console.log(BMW instanceof SuperClass); // true

// 原型式继承
// 原型式继承是基于类式继承的封装，特点和类式继承一样，继承的引用类型属性都有引用关系
// 原型式继承的过渡对象F实际上就是类式继承中的子类构造函数，这么做的特点：减少性能开销（子类是空白的构造函数，没有任何内容），对应的，子类无法在构造函数中初始化属性
// 是不是觉得原型式继承和 Object.create( ) 很像？ create 函数的原理就是生成一个新对象，这个新对象的 __proto__ 等于传入的对象。让我们回忆一下前面讲到的 new 的原理，new 实际上就是将 prototype 放在实例化对象的 __proto__ 上，不难理解，下面代码中 F.prototype = superClass 和 new F() 做的就是这一步
// function prototypeInheritance(SuperClass) {
//   function SubClass() {}
//   SubClass.prototype = new SuperClass();
//   return new SubClass();
// }

// 优点：无子类构造函数开销，相当于实现了对象的浅复制
// 缺点：
// 继承时无法向父类传参
// 和类式继承一样，​​​​​​​继承父类​​​​​​​的引用类型属性都有引用关系

// function prototypeInheritance(superClass) {
//   function F() {}
//   F.prototype = superClass;
//   return new F();
// }
// function SuperClass(props) {
//   this.state = props;
//   this.info = { color: "red" };
// }
// SuperClass.prototype = {
//   name: "Car",
// };
// const superClass = new SuperClass(true);
// const BenZ = prototypeInheritance(superClass);
// const BMW = prototypeInheritance(superClass);
// BMW.price = 2000;

// console.log(BMW, BMW.__proto__, BMW.__proto__.__proto__); // { price: 2000 } { state: true, info: { color: 'red' } } { name: 'Car' }
// console.log(BenZ, BenZ.name, BenZ.info, BenZ.state); // {} Car { color: 'red' } true
// BMW.info.color = "blue";
// console.log(BenZ.name, BenZ.info); // Car { color: 'blue' }
// console.log(BMW instanceof SuperClass); // true

// 寄生式继承
// 寄生式继承实际上是在上面的原型式继承的基础上做了二次封装，可以看成工厂模式+原型式继承，将继承步骤放在新的函数中，此时便可以在子类构造函数上添加子类独有的函数和属性，由此叫做寄生式继承，就好像子类独有的属性方法寄生在下面的 parasiticInheritance 函数中一样。使用这种继承在新建子类时，每个子类中的属性都不一样，违背了代码复用的效果
// 优点：
// 无子类构造函数开销
// 继承父类所有属性
// 子类拥有自己的属性
// 缺点：
// 继承时无法向父类传参
// 和类式继承一样，​​​​​​​继承父类​​​​​​​的引用类型属性都有引用关系
// 子类公共属性无法在原型上定义，导致无法复用
// 针对代码无法复用缺点的理解：让我们回忆一下上面的构造函数继承对代码复用的理解，子类构造函数中直接执行父类构造函数并改变 this 指向从而达到将父类属性初始化到子类中。而寄生式继承则是每次生成的子类都是新的构造函数 F ，所以在继承时单独给 subClass 增加属性实际上是操作不同的子类构造函数，而如果这个做法能在子类 prototype 中进行，那么子类的函数及属性可以复用。
// function prototypeInheritance(superClass) {
//   function F() {}
//   F.prototype = superClass;
//   return new F();
// }
// function SuperClass(props) {
//   this.state = props;
//   this.info = { color: "red" };
// }
// SuperClass.prototype = {
//   name: "Car",
// };

// function parasiticInheritance(superClass) {
//   const subClass = prototypeInheritance(superClass);
//   subClass.type = { electricity: true, gasoline: false };
//   return subClass;
// }

// const superClass = new SuperClass(true);
// const BenZ = parasiticInheritance(superClass);
// const BMW = parasiticInheritance(superClass);
// console.log(BenZ.type === BMW.type); // false  说明每个子类的属性都不一样
// console.log(BenZ, BenZ.__proto__, BenZ.__proto__.__proto__);
// // { type: { electricity: true, gasoline: false } } { state: true, info: { color: 'red' } } { name: 'Car' }
// console.log(BMW, BMW.name, BMW.info, BMW.state); // { type: { electricity: true, gasoline: false } } Car { color: 'red' } true
// BMW.info.color = "blue";
// console.log(BMW.name, BMW.info); // Car { color: 'blue' }
// console.log(BMW instanceof SuperClass); // true
// console.log(BenZ instanceof SuperClass); // true

// 寄生组合式继承
// 实际上上述继承方式都是实现最终继承方式的猜想和尝试，在ES6的class语法糖出现之前，寄生组合继承是最理想的继承方式，下面让我们来看看
// 顾名思义寄生组合继承就是寄生式继承和组合式继承的结合
// 个人认为叫它寄生组合式继承倒不如称其为原型组合式继承，因为他的写法就是原型式继承+组合式继承
// 这么写究竟好在哪？
// 乍一看，这种写法和组合式继承属实有点像，但是有一点不同：
// prototypeInheritance 函数会生成一个只包含父类原型上属性而没有执行父类构造函数的 “纯净” 的新对象（即不执行父类构造函数）。
// 这句话怎么理解？
// 让我们结合一下 new 的原理，回忆一下类式继承或组合式继承是如何实现的：SubClass.prototype = new SuperClass() 这样会导致子类 prototype 中既执行了父类构造函数，也有父类原型上的属性。而实际上我们是暂时不需要执行父类构造函数的，因为在组合式继承中还有一步：在子类中执行 SuperClass.call(this, ...arguments) ，这一步会将父类构造函数再执行一次，将其二者结合，于是我们就得到了组合式继承的升级版：寄生组合式继承
// 之前写的原型式继承
function prototypeInheritance(superClass) {
  function F() {}
  F.prototype = superClass;
  return new F();
}
// 在我们弄懂了原型式继承或者寄生式继承后，寄生组合式继承就变得迎刃而解
function parasiticCombinatorialInheritance(SuperClass, SubClass) {
  // 核心代码
  SubClass.prototype = prototypeInheritance(SuperClass.prototype);
  SubClass.prototype.superClass = SuperClass;
}
// 或者可以这么写
// function parasiticCombinatorialInheritance(SuperClass, SubClass) {
//   SubClass.prototype = Object.create(SuperClass.prototype);
//   SubClass.prototype.superClass = SuperClass;
// }

function SuperClass(props) {
  this.state = props;
  this.info = { color: "red" };
}
SuperClass.prototype = {
  name: "Car",
};

function SubClass() {
  this.superClass.call(this, ...arguments); //调用一下父类构造函数，将父类的属性放在子类中
}

parasiticCombinatorialInheritance(SuperClass, SubClass);
SubClass.prototype.name = "small car";//修改prototype值写在继承后面
const BMW = new SubClass(true);
const BenZ = new SubClass(false);
console.log(BenZ, BenZ.__proto__, BenZ.__proto__.__proto__); // { state: false, info: { color: 'red' } } { superClass: [Function: SuperClass], name: 'small car' } { name: 'Car' }
console.log(BMW.info); // { color: 'red' }
BenZ.info.color = "blue";
console.log(BenZ.name,BenZ.info); // small car { color: 'blue' }
console.log(BenZ.name,BMW.info); // small car { color: 'red' }
console.log(BMW instanceof SuperClass); // true
console.log(BenZ instanceof SuperClass); // true
