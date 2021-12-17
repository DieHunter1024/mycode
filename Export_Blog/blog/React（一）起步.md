---
title:  React（一）起步 
date:  2018-12-25 21:23:4209-0212-0811-1110-0401-2305-2804-1506-1906-2901-2709-0807-2904-2612-0609-2608-2106-2806-12 
---
# 轻量级的视图层框架

React不是一个完整的MVC框架，最多可以认为是MVC中的V（View），甚至React并不非常认可MVC开发模式

## React高性能的原理：

减少对DOM进行操作，引入了虚拟DOM，如：先将节点内容从A-B,B-A，React会认为A变成B，然后又从B变成A ，不发生任何变化。

## 特点：

虚拟DOM

组件系统

单向数据流

JSX 语法

## 起步：

引入三个js文件：(react版本是15版本，可能和16版本的操作有部分差异)

react.js  
react-dom.js  
browser.js

最简单的React操作：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="./react.min.js"></script>
        <script src="./react-dom.min.js"></script>
        <script src="./browser.min.js"></script>
    </head>

    <body>
        <div id="app"></div>
        <script type='text/babel'>
            //创建组件
    var Hello = React.createClass({
        render:function () {
            return (
                //jsx语法
                <div>HelloWorld</div>
            )
        }
    })
    //利用ReactDOM对象的render方法将组件渲染到某个节点里
    ReactDOM.render(<Hello/>,app)
   </script>
    </body>

</html>
```

### JSX：

JSX是一种语法，全称：javascript xml

用法：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="./react.min.js"></script>
        <script src="./react-dom.min.js"></script>
        <script src="./browser.min.js"></script>
    </head>

    <body>
        <div id="app1"></div>
        <script type='text/babel'>
            var World = React.createElement(
            'h1',
            {className:'abc',id:'haha'},
            [React.createElement('span',null,'Hello'),
            React.createElement('mark',null,'World')])
            ReactDOM.render(World,app1)
        </script>
    </body>

</html>
```

## 添加样式：

行内样式：

```html
<div style = { {color:'red',fontSize:2+'em'} }>Hello world</div>
//{ }的作用类似于Vue中的表达式符号
```

写在React.createClass中用this调用：

```javascript
var Hello = React.createClass({
        style:{
            background:'lightgreen',
            color:'deepskyblue'
        },
        render:function () {
            return (
                //jsx语法
                <div style={this.style}>HelloWorld</div>
            )
        }
    })
```

## 事件：（类似于原生，在React.createClass中添加事件触发的函数，在元素中用this.handler调用）

```javascript
<script type="text/babel">
            var Hello = React.createClass({
            clickHandler(){
            console.log('HelloWorld');
            },
          render:function () {
              return (
                  <div>
                      <div onClick={this.clickHandler}>Click</div>
                  </div>

              )
          }
      })
      ReactDOM.render(<Hello/>,app)
    </script>
```

## React与原生事件的不同点：（react中对于事件进行了处理，解决了一些兼容性问题，如果不取值的话，值都是null）

![](https://img-blog.csdnimg.cn/20181226174550595.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20181226174613381.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

## 组件包含：（在父组件直接写子组件即可）

```javascript
<script type="text/babel">
            var Hello = React.createClass({
            clickHandler(){
            console.log('HelloWorld');
            },
          render:function () {
              return (
                  <div>
                      <World/>//子元素
                  </div>
              )
          }
      })
      var World = React.createClass({
            clickHandler(){
            console.log('HelloWorld');
            },
          render:function () {
              return (
                  <div>
                      <div onClick={this.clickHandler}>Click</div>
                  </div>
              )
          }
      })
      ReactDOM.render(<Hello/>,app)
```

### state（状态）与组件本身有关，由自己修改

### props（属性）并非自己修改，可以从父组件获取，也可以给子组件设置

## props（属性）：在父组件包含的子组件标签中加入参数，在子组件中用this.props.children调用：

```javascript
<script type="text/babel">
            var Hello = React.createClass({
          render:function () {
              return (
                  <div>
                      <World>{{a:1,b:2}}</World>
                  </div>
              )
          }
      })
      var World = React.createClass({
            clickHandler(){
            console.log(this.props);
            },
          render:function () {
              return (
                  <div>
                      <div onClick={this.clickHandler}>Click</div>
                  </div>
              )
          }
      })
      ReactDOM.render(<Hello/>,app)
    </script>
```

## state（状态）：组件自己可修改的状态（数据）配合setState(params)使用：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <script src="./react.min.js"></script>
        <script src="./react-dom.min.js"></script>
        <script src="./browser.min.js"></script>
        <style>

        </style>
    </head>

    <body>
        <div id="app"></div>
        <script type="text/babel">
            var Hello = React.createClass({
                getInitialState(){//设置state的数据
                return {
                    name:'World'
                }
            },
            render:function () {
              return (
                  <div>
                      {this.state.name}{/*这里渲染了state的name*/}
                  </div>
              )
          }
      })
      ReactDOM.render(<Hello/>,app)
    </script>
    </body>

</html>
```

## 生命周期：

![](https://img-blog.csdnimg.cn/20181226171123283.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### React组件生命周期：

### 初始化：

1. 执行getDefaultProps钩子函数，执行一次，挂载属性props（无Dom元素，有组件相关的this但是无法获取数据）
2. 执行getInitialState钩子函数，初始化自身状态state（同上，无Dom元素，有组件相关的this，但是无法获取数据）
3. componentWillMount（）挂载前（类似于Vue的created加beforeMount阶段，可以进行数据请求（ajax））
4. componentDidMount（）挂载完成（有Dom元素，数据准备完毕）

### 运行中：

1. componentWillReceiveProps函数：当props发生变化时调用
2. shouldComponentUpdate函数：主要做效率优化，控制组件是否随之更新，函数返回的true或false表示视图是否渲染，如：在函数中比较this.props.name（数据更新前）和props.name（数据更新后）对比，二者是否相同，从而避免重复渲染，加强优化
3. componentWillUpdate函数：准备工作，不允许更改数值，否则会死循环，类似Vue中的beforeUpdate
4. render：重新渲染Dom
5. componentDidUpdate：页面更新渲染完成，类似Vue的updated

### 组件销毁：

1. componentWillUnmount：组件将要销毁，可以将定时器，事件等取消或结束（ReactDOM.unmountComponentAtNode(node) 销毁节点中的组件）