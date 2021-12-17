---
title:  Node.js（二）模块使用 
date:  2018-11-27 15:36:5211-1611-2808-2002-0203-1211-2804-0903-0503-1310-0811-3012-0310-1708-1704-0910-0810-0804-1412-1512-12 
---
节点有三种模块：内置模块（节点文档里有），第三方模块（大佬们自己写的模块），自定义模块（成为大佬的必经之路）;

1.创建自定义模块的方式：

新建一个JS文件，如：

```javascript
let obj = {

  name： 'AAA'，

  SayHello：function（）{

   console.log（ “你好” + this.name）

}

}
//抛出该对象

module.exports = obj 
```

使用自定义模块的方式：

之后在要调用的JS文件中

```javascript
//新建一个对象接收模块对象

const obj = require（'./ module.js'）//这是开始那个js文件的路径

执行console.log（obj）

obj.sayhello（）;
```

2.内置模块使用

const obj = require（'模块名'）

根据官方文档直接调用

3.第三方模块

先使用NPM或CNPM下载相关模块

使用const obj = require（'模块名'）引入;

之后根据第三方文档使用