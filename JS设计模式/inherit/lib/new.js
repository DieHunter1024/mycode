exports.newClass = function () {
  const _target = new Object(); // 新增一个容器，用来装载构造函数（目标类）prototype上的所有属性
  const _this = this; //不能直接通过 this() 来运行构造函数，所以用一个变量装载
  _target.__proto__ = _this.prototype; // 核心部分：将构造函数prototype上的所有属性放到新容器中
  _this.apply(_target, arguments); // 执行构造函数，相当于执行class中的constructor
  return _target; //将新的容器返回，此时通过 _target[属性名]就可以访问 this.prototype 中的属性了
};
