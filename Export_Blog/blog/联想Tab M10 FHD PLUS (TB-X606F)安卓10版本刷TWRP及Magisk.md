---
title:  联想Tab M10 FHD PLUS (TB-X606F)安卓10版本刷TWRP及Magisk 
date:  2021-11-04 16:53:3405-2611-0310-24 
---
**感谢博友提供的参考文章：[unofficial twrp 3.5.0 Root Lenovo TB-X606F X606FA - twrp unofficial](https://unofficialtwrp.com/twrp-3-5-0-root-lenovo-tb-x606f-x606fa/)  
接上篇文章：[联想Tab M10 FHD PLUS (TB-X606F)解锁BL，获取root权限（无需第三方recovery），刷xp框架（太极-阳）适用大部分联发科CPU（国际版rom底包）\_DieHunter1024的博客-CSDN博客](https://blog.csdn.net/time_____/article/details/109294693)**

**前言：解答一些博友的刷机问题及分享一下最近刷安卓10及root的经历**

1. **无法解锁BL：需要登录联想账号并在开发者选项下勾选OEM解锁（国际版可能会被墙）**
2. **win10打开fastboot模式（电脑设备管理中）驱动感叹号，没办法执行解锁，一直显示waiting for driver ：我是直接在fastboot模式下用驱动人生安装驱动，[我的仓库](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/Android%20ADB%20Interface_4.1.0.0_2021-11-04%2013%2040%2016.zip)里也有备份，驱动手动安装看这里：**[Windows 10 MTK VCOM USB Drivers for 32 & 64 bit + Driver install tutorial M2 | XDA Forums](https://forum.xda-developers.com/t/windows-10-mtk-vcom-usb-drivers-for-32-64-bit-driver-install-tutorial-m2.3267033/)**（嫌麻烦可以直接用驱动人生，或者直接用win7电脑进行）**
3. **刷完之后卡重启：很可能是因为包不兼容，建议选好机型后再刷，官方镜像地址：[lolinet mirrors - firmware, software, iso etc.](https://mirrors.lolinet.com/firmware/lenovo/Tab_M10_FHD_Plus_2nd_Gen/)（速度还行）**
4. **救砖时SP\_Flash\_Tool一直连不上：平板关机多试几次，也有可能是驱动没安装**

**下面我会分享一下新版的镜像刷TWRP及Magisk的过程，线刷救砖，解锁BL参考这篇文章：[联想Tab M10 FHD PLUS (TB-X606F)解锁BL，获取root权限（无需第三方recovery），刷xp框架（太极-阳）适用大部分联发科CPU（国际版rom底包）\_DieHunter1024的博客-CSDN博客](https://blog.csdn.net/time_____/article/details/109294693)**

**准备工作：**

* **电量充足的联想Tab M10 FHD PLUS平板**
* **type-c数据线**
* **电脑**
* **[官方ROM](https://mirrors.lolinet.com/firmware/lenovo/Tab_M10_FHD_Plus_2nd_Gen/TB-X606F/)（我这用的是TB-X606F\_S300376\_210909\_BMP）**
* **[adb和fastboot工具](https://gitee.com/DieHunter/myCode/tree/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/platform-tools)：platform-tools(里面已经集成了下面三个包)**
* **[TWRP包](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/350%20Lenovo%20X606F%20X606FA.rar)**
* **[vbmeta.img](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/vbmeta.zip)（禁用引导验证镜像，改启动镜像）**
* **[Magisk](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/Magisk-v21.4.zip)**

**首先打开platform-tools，输入cmd，执行adb reboot bootloader，重启平板电脑到BootLoader（fastboot）**

**等待平板启动到fastboot输入fastboot flash recovery recovery.img，刷入TWRP**

![](https://img-blog.csdnimg.cn/402ca9fbb33a47e097cdaf56afc14216.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**然后刷入[vbmeta.img](https://gitee.com/DieHunter/myCode/blob/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo/%E5%AE%89%E5%8D%9310/vbmeta.zip)：fastboot flash vbmeta vbmeta.img，这里碰到一个问题，刷入TWRP不生效，再刷一遍就好了**![](https://img-blog.csdnimg.cn/b57e8109372a483a96f9c540cfe11a0f.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**fastboot format userdata：清除用户数据**

![](https://img-blog.csdnimg.cn/d80277de29d0497ebbf953c8f3f3869e.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**完事之后直接进入recovery：fastboot reboot recovery  
方法一：依次点击 ‘高级’ => ‘adb sideload’ => ‘滑动滑块’开启卡刷包推送模式，此时在platform-tools中输入adb sideload Magisk-v21.4.zip（这种方法我没成功）**

![](https://img-blog.csdnimg.cn/adf7e1313cd04948937459d9f309cdc5.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_13,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/4fd39a454c914ca38e9527c06b825946.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_17,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/8f2a0d0b9acc41fca871320fbebc67de.jpg?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**方法二：开机状态下把Magisk-v21.4.zip放在平板文件系统根目录，进入recovery，点击安装，选择Magisk.zip包，滑动刷入，最后安装完成，重启系统，就搞定了**

![](https://img-blog.csdnimg.cn/f00fe340666e41f59f34f28bae3dc34d.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_13,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/006c362115754332aa92f6ba255fe5d8.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_13,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/5650c4370efa49f5a38dbbc16dbe0f15.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_13,color_FFFFFF,t_70,g_se,x_16)

![](https://img-blog.csdnimg.cn/b4cbaacf05714084872994ef0f359824.jpg?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/52c92a1f82e14879ad3b919582a1a1dd.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_16,color_FFFFFF,t_70,g_se,x_16)

**最后，提醒各位，刷机一定要做好备份，如果这篇文章对你有帮助，请给个三连支持一下吧。附上[仓库地址](https://gitee.com/DieHunter/myCode/tree/master/%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7/lenovo)，有任何问题都可以在评论区提出讨论**