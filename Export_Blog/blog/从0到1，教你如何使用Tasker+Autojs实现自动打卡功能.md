---
title:  从0到1，教你如何使用Tasker+Autojs实现自动打卡功能 
date:  2021-10-24 10:24:2405-2602-0812-3008-1504-0710-2503-2007-1210-2212-1405-2404-2908-08 
---
**你是否有上下班总会忘记打卡或者迟到的困扰，这篇文章将带你感受一下自动化工具+JS的魅力  
首先声明：本文章不针对任何第三方软件，文章中的脚本只做学习，不做商用，侵删  
准备工作：**

* **安卓手机或模拟器，最好使用模拟器（推荐夜神模拟器安卓7的64位），因为手机条件会比较苛刻（需要root，和谷歌三件套）**
* **[Auto.js](https://hyb1996.github.io/AutoJs-Docs/#/)软件，或者其衍生产品[AutoX.js](https://kkevsekk1.github.io/AutoXJs-Docs/#/)**
* **Tasker，[中文站](https://taskerm.com/tasker-download)，[原网站](https://tasker.joaoapps.com/download.html)**
* **需要自动执行的软件，我用的是 \*人薪事**

**首先，咱们熟悉一下Auto.js的调试，官方文档已经写的很清楚了，我主要概述一下抓取组件调试的过程**  
**以AutoX.js为例，VScode安装[Auto.js-VSCodeExt-Fixed](https://marketplace.visualstudio.com/items?itemNameaaroncheng.auto-js-vsce-fixed)插件，按住ctrl+shift+p，输入auto即可进入插件的工具菜单，选择 ‘开启服务’，复制右下角服务ip及端口，就可以等待移动端连接了**

![](https://img-blog.csdnimg.cn/9bee191e758b4cd3b8ece0544e484de4.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_19,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/a2e5794c2b884ce78c5732ce2daeed2b.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**如果是用手机连接，需要开启：开发者工具>USB调试，模拟器则直接打开AutoXjs侧边栏的连接电脑，输入之前复制的服务ip及端口，开启调试模式**

![](https://img-blog.csdnimg.cn/d7def7bcb69c41dcb47f427a04296df4.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/9a96b69954bd4ec8b6cef6f44995cc83.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**打开悬浮窗，用于应用控件的抓取**

![](https://img-blog.csdnimg.cn/13ecdb82a57346b2a4b21882d18d1577.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/43ff76435efe44629fd688e038d39b12.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**以Tasker为例，点击悬浮窗的 ‘布局分析’ ，选择布局范围分析，AutoXjs会将当前页面中的可操作控件列举出来，此时通过js代码进行事件操作即可实现自动化控制**

![](https://img-blog.csdnimg.cn/d4441224f8ae46ea9350cc6cb77e46f1.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/593c0cef5a2b4e8fa145f4b954f78997.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/de46bd76d2674710a28a023a39f64a36.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/8bad4952fe734da689c9c6df0a62f15d.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**以搜索框为例，我们实现一个 模拟搜索 的诉求**  
![](https://img-blog.csdnimg.cn/e152d9f9ac5c41f4969cbd40c898a8fc.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/91c5330f47c34588bded1cc98cfcb0cb.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**根据官方文档，我们可以简单实现该功能**

```javascript
const appName = "Tasker",
  getSearchBtn = () => desc("搜索 Tasker"), //搜索按钮，desc文本查找控件
  getSearchInput = () => id("filter_text"), //输入框
  startSearchBtn = () => id("search"), //开始查询按钮
  str = "打卡";
console.log("launchApp:" + appName, launchApp(appName)); //打开Tasker app
console.log("getSearchBtn", getElem(getSearchBtn()).click()); //点击搜索按钮
console.log("getSearchInput", getElem(getSearchInput()).setText(str)); //输入关键字
console.log("startSearchBtn", getElem(startSearchBtn()).click()); //点击开始搜索按钮
function getElem(ele) {
  return ele.findOne();
}
```

**效果如下：**![](https://img-blog.csdnimg.cn/7df4a701b77047858ea9285e91d4922e.gif)

**接着，咱们照葫芦画瓢，参照文档使用模拟动作实现操控其他软件的功能，比如每次执行脚本时，都会自动在打卡软件中打卡（源码放在结尾）**

![](https://img-blog.csdnimg.cn/d4a86752a9584193b0752bd2f0863537.gif)

**AutoX.js已经帮助我们实现了半自动打卡，距离我们的目标又近了一步**

**下面我们需要使用Tasker配合AutoX.js达到触发某（些）条件时打卡即可**

**打开tasker，新建任务test**

![](https://img-blog.csdnimg.cn/46f44558066445b5ab7201052b25aefd.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/bc6be66ae5a14c139fcc7e0f06a5b9fc.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/ed1171dec93c4778a70a8d1389e07cb4.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**在任务编辑中新建系统操作>发送意图，这里我新建了一个android.intent.action.tasker的广播，用于和AutoX交互**

![](https://img-blog.csdnimg.cn/039cb576adaa42c8b4ed8d1559678da1.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/0f6accab8a1d4cdeac7e7c686ce98f29.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/67dc34fc45e94e43903bac91b2d85d04.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**我们在AutoX中新建一个脚本触发事件，当有应用触发android.intent.action.tasker时，执行这个打卡脚本**

![](https://img-blog.csdnimg.cn/48b46af346ca416d8dcc6292c4f531ca.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/d38d83d8995d455aabc5624497fb5a63.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/a0103ebd96d04e39ad82e87e650c9517.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/cb4e781638cc41e49b5e64e529197309.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**然后我们在Tasker中运行这个任务用来触发AutoX执行脚本**

![](https://img-blog.csdnimg.cn/d5672eb6b10140a9b2acbe6b526ce069.gif)

**至此，使用Tasker连接AutoX这块已经完成，接下来就是触发任务的条件了  
既然是自动打卡，肯定与时间地点有关系。所以，我们在Tasker的配置文件中新建配置，配置时间，和地点（需要谷歌三件套），并选择任务，当达到特定时间地点时，Tasker就会触发打卡脚本**

![](https://img-blog.csdnimg.cn/4264d57781be47dd85dd29b046198b9f.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/cfe61ae900ee464a829c12517f835e75.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**写在最后：**

**使用Tasker+Autojs实现打卡固然好用，但是其对手机要求较高，如果你的手机恰好root，并装了谷歌三件套，使用起来会比较方便。其他同学推荐使用安卓模拟器实现。**

**源码：**[myCode: 一些小案例 - Gitee.com](https://gitee.com/DieHunter/myCode/tree/master/AutoJs&Tasker)

**如果这篇文章对你有帮助，请帮忙点个赞！感谢**