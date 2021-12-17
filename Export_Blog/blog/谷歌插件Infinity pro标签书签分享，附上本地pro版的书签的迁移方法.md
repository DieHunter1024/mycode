---
title:  谷歌插件Infinity pro标签书签分享，附上本地pro版的书签的迁移方法 
date:  2020-10-24 10:24:1108-2610-1403-2707-0812-2706-0207-18 
---
**这个书签涵盖很多程序员必备网站，不止有前端**

**方法一：直接在浏览器打开即可：m.infinitynewtab.com?6iyA0H**

**![](https://img-blog.csdnimg.cn/20201021163112662.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201021163137551.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
方法二：谷歌infinity插件下载：[https://www.extfans.com/search/extensions/infinity/](https://www.extfans.com/search/extensions/infinity/)（推荐）**

**官网：[http://cn.infinitynewtab.com/](http://cn.infinitynewtab.com/)**

![](https://img-blog.csdnimg.cn/20201021173046620.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**![](https://img-blog.csdnimg.cn/20201021163040823.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)**

![](https://img-blog.csdnimg.cn/20201021174039112.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**安装方法：  
由于国内使用谷歌产品需要科学上网，这里分享一个谷歌插件代理网站  
把下载的压缩包解压，提取出crx后缀文件，打开设置中的扩展程序如下图，打开开发者模式，将crx文件拖拽进窗口，如果失败，多试几次**

![](https://img-blog.csdnimg.cn/20201021174204147.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20201021173915696.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20201021174828771.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**安装成功后可以用第三方账号登录，或者旧版infinity插件数据迁移**  
![](https://img-blog.csdnimg.cn/2020102117503358.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201021175123878.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**然而新版的infinity pro标签不支持备份成本地infinity文件，只能通过云端进行云更新和备份，作为web前端开发者当然是要打开F12一探究竟，于是我发现，断网的状态下，刷新页面不会请求数据渲染，也就是所有的书签都存在本地缓存中，于是我试了试查看localstorage，果然查到了一个infinity-icons的键值对，这里就是infinity\_pro的所有图标，如果需要复制别人的或者复制给别人，直接用此方法生成json文件或者直接用txt即可。**

**注意：粘贴了别人的书签后需要重启浏览器才有效**

![](https://img-blog.csdnimg.cn/20201023174209868.gif)![](https://img-blog.csdnimg.cn/20201023175424457.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**最后，分享一下我的infinity pro的书签json文件以及插件，希望对大家有帮助。  
地址：[https://gitee.com/DieHunter/myCode/tree/master/infinity\_pro](https://gitee.com/DieHunter/myCode/tree/master/infinity_pro)**