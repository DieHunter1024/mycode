---
title:  Node（一）初识 
date:  2018-11-27 14:44:4805-1912-0511-2508-2310-1205-2706-0312-1208-0312-0712-1709-0411-0902-0203-1211-28 
---
Node是一个JavaScript的运行环境（平台）；不是一个框架或语言。  
配置环境：可以先下载一个NVM（Node版本管理工具），GitHub上有下，附上地址（[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)）。  
下载安装之后先在安装的根目录配置TXT文件（settings.txt）  
`root 配置为当前 nvm.exe 所在目录 path 配置为 node 快捷方式所在的目录 arch 配置为当前操作系统的位数（32/64)`

然后配置环境变量（有时安装后自动配置了）；

通过 window+r 输入 sysdm.cpl；

在path中添加：

`NVM_HOME = 当前 nvm.exe 所在目录`

`NVM_SYMLINK = node 快捷方式所在的目录`

`PATH += %NVM_HOME%;%NVM_SYMLINK%;`

安装完成后在CMD中输入nvm -v查看是否安装成功。

然后就可以安装node.js了：nvm install node@版本号（会自动安装npm）

之后用nvm -ls查看当前nvm管理的node版本，用nvm use node版本号来切换版本  
用nvm uninstall 版本号删除相应的node；

安装好了之后就可以开始上路啦~