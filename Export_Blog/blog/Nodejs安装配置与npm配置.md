---
title:  Nodejs安装配置与npm配置 
date:  2021-02-24 20:38:2608-2010-0404-1710-1407-3003-2804-2910-2504-1411-1106-1304-1505-1107-2901-1602-2710-1408-1904-20 
---
### 前言：

**该片文章主要介绍一下node环境的安装流程及排雷，为下篇TypeScript文章做铺垫**

### **环境安装：**

**这里我使用的是nvm（node管理工具）对node进行安装，直接一步到位，省去一些配置  
[我的gitee上的nvm托管地址](https://gitee.com/DieHunter/myCode/tree/master/Nvm%E5%B7%A5%E5%85%B7)  
当然也可以去[GitHub](https://github.com/coreybutler/nvm-windows/releases)或者[码云托管](https://gitee.com/mirrors/nvm)上下载nvm**

**下载好安装包后双击安装nvm，选择我同意，并点击下一步**  
![](https://img-blog.csdnimg.cn/2021022415321390.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**选择安装路径，点击下一步**  
![](https://img-blog.csdnimg.cn/20210224153246499.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**选择安装好后，node快捷方式的路径**  
![](https://img-blog.csdnimg.cn/20210224153421927.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**最后点击安装，途中若杀毒软件提示应用修改环境变量点击允许即可**  
![](https://img-blog.csdnimg.cn/20210224153536972.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**安装完成后在环境变量中多出以下变量，并且在cmd中输入nvm -version显示下图，说明安装成功**

![](https://img-blog.csdnimg.cn/20210224154223333.png)  
![](https://img-blog.csdnimg.cn/20210224154515847.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**下一步，我们设置一下nvm的下载镜像，提升其下载node的速度  
我们进入到nvm安装目录下，打开settings.txt，并在最后一行添加淘宝镜像路径，替换原始的下载地址**

```javascript
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

**替换完成后，我们就可以进行下一步的操作**  
![](https://img-blog.csdnimg.cn/20210224155119979.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**再次打开cmd，输入以下命令用于安装nodejs指定版本（注：win7不支持node v12版本以上的，win8、win10支持高版本的node，我的电脑是win7系统，所以至今为止，我能安装的最高版本是12.20.2）**

```
nvm install node@12.20.2
```

**显示以下结果就说明安装node和nvm成功了**  
![](https://img-blog.csdnimg.cn/20210224160250765.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**我们输入nvm use node版本号即可切换当前使用的node版本  
如：nvm use 12.20.2，控制台提示Now using node v12.20.2 (64-bit)说明切换成功**  
**​​​​此时我们运行node即可进入node环境，在node环境中连续按两次ctrl+c即可退出node**  
![](https://img-blog.csdnimg.cn/20210224160758258.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**node也可以正常运行后，我们来配置一下npm的一些属性  
打开cmd，输入npm -v，显示出版本号说明npm安装成功（npm一般是自动随node一起安装的）  
输入以下命令设置npm全局安装路径及缓存路径，具体根据自己需要进行配置，这里最好不要配置在node文件夹中，因为node版本会变化，下次又要重新配置**

```
全局依赖安装路径：npm config set prefix "D:\soft\nvm\global"
npm缓存路径：npm config set cache "D:\soft\nvm\cache"
```

**设置完成后，之后安装的全局依赖包都会在global文件夹下**  
![](https://img-blog.csdnimg.cn/20210224162743695.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**最后，我们设置npm镜像，有两种方式提速：第一种是使用cnpm（可以理解为下载速度更快的npm），第二种是设置npm代理淘宝镜像  
cnpm：打开cmd输入以下命令**

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

**后续可以使用cnpm进行依赖安装，如cnpm -i axios，但是如果项目一开始就使用cnpm，那么后续操作就必须都使用cnpm，不能换成npm下载，反之亦然**

**设置npm镜像：个人比较推荐这种方式，解决npm在国内对于某些包下载比较慢的问题  
同样打开cmd输入以下命令**

```
npm config set registry https://registry.npm.taobao.org
```

**至此，nodejs安装配置以及npm配置已经全部结束**