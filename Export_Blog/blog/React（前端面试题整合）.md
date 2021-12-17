---
title:  React（前端面试题整合） 
date:  2020-12-16 09:03:2611-0702-1112-1011-1111-2811-0611-2311-0310-3011-04 
---
**谈谈对react的理解**

**react是基于v（视图层）层的一款框架，虚拟dom和diff算法  
react特点：  
声明式设计  
高效，其中高效以现在虚拟dom，最大限度减少与dom的交互和diff算法  
灵活，体现在可以与已知的框架或库很好的配合  
JSX，是js语法的扩展  
组件化，构建组件，是代码的更容易得到复用，比较建议在大型项目的开发  
单项数据，实现单项数流，从而减少代码复用**

**react有哪几个生命周期**

**[自己的总结](https://blog.csdn.net/time_____/article/details/85253541)**

**分为三个阶段，初始，运行中，销毁**

**初始化：**

* **执行getDefaultProps钩子函数，执行一次，挂载属性props（无Dom元素，有组件相关的this但是无法获取数据，组件想要拥有默认属性可以通过这个钩子函数设置）**
* **执行getInitialState钩子函数，初始化自身状态state（同上，无Dom元素，有组件相关的this，但是无法获取数据，组件想要拥有状态只能通过这个钩子函数）**
* **componentWillMount（）挂载前（类似于Vue的created加beforeMount阶段，可以进行数据请求（ajax），做一些初始数据的获取和设置，并且在这里更改数据不会触发运行阶段的钩子函数，在这里还可以更改this的指向问题）**
* **render(构建组件的虚拟DOM结构进行编译)**
* ****componentDidMount（）挂载完成（有Dom元素，数据准备完毕，这里可以操作DOM，并且可以访问已经渲染的DOM，在这个钩子函数里面也可以进行对数据的获取）****

**运行中：**

* **componentWillReceiveProps函数：当props发生变化时调用（当接收到的属性发生变化时触发，可以在这里更改改变后的属性去做一些事情，比如更改自己的状态，在这里this上的属性还没有更新，要想使用新的数据需要从参数中得到）**
* **shouldComponentUpdate函数：主要做效率优化，控制组件是否随之更新，函数返回的true或false表示视图是否渲染，如：在函数中比较this.props.name（数据更新前）和props.name（数据更新后）对比，二者是否相同，从而避免重复渲染，加强优化**
* **componentWillUpdate函数：准备工作，多做一些调试工作，在props和state发生改变的时候执行，并且在render方法之前执行，但是你在这个钩子函数里不能更改状态，否则会造成死循环，类似Vue中的beforeUpdate render：重新渲染Dom**
* ****componentDidUpdate：页面更新渲染完成，组件的更新结束后执行,在这里可以操作更新完成后的dom，类似Vue的updated****

**组件销毁：**

* **componentWillUnmount：组件将要销毁，可以将定时器，事件等取消或结束 （ReactDOM.unmountComponentAtNode(node) 销毁节点中的组件）**

**props与state的区别**

**props是一个从外部传进组件的参数，由于React具有单向数据流，所以它的主要作用是从父组件向子组件传递数据，它是不可改变的。如果想要改变它，只能通过外部组件传入新的props来重新渲染子组件，否则子组件的props以及展现形式不会改变。 props除了可以传字符串、数字，还可以传数组，对象、甚至是回调函数。**

**state的主要作用是用于组件保存、控制以及修改自己的状态，它只能在constructor中初始化，state是可以被改变的。state放改动的一些属性，比如点击选中，再点击取消。类似的这种属性就可以放到state里。 没有state的叫做无状态组件，多用props少用state，多写无状态组件。 修改state的值时，必须通过setState()方法。当我们调用this.setState方法时，React会更新组件的数据状态state，并且重新调用render方法**

**主要区别：  
state是组件自己管理数据，控制自己的状态，值是可以改变的；  
props是外部传入的数据参数，不可变；  
相同点：**

* **props和state都是导出HTML的原始数据**
* **props和state都是确定性的，如果我们写的组件为同一props和state的组合生成了不同的输出，那么我们肯定在哪里做错了**
* **props和state更改都会触发渲染更新，这里讨论同一个组件内的props和state，即props是从外层组件获取的，而state是当前组件自己维护的（这里可以看做是共同点也可看做是不同点，因为虽然都是会触发渲染更新，但是如何更改的机制不一样）**
* **props和state都是纯JS对象（对象字面量，{}，我们会简称为对象；对于\[\]，我们会简称为数组），我们可以用typeof来判断他们，结果都是object**
* **可以从父组件得到初始值props和state的初始值**

**不同点：**

* **可以从父组件修改自组件的props，而不能从父组件修改自组件的state**
* **可以在组件内部分别对state和props设置初始值**
* **props不可以在组件内部修改，但state可以在内部修改**

**react组件之间如何传值？**

**[自己的总结](https://blog.csdn.net/time_____/article/details/85275221)**

**父组件向子组件传值，初步使用，这个是相当容易的，在使用 React 开发的过程中经常会使用到，主要是利用props来进行交流  
子组件向父组件传值，子组件控制自己的 state 然后告诉父组件的点击状态，然后在父组件中展示出来。  
没有任何嵌套关系的组件之间传值(事件总线，flux，redux)**

**React中，在setState后，发生了什么**

**当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。 这将启动一个称为和解（reconciliation）的过程。 和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的React元素树（可以将其视为 UI 的对象表示）。一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（diff）。 通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。**

**vue react angular 怎么检测数据变化的**

**Angular：****在angular版本里面还是采用脏值检测来检测数据的变更的，但是和angularjs不一样的是,angular引入了zone.js来处理数据的变更。性能可以达到angularjs脏值检测的3到10倍  
Vue：vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调  
React：react状态变化只能通过setState,调用setState就会更新状态重新渲染dom**

**Virtual Dom实现的原理**

**虚拟dom相当在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能  
用 javaScript对象结构表示dom树的结构；然后用这个树构建一个真正的dom树，插到文档中  
当状态变更的时候，重新构建一颗新的对象树。然后用新的树和旧的树进行比较，记录两颗树的差异  
把记录的差异之处重新进行dom 渲染 视图就更新了**

**如何实现Virtual Dom算法**

**树的递归：  
新的节点的tagName或者key和旧的不同，这种情况代表需要替换旧的节点，并且也不再需要遍历新旧节点的子元素了，因为整个旧节点都被删掉了，新的节点的tagName和 key（可能都没有）和旧的相同，开始遍历子树，没有新的节点，那么什么都不用做**

**判断属性的更改（具体分为三个步骤）：**

* **遍历旧的属性列表，查看每个属性是否还存在于新的属性列表中**
* **遍历新的属性列表，判断两个列表中都存在的属性的值是否有变化**
* **在第二步中同时查看是否有属性不存在与旧的属性列列表中**

**判断列表差异算法实现（这个算法是整个 Virtual Dom 中最核心的算法）：**

* **遍历旧的节点列表，查看每个节点是否还存在于新的节点列表中**
* **遍历新的节点列表，判断是否有新的节点**
* **在第二步中同时判断节点是否有移动**

**遍历子元素并创建标识：**

* **判断两个列表差异**
* **给节点打上标记**

**渲染差异：**

* **深度遍历树，将需要做变更操作的取出来**
* **局部更新 DOM**

**使用setState遇到的问题（异步）**

**this.setState()会调用render方法，但并不会立即改变state的值，state是在render方法中赋值的。所以执行this.setState()后立即获取state的值是不变的。同样的直接赋值state并不会触发更新，因为没有调用render函数。**

**解决方法：****setState(data，callback)，DOM渲染完成后调用第二个参数callback，解决异步问题**

**在react中，什么是高阶组件**

**高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。 高阶组件的作用，其实就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。高阶组件内部的包装组件和被包装组件之间通过 props 传递数据。**

**如何在React中访问DOM**

**在React的标签中可以通过ref={(ele) => this.ele= ele}接收放在实例上实际的 DOM 元素ele，通过this.ele访问原生ele标签，在React中，refs允许你直接访问DOM元素或组件实例。为了使用它们，可以向组件添加一个 ref 属性，该属性的值是一个回调函数，它将接收底层的 DOM 元素或组件的已挂接实例，作为其第一个参数。**

**React Native相对于原生的ios和Android有哪些优劣势**

**优势:  
它对比原生开发更为灵活，对比H5体验更为高效。  
跨平台，开发者只需学习一种语言就能轻易为任何平台高效地编写代码。  
替代传统的WebView，打开效率更高，和原生之间的交互更方便。  
多个版本迭代后的今天，它已经拥有了丰富第三方插件支持。  
React Native解决不了的，可以通过各位熟悉的原生来解决，互补益彰。  
更方便的热更新。**

**劣势:  
尽管是跨平台，但是不同平台Api的特性与显示并不一定一致。  
相对增大了app的体积。  
调试相对麻烦。  
Android上的兼容性问题。**

**React Native适合作为项目中的补充，而不是作为核心去开发APP。因为尽管是跨平台和快捷开发，但是以React Native为核心，去开发稍微偏中型以上的项目，后期维护的人员绝对不比原生的少多少，而且项目大了，体验依旧是个大问题。  
相反，把React Native作为项目开发中的补充，可以在一定程度上实现平台业务的统一，还有灵活的开发效率，补充原生的不足。**

**react-router有几种传参方式**

**[自己的总结](https://blog.csdn.net/time_____/article/details/85387384)**

**React Router 是一个基于React之上的强大路由库**

**传参方式：**

* **params：在编程式导航的push或replace中加 / : key，传递方式由路由匹配，只能传字符（JOSN处理），刷新界面依然保存**
* **query：在路由path处写{path：‘/admin’，query：{name：aaa，age：20}},无需动态路由（即，在路径处有个 /：key），刷新后不保存，可传任何数据**
* **state：类似query，在路由path处写{path：‘/admin’，state：{name：aaa，age：20}}，无需动态路由，刷新后保存，可传任何数据**

**react-router的实现原理是什么**

**当用户点击页面跳转时，react-router阻止了浏览器的默认跳转行为，而改用history模块的pushState方法去触发url更新，当执行history.push时，执行了注册的listener函数，listener中的setState函数也被执行，将当前url地址栏对应的url传递下去，当Route组件匹配到该地址栏的时候，就会渲染该组件，如果匹配不到，Route组件就返回null**

**react-router依赖基础是history库：  
老浏览器的history: 主要通过hash来实现，对应createHashHistory  
高版本浏览器: 通过html5里面的history，对应createBrowserHistory  
node环境下: 主要存储在memeory里面，对应createMemoryHistory**

**说说对Vuex，Flux和Redux的理解**

**Vuex是一个专为Vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化**

**Flux和Redux都不是必须和React搭配使用的，因为Flux和Redux是完整的架构，在学习React的时候，只是将React的组件作为Redux中的视图层去使用了**

**Flux和Redux区别：Redux是基于Flux实现的，Vuex是Redux的基础上进行改变，在Redux中我们只能定义一个store，在Flux中我们可以定义多个，在Redux中，store和dispatch都放到了store，在redux中本身就内置State对象**

**Redux和Vuex的区别：Vuex是在Redux的基础上进行改变，Vuex使用mutation来替换Redux中的reducer，Vuex有自动渲染的功能**

**一个Flux应用包含四个部分：**

**Dispatcher，处理动作分发，维持 Store 之间的依赖关系  
Store，负责存储数据和处理数据相关逻辑  
Action，触发 Dispatcher  
View，视图，负责显示用户界面**

**Redux分为三部分****：**

**Action，就是一个单纯的包含 { type, payload } 的对象，type 是一个常量用来标示动作类型，payload 是这个动作携带的数据。  
Reducer 用来处理 Action 触发的对状态树的更改。**  
**Store 的作用就是连接上两者**

**vuex核心：**

**state：存放多个组件共享的状态（数据）  
mutations：存放更改state里状态的方法，用于变更状态，是唯一一个更改状态的属性  
getters：将state中某个状态进行过滤，然后获取新的状态，类似于vue中的computed  
actions：用于调用事件动作，并传递给mutation  
modules：主要用来拆分state**

**说明Flux和Redux的处理流程**

**Flux：**

* **用户通过与 view 交互或者外部产生一个 Action，Dispatcher 接收到 Action 并执行那些已经注册的回调，向所有 Store 分发 Action。**
* **通过注册的回调，Store 响应那些与他们所保存的状态有关的 Action。**
* **然后 Store 会触发一个 change 事件，来提醒 controller-views 数据已经发生了改变。**
* **Controller-views 监听这些事件并重新从 Store 中获取数据。**
* **这些 controller-views 调用他们自己的 setState() 方法，重新渲染自身以及组件树上的所有后代组件。**

**Redux：**

* **store通过reducer创建了初始状态**
* **view通过store.getState()获取到了store中保存的state挂载在了自己的状态上**
* **用户产生了操作，调用了actions 的方法**
* **actions的方法被调用，创建了带有标示性信息的action**
* **actions将action通过调用store.dispatch方法发送到了reducer中**
* **reducer接收到action并根据标识信息判断之后返回了新的state**
* **store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state**