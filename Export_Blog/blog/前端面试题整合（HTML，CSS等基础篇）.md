---
title:  前端面试题整合（HTML，CSS等基础篇） 
date:  2020-10-30 17:41:3811-1908-1510-1409-1406-0407-2204-2206-1211-0608-1103-0904-2908-1510-1009-0310-0710-1509-21 
---
* **浏览器的内核**

  **IE: trident内核，Firefox：gecko内核，Safari:webkit内核，Opera:以前是presto内核，Opera现已改用Google Chrome的Blink内核，Chrome:Blink(基于webkit，Google与Opera Software共同开发)**

* **HTML中的Doctype有什么作用  
此标签可告知浏览器文档使用哪种HTML或XHTML规范。（重点：告诉浏览器按照何种规范解析页面）**

* **div+css的布局较table布局有什么优点  
改版的时候更方便 只要改css文件。 页面加载速度更快、结构化清晰、页面显示简洁。 表现与结构相分离。 易于优化（seo）搜索引擎更友好，排名更容易靠前**

* **img的alt与title有何异同？ strong与em的异同？  
alt(alt text):为不能显示图像、窗体或applets的用户代理（UA），alt属性用来指定替换文字。替换文字的语言由lang属性指定。(在IE浏览器下会在没有title时把alt当成 tool tip显示)  
title(tool tip):该属性为设置该属性的元素提供建议性的信息。  
strong:粗体强调标签，强调，表示内容的重要性。  
em:斜体强调标签，更强烈强调，表示内容的强调点。**

* **渐进增强和优雅降级之间的不同  
渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。 优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。 区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。**

* **为什么利用多个域名来存储网站资源会更有效？  
CDN缓存更方便  
突破浏览器并发限制  
节约cookie带宽  
节约主域名的连接数，优化页面响应速度  
防止不必要的安全问题**

* **cookies，sessionStorage和localStorage的区别  
sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。**

* **src与href的区别  
简单来讲，src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。**  
**src：src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。  
当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。  
harf：href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加 <link href=”common.css” rel=”stylesheet”/> 那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式。**

* **什么是微格式，谈谈理解  
微格式（Microformats）是一种让机器可读的语义化XHTML词汇的集合，是结构化数据的开放标准。是为特殊应用而制定的特殊格式。优点：将智能数据添加到网页上，让网站内容在搜索引擎结果界面可以显示额外的提示。**

* **在css/js代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理？  
dns缓存，cdn缓存，浏览器缓存，服务器缓存**

* **优化大型网站加载图片方案**  
**图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。 如果图片为css图片，可以使用CSSsprite，SVGsprite，Iconfont、Base64等技术。 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。 如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致。**

* **HTML结构的语义化**  
**html本身是没有表现的，我们看到例如<h1>是粗体，字体大小2em，加粗；<strong>是加粗的，不要认为这是html的表现，这些其实html默认的css样式在起作用，所以去掉或样式丢失的时候能让页面呈现清晰的结构不是语义化的HTML结构的优点，但是浏览器都有有默认样式，默认样式的目的也是为了更好的表达html的语义，可以说浏览器的默认样式和语义化的HTML结构是不可分割的。**

* **有哪项方式可以对一个DOM设置它的CSS样式  
外部样式表，引入一个外部css文件  
内部样式表，将css代码放在 <head> 标签内部  
内联样式，将css样式直接定义在 HTML 元素内部**

* **CSS都有哪些选择器**  
**派生选择器（用HTML标签申明）  
id选择器（用DOM的ID申明）  
类选择器（用一个样式类名申明）**  
**属性选择器（a\[rel = "external"\]）  
除了前3种基本选择器，还有一些扩展选择器，  
包括 后代选择器（利用空格间隔，比如div .a{ }）  
相邻选择器（利用加号间隔，h1 + p）  
群组选择器（利用逗号间隔，比如p,div,#a{ }）  
通配符选择器（ \* ）  
伪类选择器（a: hover, li: nth - child）**

* **CSS中可以通过哪些属性定义，使得一个DOM元素不显示在浏览器可视范围内  
设置display属性为none，或者设置visibility属性为hidden  
设置宽高为0，设置透明度为0，设置z-index位置在-1000em**

* **超链接访问过后hover样式就不出现的问题是什么？如何解决？**  
**被点击访问过的超链接样式不在具有hover和active了,解决方法是改变CSS属性的排列顺序: L-V-H-A（link,visited,hover,active）**

* **什么是Css Hack？ie6,7,8的hack分别是什么？  
针对不同的浏览器写不同的CSS code的过程，就是CSS hack。  
示例如下：**

  ```css
     #test{   
          width:300px;   
          height:300px;   
          background-color:blue;      /*firefox*/
          background-color:red\9;      /*all ie*/
          background-color:yellow;    /*ie8*/
          +background-color:pink;        /*ie7*/
          _background-color:orange;       /*ie6*/    }  
          :root #test { background-color:purple\9; }  /*ie9*/
  @media all and (min-width:0px)
       { #test {background-color:black;} }  /*opera*/
  @media screen and (-webkit-min-device-pixel-ratio:0)
  { #test {background-color:gray;} }       /*chrome and safari*/
  ```

* **行内元素和块级元素的具体区别是什么？**  
**块级元素(block)特性： 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示; 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;  
内联元素(inline)特性： 和相邻的内联元素在同一行;**

* **什么是外边距重叠？有什么效果  
外边距重叠就是margin-collapse。 在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。  
折叠结果遵循下列计算规则： 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。 两个外边距一正一负时，折叠结果是两者的相加的和。**

* **rgba()和opacity的透明效果有什么不同？  
rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度， 而rgba()只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）**

* **水平垂直居中一个浮动元素**

  **[方法一：](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label0http:/www.tuicool.com/articles/_blank)[position](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label0http:/www.tuicool.com/articles/_blank)[加](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label0http:/www.tuicool.com/articles/_blank)[margin](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label0http:/www.tuicool.com/articles/_blank)**

  **[方法二：](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label1http:/www.tuicool.com/articles/_blank)[diaplay:table-cell](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label1http:/www.tuicool.com/articles/_blank)**

  **[方法三：](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label2http:/www.tuicool.com/articles/_blank)[position](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label2http:/www.tuicool.com/articles/_blank)[加](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label2http:/www.tuicool.com/articles/_blank)[transform](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label2http:/www.tuicool.com/articles/_blank)**

  **[方法四：](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label3http:/www.tuicool.com/articles/_blank)[flex;align-items: center;justify-content: center](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label3http:/www.tuicool.com/articles/_blank)**

  **[方法五：](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label4http:/www.tuicool.com/articles/_blank)[display:flex;margin:auto](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label4http:/www.tuicool.com/articles/_blank)**

  **[方法六：纯](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label5http:/www.tuicool.com/articles/_blank)[position](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label5http:/www.tuicool.com/articles/_blank)**

  **[方法七：兼容低版本浏览器，不固定宽高](http://www.cnblogs.com/xianyulaodi/p/5863305.html_label6http:/www.tuicool.com/articles/_blank)**

* **讲一下你对盒模型的了解**  
**有padding、margin、border、content属性  
box-sizing: content-box 是W3C盒子模型，元素的width和height属性只包含内容content部分，不包含内边距padding和边框border部分。  
box-sizing: border-box 是IE盒子模型，元素的width和height属性同时包含内容content，内边距padding和边框border部分**

* **position定位**  
**Relitive: 相对于自身,会指引子元素相对于他自身进行定位  
Absolute: 根据父元素的relitive进行定位  
Fixed:现对于window窗口定位**

* **rem原理与em/ vw/vh 区别**  
**Rem是基于根元素的字体大小发生改变,而em是基于body的字体大小发生改变  
1.因为html5和css3引入视口的概念来代替显示器的物理尺寸。通过在meta标签上的设置，视口的长宽可以跟设备的物理分辨率相等，也可以不相等（以便手机上可以实现用两个手指来放大会缩小页面），可根据需要灵活掌握。在PC中，视口的长宽则是跟浏览器窗口的物理分辨率恒等的。  
2\. 1vw等于视口宽度（viewport width）的百分之一，也就是说100vw就是视口的宽度。同理，1vh等于视30px改成5vw，意思就是窗口宽度的5%，同理10vw。  
3.不过由于vw和vh是css3才支持的长度单位，所以在不支持css3的浏览器中是无效的口高度（viewport height）的百分之一。**

* **Css3的动画**  
**@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。**

* **Sass、LESS是什么，优点**  
**他们是CSS预处理器。他是CSS上的一种抽象层。他们是一种特殊的语法/语言编译成CSS。  
例如Less是一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数. LESS 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可一在服务端运行 (借助 Node.js)。  
优点：  
结构清晰，便于扩展。  
可以方便地屏蔽浏览器私有语法差异。  
封装对浏览器语法差异的重复处理，减少无意义的机械劳动。  
可以轻松实现多重继承。  
完全兼容 CSS 代码，可以方便地应用到老项目中。  
LESS 只是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译。**

* **display:none与visibility:hidden的区别是什么？**  
**display : 隐藏对应的元素但不挤占该元素原来的空间。  
visibility: 隐藏对应的元素并且挤占该元素原来的空间。  
即是，使用CSS display:none属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”;而使用visibility:hidden属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。**

* **CSS中link和@import的区别  
Link属于html标签，而@import是CSS中提供的  
在页面加载的时候，link会同时被加载，而@import引用的CSS会在页面加载完成后才会加载引用的CSS  
@import只有在ie5以上才可以被识别，而link是html标签，不存在浏览器兼容性问题 Link引入样式的权重大于@import的引用（@import是将引用的样式导入到当前的页面中）**

* **BFC是什么**  
**BFC（块级格式化上下文），一个创建了新的BFC的盒子是独立布局的，盒子内元素的布局不会影响盒子外面的元素。在同一个BFC中的两个相邻的盒子在垂直方向发生margin重叠的问题 BFC是指浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外元素的布局，这个渲染区域只对块级元素起作用**

* **html常见兼容性问题**  
**1.双边距BUG float引起的 使用display  
2.3像素问题 使用float引起的 使用dislpay:inline -3px  
3.超链接hover 点击后失效 使用正确的书写顺序 link visited hover active  
4.Ie z-index问题 给父级添加position:relative  
5.Png 透明 使用js代码 改  
6.Min-height 最小高度 ！Important 解决’  
7.select 在ie6下遮盖 使用iframe嵌套  
8.为什么没有办法定义1px左右的宽度容器（IE6默认的行高造成的，使用over:hidden,zoom:0.08 line-height:1px）  
9.IE5-8不支持opacity，解决办法： .opacity { opacity: 0.4 filter: alpha(opacity=60); /\* for IE5-7 \*/ -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /\* for IE 8\*/ }  
10\. IE6不支持PNG透明背景，解决办法: IE6下使用gif图片**

* **行内元素有哪些?块级元素有哪些?空(void)元素有哪些？**  
**块级元素：address – 地址 blockquote – 块引用 center – 举中对齐块 dir – 目录列表 div – 常用块级容易，也是css layout的主要标签 dl – 定义列表 fieldset – form控制组 form – 交互表单 h1 – 大标题 h2 – 副标题 h3 – 3级标题 h4 – 4级标题 h5 – 5级标题 h6 – 6级标题 hr – 水平分隔线 isindex – input prompt menu – 菜单列表 noframes – frames可选内容，（对于不支持frame的浏览器显示此区块内容） noscript – ）可选脚本内容（对于不支持script的浏览器显示此内容） ol – 排序表单 p – 段落 pre – 格式化文本 table – 表格 ul – 非排序列表  
行内元素:a – 锚点 abbr – 缩写 acronym – 首字 b – 粗体(不推荐) big – 大字体 br – 换行 em – 强调 font – 字体设定(不推荐) i – 斜体 img – 图片 input – 输入框 label – 表格标签 s – 中划线(不推荐) select – 项目选择 small – 小字体文本 span – 常用内联容器，定义文本内区块 strike – 中划线 strong – 粗体强调 sub – 下标 sup – 上标 textarea – 多行文本输入框 tt – 电传文本 u – 下划线 var – 定义变量  
知名的空元素：<br><hr><img><input><link><meta>鲜为人知的是： <area><base><col><command> <embed><keygen><param><source><track><wbr>**

* **前端页面有哪三层构成**  
**结构层 Html 表示层 CSS 行为层 js**

* **CSS哪些属性可以继承？**  
**可继承： font-size font-family color, UL LI DL DD DT;  
不可继承 ：border padding margin width height ;**

* **CSS优先级算法（权重）**  
**优先级就近原则，样式定义最近者为准  
载入样式以最后载入的定位为准  
!important> 内联 > id > class > tag**

* **高度自适应，宽度是高度的一半，如何布局**  
**利用padding-top/bottom/left/right属性在设置为百分比时按照父元素的宽度来进行设置，可以通过设置padding-top/bottom：100%；padding-left/right:50%;将元素撑开，使用需注意设置父元素的宽度，特别是在父元素的宽度是继承的情况下，也可更具情况只设置父元素的宽度而不设置高度来隐藏父元素；**

* **类似圣杯布局的多种代码方式**  
**圣杯布局是一种很常见的css布局。  
要求：  
1、上部和下部各自占领屏幕所有宽度。  
2、上下部之间的部分是一个三栏布局。  
3、三栏布局两侧宽度不变，中间部分自动填充整个区域。  
4、中间部分的高度是三栏中最高的区域的高度。**

  ```html
  浮动实现
  外层框架
  <div class="header">这里是头部</div>
  <div class="container"></div>
  <div class="footer">这里是底部</div>
  .header,.footer{
      height:200px;
      width:100%;
      background:red;
  }
  .container{
      padding-left:200px;
      padding-right:300px;
  }
  填充三栏
  这一步骤，首先给底部区域清除浮动，防止跟随上边的区域一起浮动。
  另外：把中，左，右三个区域设置成度浮动。给左右两块区域固定的宽度，中间部分的宽度设置成100%。
  这样实现下来，因为浮动的关系，[middle]会占据[container]的所有部分，而左右两块区域都会被挤到下面，但是，由于第一步设置了内边距的关系，[container]的左右各剩余了一块区域，且宽度与左右区域相同。
  <div class="header">这里是头部</div>
  <div class="container">
      <div class="middle">中间部分</div>
      <div class="left">左边</div>
      <div class="right">右边</div>
  </div>
  <div class="footer">这里是底部</div>

  .header,.footer{
      height:40px;
      width:100%;
      background:red;
  }
  .footer{
      clear:both;
  }
  .container{
      padding-left:200px;
      padding-right:300px;
  }.container div{
      float:left;
  }
  .middle{
      width:100%;
      background:yellow;
  }
  .left{
      width:200px;
      background:pink;
  }
  .right{
      width:300px;
      background:aqua;
  }
  移动左侧区域
  接下来要做的就是把左右两块区域挪到空出来的内边距空间里去。
  先移动左边，新加一个样式 margin-left:-100%。这样一来，因为浮动关系，就把左边块上移到了[middle]左侧，与其交织在一起，而右侧栏就自动往左移动。然后再给左侧栏一个偏移量，偏移量恰好是其宽度，这一步要给[container]的position设成relative
  <div class="header">这里是头部</div>
  <div class="container">
      <div class="middle">中间部分</div>
      <div class="left">左边</div>
      <div class="right">右边</div>
  </div>
  <div class="footer">这里是底部</div>
  .header,.footer{
      height:40px;
      width:100%;
      background:red;
  }
  .footer{
      clear:both;
  }
  .container{
      padding-left:200px;
      padding-right:300px;
  }
  .container div{
      postion:relative;
      float:left;
  }
  .middle{
      width:100%;
      background:yellow;
  }
  .left{
      width:200px;
      background:pink;
      margin-left:-100%;
      right:200px;
  }
  .right{
      width:300px;
      background:aqua;
  }
  移动右边
  同上一步的原理一样，把右侧区域也给弄上去，设置负外边距和本身宽度相同就行了。
  <div class="header">这里是头部</div>
  <div class="container">
      <div class="middle">中间部分</div>
      <div class="left">左边</div>
      <div class="right">右边</div>
  </div>
  <div class="footer">这里是底部</div>

  .header,.footer{
      height:40px;
      width:100%;
      background:red;
  }
  .footer{
      clear:both;
  }
  .container{
      padding-left:200px;
      padding-right:300px;
  }
  .container div{
      postion:relative;
      float:left;
  }
  .middle{
      width:100%;
      background:yellow;
  }
  .left{
      width:200px;
      background:pink;
      margin-left:-100%;
      right:200px;
  }
  .right{
      width:300px;
      background:aqua;
      margin-right:-300px;
  }

   


  flexbox弹性盒子实现
  弹性盒子用来实现圣杯布局特别简单。只需要把中间的部分用flex布局即可。
  <div class="header">这里是头部</div>
  <div class="container">
      <div class="left">左边</div>
      <div class="middle">中间部分</div>
      <div class="right">右边</div>
  </div>
  <div class="footer">这里是底部</div>

  .header,.footer{
      height:40px;
      width:100%;
      background:red;
  }
  .container{
      display: flex;
  }
  .middle{
      flex: 1;
      background:yellow;
  }
  .left{
  width:200px;
      background:pink;
  }
  .right{
      background: aqua;
      width:300px;
  }
  很简单，在写html的时候，因为不再涉及到浮动，只需要按照左中右的顺序来写就可以了。左右两块区域的宽度写死，把中间的区域的flex属性设置成1就可以了。
  css grid网格
  grid是一种新的布局方式，截止2018年初，绝大多数浏览器都已经支持css grid。
  其原理就是把页面的区域划分成一个一个的网格，就和围棋的棋盘一样。
  用网格来解决圣杯问题，可以摆脱弹性盒子时需要格外加一个[container]的问题，也就是左中右三款区域不需要在他们外边包装一个额外的div。
  <div id="header">header</div>
  <div id="left">left</div>
  <div id="middle">middle</div>
  <div id="right">right</div>     
  <div id="footer">footer</footer></div>
    
  body{
      display: grid;
  }
  #header{
      background: red;
      grid-row:1;
      grid-column:1/5;
  }
  #left{
      grid-row:2;
      grid-column:1/2;
      background: orange;
  }
  #right{
      grid-row:2;
      grid-column:4/5;
      background: cadetblue;
  }
  #middle{
      grid-row:2;
      grid-column:2/4;
      background: rebeccapurple
  }
  #footer{
      background: gold;
      grid-row:3;
      grid-column:1/5;
  }
  简单说一下代码的实现。回头会专门看一下css grid的细节。
  首先给最外层的body设成display:grid。当然，是外层父级元素即可，不一定是body。
  grid-row就是说由上到下，#header占据第1格，#left,#middle,#right占据第2格，#footer占据第3格。
  而grid-column表示，在横向从左向右，分成了五格。其中#header和#footer占据全部。#left占据第1格，#middle占据第2到第4格，#right占据第5格。
  不管是实现起来还是理解起来都很方便。
  ```