---
title:  JS案例：购物车操作（简单实现） 
date:  2018-12-02 20:13:3808-0904-2905-2506-1011-1410-1808-1112-2502-28 
---
## Html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>shop</title>
    <link rel="stylesheet" href="css/shop.css">
  </head>

  <body>
    <script src="js/shop.js"></script>
    <script>
      // 新建数据
      var obj = [
        {
          select: false,
          img:"img/1.jpg",//图片路径
          name: "OPPO R11 全网通4G 双卡双待手机玫瑰金色",
          price: 2799,
          num: 1,
          sum: 0,
          del: false
        },
        {
          select: false,
          img:"img/2.jpg",//图片路径
          name: "Apple iPhone8 64G 金色 移动联通电信4G手机",
          price: 5888,
          num: 1,
          sum: 0,
          del: false
        }
      ];
      // 实例化对象，传入数据
      var table = new Table(obj);
    </script>
  </body>
</html>
```

## Css：

```css
*{
    margin: 0;
    padding: 0;
}
table{
    width: 1200px;
    /* background: lightcoral; */
    margin: 50px auto;
}
tr:nth-child(1){
    background: #F3F3F3;
    height: 26px;
}
img{
    height: 30%;
    vertical-align: middle;
}
img+span{
    font-size: 10px;
}
td{
    text-align: center;
    vertical-align: middle;
}
tr td:nth-child(2){
    text-align: left;
}
tr td:nth-child(4) div button{
    height: 20px;
    width: 20px;
    border: none;
    text-align: center;
    vertical-align: middle;
}
tr td:nth-child(4) div input{
    height: 20px;
    width: 27px;
    vertical-align: middle;
}
tr td:nth-child(3),tr td:nth-child(5){
    width: 100px;
}
table>div{
    width: 300px;
    text-align: right;
}
```

## JS：

```javascript
function Table(obj) {
  this.obj = obj; //引入数组对象
  this.init(obj); //入口函数
}
Table.prototype = {
  table: null, //初始化表格
  allSum: 0, //商品总和
  allNum: 0, //商品数量总和
  allselect: false, //全选
  init: function (obj) {
    this.createTab(obj); //创建表格
  },
  createTab: function (obj) {
    if (this.table) { //初始化表格，若表格存在，则删除表格再新建
      this.table.remove();
      this.table = null;
    }
    this.table = document.createElement("table"); //创建表格
    var thr = document.createElement("tr"); //创建表格标题
    var selectAll = document.createElement("th");
    var selectAllInput = document.createElement("input"); //全选
    selectAllInput.self = this;
    selectAllInput.addEventListener("change", this.selectHandler); //添加事件，当全选建改变时触发
    selectAllInput.type = "checkbox";
    selectAllInput.checked = this.allselect; //给其选中添加值，让数据驱动更改选中状态
    selectAll.textContent = "全选";
    selectAll.appendChild(selectAllInput);
    thr.appendChild(selectAll); //createName方法添加表头内容
    this.createName("商品", thr);
    this.createName("单价", thr);
    this.createName("数量", thr);
    this.createName("小计", thr);
    this.createName("操作", thr);
    this.table.appendChild(thr);
    for (var i = 0; i < obj.length; i++) { //根据数组对象创建表格
      var tr = document.createElement("tr");
      for (var str in obj[i]) { //跳过name那项（因为里面有两个属性，后面会讲到）
        if (str === "name") continue;
        var td = document.createElement("td");
        if (str === "select") { //当属性名为select时创建多选按钮，添加更改时触发的事件
          var select = document.createElement("input");
          select.type = "checkbox";
          select.self = this;
          select.index = i; //传递当前点击索引
          select.addEventListener("change", this.selectHandler);
          select.checked = obj[i].select; //给其选中添加值，让数据驱动更改选中状态
          td.appendChild(select);
        } else if (str === "img") { //当属性名为img时创建图片以及商品名
          var img = new Image();
          img.src = obj[i][str];
          var name = document.createElement("span");
          name.textContent = obj[i].name;
          td.appendChild(img);
          td.appendChild(name);
        } else if (str === "price") { //当属性名为price时创建价格，同样数据驱动
          td.price = obj[i][str];
          td.textContent = td.price;
        } else if (str === "num") { //数据驱动商品的个数
          var num = document.createElement("div");
          num.index = i;
          num.data = obj; //将数据赋给num（后面会用到）
          num.self = this;
          //创建-和+按钮，以及文本框，改变商品个数
          var left = document.createElement("button");
          var text = document.createElement("input");
          var right = document.createElement("button");
          left.textContent = "-";
          right.textContent = "+";
          text.value = obj[i].num;
          //添加事件，当点击+或-时触发事件，当文本框中失焦触发另一个事件
          left.addEventListener("click", this.changeNum);
          text.addEventListener("blur", this.changeNum);
          right.addEventListener("click", this.changeNum);
          num.appendChild(left);
          num.appendChild(text);
          num.appendChild(right);
          td.appendChild(num);
        } else if (str === "sum") { //新建单商品的总价（个数乘以单价）
          var sum = document.createElement("div");
          sum.data = obj[i]; //将该商品的数据传递
          sum.textContent = obj[i].num * obj[i].price;
          td.appendChild(sum);
        } else if (str === "del") { //新建删除按钮
          var del = document.createElement("button");
          del.textContent = "Del";
          del.data = obj; //将该商品的数据传递
          del.index = i; //该项的索引通过事件传递
          del.self = this;
          del.addEventListener("click", this.delHandler); //删除事件
          td.appendChild(del);
        }
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
    }
    this.addAll(obj, this.table); //根据更新的表格数据新建商品总价及总个数
    document.body.appendChild(this.table);
    return this.table;
  },
  addAll: function (obj, parent) { //商品总价及总个数
    var addAllItem = document.createElement("div");
    var addAllPrice = document.createElement("div");
    var sum = 0; //初始化总价及数量
    var price = 0;
    for (var i = 0; i < obj.length; i++) {
      sum += obj[i].num;
      price += obj[i].price * obj[i].num; //求总价和总和
    }
    addAllItem.textContent = "总数:" + sum;
    addAllPrice.textContent = "总价:" + price;
    parent.appendChild(addAllItem);
    parent.appendChild(addAllPrice);
  },
  createName: function (text, parent) { //createName方法添加表头内容
    var item = document.createElement("th");
    item.textContent = text;
    parent.appendChild(item);
    return item;
  },
  changeNum: function (e) {
    if (this.textContent === "+") { //当点击+按钮使数组对象中的商品数加一，当商品数量大于99就不再增加
      this.parentNode.data[this.parentNode.index].num++;
      if (this.parentNode.data[this.parentNode.index].num > 99) {
        this.parentNode.data[this.parentNode.index].num = 99;
      }
    } else if (this.textContent === "-") { //当点击-按钮使数组对象中的商品数减一，当商品数量小于0就不再减少
      this.parentNode.data[this.parentNode.index].num--;
      if (this.parentNode.data[this.parentNode.index].num < 1) {
        this.parentNode.data[this.parentNode.index].num = 1;
      }
    } else { //当在文本框输入个数时对数组对象中的商品数进行操作
      if (isNaN(this.value)) { //当输入的不为数值时，使其变成1
        this.parentNode.data[this.parentNode.index].num = 1;
      } else if (Number(this.value) > 99) { //当输入的大于99时，使其变成99
        this.parentNode.data[this.parentNode.index].num = 99;
      } else if (Number(this.value) < 1) { //当输入的小于1时，使其变成1
        this.parentNode.data[this.parentNode.index].num = 1;
      } else { //否则直接让对象中的数值等于输入的值
        this.parentNode.data[this.parentNode.index].num = Number(this.value);
      }
    }
    this.parentNode.self.init(this.parentNode.data); //根据更改后的数据驱动创建表格
  },
  delHandler: function (e) {
    this.data.splice(this.index, 1); //删除当前选择的那项,根据更改后的数据驱动创建表格
    this.self.init(this.data);
  },
  selectHandler: function (e) { //全选时使所有的单选框都根据数据更改
    if (this.parentNode.textContent === "全选") {
      this.self.allselect = !this.self.allselect;
      for (var i = 0; i < this.self.obj.length; i++) {
        this.self.obj[i].select = this.self.allselect;
      }
    } else {
      var sum = 1; //当所有的单选框选中的值为true时，将全选选中(true是1，false是0)
      this.self.obj[this.index].select = !this.self.obj[this.index].select;
      for (var i = 0; i < this.self.obj.length; i++) {
        sum *= this.self.obj[i].select;
      }
      if (sum) {
        this.self.allselect = true;
      } else {
        this.self.allselect = false;
      }
    }
    this.self.init(this.self.obj); //根据更改后的数据驱动创建表格
    console.log(this.checked);
  }
};
Table.prototype.constructor = Table;
```