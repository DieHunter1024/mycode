---
title:  VueJs（前端面试题整合） 
date:  2020-12-10 09:24:2411-0606-2803-1007-0303-2109-0702-0911-0910-2904-0809-0307-0406-2903-1909-2203-2403-0203-29 
---
**vue和react的区别**

* **React严格上只针对MVC的view层，Vue则是MVVM模式**
* **virtual（虚拟） DOM不一样，vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于React而言，每当应用的状态被改变时，全部组件都会重新渲染，所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制**
* **组件写法不一样，React推荐的做法是 JSX + inline style，也就是把HTML和CSS全都写进JavaScript了，即'all in js'；Vue推荐的做法是webpack+vue-loader的单文件组件格式，即html，css，js写在同一个文件**
* **数据绑定：vue实现了数据的双向绑定，react数据流动是单向的**
* **state对象在react应用中不可变的，需要使用setState方法更新状态；在vue中，state对象不是必须的，数据由data属性在vue对象中管理**

**redux和vuex的区别**

* **vuex是redux的基础上进行改变，对仓库的管理更加明确**
* **使用mutation来替换redux中的reducer**
* **vuex有自动渲染的功能,所以不需要更新**
* **vuex是专门为vue提供的状态管理工具,而redux是一个泛用的状态管理框架**

**vuex的实现原理**

**Vuex的状态存储是响应式的，当Vue组件从store中读取状态时，若store中状态发生改变，响应的组件也会得到更新状态。但不能直接改变state,必须通过显示的提交(commit)mutations来追踪每一个状态的变化**

**双向数据绑定的原理**

**vue实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的。  
在MDN上对该方法的说明是：Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。 它接收三个参数，要操作的对象，要定义或修改的对象属性名，属性描述符。重点就是最后的属性描述符。  
属性描述符是一个对象，主要有两种形式：数据描述符和存取描述符。这两种对象只能选择一种使用，不能混合两种描述符的属性同时使用。上面说的get和set就是属于存取描述符对象的属性。 然后我们可以通过在存取描述符中的get和set方法内写入自定义的逻辑来实现对象获取属性和设置属性时的行为。**

**Vue中父组件如何向子组件传值**

**父子组件传参：**

**1.父传子：通过props属性实现；子组件要做类型检测；**

**2.子传父：**

* **子组件this.$emit触发父组件监听的方法；$emit第二个参数为：向父组件传递的数据**
* **父组件监听子组件触发的事件，然后调用绑定的方法；**

**非父子组件传参：**

* **路由传值：<router-link>和编程式导航中，均可在query/params中传值，在子组件中：this.$route.query**
* **通过$parent $children方法调用层级关系的组件内部的数据和方法：this.$parent.$data.id 获取父元素data中的id，但是容易造成代码耦合性太强，难以维护**
* **eventBus：在全局定义一个eventBus**  
**window.eventBus = new Vue( )或者Vue.eventBus = new Vue( )**  
**在需要传递参数的组件中定义一个emit发送需要传递的值：eventBus.$emit(‘name’,id)**  
**在需要接受参数的组件中，用on接受该值：eventBus.$on(‘name’,(val) => {…})**  
**注意：使用完后要在beforeDestroy( )中关闭这个eventBus eventBus.$off(‘name’)**
* **本地存储：localStorage或者sessionStorage，setItem存储value，getItem获取value**
* **状态管理 Vuex**

**列举Vue中的事件修饰符**

**Vue.js为v-on提供了事件修饰符。  
修饰符是由点开头的指令后缀来表示的。  
.stop 阻止事件继续传播  
.prevent 阻止默认事件  
.capture 使用捕获模式  
.self 只当事件在该元素本身（而不是子元素）触发时触发回调  
.once 事件只会触发一次**

**vue常用指令有哪些**

* **v-on 监听DOM事件，比如v-on:click=”handleFunction”，可简写为 @click**
* **v-bind 绑定属性，比如 v-bind:href=”url”，可简写为 : href**
* **v-for 循环列表**
* **v-if 根据表达式seen的真假来插入/删除对应标签，比如 v-if=”seen”**
* **v-else 必须跟在v-if后**
* **v-show 根据表达式的真假值来切换元素的display CSS属性**
* **v-model 表单元素的数据双向绑定**
* **v-text 定义元素文本，比如 v-text=”message”**
* **v-html 更新元素的innerHTML**
* **v-once 只渲染元素和组件一次**

**用过哪些基于Vue****的组件库？**

**Element-ui桌面端 mint-ui 移动端  
[自己总结的](https://blog.csdn.net/time_____/article/details/109178004)**

**Vue生命周期钩子有哪些，作用是什么**

**Vue实例从创建到销毁的过程，就是生命周期  
Vue的生命周期包括：开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程。  
在Vue的整个生命周期中，提供了一系列的事件，可以注册JS方法，达到控制整个过程的目的，在这些JS方法中的this直接指向的是vue的实例。 在Vue的整个生命周期中，实例可以调用一些生命周期钩子，这提供了执行自定义逻辑的机会。**

**Vue提供的生命周期钩子如下：**

* **beforeCreate 在实例初始化之后，数据观测(data observer，开始监控Data对象数据变化)和初始化事件(init event，Vue内部初始化事件)之前被调用。**
* **created 在实例已经创建完成之后被调用。实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，event事件回调。挂载阶段尚未开始，$el 属性不可见。**
* **beforeMount 在挂载开始之前被调用。相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。**
* **mounted 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。此时模板中的html渲染到了html页面中，此时一般可以做一些Ajax操作。注意mounted只会执行一次。**
* **beforeUpdate 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。**
* **updated 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。**
* **beforeDestroy 在实例销毁之前调用。实例仍然完全可用。**
* **destroyed 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。**

**[自己的总结](https://blog.csdn.net/time_____/article/details/85227914)**

**v-if和v-show区别**

* **相同点：v-if 和 v-show 动态控制dom元素显示隐藏。**
* **不同点：v-if显示隐藏是将dom元素整个添加或删除，（例如：<div v-if=""></div>，v-if 当值为 true时，显示div ，当值为false时，改元素消失，代码也会消失，相当于将代码删除了，当在为true时，页面会重新渲染div）；而v-show显示隐藏只是将css属性设为display: block 或none。dom元素还在。**
* **编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换。**
* **编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载);v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留。**
* **性能消耗：一般的，v-if有更高的切换消耗，而v-show有更多的初始化渲染消耗。**
* **使用场景：如果需要频繁的切换而对安全性无要求，使用v-show。如果在运行时，条件不可能改变，则使用v-if较好。**

**watch和****computed区别**

**应用方面，watch比较适合对状态的监控，比如监控页面一个变量的值改变，需要进行什么操作。而computed适合简单计算并返回结果，结果随着内部变量改变而改变。  
调用方面，watch适合比较耗时的操作，比如网络异步请求，一个变量改变触发网络请求。watch可以看做一个onchange事件，computed可以看做几个变量的组合体。**

**Vuex用过哪些方法，你如何在项目中使用它**

**Store 表示对Vuex对象的全局引用。组件通过Store来访问Vuex对象中的State  
State Vuex对象的状态，即其所拥有的数据  
Getter 相当于Store的计算属性。因为就像计算属性一样，Getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。下面会说到具体的使用场景 Mutation 定义了对State中数据的修改操作。组件使用State中的数据的时候并不能直接对数据进行修改操作，需要调用Mutation定义的操作来实现对数据的修改。这也是Vuex定义中所说的用相应的规则来让数据发生变化的具体实现 Action Mutation中定义的操作只能执行同步操作，Vuex中的异步操作在Action中进行，Action最终通过调用Mutation的操作来更新数据**

**在vuex中用过dispatch()，commit()，mapstate，mapgetters，mapmutation，mapaction。**

**在项目中的使用：  
首先通过npm install vuex --save 安装vuex  
在项目的源代码文件夹下（如src文件夹）新建一个store文件夹(叫别的名字也行)  
store文件夹下新建一个store.js文件，用来存放Vuex实例。可以把store注入到在vue实例中，那么所有的组件都可以通过this.$store.state去调用。**

**流程：vue Components使用dispatch()方法触发action里面的函数，通过在Action里面写公共的异步调用获取数据，供公共的组件渲染。Action使用commit()方法触发mutations里面的函数，Mutations去修改state，state重新render vue Components。**

**vuex的使用便于大型项目管理，Store包含多个Module，Module包含State、Mutation和Action。**

**mutation和action写在methods中**

**getters和state写在computed中**

**说说Vue.nextTick钩子的应用场景**

**场景一：在created()钩子函数执行的时候，DOM并未进行任何渲染，这时操作DOM时会报错，这时，在created中使用Vue.nextTick（callback）进行操作即可解决。实际上直接将操作放在mounted钩子中是不会发生这种情况的，因为mounted函数执行时代表DOM已经渲染完毕**

**场景二：当DOM渲染完成后，执行某些操作改变其结构时，需要把异步结果放在Vue.nextTick（callback）中**

**其实可以理解为，Vue的数据驱动页面更新并不是数据改变后DOM立即做出响应，Vue 在更新 DOM 时是异步执行的，通过数据更新队列，监听数据变化，从而更新视图。而Vue.nextTick（callback）就是每次DOM渲染后触发的钩子**

**Vue3.0使用Proxy代替Vue2.0中Obeject.defineProperty的原因**

**Obeject.defineProperty虽然已经能够实现双向绑定了，但是他还是有缺陷的。只能对属性进行数据劫持，所以需要深度遍历整个对象，对于数组不能监听到数据的变化，虽然Vue中确实能检测到数组数据的变化，但是其实是使用了hack的办法，并 且也是有缺陷的。**

**反观Proxy就没以上的问题，原生支持监听数组变化，并且可以直接对整个对象进行拦截，所以在Vue3.0中使用Proxy替换 Obeject.defineProperty**

**简述路由原理**

**前端路由就是监听 URL 的变化，然后匹配路由规则， 显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式  
hash 模式和history 模式**

**像www.example.com/#/index就是 Hash URL，当 ## 后面的哈希值发生变化时，不会向服务 器请求数据，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面。  
而www.example.com/index就是History 模式，它是HTML5新推出的功能，比之HashURL更加美观。**

**谈谈Virtual Dom（虚拟DOM）的意义及原理**

**意义：直接通过JS操作DOM对象会对性能损耗很大，此时，我们可以通过JS对象模拟DOM对象，优化性能**

**原理：**

**Virtual Dom：如果需要对比两个完整的DOM多叉树，时间复杂度就是O（n^3）。React的核心就是通过diff算法调和，优化Virtual Dom，其团队优化了普通的DOM多叉树比较，将时间复杂度降低至O（n），其核心就是对比同层的节点，而不是跨层对比，Vue2.0中也引入了Virtual Dom算法，它是基于snabbdom算法修改的**

**Virtual Dom中的Diff算法过程：**

**首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个 节点添加索引，便于最后渲染差异，****一旦节点有子元素，就去判断子元素是否有不同**

**Virtual Dom算法的实现步骤**

* **通过JS来模拟创建DOM对象**
* **判断两个对象的差异**
* ****渲染差异****