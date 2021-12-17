---
title:  Nginx常用指令，基本配置，反向代理 
date:  2021-03-16 12:19:0910-1002-1011-2509-1802-1911-1703-1406-0410-1310-2508-3104-1411-1608-0605-3011-0605-1809-2407-29 
---
**前言：近期公司整改项目，前端的项目和接口全部采用Nginx重新部署，这里就最近用到的Nginx服务器做一个知识点整理，推荐一个[Nginx中文文档](https://www.nginx.cn/doc/)网站**

**Nginx服务器就不多做介绍，直接进入正题，系统用的是window7 旗舰**

**首先，下载[Nginx](http://nginx.org/en/download.html)，这里我下载了1.18版本，解压后得到以下Nginx根目录，推荐把根目录放到环境变量中**  
![](https://img-blog.csdnimg.cn/20210313161631371.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210313161905672.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**然后，在根目录导航栏输入cmd并回车进入命令控制**  
![](https://img-blog.csdnimg.cn/20210313162218840.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**常用命令：  
nginx -t：检验配置文件  
nginx -v：显示版本  
start nginx：开启服务器  
nginx -s stop：快速关闭服务器  
nginx -s quit：正常关闭服务器  
nginx -s reload：重载配置文件**

**之后，我们输入nginx start，系统会闪过一个命令控制台然后自动关闭，此时打开任务管理器，在进程中找得到nginx.exe，说明开启成功，在浏览器中打开127.0.0.1或localhost就会显示nginx欢迎页说明运行成功**  
![](https://img-blog.csdnimg.cn/20210313164140215.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210313164415616.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**下面介绍一下基本配置  
打开根目录下的conf文件夹，用编辑器打开nginx.conf**  
![](https://img-blog.csdnimg.cn/20210313165533913.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210313165550480.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**代理服务：**

**以下代码可以修改代理网站的路径，访问默认的80端口会定向到html文件夹下的index.html文件，也就是nginx欢迎页，达到代理效果**

```
    server {
        listen       80;#监听端口
        server_name  localhost;#监听域名访问

        location / {
            root   html;#代理文件夹
            index  index.html index.htm;#代理文件
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

**反向代理：**

**使用上面的代码稍作修改，实现反向代理功能，输入[http://127.0.0.1:1024/baidu](http://127.0.0.1:1024/baidu)即可访问百度**

```
server {
        
        listen       1024;#监听端口
        server_name   localhost;
        location /baidu {
            proxy_pass https://www.baidu.com/;#反向代理baidu网址
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

![](https://img-blog.csdnimg.cn/2021031317553334.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**https服务搭建可参考之前的[搭建一个线上版远程视频聊天](https://blog.csdn.net/time_____/article/details/108050452)中的https搭建**

**以上就是我对nginx基础知识的整理，希望会对你有帮助**