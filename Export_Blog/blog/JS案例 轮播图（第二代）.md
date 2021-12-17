---
title:  JS案例：轮播图（第二代） 
date:  2018-12-04 20:08:4309-1801-3104-2108-2405-1304-1006-1301-2305-0912-2308-2511-1708-0808-0108-12 
---
较上个版本功能全面，函数模块化，降低联系，bug减少，附上代码：

## Html：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="./css/main.css">
    </head>

    <body>
        <div id="box">
            <div id="pic_box"></div>
            <img id="left" src="img/left.png" alt="">
            <img id="right" src="img/right.png" alt="">
            <ul id="dot_box"></ul>
        </div>

        <script src="./js/main.js">

        </script>
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
    background: lightblue;
    position: absolute;
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
    float: left;
    margin-left: 5px;
}
```

## JS：

```javascript
var box, pic_box, left, right, dot_box, liList; //定义最外面的大盒子，装图片的盒子，左右按键，盒子下面的小点容器，及当前小点容器.
var count = 0; //记录当前显示的图片索引
var num = 160; //定时器帧数控制
var direct; //左右方向（方向为左向右移动，反之向左移动）方向是按钮的方向
var bool = false; //控制是否允许轮播
var autoPlay = false; //是否自动轮播
var picurl = ["img/a.jpeg", "img/b.jpeg", "img/c.jpeg", "img/d.jpeg", "img/e.jpeg"]; //图片路径
var piclist = []; //加载的图片（两张）
init(); //入口函数

function init() { //获取所有元素并赋值给变量，添加事件
    box = document.getElementById("box");
    pic_box = document.getElementById("pic_box");
    left = document.getElementById("left");
    right = document.getElementById("right");
    dot_box = document.getElementById("dot_box");
    left.addEventListener("click", picChange); //点击左键
    right.addEventListener("click", picChange); //点击右键
    box.addEventListener("mouseenter", isAuto); //鼠标进入大盒子取消自动轮播
    box.addEventListener("mouseleave", isAuto); //鼠标离开大盒子自动轮播
    creatImg(); //初始化并加载所有图片
    animation(); //开启每帧移动函数
    creatDot(); //新建小点（点击切换图片）
}

function creatImg() {
    for (var j = 0; j < picurl.length; j++) { //根据图片源新建图片
        piclist[j] = new Image();
        piclist[j].src = picurl[j];
        piclist[j].style.width = "960px";
        piclist[j].style.height = "320px";
    }
    pic_box.appendChild(piclist[0]); //初始化装图片的盒子，插入第一张图片

}

function picChange(e) {
    if (bool) return; //若轮播开关为真时，不执行函数，即点击一次后需要等整张图片轮播完才能点击下一次
    if (this === left) { //当单击向左按钮
        direct = "left"; //将方向改成左
        count--; //图片索引减一
        if (count === -1) { //当减到-1时，让索引为图片总数减一（数组从零开始）
            count = picurl.length - 1;
        }
    } else if (this === right) { //当单击向右按钮
        direct = "right"; //将方向改成右
        count++; //图片索引加一
        if (count === picurl.length) { //当加到图片总数减一时，让索引为0（数组从零开始）
            count = 0;
        }
    }
    nextPic(); //创造下一张
}

function nextPic() { //加载下一张图片

    pic_box.style.width = 960 * 2 + "px"; //初始化位置
    if (direct === "right") { //当方向为右时，在图片后面插入下一张图片
        pic_box.appendChild(piclist[count]);
        pic_box.style.left = 0;
    } else if (direct === "left") { //当方向为左时，在图片前面插入下一张图片
        pic_box.insertBefore(piclist[count], pic_box.firstElementChild);
        pic_box.style.left = -960 + "px";
    }
    bool = true; //图片加载完成后，让控制图片轮播的开关为真，防止图片轮播时执行其他事件
    liChange(); //让小点改变
}

function animation() { //动画函数，自动轮播和轮播
    requestAnimationFrame(animation);
    picMove();
    autoScroll();
}

function creatDot() { //新建小点，控制点击切换图片
    for (var i = 0; i < picurl.length; i++) {
        var li = document.createElement("li");
        dot_box.appendChild(li);
        li.style.background = "rgba(255,255,255,0.7)";
    }
    dot_box.firstElementChild.style.background = "rgba(255,255,255,1)"; //默认选中第一个小点
    dot_box.addEventListener("click", changeDot); //点击小点触发事件，切换图片
    liChange();
}

function changeDot(e) {
    if (bool) return; //若轮播开关为真时，不执行函数，即点击一次后需要等整张图片轮播完才能点击下一次
    var list = Array.from(dot_box.children); //将小点放至数组
    var index = list.indexOf(e.target); //查找当前的小点
    if (index === count) { //若当前点击的图片与索引相等，表示不切换（就是本身）
        return;
    }
    if (index > count) { //当点击的小点在当前右边，将方向换成右
        direct = "right";
    } else if (index < count) { //当点击的小点在当前左边，将方向换成左
        direct = "left";
    }
    count = index; //将当前索引切换成点击的那个
    nextPic(); //新建下一张图片
}

function liChange() {
    if (liList) { //前一个小点背景透明
        liList.style.backgroundColor = "rgba(255,255,255,0.7)";
    }
    liList = dot_box.children[count]; //将被切换的小点赋值给当前小点，使其根据计数器切换
    liList.style.background = "rgba(255,255,255,1)";
}

function picMove() {
    if (!bool) return; //若轮播开关为假时，不执行函数，即点击一次按钮或小点后才能开始轮播
    if (direct === "left") { //向右移动
        pic_box.style.left = pic_box.offsetLeft + 20 + "px"; //移动速度，每次20px，当移动到0时关闭轮播开关，并将最后一张图删除
        if (pic_box.offsetLeft === 0) {
            bool = false;
            pic_box.lastElementChild.remove();
        }
    } else if (direct === "right") { //向左移动
        pic_box.style.left = pic_box.offsetLeft - 20 + "px"; //移动速度，每次-20px，当移动到-960时关闭轮播开关，并将第一张图删除，重置位置为0
        if (pic_box.offsetLeft === -960) {
            bool = false;
            pic_box.firstElementChild.remove();
            pic_box.style.left = 0;
        }
    }
}

function autoScroll() { //自动轮播
    if (!autoPlay) return; //若自动轮播开关为非（鼠标移入时），不自动轮播
    num--; //定时器帧数计数器减一，减到0时赋值为160
    if (num === 0) {
        num = 160;
        direct = "right";
        count++;
        if (count === picurl.length) {
            count = 0;
        }
        nextPic();
    }

}

function isAuto(e) { //鼠标移入时，不自动轮播，反之，自动轮播
    if (e.type === "mouseenter") {
        autoPlay = false;
    } else if (e.type = "mouseleave") {
        autoPlay = true;
    }
}
```