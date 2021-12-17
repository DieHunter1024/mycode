---
title:  JS案例：Jq中的fadeOut和fadeIn实现简单轮播（没完善，简单实现） 
date:  2018-12-02 19:32:3511-1306-0106-1909-0204-0810-2401-1803-2701-0302-0906-2309-1712-3008-1112-1911-0502-0211-07 
---
代码：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            #nav {
                width: 120px;
                height: 80px;
                position: absolute;
                right: 310px;
                top: 60px;
                z-index: 2;
            }

            #nav img {
                width: 100%;
                height: 100%;
                margin: 10px 0;
                transition: 0.5s;
            }

            #nav img:hover {
                border: 5px solid lightcoral;
                box-sizing: border-box;
            }

            #pic {
                width: 1000px;
                height: 600px;
                position: relative;
                margin: 50px auto;
            }

            #pic img {
                width: 100%;
                height: 100%;
                position: absolute;
                display: none;
            }
        </style>
        <script src="js/jquery.min.js"></script>
    </head>

    <body>
        <div id="nav">
            <img src="img/1.jpg" alt="1" />
            <img src="img/2.jpg" alt="2" />
            <img src="img/3.jpg" alt="3" />
            <img src="img/4.jpg" alt="4" />
            <img src="img/5.jpg" alt="5" />
        </div>
        <div id="pic">
            <img src="img/1.jpg" alt="1" />
            <img src="img/2.jpg" alt="2" />
            <img src="img/3.jpg" alt="3" />
            <img src="img/4.jpg" alt="4" />
            <img src="img/5.jpg" alt="5" />
        </div>
        <script>
            var count = 0; //记录图片是第几张
            $("#pic img").eq(0).fadeIn(1); //初始图片显示状态，不写的话，第一张图片不会显示
            $("#nav img").on("click", changePic); //给导航框小图片添加点击事件
            var list = Array.from($("#nav img")); //将小图图片列表，放在数组中
            function changePic(e) { //小图点击事件
                var index = list.indexOf(this); //在数组中查找被点击的那一项索引
                count = index; //当点击时将自动切换的索引换成点击的那个
                $("#pic img:visible").fadeOut(500); //初始化所有图片，将显示的隐藏
                $("#pic img").eq(index).fadeIn(500); //将被单击的显示
            }
            setInterval(autoMove, 3000); //每三秒切换一次
            function autoMove() {
                count++; //切换图片
                if (count > 4) {
                    count = 0;
                }
                $("#pic img:visible").fadeOut(500); //初始化所有图片，将显示的隐藏
                $("#pic img").eq(count).fadeIn(500); //将被单击的显示
            }
        </script>
    </body>

</html>
```