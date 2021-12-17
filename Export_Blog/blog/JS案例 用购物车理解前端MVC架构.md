---
title:  JS案例：用购物车理解前端MVC架构 
date:  2020-03-05 17:19:0001-2205-0703-2912-2909-0301-0802-1109-2211-1111-0711-0609-2011-1702-0203-2103-2303-12 
---
**目录**

[什么是MVC：](#%E4%BB%80%E4%B9%88%E6%98%AFMVC%EF%BC%9A)

[MVC的作用：](#MVC%E7%9A%84%E4%BD%9C%E7%94%A8%EF%BC%9A)

[如何使用MVC架构：](#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8MVC%E6%9E%B6%E6%9E%84%EF%BC%9A)

[效果：](#%E6%95%88%E6%9E%9C%EF%BC%9A)

[以下是所有代码：](#%E4%BB%A5%E4%B8%8B%E6%98%AF%E6%89%80%E6%9C%89%E4%BB%A3%E7%A0%81%EF%BC%9A)

[源码地址：https://gitee.com/DieHunter/myCode/tree/master/shopCarMVC](#%E6%BA%90%E7%A0%81%E5%9C%B0%E5%9D%80%EF%BC%9Ahttps%3A%2F%2Fgitee.com%2FDieHunter%2FmyCode%2Ftree%2Fmaster%2FshopCarMVC)

[后端（nodejs）：](#%E5%90%8E%E7%AB%AF%EF%BC%88nodejs%EF%BC%89%EF%BC%9A)

[server.js](#server.js)

[data.js(存放商品列表)](#data.js%28%E5%AD%98%E6%94%BE%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8%29)

[前端](#%E5%89%8D%E7%AB%AF)

[shopCar.html（入口页面）](#shopCar.html%EF%BC%88%E5%85%A5%E5%8F%A3%E9%A1%B5%E9%9D%A2%EF%BC%89)

[shop.css](#shop.css)

[JS文件夹：](#JS%E6%96%87%E4%BB%B6%E5%A4%B9%EF%BC%9A)

[bussiness](#bussiness)

[command](#command)

[components](#components)

[config](#config)

[controller](#controller)

[event](#event)

[model](#model)

[utils](#utils)

[view](#view)

[总结](#%E6%80%BB%E7%BB%93)

---

---

### 什么是MVC：

Model View Controller即：模型-视图-控制器  
通俗来讲，在编程语言中，Model就是数据，可以理解为数据库，View就是显示数据的外观，Controller是用来连接前两者的行为，常见的Vue采用的是M-V-VM架构，与MVC类似，但是基于MVC

### MVC的作用：

说到作用，就不得不提面向对象与面向过程的区别了

面向过程就是，将解决问题的思路流程一步一步进行，紧扣在一起，最终达到结果

面向对象，是将某个问题的解决方式剥离开，其目的不是为了完成某个步骤，而是将某个事物（对象）的角色（属性）和行为（方法）作为核心

说了这些，到底MVC有什么好处呢？

举个栗子：A是某公司的一位前端程序员，平时用面向过程进行编程，这天，好不容易完成了手头上的活，准备回家，这时，产品经理走过来，让他改个小地方，这下就完了，面向过程的思维使他的代码环环相扣，代码耦合性强，内聚性高，密不可分，改一个地方就要几乎全改

A的哥哥也是一个前端程序员，平时用面向对象编程，产品经理让他改一个效果，由于用的面向对象，他的代码没有层次感，通用的方法全部提取出来，使得代码耦合性低，想改哪直接改相关的类或者方法就好了

当然，在小型项目中无法体现它的优点，甚至会小题大做，大材小用，而在大型项目中，其耦合性低，代码复用性高，搭建相对较快

### 如何使用MVC架构：

又是这个购物车，业余时间用MVC做了一个简单的购物车：

目录结构大致是这样

![](https://img-blog.csdnimg.cn/2020030516395041.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

购物车整体流程：

目录结构将modelviewcontroller剥离开

Modedl层：存储数据，显示数据

View：根据Model数据渲染页面

Controller：传递数据

Command:操作数据，获取数据

Event：事件总线，注册事件

商品列表：

初始化View层，建立Ajax获取数据，之后由controller触发事件至事件总线，然后再由注册的事件将ajax数据传至Model中完成商品列表初始化

当model获取到商品列表数据时，通过代理set()触发新建商品列表事件，通过command操作view达到新建列表目的

购物车表格：

当用户对view进行操作时，触发注册的事件，通过command修改Model中的数据（购物车列表）从而再由command驱动view中的刷新表格进行渲染

### 效果：

![](https://img-blog.csdnimg.cn/20200305170021983.gif)

### 以下是所有代码：

### 源码地址：[https://gitee.com/DieHunter/myCode/tree/master/shopCarMVC](https://gitee.com/DieHunter/myCode/tree/master/shopCarMVC)

# 后端（nodejs）：

## server.js

```javascript
/*
 *后端采用node+express搭建一个简单的接口，通过本地数据，将商品列表传至前端
 * 
 */
const express = require('express');
const path = require('path');
const app = express();
const shopData = require('./data/shopData.js')
let serverToken = 'hello'
app.all("*", function (req, res, next) { //跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});
app.use('/getShopList', function (req, res) {
    let data = req.query
    if (!checkToken(data.token)) { //简单获取前端token，校验
        res.send({
            result: 0,
            msg: 'token fail'
        })
        return
    }
    res.send({
        result: 1,
        msg: 'success',
        type: 'getShopList',
        shopData
    })
})

function checkToken(teken) {
    return teken == serverToken
}
app.use('/img', express.static(path.join(__dirname, './img'))); //后端目录静态化，用url+img访问文件夹
app.use('/client', express.static(path.join(__dirname, '../client')));
app.listen(1024, "127.0.0.1", function () {
    console.log("服务开启，开始侦听");
});
```

## data.js(存放商品列表)

```javascript
module.exports = [{
        "select": false,
        "id": 1001,
        "icon": "img/1.png",
        "name": "餐饮0",
        "num": 0,
        "price": 10,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1002,
        "icon": "img/2.png",
        "name": "餐饮1",
        "num": 0,
        "price": 20,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1003,
        "icon": "img/3.png",
        "name": "餐饮2",
        "num": 0,
        "price": 30,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1004,
        "icon": "img/4.png",
        "name": "餐饮3",
        "num": 0,
        "price": 40,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1005,
        "icon": "img/5.png",
        "name": "餐饮4",
        "num": 0,
        "price": 50,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1006,
        "icon": "img/6.png",
        "name": "餐饮5",
        "num": 0,
        "price": 60,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1007,
        "icon": "img/7.png",
        "name": "餐饮6",
        "num": 0,
        "price": 70,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1008,
        "icon": "img/8.png",
        "name": "餐饮7",
        "num": 0,
        "price": 80,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1009,
        "icon": "img/9.png",
        "name": "餐饮8",
        "num": 0,
        "price": 90,
        "sum": 0,
        "delete": false
    },
    {
        "select": false,
        "id": 1010,
        "icon": "img/10.png",
        "name": "餐饮9",
        "num": 0,
        "price": 100,
        "sum": 0,
        "delete": false
    }
]
```

# 前端

### shopCar.html（入口页面）

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>shopCar</title>
	<link rel="stylesheet" href="./src/style/shop.css">
</head>

<body>
	<script type="module">
		/*
		购物车整体流程：
		目录结构将model view controller剥离开
		Modedl层：存储数据，显示数据
		View：根据Model数据渲染页面
		Controller：传递数据
		Command:操作数据，获取数据
		Event：事件总线，注册事件
		商品列表：
		 	初始化View层，建立Ajax获取数据，之后由controller触发事件至事件总线，然后再由注册的事件将ajax数据传至Model中完成商品列表初始化
		 	当model获取到商品列表数据时，通过代理set()  触发新建商品列表事件，通过command操作view达到新建列表目的
		购物车表格：
		 	当用户对view进行操作时，触发注册的事件，通过command修改Model中的数据（购物车列表）从而再由command驱动view中的刷新表格进行渲染
		*/
		import ShopView from './src/js/view/ShopView.js'
		// 实例化View层入口函数
		new ShopView()
	</script>
</body>

</html>
```

### shop.css

```css
* {
    margin: 0;
    padding: 0;
}

.shopBox {
    overflow: hidden;
    width: 1000px;
    margin: 50px auto 0;
}

.liItem {
    float: left;
    list-style: none;
    padding: 10px;
    width: 150px;
    height: 200px;
    text-align: center;
    border: 1px solid lightcoral;
}

.liItem img {
    width: 100px;
    height: 100px;
}

.leftBtn,
.rightBtn {
    width: 30px;
    height: 30px;
    background: white;
    border: 1px solid black;
    font-size: 25px;
    line-height: 30px;
}

.text {
    width: 50px;
    height: 26px;
    display: inline-block;
    vertical-align: bottom;
    text-align: center;
}

table {
    font-size: 30px;
    width: 1200px;
    border: 1px solid lightcoral;
    border-collapse: collapse;
    margin: 50px auto;
}

.checkbox {
    width: 30px;
    height: 30px;
}

td {
    border: 1px solid lightcoral;
    text-align: center;
    vertical-align: middle;
}

td button {
    width: 150px;
    height: 60px;
}

.numBox {
    width: 150px;
    height: 30px;
    margin: auto;
    position: relative;
}

.numBox>button {
    width: 40px;
    height: 42px;
    background-color: white;
    border: 1px solid #000000;
}

.numBox>input {
    width: 70px;
    height: 40px;
    border: 1px solid #000000;
    border-left: none;
    border-right: none;
    text-align: center;
}
```

## JS文件夹：

### bussiness

* Ajax.js
  ```javascript
  import ShopEvent from '../event/ShopEvent.js'
  import Utils from '../utils/Utils.js'
  import Api from '../config/Api.js'
  import ShopController from '../controller/ShopController.js'
  export default class Ajax {//Ajax类，用于请求后端或本地数据
      // Ajax请求函数
      static AjaxTool(method = Api.GET, url, data) {
          let xhr;
          if (window.ActiveXObject) { //ie浏览器
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
          } else if (window.XMLHttpRequest) { //其他浏览器
              xhr = new XMLHttpRequest();
          }
          url = Api.URL + Api.PORT + Api.PATH + url
          if (method !== Api.POST) {
              method = Api.GET
              url = Utils.urlJoin(url, data)
              data = null
          } else {
              method = Api.POST
          }
          xhr.open(method, url);
          xhr.send(data ? JSON.stringify(data) : '')
          xhr.addEventListener('load', Ajax.loadHandler) //Ajax类是静态类，无法使用this
      }
      static loadHandler(e) {
          //this指向xhr
          let xhr = e.currentTarget;
          if (xhr.readyState === 4 && xhr.status === 200) {
              Ajax.data = xhr.response
          } else {
              Ajax.data = 'error'
          }

      }
      static set data(value) { //使用set对象代理模式替代请求数据回调函数（只写set表示data只可写入，不可读取）
          let res = JSON.parse(value)
          switch (res.result) {
              case 1:
                  console.log(res.msg)
                  ShopController.dispatch(ShopEvent.GET_DATA, res)//获取到数据后不做其他操作，将数据通过事件抛出至Event总线中
                  break;
              case 0:
                  console.log('加载失败')
                  console.log(res.msg)
                  break;
              default:
                  break;
          }
      }
  }
  ```

### command

* MainCommand（command汇总）
  ```javascript
  import GetDataCommand from '../command/GetDataCommand.js'
  import CreateListCommand from '../command/CreateListCommand.js'
  import CreateTableCommand from '../command/CreateTableCommand.js'
  import AddItemCommand from '../command/AddItemCommand.js'
  import DelItemCommand from '../command/DelItemCommand.js'
  import ReduceItemCommand from '../command/ReduceItemCommand.js'
  import ChangeItemCommand from '../command/ChangeItemCommand.js'
  import SelectItemCommand from '../command/SelectItemCommand.js'
  export default {
      GetDataCommand,
      CreateListCommand,
      CreateTableCommand,
      AddItemCommand,
      DelItemCommand,
      ReduceItemCommand,
      ChangeItemCommand,
      SelectItemCommand
  }
  ```

* GetDataCommand（获取商品列表）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class GetDataCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() {

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          ShopModel.getInstance().shopList = data.shopData//将ajax获取的数据发送到Model
      }
  }
  ```

* CreateListCommand（创建商品列表）
  ```javascript
  import CreateList from '../view/CreateList.js'
  export default class CreateListCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() {//创建商品列表

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          for (let i = 0; i < data.length; i++) {
              let createList = new CreateList(document.body)
              createList.shopList = data[i]
          }
      }
  }
  ```

* CreateTableCommand（创建购物车表格）
  ```javascript
  import CreateTable from '../view/CreateTable.js'
  export default class ShopCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() {//刷新购物车表格

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          let createTable = new CreateTable(document.body)
          createTable.shoppingList = data
      }
  }
  ```

* AddItemCommand（增加商品）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class AddItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() { //新增商品

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          AddItemCommand.addItem(ShopModel.getInstance().shoppingList, data)
      }
      static addItem(list, data) { //遍历查询某项商品增加或减少
          let arr = list.filter(function (item) {
              return item.id === data.id;
          }); //若有返回值则对某项商品操作（在1-99区间，若为0则直接删除）
          if (arr.length == 0) {
              data.num++;
              data.sum = data.num * data.price;
              list.push(data);
          } else if (arr[0].num < 99) {
              arr[0].num++;
              arr[0].sum = arr[0].num * arr[0].price;
          }
          ShopModel.getInstance().shoppingList = list
      }
  }
  ```

* ReduceItemCommand（减少商品）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class ReduceItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() { //减少商品

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          ReduceItemCommand.reduceItem(ShopModel.getInstance().shoppingList, data)
      }
      static reduceItem(list, data) { //遍历查询某项商品增加或减少
          let arr = list.filter(function (item) {
              return item.id === data.id;
          }); //若有返回值则对某项商品操作（在1-99区间，若为0则直接删除）
          if (arr[0].num > 1) {
              arr[0].num--;
              arr[0].sum = arr[0].num * arr[0].price;
          } else {
              data.num = 0; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
              list = list.filter(function (item) {
                  return item.id !== data.id;
              });
          }
          ShopModel.getInstance().shoppingList = list
      }
  }
  ```

* ChangeItemCommand（修改商品数量）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class ChangeItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() { //修改商品数量

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          ChangeItemCommand.changeItem(ShopModel.getInstance().shoppingList, data)
      }
      static changeItem(list, data) {
          let arr = list.filter(function (item) {
              return item.id === data.id;
          });
          arr[0].sum = arr[0].num * arr[0].price;
          ShopModel.getInstance().shoppingList = list
      }
  }
  ```

* DelItemCommand（删除商品）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class DelItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() { //删除商品

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          DelItemCommand.delItem(ShopModel.getInstance().shoppingList, data)
      }
      static delItem(list, data) { //遍历查询某项商品增加或减少
          data.num = 0; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
          data.select = false; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
          ShopModel.getInstance().shoppingList = list.filter(function (item) { //数组过滤函数，返回id属性不等于当前id的数组，即删除当前选中的对象，并重新赋值
              return item.id !== data.id;
          });
      }
  }
  ```

* SelectItemCommand（选中商品）
  ```javascript
  import ShopModel from '../model/ShopModel.js'
  export default class SelectItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
      constructor() {

      }
      eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
          let {
              data
          } = e
          SelectItemCommand.selItem(ShopModel.getInstance().shoppingList, data)
      }
      static selItem(list, data) { //遍历查询某项商品增加或减少
          if (!data) { //全选框
              list.checkedAll = !list.checkedAll
              list.map(function (item) {
                  item.select = list.checkedAll; //其他选项框与全选框状态一致
              })
          } else { //单选框
              list.checkedAll = 1 //计数器，用来查询是否为全选状态
              list.map(function (item) { //单选，选中某一个（在表格初始化时执行checkAll判断是否全选）
                  if (item.id === data.id) {
                      item.select = !item.select
                  }
                  list.checkedAll *= item.select
              })
          }
          ShopModel.getInstance().shoppingList = list
      }
  }
  ```

### components

* Counter（计数器组件）
  ```javascript
  import ShopEvent from '../event/ShopEvent.js'
  import ShopController from '../controller/ShopController.js'
  import Utils from '../utils/Utils.js'
  export default class Counter { //计数器组件
      constructor(_data, _parentEle) {
          this.data = _data
          this.parentEle = _parentEle
          this.ele = this.createCounter()
      }
      createCounter() { //创建数量计数器
          let div = Utils.createEle('div', {}, {
              className: 'numBox'
          })
          this.parentEle.appendChild(div);
          let leftBtn = this.createMark(div, 'reduce') //减少商品按钮
          let input = Utils.createEle('input', {}, {
              type: 'text',
              value: this.data.num
          })
          div.appendChild(input);
          let rightBtn = this.createMark(div, 'add') //新增商品按钮
          leftBtn.addEventListener("click", this.reduceItemEvent);
          rightBtn.addEventListener("click", this.addItemEvent);
          input.addEventListener("input", Utils.throttle(this.changeItemEvent, 500)); // 节流
          return div;
      }
      createMark(parentEle, type) { //判断增加或减少键
          let markBtn = Utils.createEle('button', {}, {
              textContent: type == "add" ? '+' : '-'
          })
          parentEle.appendChild(markBtn);
          return markBtn
      }
      addItemEvent = e => { //新增商品时，抛发事件至command控制model修改数据，刷新表格
          ShopController.dispatch(ShopEvent.ADD_SHOPIING_ITEM, this.data)
      }
      reduceItemEvent = e => { //减少商品
          ShopController.dispatch(ShopEvent.REDUCE_SHOPIING_ITEM, this.data)
      }
      changeItemEvent = e => { //修改商品
          e.target.value = this.data.num = this.checkNumber(e.target.value)
          ShopController.dispatch(ShopEvent.CHANGE_SHOPIING_ITEM, this.data)
      }
      checkNumber(value) { //过滤数据
          value = value.replace(/[^0-9]/g, ""); //只允许输入数字
          if (value === "0") { // 如果=0，就设为1
              value = "1";
          }
          if (value.length > 2) { // 如果输入的内容大于2位，让这个值为99（最大99个）
              value = "99";
          }
          if (value.length === 0) { //  如果什么都没有输入，也设为1
              value = "1";
          }
          return value
      }
  }
  ```

### config

* Api
  ```javascript
  export default class Api {//接口配置类
      static URL = "http://127.0.0.1";
      static PORT = ":1024";
      static PATH = '/'
      static GET = "get";
      static POST = "post";
      static IMGPATH = Api.URL + Api.PORT + Api.PATH;
      static ServerApi = {
          getShopList: 'getShopList' //获取商品列表
      }
  }
  ```

### controller

* ShopController（控制层，做事件传导，数据传输）
  ```javascript
  export default class ShopController extends EventTarget { //控制层，处理用户交互，路由，输入，将model view controller剥离开，通过controller中的事件监听抛发进行路由传输数据
      constructor() { //继承事件对象，用于抛发自定义事件
          super();
      }
      static get instance() {  //单例写法与java中getinstance相似，new会生成一个新对象，分配内存，而这么写可以把一个已存在的引用给你使用，节省效能,若只使用get + 属性名而不用set产生只读属性，只允许调用，无法修改
          if (!ShopController._instance) {
              Object.defineProperty(ShopController, "_instance", {
                  value: new ShopController()
              })
          }
          return ShopController._instance;
      }
      static dispatch(type, data) { //抛发自定义事件，传递数据
          let event = new Event(type)
          event.data = data
          ShopController.instance.dispatchEvent(event)
      }
      static runCommand(type, Command) { //观察者模式，当自定义事件触发时调用其他类中的方法，与dispatch对应,类似于addEventlistener，只不过将回调函数换成类中的动态方法
          var command = new Command()
          ShopController.instance.addEventListener(type, command.eventHandler)
      }
  }
  ```

### event

* ShopEvent
  ```javascript
  export default class ShopEvent {
      constructor() {

      }
      // 所有自定义事件名称
      static GET_DATA = 'get_data'
      static GET_SHOP_LIST = 'get_shop_list'
      static GET_SHOPIING_LIST = 'get_shopping_list'
      static ADD_SHOPIING_ITEM = 'add_shopping_item'
      static DEL_SHOPIING_ITEM = 'del_shopping_item'
      static REDUCE_SHOPIING_ITEM = 'reduce_shopping_item'
      static CHANGE_SHOPIING_ITEM = 'change_shopping_item'
      static SELECT_SHOPIING_ITEM = 'select_shopping_item'
  }
  ```

* EventGroup（事件总线）
  ```javascript
  import ShopEvent from './ShopEvent.js'
  import ShopController from '../controller/ShopController.js'
  import MainCommand from '../command/MainCommand.js'
  let {
      GetDataCommand,
      CreateListCommand,
      CreateTableCommand,
      AddItemCommand,
      DelItemCommand,
      ReduceItemCommand,
      ChangeItemCommand,
      SelectItemCommand
  } = MainCommand
  export default class EventGroup { //事件总线，注册所有model层与其它层的业务逻辑,全程通过controller层中的事件机制进行通信
      constructor() {
          /*
          1.Ajax获取到数据后，触发GetDataCommand中的方法，用于传递数据至Model层中，然后通过Model层调用CreateListCommand创造商品列表
          2.当用户对商品做任何操作时，都会修改Model从而触发CreateTableCommand，以下操作会触发CreateTableCommand
          3.点击商品列表或点击商品加号按钮时触发AddItemCommand，通过AddItemCommand修改model中的数据，从而驱动CreateTableCommand
          4.点击商品减号按钮时触发ReduceItemCommand，修改model中的数据，从而驱动CreateTableCommand
          5.点击商品删除按钮时触发DelItemCommand，删除model中的数据，从而驱动CreateTableCommand
          6.修改商品数量时触发ChangeItemCommand，更新model中的数据，从而驱动CreateTableCommand
          7.选中商品时触发SelectItemCommand，更新model中的数据，从而驱动CreateTableCommand
           */
          ShopController.runCommand(ShopEvent.GET_DATA, GetDataCommand)//获取商品列表数据
          ShopController.runCommand(ShopEvent.GET_SHOP_LIST, CreateListCommand)//新建商品列表
          ShopController.runCommand(ShopEvent.GET_SHOPIING_LIST, CreateTableCommand)//刷新购物车表格
          ShopController.runCommand(ShopEvent.ADD_SHOPIING_ITEM, AddItemCommand)//商品新增或数量加一
          ShopController.runCommand(ShopEvent.DEL_SHOPIING_ITEM, DelItemCommand)//商品删除
          ShopController.runCommand(ShopEvent.REDUCE_SHOPIING_ITEM, ReduceItemCommand)//商品数量减一
          ShopController.runCommand(ShopEvent.CHANGE_SHOPIING_ITEM, ChangeItemCommand)//修改商品数量
          ShopController.runCommand(ShopEvent.SELECT_SHOPIING_ITEM, SelectItemCommand)//选择商品
      }
  }
  ```

### model

* ShopModel（模型层，用于数据存放及数据逻辑）
  ```javascript
  import ShopEvent from '../event/ShopEvent.js'
  import ShopController from '../controller/ShopController.js'
  export default class ShopModel { //模型层，用于数据存放及数据逻辑，通过事件处理机制（controller）传递数据，再由command进行对数据操作
      constructor() {
          this._shopList = null
          this._shoppingList = []
      }

      static getInstance() { //单例写法与java中getinstance相似，new会生成一个新对象，分配内存，而这么写可以把一个已存在的引用给你使用，节省效能,若只使用get + 属性名而不用set产生只读属性，只允许调用，无法修改
          if (!ShopModel._instance) {
              Object.defineProperty(ShopModel, "_instance", {
                  value: new ShopModel()
              })
          }
          return ShopModel._instance;
      }
      set shopList(value) {//设置商品列表
          this._shopList = value;
          ShopController.dispatch(ShopEvent.GET_SHOP_LIST, value)
      }
      get shopList() {
          return this._shopList
      }
      set shoppingList(value) {//数据修改时，驱动view进行表格刷新
          this._shoppingList = value;
          ShopController.dispatch(ShopEvent.GET_SHOPIING_LIST, value)
      }
      get shoppingList() {
          return this._shoppingList
      }
  }
  ```

### utils

* Utils（工具类）
  ```javascript
  export default class Utils { //工具类
  	//将对象拼接到url中
  	static urlJoin(url, obj) {
  		var list = []
  		for (var key in obj) {
  			if (obj.hasOwnProperty(key)) {
  				list.push(`${key}=${obj[key]}`)
  			}
  		}
  		return `${url}?${list.join('&')}`
  	}
  	static createEle(ele, style, attribute) { //新增标签，设置属性及样式
  		let element = document.createElement(ele)
  		if (style) {
  			for (let key in style) {
  				element.style[key] = style[key];
  			}
  		}
  		if (attribute) {
  			for (let key in attribute) {
  				element[key] = attribute[key];
  			}
  		}
  		return element
  	}
  	// 函数节流
  	static throttle(fn, time) {
  		let _timer = null
  		return function () {
  			if (_timer) {
  				clearTimeout(_timer)
  				_timer = null
  			}
  			_timer = setTimeout(fn.bind(this, ...arguments), time)
  		}
  	}
  }
  ```

### view

* ShopView（视图层，用于元素渲染，显示数据）
  ```javascript
  import Api from '../config/Api.js'
  import AJAX from '../bussiness/Ajax.js'
  import EventGroup from '../event/EventGroup.js'
  export default class ShopView { //视图层，用于元素渲染，显示数据，依据（model）模型数据创建
      constructor() {
          new EventGroup() //注册所有自定义事件，用于数据传输
          AJAX.AjaxTool(Api.GET, Api.ServerApi.getShopList, { //请求服务端购物车列表
              token: 'hello'//发送从后端获取的token用于验证，此处未做获取，直接用一个字符代替
          })
      }
  }
  ```

* CreateList（列表视图）
  ```javascript
  import Api from '../config/Api.js'
  import Utils from '../utils/Utils.js'
  import ShopEvent from '../event/ShopEvent.js'
  import ShopController from '../controller/ShopController.js'

  export default class CreateList { //视图层，用于元素渲染，显示数据，依据（model）模型数据创建
      constructor(parentEle) {
          this.parentEle = parentEle
          this._shopList = null
      }
      set shopList(value) { //使用对象代理，每当数据发生更改时渲染商品列表
          if (this._shopList) {
              this.createListEle(this._shopList, this.parentEle)
              return;
          }
          this._shopList = value
          this.createListEle(value, this.parentEle)
      }
      get shopList() {
          return this._shopList
      }
      createListEle(data, parentEle) {
          let li = Utils.createEle('li', {}, {
              'className': 'liItem'
          })
          let img = Utils.createEle('img', {}, {
              'src': Api.IMGPATH + data.icon
          })
          let title = Utils.createEle('div', {}, {
              'textContent': data.name
          })
          let price = Utils.createEle('span', {}, {
              'textContent': data.price + "元"
          })
          li.appendChild(img);
          li.appendChild(title);
          li.appendChild(price);
          li.addEventListener('click', this.addItemEvent)
          parentEle.appendChild(li);
      }
      addItemEvent = e => { //当用户点击添加商品时，将数据通过controller层发送至事件总线，再驱动model层并修改数据,后续由Model提供数据刷新表格
          ShopController.dispatch(ShopEvent.ADD_SHOPIING_ITEM, this.shopList)
      }
  }
  ```

## 总结

总的来说，MVC架构思想是许多语言在大型项目上常常运用的设计理念，其提升代码复用，降低耦合性，使其在大型项目上焕发光彩，其实不难发现，生活中的事物和MVC有着相似的共同点，代码源于生活，代码也能创造生活