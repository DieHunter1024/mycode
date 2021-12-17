---
title:  JS案例：轮播图（面向对象），最终版（注释全面） 
date:  2018-12-08 21:45:5006-2902-2103-0908-2006-2907-0309-1804-1301-1001-1803-2107-2304-2103-2106-0706-2810-20 
---
## Html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Carousel</title>
    <script src="js/Carousel.js"></script>
    <style></style>
  </head>

  <body>
    <script>
      var arr = ["img/left.png", "img/right.png"]; //左右按钮
      var arr1 = [
        "img/a.png",
        "img/b.png",
        "img/c.png",
        "img/d.png",
        "img/e.png"
      ]; //新建源
      var arr2 = [
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg"
      ]; //新建源
      var arr3 = ["img/aaa.jpg", "img/bbb.jpg", "img/ccc.jpg"]; //新建源
      var carousel = new Carousel(document.body, arr1, arr); //实例化轮播图
      var carousel2 = new Carousel(document.body, arr2, arr); //实例化轮播图
      var carousel3 = new Carousel(document.body, arr3, arr); //实例化轮播图
      carousel.autoPlay = true; //自动播放
      carousel2.autoPlay = true; //自动播放
      carousel3.autoPlay = true; //自动播放
      // carousel.heightValue = 600;//高宽可控
      // carousel3.widthValue =1600;//高宽可控
      animate();

      function animate() {
        //用一个动画函数控制轮播
        requestAnimationFrame(animate);
        carousel.animate();
        carousel2.animate();
        carousel3.animate();
      }
    </script>
  </body>
</html>
```

## Js：

```javascript
var Carousel = (function () {
    var liStyle = { //初始化下面的小点样式
        width: "20px",
        height: "20px",
        borderRadius: "20px",
        backgroundColor: "rgba(240,137,137,0.3)",
        border: "1px solid #F08989",
        float: "left",
        lineHeight: "20px",
        textAlign: "center",
        marginLeft: "20px",
        color: "white"
    };
    var ulStyle = { //小点盒子
        margin: 0,
        padding: 0,
        listStyle: "none",
        position: "absolute",
        bottom: "20px"
    };
    var imgConStyle = { //图片盒子
        position: "absolute",
        left: "0px"
    };
    var maskDivStyle = { //最大的盒子
        overflow: "hidden",
        position: "relative",
        margin: "auto",
        backgroundColor: "antiquewhite"
    };
    //功能：实现高宽可改，图片预加载，可换图片源
    function Carousel(parent, list, btnList) {
        this.init(parent, btnList); //入口函数
        this.sourse = list; //引入图片源
    }
    Carousel.prototype = {
        loadImg: null, //正在加载的图片
        imgList: [], //加载的图片
        carouselBox: null, //装图片的盒子（最大的盒子）
        _width: 0, //可修改的宽
        _height: 0, //可修改的高
        _sourse: [], //加载图片的源（路径）
        bool: false, //是否允许轮播
        index: 0, //当前加载图片的索引
        direct: "", //轮播方向
        speed: 30, //轮播的速度
        autoPlay: false, //是否自动轮播
        dotLi: null, //小点，根据源的图片数切换
        autoTime: 200, //自动轮播时间间隔，以每帧乘以200计算
        set sourse(value) { //设置切换的源时初始化其他属性
            if (!value || !Array.isArray(value) || !value.length) return; //当源不是数组或者为空时，截断并跳出
            this.widthValue = 0;
            this.heightValue = 0; //初始化宽高
            if (this.loadImg) { //初始化加载的图片，设为空
                this.loadImg.removeEventListener("load", this.loadImgHandler);
            }
            this.imgList.length = 0; //清空图片列表
            this._sourse = value; //传入源
            this.reLoadImg(value); //执行加载图片
        },
        get sourse() {
            return this._sourse;
        },
        set widthValue(value) {
            this._width = value; //根据传入的宽度改变轮播图宽度
            if (this._width === 0) return;
            this.carouselBox.style.width = value + "px"; //每次更新，轮播图宽度改变
            var ul = this.carouselBox.lastElementChild; //初始化，装小点的盒子
            ul.style.left = (value - ul.offsetWidth) / 2 + "px"; // 当宽度改变时，小点自适应（定位在盒子宽度中间）
        },
        get widthValue() {
            return this._width;
        },
        set heightValue(value) { //根据传入的高度改变轮播图高度
            this._height = value;
            if (this._height === 0) return;
            this.carouselBox.style.height = value + "px";
            this.carouselBox.firstElementChild.style.height = value + "px"; //每次更新，轮播图高度改变
            this.carouselBox.children[1].style.top = this.carouselBox.children[2].style.top = (this.heightValue - this.carouselBox.children[1].offsetHeight) / 2 + "px"; // 当宽度改变时，左右按钮自适应（定位在盒子高度中间）
        },
        get heightValue() {
            return this._height;
        },
        reLoadImg: function (list) {
            var img = new Image(); //生成初始图片
            img.addEventListener("load", this.loadImgHandler); //图片加载完成后，执行下一张图片加载
            img.self = this;
            img.num = 0; //当前图片索引
            img.list = list;
            img.imgList = []; //图片列表初始
            img.src = list[img.num]; //通过事件传数据
        },
        loadImgHandler: function (e) {
            this.imgList.push(this.cloneNode(false)); //图片列表放入被加载的图片
            this.num++; //下一张图片索引
            if (this.num > this.list.length - 1) { //当全部加载完成后，继续执行其他函数
                this.self.imgLoadFinish(this.imgList);
                return;
            }
            this.src = this.list[this.num]; //否则继续加载
        },
        init: function (parent, btnList) { //入口函数
            if (!this.carouselBox) { //保证对象单例
                this.carouselBox = document.createElement("div"); //装图片的盒子（最大的盒子）
                var imgBox = document.createElement("div"); //加载图片的盒子，装在最大的盒子里，控制图片切换和移动
                this.carouselBox.appendChild(imgBox);
                for (var i = 0; i < btnList.length; i++) { //加载按钮
                    var btimg = new Image();
                    btimg.src = btnList[i];
                    this.carouselBox.appendChild(btimg);
                    if (i === 0) { //设置位置
                        btimg.style.left = "10px";
                        btimg.style.position = "absolute";
                    } else {
                        btimg.style.right = "10px";
                        btimg.style.position = "absolute";
                    }
                    btimg.self = this;
                    this.carouselBox.self = this;
                    this.carouselBox.addEventListener("mouseenter", this.isAuto); //控制开启关闭自动轮播
                    this.carouselBox.addEventListener("mouseleave", this.isAuto);
                    btimg.addEventListener("click", this.changeImgHandler); //加载点击事件
                }
                var ul = document.createElement("ul"); //小点盒子
                Object.assign(ul.style, ulStyle); //设置样式
                Object.assign(this.carouselBox.style, maskDivStyle); //设置样式
                Object.assign(imgBox.style, imgConStyle); //设置样式
                this.carouselBox.appendChild(ul);
                parent.appendChild(this.carouselBox);
            }
            return this.carouselBox;
        },
        imgLoadFinish: function (imgList) { //图片加载完成后执行，传入图片列表
            this.imgList = imgList;
            var imgCon = this.carouselBox.firstElementChild; //初始化小点盒子和图片盒子（不是最大的盒子）
            var ul = this.carouselBox.lastElementChild;
            this.clearNode(imgCon); //清除子元素方法（初始化）
            this.clearNode(ul);
            for (var i = 0; i < this.imgList.length; i++) { //创建小点
                var li = document.createElement("li");
                ul.appendChild(li);
                Object.assign(li.style, liStyle); //小点样式
            }
            ul.style.left = (this.widthValue - ul.offsetWidth) / 2 + "px"; //小点盒子的默认位置
            imgCon.appendChild(this.imgList[0]);
            ul.self = this;
            ul.addEventListener("click", this.changeDot); //小点点击事件
            if (this.widthValue === 0) {
                this.widthValue = this.imgList[0].width; //当传入的宽为0时，将宽设置为默认宽
            } else {
                this.carouselBox.style.width = this.widthValue + "px"; //否则设置为改变的宽
                this.setSize(imgCon, this.widthValue, 0); //调用下面的设置宽高方法，将图片宽高重设
            }
            if (this.heightValue === 0) { //同上
                this.heightValue = this.imgList[0].height;
            } else {
                this.carouselBox.style.height = this.heightValue + "px";
                imgCon.firstElementChild.style.height = this.heightValue + "px";
                this.setSize(imgCon, 0, this.heightValue);
            }
            this.dotColor(); //执行小点样式切换
            this.carouselBox.children[1].style.top = this.carouselBox.children[2].style.top = (this.heightValue - this.carouselBox.children[1].offsetHeight) / 2 + "px"; //按钮位置重设，自适应
        },
        setSize: function (con, w, h) { //设置子元素宽高函数
            for (var i = 0; i < con.children.length; i++) {
                if (w) {
                    con.children[i].style.width = w + "px";
                }
                if (h) {
                    con.children[i].style.height = h + "px";
                }
            }
        },
        clearNode: function (node) { //清除子元素函数
            var len = node.children.length;
            for (var i = 0; i < len; i++) {
                node.firstElementChild.remove();
            }
        },
        changeImgHandler: function (e) {
            if (this.self.bool) return; //当点击一次后，执行完一次轮播才能再次点击
            if (this.style.left === "10px") { //根据位置判断左右按钮
                this.self.direct = "right"; //改变轮播方向
                this.self.index--; //索引值减一，即加载上一张图片
                if (this.self.index < 0) { //当减到0时，加载最后一张
                    this.self.index = this.self.imgList.length - 1;
                }
            } else if (this.style.right === "10px") { //同上（相反）
                this.self.direct = "left";
                this.self.index++;
                if (this.self.index > this.self.imgList.length - 1) {
                    this.self.index = 0;
                }
            }
            this.self.creatNextPic(); //跳到加载下一张图片函数
        },
        creatNextPic: function () {
            if (this.direct !== "left" && this.direct !== "right") return; //当未点击左或者右时跳出
            var imgCount = this.carouselBox.firstElementChild; //获取装图片的盒子（控制图片轮播的盒子，不是最大的盒子）
            if (this.direct === "left") { //当方向为左，即单击了左按钮
                imgCount.appendChild(this.imgList[this.index]); //装图片的盒子根据当前索引加入图片（插在后面）
                imgCount.style.width = this.widthValue * 2 + "px"; //装图片的盒子宽度设置为图片宽度的两倍（放下两张图片）
                imgCount.style.left = 0; //初始盒子位置
            } else {
                imgCount.insertBefore(this.imgList[this.index], imgCount.firstElementChild); //装图片的盒子根据当前索引加入图片（插在前面）
                imgCount.style.width = this.widthValue * 2 + "px"; //装图片的盒子宽度设置为图片宽度的两倍（放下两张图片）
                imgCount.style.left = -this.widthValue + "px"; //初始盒子位置
            }
            if (!this.widthValue) { //重设宽高
                this.imgList[this.index].style.width = this.widthValue + "px";
            }
            if (!this.heightValue) {
                this.imgList[this.index].style.height = this.heightValue + "px";
            }
            this.dotColor(); //切换小点颜色
            this.bool = true; //允许下一次点击
        },
        movePic: function () { //轮播动画
            if (!this.bool) return; //若没加载好下一张，跳出
            if (this.direct !== "left" && this.direct !== "right") {
                this.bool = false;
                return;
            } //若没单击，跳出
            var imgCount = this.carouselBox.firstElementChild; //初始图片盒子
            if (this.direct === "left") { //轮播方向为左时，以设定的速度向左移动
                imgCount.style.left = imgCount.offsetLeft - this.speed + "px";
                if (imgCount.offsetLeft <= -this.widthValue) { //当后面的图片移动到0时停止
                    imgCount.firstElementChild.remove(); //删除左边的图片
                    imgCount.style.left = 0 + "px"; //初始化盒子的位置
                    this.direct = ""; //制空方向，将轮播开关关闭，需要下次点击才打开
                    this.bool = false;
                }
            } else { //轮播方向为右时，以设定的速度向右移动
                imgCount.style.left = imgCount.offsetLeft + this.speed + "px";
                if (imgCount.offsetLeft >= 0) { //当前面的图片移动到0时停止
                    imgCount.lastElementChild.remove(); //删除右边的图片
                    imgCount.style.left = 0 + "px"; //初始化盒子的位置
                    this.direct = ""; //制空方向，将轮播开关关闭，需要下次点击才打开
                    this.bool = false;
                }
            }
        },
        changeDot: function (e) {
            if (this.self.bool) return; //点击按钮或小点时，跳出
            if (e.target instanceof HTMLUListElement) return; //没有点击小点(li）时跳出
            var arr = Array.from(this.children); //小点数组化
            var count = arr.indexOf(e.target); //查找小点索引
            if (count === this.self.index) return; //点击自身时跳出
            if (count > this.self.index) { //当点击的小点大于当前小点时，将方向置为左
                this.self.direct = "left";
            } else if (count < this.self.index) { //反之向右
                this.self.direct = "right";
            }
            this.self.index = count; //将图片索引设置为点击小点索引
            this.self.creatNextPic(); //创建下张图片
            this.self.dotColor(); //改变小点样式
        },
        dotColor: function () { //前一个小点背景透明
            if (this.dotLi) {
                this.dotLi.style.backgroundColor = "rgba(240,137,137,0.3)";
            } //将被切换的小点赋值给当前小点，使其根据计数器切换
            this.dotLi = this.carouselBox.lastElementChild.children[this.index];
            this.dotLi.style.backgroundColor = "rgba(240,137,137,1)";
        },
        isAuto: function (e) { //根据鼠标是否进入轮播图判断是否自动轮播
            if (e.type === "mouseenter") {
                this.self.autoPlay = false;
            } else {
                this.self.autoPlay = true;
            }
        },
        carouselAuto: function () { //自动轮播
            if (!this.autoPlay) return; //当计数器为0时执行一次
            this.autoTime--; //每帧使计时器减一
            if (this.autoTime > 0) return;
            this.autoTime = 200;
            this.direct = "left"; //默认自动轮播方向
            this.index++;
            if (this.index > this.imgList.length - 1) {
                this.index = 0;
            }
            this.creatNextPic(); //创建下一张图
        },
        animate: function () { //单一动画，每帧执行一次，将动画放在一个函数内
            this.movePic();
            this.carouselAuto();
        }
    };
    Carousel.prototype.constructor = Carousel;
    return Carousel;
})();
```