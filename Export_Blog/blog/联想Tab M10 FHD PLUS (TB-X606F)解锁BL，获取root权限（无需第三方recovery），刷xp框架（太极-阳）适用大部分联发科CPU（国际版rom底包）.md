---
title:  联想Tab M10 FHD PLUS (TB-X606F)解锁BL，获取root权限（无需第三方recovery），刷xp框架（太极-阳）适用大部分联发科CPU（国际版rom底包） 
date:  2020-11-03 10:30:1711-0410-3105-3110-2406-0601-29 
---
**注意：此文章仅作为学习和参考，造成的所有后果与本人无关，在进行所有操作之前请进行备份，备份，备份！！！其次请确保你有一定的刷机基础，如救砖刷机，线刷，卡刷。如果是解锁BootLoader一定会双清，如果你是国行版的，并且使用该教程，数据一定会双清，请做好抉择！！！并备份文件！！！！！**

**前言：5月份的时候在网上买了个联想M10 FHD PLUS平板（国行版），当时想找root方法拓展平板更多功能，发现几乎查不到教程，在国外网站也只有一些比较模糊的教程，并且由于当时工作较忙，也就没有深入研究教程。  
其中包括[https://forum.xda-developers.com/general/help/lenovo-tb-x605f-magisk-root-t3992477](https://forum.xda-developers.com/general/help/lenovo-tb-x605f-magisk-root-t3992477)  
和[https://forum.frandroid.com/topic/275557-root-lenovo-tab-m10-fhd-plus-tb-x606f/](https://forum.frandroid.com/topic/275557-root-lenovo-tab-m10-fhd-plus-tb-x606f/)  
之前照着这两个教程发现无法达到目的，但是还是感谢这两个作者提供的思路**

**时隔五个月，我再次搜索M10 FHD PLUS root教程时找到了相关教程  
[https://forum.frandroid.com/topic/275622-tuto-bootloader-et-root-du-lenovo-tab-m10-fhd-plus-tb-x606f-sans-twrp/](https://forum.frandroid.com/topic/275622-tuto-bootloader-et-root-du-lenovo-tab-m10-fhd-plus-tb-x606f-sans-twrp/)  
国际版rom刷机包（自带谷歌全套，国行版无法安装谷歌套件）：[https://mirrors.lolinet.com/firmware/lenovo/Tab\_M10\_FHD\_Plus\_2nd\_Gen/TB-X606F/](https://mirrors.lolinet.com/firmware/lenovo/Tab_M10_FHD_Plus_2nd_Gen/TB-X606F/)  
联想官方软件和驱动：  
[https://pcsupport.lenovo.com/us/zh/products/tablets/m-series-tablets/tab-m10-fhd-plus/downloads/driver-list/component?name=%E8%BB%9F%E9%AB%94%E5%8F%8A%E5%85%AC%E7%94%A8%E7%A8%8B%E5%BC%8F](https://pcsupport.lenovo.com/us/zh/products/tablets/m-series-tablets/tab-m10-fhd-plus/downloads/driver-list/component?name%E8%BB%9F%E9%AB%94%E5%8F%8A%E5%85%AC%E7%94%A8%E7%A8%8B%E5%BC%8F)  
联想官方论坛：  
[https://club.lenovo.com.cn/search.php?mod=forum&searchid=482&orderby=lastpost&ascdesc=desc&searchsubmit=yes&kw=M10](https://club.lenovo.com.cn/search.php?modforum&searchid482&orderbylastpost&ascdescdesc&searchsubmityes&kwM10)**

**获取root及xp后的效果**  
![](https://img-blog.csdnimg.cn/20201027092214825.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027092235266.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027092304729.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**以下是我获取root及xp的完整过程（如果要获取root权限，请确保你有一定的刷机基础，并可以救砖刷机，因为之后的操作可能会使你的机器变砖，我就踩了个坑，后面会说到）：**

**准备工作**

* **电量充足的联想Tab M10 FHD PLUS平板**
* **type-c数据线**
* **电脑**
* **[国际版官方ROM](https://mirrors.lolinet.com/firmware/lenovo/Tab_M10_FHD_Plus_2nd_Gen/TB-X606F/)**
* **adb工具**
* **magisk.apk**

**adb工具：****[https://gitee.com/DieHunter/myCode/tree/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo](https://gitee.com/DieHunter/myCode/tree/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo)（已集成magisk\_patched.img）**

**首先将平板的adb和OEM打开，这两者都需要先打开开发者模式，点击七次版本号，在下图第二张图中会出现开发者选项，点进去就是图四。**  
![](https://img-blog.csdnimg.cn/20201027085658393.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027085729843.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027085751969.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027085827504.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**其次，使用type-c数据线将平板连接电脑，等待安装驱动，充电选项选择文件传输，当计算机出现图四时，勾选一律允许，并点确定**

![](https://img-blog.csdnimg.cn/20201027090259160.png)![](https://img-blog.csdnimg.cn/20201027090804662.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027090843326.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/2020102709103063.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**然后，解锁BootLoader：打开adb工具文件夹，其中步骤如下图  
输入adb devices，查找已连接设备**  
![](https://img-blog.csdnimg.cn/20201027104156733.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027104448291.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**运行 adb reboot bootloader，重启至bootloader模式，出现以下效果表示进入成功，或者也可以在关机状态下按住开机键+音量减，直至震动开机，松开后会显示以下图示**

![](https://img-blog.csdnimg.cn/20201027105412735.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**输入 fastboot flashing unlock达到以下效果，按下音量下键即可解锁BootLoader，这里我第二次手贱，按了一下，导致系统恢复出厂设置，注意：在这步之前备份还来得及，如果有重要文件，请一定要备份！！！（这里我已经吃了两次亏了），这里会格式化设备分区**

![](https://img-blog.csdnimg.cn/2020102711090716.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027111014770.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**运行fastboot reboot重启设备至初始化界面，第一次开机会等待一段时间  
以上就是完整的BootLoader解锁过程，下一步将对magisk\_patched刷入，获取root权限，需要保证boot镜像与当前系统对应，也就是说如果你是国行平板，必须使用国行ROM进行解压并提取boot镜像，我这里没有找到国行包，并且需要谷歌套件，所以我索性直接重新刷了国际版ROM包**

**重启成功后把之前的usb调试和文件传输打开，需要更新最新版magisk，把网盘中的magisk.apk放到平板根目录下，并在平板中安装，这里建议下载一个快传软件通过手机发送软件，打开Magisk，更新软件。  
点击安装，选择当前系统镜像中解压的boot.img文件，等待magisk生成magisk\_patched.img文件至download文件夹下，复制该文件到电脑adb根目录下，就可以正式开始刷root权限了**

**这里踩了个坑：由于我是国行的平板，安装的ROM是国内版包，但是由于我之前不知道我下载的系统包是国际版的，包内的boot.img是不同的，导致机器刷成后，系统崩溃（打开任何软件都会重启），但是我又找不到国行的ROM，于是干脆刷成了国际版，教程在后面会贴出，所以一定要保证使用的boot.img是正在使用的系统中解压的，或者直接刷成国际版ROM，地址在上面都已经给出。**  
![](https://img-blog.csdnimg.cn/20201027112320475.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027122524984.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027135944177.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/2020102714004024.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027140115938.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027143930662.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027144115917.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20201027140351807.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**获取root权限的准备工作完成，下面开始操作  
运行adb reboot bootloader 启动到BootLoader模式下**

**执行 fastboot flash boot magisk\_patched.img 刷入magisk生成的img文件**

**最后执行 fastboot reboot 重启**

![](https://img-blog.csdnimg.cn/20201027145003846.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**如果重启后打开Magisk显示以下图示，那么恭喜你，root成功，获取root权限之后能做些啥就不用多说了**  
![](https://img-blog.csdnimg.cn/20201027145313293.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027145335917.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**下一步说说xposed框架支持，安卓较高版本用的是[太极](https://www.taichi-app.com/#/index)，在官网下载太极安装并打开，这里需要安装一个太极阳Magisk模块，官网上有详细的教程  
我的[仓库上](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/magisk-taichi-v6.2.3.zip)也有上传，把zip包放在平板根目录，使用magisk加载模块并刷入系统**

![](https://img-blog.csdnimg.cn/20201027151809289.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027151746732.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027151830426.jpeg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**magisk刷入zip模块过程，首先在magisk首页选择模块，选择本地安装，找到太极阳模块zip，自动安装，点击重启即可**

![](https://img-blog.csdnimg.cn/20201027153549665.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027153642142.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027153748945.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027153907470.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**最后附上简易的线刷救砖教程（百度网盘都有详细的教程，理论支持大部分联发科CPU）  
准备工作（文件都在百度网盘中）：**

* **官方ROM包（我这里用的是上面链接中ROM包）**
* **线刷工具flash\_tool**
* **驱动包**

**首先将官方ROM解压**

![](https://img-blog.csdnimg.cn/2020102717292355.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**其次安装驱动**

![](https://img-blog.csdnimg.cn/20201027211904613.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027211806989.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027211833562.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**打开flash\_tool程序,并进行以下操作（相关操作在百度云链接都有），这里简单介绍一下，图二是正在刷机，图三是刷机完成  
如果点了下载没反应，请将平板或手机关机**

![](https://img-blog.csdnimg.cn/20201027173858340.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/202010271744497.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20201027174635985.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**总结：无论是解锁bl，刷机，root，xp框架一定要备份好数据，刷机无情，数据无价！！！为了完成这篇文章，我自己就尝到了教训，解锁时不小心双清了！如果文章内容对你有帮助，请帮忙点个赞~非常感谢！！！**