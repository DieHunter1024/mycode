---
title:  JS案例：拖拽音量调节效果 
date:  2020-02-22 16:05:4901-1306-0907-0907-2702-0211-0703-1203-2303-2102-1111-1111-0611-1703-0504-2811-2311-03 
---
用原生js做了一个拖拽调节音量

效果是这样的：（拖动时音量随两个圆形交集面积增大而增大）

![](https://img-blog.csdnimg.cn/20200222153956378.gif)

**源码：**[https://gitee.com/DieHunter/myCode/tree/master/music](https://gitee.com/DieHunter/myCode/tree/master/music)

html部分：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <audio id="audio" autoplay>
        <source src="./1.mp3" type="audio/mpeg">
    </audio>
    <div class="vol left" id="leftBox"></div>
    <div class="vol right" id="rightBox"></div>
    <script src="index.js"></script>
</body>

</html>
```

css部分：

```css
* {
    margin: 0;
    padding: 0;
}

body {
    background: rgb(28, 160, 210);
}

.vol {
    width: 200px;
    height: 200px;
    position: absolute;
    border-radius: 100px;
}

.left {
    left: 500px;
    top: 100px;
    background: rgb(250, 242, 107);
}

.right {
    left: 800px;
    top: 100px;
    background: rgba(250, 242, 107, 100);
    z-index: 1;
}
```

js部分：

```javascript
var audio;
init()//入口函数

function init() {
    audio = document.getElementById("audio");//初始化播放器控件
    audio.volume = 0;//将控件音量初始值设置0
    mouseMove(rightBox, document)
}

function mouseMove(ele, parent) {
    ele.addEventListener('mousedown', moveHandler);//鼠标右击时触发moveHandler方法
    ele.style.position = 'absolute';
    ele.parent = parent;//传递父元素（可省略）
}

function moveHandler(e) {//moveHandler是个回调函数，鼠标按下，移动，松开都会触发，根据event的type判断事件类型
    if (e.preventDefault) {//取消系统默认事件
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
    if (e.type === 'mousedown') {
        audio.play()//按下时开始播放音乐
        // 下面将被点击的元素及元素在X方向的偏移通过父元素传递（放入内存中）
        this.parent.ele = this;
        this.parent.point = {
            x: e.offsetX
        }
        // 为元素添加鼠标移动和松开事件
        this.parent.addEventListener('mousemove', moveHandler);
        this.addEventListener('mouseup', moveHandler);
    } else if (e.type === 'mousemove') {
        if (rightBox.offsetLeft - leftBox.offsetLeft >= 200 || rightBox.offsetLeft - leftBox.offsetLeft <= -200) {//当被移动元素与另一个元素无交集时，改变样式，使音量为0
            audio.volume = 0;
            document.body.style.background = 'rgb(28,160,210)'
            rightBox.style.background = 'rgba(250, 242, 107, 100)';
        } else {//当被移动元素与另一个元素有交集时，改变样式为渐变，使音量为相交面积的百分比（这里是两圆心之间的距离）
            var count = 1 - Math.abs(rightBox.offsetLeft - leftBox.offsetLeft) / 200;
            audio.volume = count
            document.body.style.background = `rgb(${28+50*count},${160-136*count},${210-133*count})`
            rightBox.style.background = `rgb(${28+50*count},${160-136*count},${210-133*count})`;
        }
        this.ele.style.left = e.x - this.point.x + "px";
    } else if (e.type === 'mouseup') {
        // 鼠标松开时释放内存及事件监听
        this.parent.removeEventListener("mousemove", moveHandler);
        this.parent.ele = null;
        this.parent.point = null;
    }
}
```