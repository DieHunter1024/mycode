---
title:  React（二）组件通信 
date:  2018-12-27 15:48:0008-3111-0804-2807-1411-1111-1306-2301-0807-1201-1501-1606-2202-2604-24 
---
# 组件通信：(react版本是15版本，可能和16版本的操作有部分差异)

## 父子组件：

### 父=>子

1. 用props：

2. 通过ref进行标记

1.用props

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Life</title>
        <script src="../react.min.js"></script>
        <script src="../react-dom.min.js"></script>
        <script src="../browser.min.js"></script>
        <style>
            div{
                width: 100px;
                height: 100px;
                line-height: 100px;
                text-align: center;
                background: lightgreen;
            }
            .yes{
                background: lightblue;
            }
            .no{
                background: lightcoral;
            }
        </style>
    </head>

    <body>
        <div id="app"></div>
        <script type="text/babel">
            var Father = React.createClass({
                getInitialState(){
                    return{
                        isTrue:'Hello'
                    }
                },
                render() {
                    return (
                        <li>{/*组件传参，用bind绑定this，以取到this.state.isTrue，
                        将this.state.isTrue作为属性传到子组件中
                        */}
                            <div onClick={this.clickHandler.bind(this,this.state.isTrue)}></div>
                            <Son name={this.state.isTrue}/>
                        </li>
                    );
                },
                clickHandler(a){
                    // 将state的值改变，使Hello取World，World取Hello
                    this.setState({isTrue:this.state.isTrue=='Hello'?'World':'Hello'});
                }
            });
            var Son = React.createClass({
                render() {//取到父组件的值，修改颜色
                    return (
                        <div className={this.props.name==='Hello'?'yes':'no'}>{this.props.name}</div>
                    );
                }
            });
            ReactDOM.render(<Father/>,app);
        </script>
    </body>

</html>
```

2.ref标记：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Life</title>
        <script src="../react.min.js"></script>
        <script src="../react-dom.min.js"></script>
        <script src="../browser.min.js"></script>
        <style>
            div{
                width: 100px;
                height: 100px;
                line-height: 100px;
                text-align: center;
                background: lightgreen;
            }
            .yes{
                background: lightblue;
            }
            .no{
                background: lightcoral;
            }
        </style>
    </head>

    <body>
        <div id="app"></div>
        <script type="text/babel">
            var Father = React.createClass({
                init(){
                    this.self.clickHandler()//执行子组件的方法
                },
                render() {
                    return (
                        <li>
                            <div onClick={this.init}></div>
                            <Son ref={(el)=> this.self=el}/>{/*绑定一个标记绑定在自己身上，使this.self等于子组件，于是调用this.self以达到调用子组件的方法*/}
                        </li>
                    );
                }
            });
            var Son = React.createClass({
                getInitialState(){
                    return{
                        str:'Hello'
                    }
                },
                render() {
                    return (
                        <div className={this.state.str==='Hello'?'yes':'no'}>{this.state.str}</div>
                    );
                },
                clickHandler(){
                    // 将state的值改变，使Hello取World，World取Hello，该方法被父组件调用
                    this.setState({str:this.state.str=='Hello'?'World':'Hello'});
                }
            });
            ReactDOM.render(<Father/>,app);
        </script>
    </body>

</html>
```

### 子=>父：

通过子组件调用父组件的函数传递信息

下面是个简单的小例子：

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>s_f</title>
        <script src="../react.min.js"></script>
        <script src="../react-dom.min.js"></script>
        <script src="../browser.min.js"></script>
        <style>
            div {
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: lightgreen;
      }
      .yes {
        background: lightblue;
      }
      .no {
        background: lightcoral;
      }
    </style>
    </head>

    <body>
        <div id="app"></div>
        <script type="text/babel">
            var Father = React.createClass({
        getInitialState() {
          return {
            str: "Hello"
          };
        },
        render() {
          return (
            <li>{/*父组件添加点击事件改变自身颜色和数据，并将自己的函数和state附在子组件的属性上*/}
              <div className={this.state.str==='Hello'?'yes':'no'} onClick={this.clickHandler}>{this.state.str}</div>
              <Son Fn={this.clickHandler} str={this.state.str} />
            </li>
          );
        },
        clickHandler() {//点击事件，单击时将world换成hello，hello换成world
          this.setState({ str: this.state.str == "Hello" ? "World" : "Hello" });
        }
      });
      var Son = React.createClass({
        render() {
          return ({/*子组件中将调用父组件传过来的函数及数据，并修改自身样式，达到子组件修改父组件的方法，从而父组件变化，子组件也变化，子组件变化，父组件也变化*/}
            <div className={this.props.str==='Hello'?'no':'yes'} onClick={this.props.Fn}>{this.props.str}
            </div>
          );
        }
      });
      ReactDOM.render(<Father/>, app);
    </script>
    </body>

</html>
```

## 简单的兄弟组件（非redux、flux）

将以上两种结合即可，子传父，父传子

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>s_s</title>
        <script src="../react.min.js"></script>
        <script src="../react-dom.min.js"></script>
        <script src="../browser.min.js"></script>
        <style>
            div {
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: lightgreen;
      }
      .yes {
        background: lightblue;
      }
      .no {
        background: lightcoral;
      }
    </style>
    </head>

    <body>
        <div id="app"></div>
        <script type="text/babel">
            var Father = React.createClass({
        getInitialState() {
          return {
            str: "Hello"
          };
        },
        render() {
          return (
            <li>{/*父组件添加点击事件改变自身颜色和数据，并将自己的函数和state附在子组件的属性上*/}
              <div>{this.state.str}</div>
              <Son Fn={this.clickHandler}/>{/*Son组件触发父组件的事件*/}
              <Son1 str={this.state.str}/>{/*父组件将数据更新传给Son1组件*/}
            </li>
          );
        },
        clickHandler() {//点击事件，单击时将world换成hello，hello换成world
          this.setState({ str: this.state.str == "Hello" ? "World" : "Hello" });
        }
      });
      var Son = React.createClass({
        render() {//Son触发事件改变数据
          return (
            <div onClick={this.props.Fn}>Son
            </div>
          );
        }
      });
      var Son1 = React.createClass({
        render() {//Son1对传来的数据进行改变
          return (
            <div className={this.props.str==='Hello'?'no':'yes'}>Son1
            </div>
          );
        }
      });
      ReactDOM.render(<Father/>, app);
    </script>
    </body>

</html>
```

### 模拟事件总线通信：（react-16版的组件共用事件总线传参）

在装好react-cli后，新建一个文件bus：（将Event事件总线布置在全局）

```javascript
import {EventEmitter} from 'events'
const bus=EventEmitter.prototype
export default bus
```

然后在兄弟组件中分别引入：（当做全局变量）

```javascript
import bus from '../../../module/bus.js'
```

以下是两个兄弟组件：

```javascript
import React from 'react'
import bus from '../../../module/bus.js'
class Son extends React.Component{
    constructor(props){
        super(props)
        this.state={//设置当前state
            isTrue:false
        }
    }
    componentWillMount(){//将事件注册在bus事件总线上
        bus.on('change',()=>{
            console.log(
                this.state.isTrue
            );
            this.setState({isTrue:!this.state.isTrue})
        })
    }
    render(){
        return(
            <div>
                 {this.state.isTrue}
            </div>
        )
    }
}
export default Son//抛出组件
```

```javascript
import React from 'react'
import bus from '../../../module/bus.js'
class Son1 extends React.Component{
    constructor(props){
        super(props)
        console.log('------')
    }
    changeSon(){
       bus.emit('change')//触发全局事件，使上面的兄弟触发方法
    }
    render(){
        return(
            <div>
                <button onClick={this.changeSon}>变色</button>//触发点击事件
            </div>
        )
    }
}
export default Son1//抛出组件
```

在父组件中注册子元素：

```javascript
import React from 'react'
import Son1 from './father'
import Son from './son';

class Bus extends React.Component{
    constructor(props){
        super(props)
        console.log('------')
    }
    render() {
        return(
           <div>
           <p>Event</p>
               <Son1></Son1>//将两个组件注册
               <Son></Son>
           </div> 
        )
    }
}
export default Bus;//抛出父组件
```