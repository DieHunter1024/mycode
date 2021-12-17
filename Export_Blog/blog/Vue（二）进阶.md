---
title:  Vue（二）进阶 
date:  2018-12-24 10:30:5503-2512-1006-0504-0910-0804-0904-1404-1010-0804-1304-1310-0810-1710-0810-0810-08 
---
### Vue脚手架：

### vue-cli：

全局安装：

```html
npm install  -g  vue-cli
```

查看版本：

```html
vue -V 
```

初始化脚手架：

```html
vue init webpack + 项目的名字
```

运行项目：

```html
npm run dev
```

打包项目：

```html
npm run build
```

### 文件及文件夹的信息：

![](https://img-blog.csdnimg.cn/20181223235455492.jpg)![](https://img-blog.csdnimg.cn/20181223235948289.jpg)

```html
开发依赖：  开发编译打包需要的依赖，打包之后就不要了 
生产依赖：  打包前后都需要的依赖
```

### Vue-router：

```html
下载安装：
npm install vue-router
```

在router文件夹下新建js文件：

```javascript
import VueRouter from 'vue-router'//引入路由模块
       import Vue from 'vue'
       Vue.use(VueRouter)//依赖模块
       let router=new VueRouter({
       	routes:[
			{path:'路径（加斜杠访问）',name:"名字（直接访问）",component:'注册组件（跳转的位置）',chidern:[]子路由}
			{path:'/',redirect:"/home"},//路由的重定向 如果hash 为'/' 指向到 /home
       	]
       })
       export default router
```

通过<router-link to='/path'>标签来切换组件

通过<router-view>标签显示

keep-alive:在component组件、router-view外面包裹上keep-alive的话，就会对组件进行缓存，当切换回来的时候，组件会立即渲染，理论来说，切换组件的时候其实会把上一个组件销毁，使用了keep-alive则不会(就是组件一直存在于缓存中)

include匹配到的组件会被缓存，exclude匹配到的不会被缓存

值可以为逗号隔开的字符串include = ‘a,b’;正则:include = ‘/a|b/’;数组:include=\[‘a’,’b’\]

多级路由：

```javascript
const routes = [
  {path:'/main',component:AppMain},
  {path:'/news',component:AppNews,children:[//children是子目录
    {path:'inside',component:AppNewsInside},
    {path:'outside',component:AppNewsOutside}
  ]},
]
```

默认路由：

```html
{path:'',component:Main}//将默认路径设置成Main
```

动态路由：

```html
{path:'/user/:id',component:User}//id为传的值
```

命名路由：

直接用name : main在hash中写name就可以路由

路由跳转：

```javascript
router.push = router-link:to router.replace = router-link:to.replace router.go() = window.history.go
```

路由钩子：

全局路由钩子：

```javascript
router.beforeEach((to, from, next) => {
    //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
  console.log('beforeEach')
  console.log(to,from)
  //
  next()
})
//
router.afterEach((to, from) => {
    //会在任意路由跳转后执行
  console.log('afterEach')
})
```

局部路由：

```javascript
 routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```

组件内的路由钩子：

```javascript
beforeRouteEnter (to, from, next) //confirm 前调用
beforeRouteUpdate (to, from, next) //在当前路由改变调用
beforeRouteLeave (to, from, next)//导航离开该组件的对应路由时调用
```

### 生命周期：

![](https://img-blog.csdnimg.cn/20181224114138567.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### beforeCreate：

创建组件之前，没有组件，没有元素，没有事件，没有生命周期

### created：

创建组件结束，有数据，没有元素

### beforeMount：

挂载之前，有数据，没有元素

### mounted：

挂载完成，有元素，有数据

### beforeUpdate：（在mounted后执行）

用于监听数据变化

### updated：

用于监听数据变化

### beforeDestroy：

销毁实例，元素数据还在

### destroyed：

销毁实例

### Vue中的ajax：

### axios：

载入：npm install axios

在main.js中

```javascript
import Axios from 'axios';//引入
Vue.prototype.$axios = Axios;//将Axios附着在Vue，以供全局调用
Axios.defaults.baseURL = 'http://localhost:1024';//设置默认接口地址
```

然后在需要请求的组件中：

```javascript
this.$axios
        .post("hash",data)//hash是接口地址，不需要加主机地址（http://localhost/index直接写/index）data是传输的对象
        .then(res => {//返回值
          if (res.data.err == 0) {
           console.log(res)
          }
        })
        .catch(err => {
          console.log(err);
        });
```

### axios拦截器：

请求拦截：

```javascript
axios.interceptors.request.use(function (config) {//发送之前进行过滤
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
```

响应拦截：

```javascript
axios.interceptors.response.use(function (response) {//请求到数据后进行过滤
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
```

### Vuex：

作用：多个组件共享状态及数据

安装：npm install vuex

配置：在src中新建store文件夹：在里面新建js文件

```javascript
import Vue from 'vue'
import Vuex from 'vuex'//引入Vuex
Vue.use(Vuex);
import login from './login/index'
const store = new Vuex.Store({
  modules: {
    login: login,
  }
})
export default store;//抛出vuex实例
```

在src中新建的store文件夹中新建另一个文件夹：里面有5个js文件

![](https://img-blog.csdnimg.cn/20181224152242677.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

大致示范一下里面的内容(部分购物车内容，大概看一下就好)：

### index.js

```javascript
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
let store = {
  state,
  mutations,
  getters,
  actions
};

export default store;
```

### state.js

```javascript
export default {
  carObj: [],
}
```

### getters.js

```javascript
export default {
  // 派生属性
  all(state) {
    var price = 0;
    var sum = 0;
    var seleceAll = true;
    for (let i = 0; i < state.carObj.length; i++) {
      if (state.carObj[i].sel) {
        price += state.carObj[i].price * state.carObj[i].num;
        sum += state.carObj[i].num;
      }
      seleceAll *= state.carObj[i].sel;
    }
    return {
      price: price,
      sum: sum,
      seleceAll: seleceAll
    }
  }
}
```

### mutations.js:

```javascript
export default {
  //只做状态值得修改 不做任何逻辑操作
  addTo(state, carObj) {
    state.carObj = carObj
  }
}
```

### actions.js:

```javascript
export default {
  // // 异步处理逻辑操作
  initCar({
    commit
  }) {
    let carlist = localStorage.carlist ? JSON.parse(localStorage.carlist) : [];
    commit('addTo', carlist)
  }
}
```

主要流程：（官网的）

初步理解就是：通过actions的函数改变states（数据），渲染到所有绑定的页面，页面再次调用actions（函数），再次修改

![](https://img-blog.csdnimg.cn/20181224153524350.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

深层理解：组件触发actions传递数据（抛发），触发mutations修改状态值，修改state的值，渲染到页面

![](https://img-blog.csdnimg.cn/20181224161037290.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### 辅助工具：

```javascript
import { mapState，mapGetters，mapMutations，mapActions } from 'vuex'
```

引入辅助工具使组件可以设置或获取到函数及数据

```javascript
this.$store//获取到store
```

mapStates：

```javascript
computed: {
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
        //state中的变量名
  })
}
```

mapGetters：

```javascript
 computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
    ])
  }
```

mapMutations：

```javascript
methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ])
  }
```

mapActions：

```javascript
 methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ])
  }
```