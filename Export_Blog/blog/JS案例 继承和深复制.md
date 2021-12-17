---
title:  JS案例：继承和深复制 
date:  2018-12-30 16:54:2602-0211-0703-1203-2303-2102-1111-1111-0611-1703-0504-2811-2311-0312-0211-28 
---
## 继承：

```javascript
// 寄生式继承(圣杯)
			Father.prototype.name = 'Hello' //在Father类中添加一个name属性

			function Father() {} //构造Father类

			function Son() {} //构造Son类
			var inherit = (function () { //新建一个立即执行函数,(类似雅虎网站的继承写法)
				function F() {} //使用闭包产生私有函数
				return function (father, son) { //返回继承函数
					F.prototype = father.prototype; //私有函数取出父类的原型
					son.prototype = new F(); //实例化私有函数，并将对象赋给子类的原型
					son.prototype.superClass = father; //自定义子类的超类等于父类
					son.prototype.constructor = son; //将子类的构造函数指向自己，否则是父类(因为原型链上的constructor是父类)
				}
			}())
			inherit(Father, Son) //调用函数
			Son.prototype.age = 'World' //改变子类的原型(目的：测试父类原型与子类原型是否绑定)
			var son = new Son(); //实例化子类对象
			var father = new Father(); //实例化父类对象
			console.log(son, father)
			console.log(son.name, father.name); //此时父子类都有该属性。打印(Hello Hello)
			console.log(son.age, father.age) //子类独有属性，父类无此属性。打印(World undefined)
```

## 深复制：

### 简易版：

```javascript
var obj = {
				a: 1,
				b: 'hello',
				c: function () {
					console.log(this.a, this.b);
				},
				d: [1, 2, 3, 4, 'a', 'b', false],
				e: {
					a: 11,
					b: '11',
					c: {
						arr: [5, 4, 1, 2, 3],
						obj: {
							z: 'hello',
							y: 'world'
						}
					}
				}
			}
			var obj1 = {}
			obj1 = JSON.parse(JSON.stringify(obj))
			console.log(obj1);
```

![](https://img-blog.csdnimg.cn/20181230173146272.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### 进阶版：（缺点：遇到不可枚举项时无法遍历，对象中有set和get时只会将结果输出）

```javascript
var obj = {
				a: 1,
				b: 'hello',
				c: function () {
					console.log(this.a, this.b);
				},
				d: [1, 2, 3, 4, 'a', 'b', false],
				e: {
					a: 11,
					b: '11',
					c: {
						arr: [5, 4, 1, 2, 3],
						obj: {
							z: 'hello',
							y: 'world'
						}
					}
				},
				f: null,
				g: undefined,
				set count(val) {
					this.f = val;
				},
				get count() {
					return this.f
				}
			}
			var obj1 = {}

			function copyObj(org, tag) { //org是原对象(obj)，tag是复制后的对象(obj1)
				var tag = tag || {}; //初始化要复制的对象
				for (var key in org) { //遍历对象
					if (typeof org[key] === 'object' && org[key] !== null) { //若遍历的每一项非空且为对象，则为引用值，则继续下一步
						if (org[key].toString() === '[object Object]') {//若引用值.toString等于[object Object]，说明该值数据类型为对象
							tag[key] = {};
						} else {//否则为数组
							tag[key] = [];
						}
						copyObj(org[key], tag[key])//再次执行函数
					} else { //若每一项除了typeof为obj以外的值都是原始值，直接赋值即可
						tag[key] = org[key];
					}
				}
				return tag; //递归结束后返回对象
			}
			copyObj(obj, obj1)
			obj.e.c.obj.z = 'world';//改变复制后的值观察复制后的对象是否发生改变
			obj.e.c.obj.y = 'hello';
			console.log(obj, obj1);
```

![](https://img-blog.csdnimg.cn/20181230173201112.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### 终极版深复制：（解决进阶版的问题）

```javascript
			var obj = {
				a: 1,
				b: 'hello',
				c: function () {
					console.log(this.a, this.b);
				},
				d: [1, 2, 3, 4, 'a', 'b', false],
				e: {
					a: 11,
					b: '11',
					c: {
						arr: [5, 4, 1, 2, 3],
						obj: {
							z: 'hello',
							y: 'world'
						}
					}
				},
				f: null,
				g: undefined,
				set count(val) {
					this.f = val;
				},
				get count() {
					return this.f
				}
			}
			var obj1 = {}

			function copyObj(org, tag) {
				var tag = tag || {}; //初始化要复制的对象
				var name = Object.getOwnPropertyNames(org); //获取该对象的属性名，以字符串数组返回
				for (var i = 0; i < name.length; i++) { //遍历对象
					var desc = Object.getOwnPropertyDescriptor(org, name[i]); //获取对象的属性描述对象，无引用关系，返回另一个对象，改变时原对象不发生变化(复制的关键)
					if (typeof desc.value === 'object' && desc.value !== null) { //若遍历的每一项非空且为对象，则为引用值，则进行下一步
						var obj = desc.value.toString() === '[object Object]' ? {} : []; //判断是数组还是对象
						Object.defineProperty(tag, name[i], { //设置对象属性值，前三个的值是返回true或false
							configurable: desc.configurable, //是否可删除可替换
							enumerable: desc.enumerable, //是否可枚举可遍历
							writable: desc.writable, //是否可写入
							value: obj //对象的值
						});
						copyObj(desc.value, obj); //再次执行函数
					} else {
						Object.defineProperty(tag, name[i], desc); //否则直接将该对象的属性值进行复制(原始值)
					}
				}
				return tag;
			}
			copyObj(obj, obj1)
			obj.e.c.obj.z = 'world'; //改变复制后的值观察复制后的对象是否发生改变
			obj.e.c.obj.y = 'hello';
			console.log(obj, obj1);
```

![](https://img-blog.csdnimg.cn/20181230174051591.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)