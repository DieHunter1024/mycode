---
title:  JS案例：轮播图（第一代） 
date:  2018-12-04 14:53:22 
---
## 初级版轮播图，实现左右按钮切换图片，下方小点切换图片，简单的自动轮播

代码：（缺点，固定图片张数和宽度高度，每次用时都需要复制，代码累赘，多处功能不完善）

## Html：

```html
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <link rel="stylesheet" href="./css/main.css">
    </head>

    <body>
        <div id="box">
            <div id="pic_box"></div>
            <img id="left" src="img/left.png" alt="">
            <img id="right" src="img/right.png" alt="">
            <ul id="dot_box"></ul>
        </div>
        <script src="./js/main.js"></script>
    </body>

</html>
```

## Css：

```css
* {
    margin: 0;
    padding: 0;
}

#box {
    margin: 50px auto;
    width: 960px;
    height: 320px;
    background: lightcoral;
    position: relative;
    overflow: hidden;
}

#pic_box {
    height: 320px;
    width: 4800px;
    background: lightblue;
    position: absolute;
    transition: all 1s;
}

#left {
    position: absolute;
    top: 130px;
    left: 10px;
}

#right {
    position: absolute;
    top: 130px;
    right: 10px;
}

ul {
    list-style: none;
    position: absolute;
    bottom: 20px;
    left: 400px;
}

li {
    width: 20px;
    height: 20px;
    list-style: none;
    border-radius: 50%;
    border: 3px solid lightcoral;
    float: left;
    margin-left: 5px;
}
```

## JS：

```javascript
var pic_box, box, left, right, dot_box, dot, count = 0; //定义装图片的盒子，最外面的大盒子，左右按键，盒子下面的小点容器，及当前小点容器，计数值，记录当前显示的图片张数
var arr_img = ["a.jpeg", "b.jpeg", "c.jpeg", "d.jpeg", "e.jpeg"];
//图片路径
init();

function init() { //入口函数，获取所有元素并赋值给变量
    dot_box = document.getElementById("dot_box");
    pic_box = document.getElementById("pic_box");
    box = document.getElementById("box");
    left = document.getElementById("left");
    right = document.getElementById("right");
    pic_box.style.left = 0; //放图片的盒子左边相对父元素（最大的盒子）定位初始化
    for (var i = 0; i < arr_img.length; i++) { //新建图片及宽高
        var img = new Image();
        img.src = "img/" + arr_img[i];
        img.style.width = "960px";
        img.style.height = "320px";
        pic_box.appendChild(img);
        var li = document.createElement("li"); //新建盒子下面的小点（点击切换）
        dot_box.appendChild(li);
    }
    dot = dot_box.firstElementChild; //默认第一个小点的样式
    dot.style.backgroundColor = "lightcoral";
    //给盒子下面的小点和左右按钮增加监听事件
    left.addEventListener("click", change_pic);
    right.addEventListener("click", change_pic);
    dot_box.addEventListener("click", changedot);
}

function change_pic(e) {
    //左按钮
    if (this === left) {
        count--; //计数器减减，直到小于零时跳到最后一张
        if (count < 0) {
            count = arr_img.length - 1;
        }
        //右按钮
    } else if (this === right) {
        count++; //计数器加加，直到大于总图片数减一时跳到第一张
        if (count > arr_img.length - 1) {
            count = 0;
        }
    }
    pic_box.style.left = -count * 960 + "px"; //单击后切换定位位置，达到水平移动
    count_pic(); //每次移动后改变小点位置
}

function changedot(e) { //点击小点让计数器的值等于点击的那个小点的索引，移动图片，切换小点
    for (var j = 0; j < arr_img.length; j++) {
        if (dot_box.children[j] === e.target) {
            count = j;
        }
    }
    pic_box.style.left = -count * 960 + "px";
    count_pic();
}

function count_pic() {
    dot.style.backgroundColor = "transparent"; //前一个小点背景透明
    dot = dot_box.children[count]; //将被切换的小点赋值给当前小点，使其根据计数器切换
    dot.style.backgroundColor = "lightcoral";
}

function autochange() { //自动轮播，3秒切换一次
    count++;
    if (count > arr_img.length - 1) {
        count = 0;
    }
    pic_box.style.left = -count * 960 + "px";
    count_pic();
}
setInterval(autochange, 3000);
```