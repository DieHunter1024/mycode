exports.Inherit = function (type) {
  return new Inherit(type);
};
function Inherit(type) {
  return this[type];
}
Inherit.prototype = {
  // 类式继承
  classInheritance: function (superClass, subClass) {
    subClass.prototype = new superClass()
  },
  // 构造函数继承
  constructorInheritance: function (superClass, subClass) {
    
  },
  // 组合继承
  combinatorialInheritance: function (superClass, subClass) {},
  // 原型式继承
  prototypeInheritance: function (superClass, subClass) {},
  // 寄生式继承
  parasiticInheritance: function (superClass, subClass) {},
  // 寄生组合继承
  parasiticCombinatorialInheritance: function (superClass, subClass) {},
};
