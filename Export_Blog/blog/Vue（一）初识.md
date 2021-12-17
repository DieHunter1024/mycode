---
title:  Vue（一）初识 
date:  2018-12-14 20:56:0503-0801-3006-1508-3103-0905-0305-1906-2009-1303-0210-1711-3011-2807-2503-1303-2512-10 
---
```
Vue的意义：将开发者的精力从dom操作解脱，更加专注于数据的操作，
```

```
数据驱动，界面的渲染 随着数据的变化自动变化
    1.将开发者的精力从dom中解除， 极少做dom操作
    2.通过指令（directive）将元素和数据进行绑定  
    3.数据变化元素界面变化
    4.开发者关注数据的变化
```

配置：Vue官网下载；或npm install vue

### js引入包后，实例化Vue对象；

```javascript
var vm = new Vue({//实例化
             el: '#btn',//选择标签（作用区域）
             data: {//变量（数据），关联页面的标签
                    bool: true
                }，
            methods:{//写方法的对象
                Fn1(){//方法
                        },
                Fn2(){
                        }
                }

            });
```

### 渲染数据：

```javascript
<div id='app'>{{name}}</div>//用插值的方式{{}}来放置data的变量
```

Vue的数据是双向数据的绑定，数据相互依赖，缺点是源头很难找到，但是提升了数据的感知

### 指令：

v-if（条件渲染）

```javascript
<p v-if='bool'></p>//条件满足时显示元素
<p v-else></p>//否则显示元素
<p v-else-if='bool'></p>//条件满足时显示元素
```

v-for（列表渲染）用for in和for of都行（注意：若遍历数组的时候有重复项，要用一个bind绑定数据否则会出错，如<li v-for='(item,index) in list' v-bind : key=index>{{item}}--{{index}}</li>）

```html
//数组
<li v-for='item in list'>{{item}}</li>//item是每一项，list是操作的数组（根据list的长度新建li）

<li v-for='(item,index) in list'>{{item}}--{{index}}</li>//item是每一项，index是数组索引，list是操作的数组（根据list的长度新建li）

<li v-for='item in 20'>{{item}}</li>//直接创造20个li

//字符串
<li v-for='item in "hello vue"'>{{item}}</li>//遍历字符串，输出9个li分别是字符每一项

//对象
<li v-for="(val,key,index) in obj">{{key}}:{{val}}---{{index}}</li>//val,key,index分别是对象的每项的属性，属性名，索引
```

v-click（事件指令）

```html
<button v-on:click="test">点我</button>//类似于onclick，test是Vue实例化中的函数
//v-on:click相当于@click
<a v-on:click.stop="doThis"></a>//取消冒泡事件
<div v-on:click.self="doThat">...</div>//只有点击这个元素自身才会触发
```

v-bind（属性设置）

```html
<div v-bind:class='state?"red":"green"'>//v-bind：'属性名'='属性值'
//可以写成<div v-bind:class='state?"red":"green"'>
```

### 过滤器：（对数据进行处理的函数）

全局过滤器：和局部过滤的区别（局部过滤器只能在当前的组件中使用）

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>

        </style>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            {{nowTime|getTime}}
            <!--  这是参数   这是过滤，中间用|隔开-->
        </div>
        <script>
            //全局过滤
            Vue.filter('getTime', function (value) {
                //中间可以写对数据的处理
                return value;
            });
            var vm = new Vue({
                el: '#box',
                data: {
                    nowTime: Date.now()
                }
            });
        </script>
    </body>

</html>
```

局部过滤：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>

        </style>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            {{nowTime|getTime}}
            <!--  这是参数   这是过滤，中间用|隔开-->
        </div>
        <script>
            //局部过滤
            var vm = new Vue({
                el: '#box',
                data: {
                    nowTime: Date.now()
                },
                filters: {
                    getTime: function (value) {
                        //中间可以写对数据的处理
                        return value;
                    }
                }
            });
        </script>
    </body>

</html>
```

### 组件：就是vue的一个拓展实例

全局组件：（整个页面都能使用）

```html
<template id="tp1">
            <!-- 组件创建 -->
            <div></div>
</template>
```

```javascript
var mod = {//组件配置
                template: '#tp1',//选中组件
                data() {
                    return {
                    //写变量
                }
                },
                methods: {
                    //写函数
                }
            }
```

```javascript
Vue.component('mod', mod);//注册组件
```

```html
//直接在页面中输入
<mod></mod>
//即可使用
```

局部组件：（只能在当前选中作用范围中使用）

```javascript
let box = new Vue({
                el: '#box',//当前作用范围是id为box的标签内
                data: {
                    
                },
                methods: {
                   
                },
                components: {//新建局部组件
                    mod: ({
                        template: '#tp1',
                        data() {
                            return {}
                        },
                        methods: {

                        }
                    })
                }
            });
```

### 组件间数据的传输：（类似事件抛发和监听）

父组件传给子组件：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            <fat></fat>
        </div>
        <!-- 子组件 -->
        <template id="son">
            <div>{{callson}}</div>
        </template>
        <!-- 父组件，父组件中包含子组件 -->
        <template id="fat">
            <div>
                <!-- 当父组件数据改变时，通过将数据保存在自身属性的方法传输 -->
                <div>{{fbool}}</div>
                <button @click='change'>Change</button>
                <!-- 将callson作为属性，附带数据传输给子元素 -->
                <son :callson='fbool'></son>
            </div>
        </template>
        <script>
            Vue.component('son', {
                template: '#son',
                data: function () {
                    return {

                    }
                },
                props: ['callson'] //子组件在该处接收数据
            });
            Vue.component('fat', {
                template: '#fat',
                data: function () {
                    return {
                        fbool: false
                    }
                },
                methods: { //点击父组件的按钮时，父组件内数据改变
                    change() {
                        this.fbool = !this.fbool;
                    }
                }
            });
            var box = new Vue({
                el: '#box'
            });
        </script>
    </body>

</html>
```

子组件传给父组件：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            <fat></fat>
        </div>
        <template id="son">
            <div>
                <button @click='change'>Change</button>
                <!-- <div>{{sbool}}</div> -->
            </div>

        </template>
        <template id="fat">
            <div>
                <div>{{fbool}}</div>
                <!-- 新建自定义事件，绑定父元素中的函数，传参数写在后面用逗号隔开 -->
                <son @callfat='changeF'></son>
                <!-- 当子元素被点击时触发父元素的方法 -->
            </div>
        </template>
        <script>
            Vue.component('son', {//点击子组件的按钮时，子组件内数据改变
                template: '#son',
                data: function () {
                    return {
                        sbool: false
                    }
                },
                methods: {
                    change() {
                        this.$emit('callfat');
                        this.sbool = !this.sbool;
                    }
                }
            });
            Vue.component('fat', { 
                template: '#fat',
                data: function () {
                    return {
                        fbool: false
                    }
                },
                methods: {
                    changeF() {
                        this.fbool = !this.fbool;
                    }
                }
            });
            var box = new Vue({
                el: '#box'
            });
        </script>
    </body>

</html>
```

兄弟组件：（结合子传父，父再传子）：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="./vue.js"></script>
    </head>

    <body>
        <div id="box">
            <fat></fat>
        </div>
        <template id="sonf">
            <div>
                <button @click='change'>Change</button>
                <div>First <br>{{sfbool}}</div>
            </div>

        </template>
        <template id="sons">
            <div>Second <br>{{callson}}</div>
        </template>
        <template id="fat">
            <div>
                <sonf @callfat='changeF'></sonf>
                <sons :callson='fbool'></sons>
            </div>
        </template>
        <script>
            Vue.component('sonf', {
                template: '#sonf',
                data: function () {
                    return {
                        sfbool: false
                    }
                },
                methods: {
                    change() {
                        this.$emit('callfat');
                        this.sfbool = !this.sfbool;
                    }
                }
            });

            Vue.component('sons', {
                template: '#sons',
                data: function () {
                    return {

                    }
                },
                props: ['callson']
            });

            Vue.component('fat', {
                template: '#fat',
                data: function () {
                    return {
                        fbool: false
                    }
                },
                methods: {
                    changeF() {
                        this.fbool = !this.fbool;
                    }
                }
            });
            var box = new Vue({
                el: '#box'
            });
        </script>
    </body>

</html>
```

不相邻兄弟组件：

```javascript
let angel=new Vue();//引入一个Vue实例
```

```javascript
angel.$emit('test','Hello')//传送方在函数中抛出事件及数据
angel.$on('test',this.change)//接收方接收事件及数据
```

### 动画：

```html
<transition name='aaa'>css中用name值进行动画
若中间有1个以上元素，需要在外面嵌套一个元素，再给该元素加
  	<div v-if='show'>
  		<p>Hello</p>
  	    <p>World</p>
  	</div>
</transition>
```

```css
        .aaa-enter{进入前
			opacity: 0;
		}
		.aaa-enter-to{进入后
			opacity: 1;
		}
		.aaa-enter-active{过渡时间
			transition: all 3s;
		}

		.aaa-leave{离开前
			opacity: 1;
		}
		.aaa-leave-to{离开后
			opacity: 0;
		}
		.aaa-leave-active{过渡时间
			transition: all 3s;
		}
```