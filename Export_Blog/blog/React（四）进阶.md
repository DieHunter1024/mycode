---
title:  React（四）进阶 
date:  2018-12-30 15:18:1410-0112-0408-0809-1312-0404-2608-0705-1710-23 
---
## 搭建脚手架 create-react-app：（类似Vue）：

步骤：

全局安装 npm install create-react-app -g

在项目目录下安装create-react-app myapp(项目名称）

npm start 运行项目

npm run eject--------将配置文件迁移到外部（产生config文件夹）

![](https://img-blog.csdnimg.cn/201812301515375.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

## Redux：

如果你不知道是否需要 Redux，那就是不需要它

只有遇到 React 实在解决不了的问题，你才需要 Redux

redux的条件：

* 某个组件的状态，需要共享
* 某个状态需要在任何地方都可以拿到
* 一个组件需要改变全局状态
* 一个组件需要改变另一个组件的状态

安装： npm install --save redux

安装redux工具：

npm install --save react-redux  
npm install --save-dev redux-devtools

### 原理：

组件触发actionCreate中的函数

```javascript
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,//自定类型
    text//抛出的内容
  }
  dispatch(action)//抛出action对象
}
```

但是只会经过Store而不会操作，直接抛出到Reducers，<u>不能修改`state，因为对象的引用关系，会将原数据修改`</u>

```javascript
import { VisibilityFilters } from './actions'//引入actions

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state
}
```

若要对state修改，需另附值（对象复制），再做修改

```javascript
import { VisibilityFilters } from './actions'//引入actions

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
return Object.assign({}, state, {
        visibilityFilter: action.filter
      })//复制了state，并返回
}
```

获取返回的state

### [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState)方法获取 state；

### [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch)方法更新 state；

### [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe)注册监听器;

### [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe)返回的函数注销监听器。

![](https://img-blog.csdnimg.cn/20181231141248528.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

# react-router-dom和react-router（路由）：

## react-router-dom：

安装：npm install react-router-dom

使用一个js文件实现路由功能：

需要路由操作的页面引入路由方法：

```javascript
import {HashRouter,BrowserRouter,Link,NavLink,Route,Switch} from 'react-router-dom'
```

HashRouter：根据哈希变化进行路由操作；

BrowserRouter：根据Path路径变化而操作；

Link 和 Route：类似于Vue的routerlink 和 route-view，连接路由的组件，显示路由的组件；

## 例如：

引入要路由的文件：

```javascript
import A from './a'
import B from './b'
import C from './c'
```

路由操作：

```javascript
    render(){
        return(
            <HashRouter>
                
                <div>
               
                <ul>
                    <li>
                        <Link to='/'>a</Link>{/*匹配全部的*/}
                    </li>
                    <li>
                        <Link to='/b'>b</Link>{/*匹配b的*/}
                    </li>
                    <li>
                        <Link to='/c'>c</Link>{/*匹配c的*/}
                    </li>
                </ul>
                <hr/>
                 <Route exact={true} path='/' component={A}></Route>{/*跳到a*/}
                 <Route path='/b' component={B}></Route>{/*跳到b*/}
                 <Route path='/c' component={C}></Route>{/*跳到c*/}
                 </div>
            </HashRouter>
            )
    }
```

## react-router：

React Router 是一个基于React之上的强大路由库；

```
import { Router, Route, Link } from 'react-router'
```

### 传参：

* params：在编程式导航的push或replace中加/ : key，传递方式由路由匹配，只能传字符（JOSN处理），刷新界面依然保存
* query：在路由path处写{path：‘/admin’，query：{name：aaa，age：20}},无需动态路由（即，在路径处有个 /：key），刷新后不保存，可传任何数据
* state：类似query，在路由path处写{path：‘/admin’，state：{name：aaa，age：20}}，无需动态路由，刷新后保存，可传任何数据