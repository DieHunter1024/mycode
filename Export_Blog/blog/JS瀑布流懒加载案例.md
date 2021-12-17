---
title:  JS瀑布流懒加载案例 
date:  2018-11-29 20:32:4501-2012-2707-1608-1305-2505-2401-1510-2704-0905-1508-2507-0204-2311-1401-30 
---
代码附上：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>fall_out</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            ul {
                list-style: none;
            }
        </style>
    </head>

    <body>
        <ul></ul>
        <script>
            var ul, img;
            // 创建容器
            const count = 5;//总列数
            var arr = [];//存放高度之后用来比较
            var pic = 1;//图片索引
            init();//入口函数

            function init() {
                ul = document.querySelector("ul");//获取ul
                for (var i = 0; i < count; i++) {//根据count创建li
                    var li = document.createElement("li");
                    ul.appendChild(li);
                    //设置样式
                    li.style.margin = "5px";
                    li.style.width = (document.documentElement.clientWidth) / count - 22 + "px";
                    li.style.border = "1px solid lightcoral";
                    li.style.float = "left";
                    arr.push(0);//初始化第一排图片的高
                }
                //新建第一张图片
                img = new Image();
                img.src = "img/" + pic + ".jpg";
                img.addEventListener("load", addPic);//添加加载事件
                document.addEventListener("scroll", move);//给右侧滚轮添加滚轮事件
            }

            function addPic(e) {
                // 复制第一张图片
                var copy = this.cloneNode(false);
                var min = Math.min.apply(null, arr);
                var index = arr.indexOf(min);//寻找高度最小的图片
                ul.children[index].appendChild(copy);//将图片加载到ul的高度最小的li中
                copy.style.width = "100%";
                arr[index] = copy.parentElement.offsetHeight;//将高度添加到数组的该项
                if ((document.documentElement.scrollHeight - document.documentElement.scrollTop) / document.documentElement
                    .clientHeight > 4) {//当右边滚轮到达屏幕高度四倍时跳出函数
                    return;
                }
                pic = parseInt(Math.random() * 10 + 1);//否则继续加载图片
                img.src = "img/" + pic + ".jpg";
            }

            function move(e) {//当文档高度减滚动条的位置小于屏幕两倍时，继续加载
                if ((document.documentElement.scrollHeight - document.documentElement.scrollTop) / document.documentElement
                    .clientHeight < 2) {
                    pic = parseInt(Math.random() * 10 + 1);
                    img.src = "img/" + pic + ".jpg";
                }
            }
        </script>
    </body>

</html>
```