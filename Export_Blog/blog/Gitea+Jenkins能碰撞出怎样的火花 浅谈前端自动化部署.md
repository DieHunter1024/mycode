---
title:  Gitea+Jenkins能碰撞出怎样的火花？浅谈前端自动化部署 
date:  2021-11-28 02:16:0702-2011-2803-0710-2607-0108-1305-25 
---
**目录**

[前言：](#%E5%89%8D%E8%A8%80%EF%BC%9A)

[首先是搭建一个本地Git代码仓库](#%E9%A6%96%E5%85%88%E6%98%AF%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%9C%AC%E5%9C%B0Git%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93)

[接下来是Jenkins安装配置](#%E6%8E%A5%E4%B8%8B%E6%9D%A5%E6%98%AFJenkins%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE)

[自由风格项目构建（window批处理命令）](#%E8%87%AA%E7%94%B1%E9%A3%8E%E6%A0%BC%E9%A1%B9%E7%9B%AE%E6%9E%84%E5%BB%BA%EF%BC%88window%E6%89%B9%E5%A4%84%E7%90%86%E5%91%BD%E4%BB%A4%EF%BC%89)

[流水线项目构建](#%E6%B5%81%E6%B0%B4%E7%BA%BF%E9%A1%B9%E7%9B%AE%E6%9E%84%E5%BB%BA)

[写在最后](#%E5%86%99%E5%9C%A8%E6%9C%80%E5%90%8E)

---

### **前言**

**一个好的部署工具能帮助开发者提升效率，节省时间，本文将与大家分享私有化Git仓库搭建与Jenkins操作项目部署**

**准备工作：**

* [Java环境](https://www.runoob.com/java/java-environment-setup.html)
* [Node环境](https://blog.csdn.net/time_____/article/details/114024145)
* [Gitea](https://gitea.io/zh-cn/)
* [Jenkins](https://www.jenkins.io/zh/)
* [Nginx](https://blog.csdn.net/time_____/article/details/114750930)(部署前端页面)
* 服务器或者电脑（我这里是window系统+[公网映射](https://blog.csdn.net/time_____/article/details/114664920)搭建的本地服务器）

### **首先是搭建一个本地Git代码仓库**

**下载gitea并在需要安装的文件夹下打开，默认访问地址是127.0.0.1:3000**

![](https://img-blog.csdnimg.cn/d7f47672639740a59c0d31eca469b642.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**打开后选择一下数据库，并在对应文件夹下生成db文件（新建空白txt文件，改后缀名为db）**

![](https://img-blog.csdnimg.cn/3ba4bb763c50461c968b6550dce953b1.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**端口号和名称可以自定义改一下，最后点击安装，等待安装完成，再次进入，注册管理员账号就可以打开了，后面就和远程仓库操作方式一样了**

![](https://img-blog.csdnimg.cn/e1ee04fdb75b40348f7d69dcf2b45775.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/98c07ee92f9c407092b14fd640556f33.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/3349472540fc4e63b7dcbef4d1ace8b1.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

### **接下来是Jenkins安装配置**

**下载Jenkins并打开，这一步配置本地服务，设置本地端口号（默认是8080****），我这里是10240**

![](https://img-blog.csdnimg.cn/a328ca98998e4d939a109b2c7239c6cd.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_12,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/28fd23c1a98d405ea8173c6a9fc30b4a.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_12,color_FFFFFF,t_70,g_se,x_16)

**选择Java的jdk路径，并点击下一步安装**

![](https://img-blog.csdnimg.cn/102bbee908774cc48f967c8f7eb7b503.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_12,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/32574d29dbaf45788486344cc7dfa1bc.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_12,color_FFFFFF,t_70,g_se,x_16)

**完成后通过[http://localhost:8000](http://localhost:8000)进入主页，第一次进入Jenkins会进行初始化设置，直接复制本地地址用浏览器打开，然后输入到下面的输入框，点击继续（注意：如果考虑安装Jenkins数据的体积，可以新增环境变量JENKINS\_HOME，值改为其他盘符路径，后续Jenkins的数据会保存在此）**

![](https://img-blog.csdnimg.cn/5ad300359a2c4db8abc93bef751c2b73.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/37e9c3ef083143fda20565a9ad199c05.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**进入插件安装界面，建议先选择推荐插件，后续在插件管理中修改**

![](https://img-blog.csdnimg.cn/57ab16443acb400ca87bff4da97bec3e.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**插件全部安装完后，进入管理员用户创建页面，输入账号密码来创建第一个用户，也就是管理员**

![](https://img-blog.csdnimg.cn/80a9df12843641669b0d8ad8aedc1772.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**进入首页，发现部分文字没有汉化，此时参照[这位博主](https://blog.csdn.net/qq_37489565/article/details/104337073)的博客，安装Locale插件=>设置语言为zh\_US=>重启=>设置语言为zh\_CN=>刷新页面就可以了**

![](https://img-blog.csdnimg.cn/9d8026ebfa424db9b5f2fb398bc3b172.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/f5d4df3cbc07484faa26ea692f5afefa.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**如果不需要开机自启Jenkins，可以关闭自启软件，并且使用手动打开的方式：在Jenkins目录下输入java -jar jenkins.war --httpPort=10240，或者写成bat形式运行**

**下面来说说****Jenkins的插件安装，在插件管理中安装Generic Webhook Trigger用于gitea构建触发器，Blue Ocean可以理解为Jenkins的一个皮肤（个人感觉界面看起来和操作使用很舒服）**

![](https://img-blog.csdnimg.cn/960705f34f6b4b319ffee20678ec81c4.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/9b6b671dfeb84fe4887221f283483b14.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**关于Jenkins准备工作，已经基本做完，下一步将使用gitea中的webhooks与Jenkins进行联系，达到代码自动部署的效果**

**首先，我们先点新建任务，进入到任务列表，接下来，我将分享两种构建的方式，分别是批处理命令构建和pipeline流水线语法的方式构建**

![](https://img-blog.csdnimg.cn/977a8ca87afc4ba9b3284eb22fa1a00e.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/8860c6dc1ec342f282eaa875aac00a08.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

### 自由风格项目构建（**window批处理命令**）

**在任务配置中输入gitea clone的地址，并且点击新建验证方式，我这里用的是用户名密码**

![](https://img-blog.csdnimg.cn/d8bb2bb699274ecdb97c5cee0eb2231e.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/d668908c75954ccfbf1bcae3e230e3f6.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**在凭证配置中选择用户名密码，并输入gitea的用户名，密码，点击添加即可，添加后在源码管理中选择刚才添加的凭证方式**

![](https://img-blog.csdnimg.cn/e3079016d963486aa278846d9c33e13a.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/b6f6eb357bc34ecc88b9001ce8b55204.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**然后在构建中新增构建步骤，选择window批处理命令，并分别新建以下命令（npm i和npm run build一定要分开，否则在安装依赖时命令控制台会直接输入npm run build，此时是没有效果的，导致后面的命令不执行）**

1. **node -v  
npm -v**
2. **npm i**
3. **npm run build**

![](https://img-blog.csdnimg.cn/f4555c79fb3048a48d3dedec1ee71294.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/b0680831bc2145cba20a6012712a4c9c.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/26daf43376b846b4838f5a4766e6f473.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**最后点保存，并在工作台运行测试一下**

![](https://img-blog.csdnimg.cn/e19284690a554fc4b1b5f6aad4575949.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/94ac638cbccd4176a2d0e283caf5d41c.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/f231503fc4b944448961e0a1bc566b1c.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**运行完成后在对应路径下找到dist文件，就说明构建成功，我的项目路径是C:\\Users\\Administrator\\.jenkins\\workspace\\，所以就去该文件夹中找对应的文件**

![](https://img-blog.csdnimg.cn/7ced6f335d3947c982e0402c2878d08c.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/26348470a92c461db88bcd1491289380.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_19,color_FFFFFF,t_70,g_se,x_16)

**接下来，我们在gitea中添加webhooks用来触发Jenkins的构建**

**先在Jenkins的任务配置中设置构建触发器，并且在下面的配置项中找到token配置，设置token并保存**

![](https://img-blog.csdnimg.cn/2b4dd831f84b474e98fdcb2399e27c93.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/a1b1a5b87d56474ebf50fe6901f7b56a.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**然后在仓库设置中添加web钩子，设置请求的地址，地址与Jenkins构建触发器中示例地址一致**

![](https://img-blog.csdnimg.cn/a9b7e1ee9dd1494c8a535f21eb682ed4.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/e5dd04bc03ad456bbcf4e137f07328f3.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/b980502186694299b96dba82219ca2da.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**触发条件我选择的是推送，即当前仓库收到推送信息就会通过webhooks通知Jenkins构建项目，最后测试一下是否能正常请求，请求成功后就会执行构建**

![](https://img-blog.csdnimg.cn/3052689299bf4f258f55c82f61943514.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/1882cdea77d442a69de746bb4e6bfd20.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/eadc088625294907ac5e192fbd716cfe.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**下面我贴出完整的前端部署命令供参考，整个流程是：推送代码后webhooks将触发Jenkins构建前端项目，构建完成后将项目复制到Nginx文件夹下并重启服务**

```
显示版本号
echo node version
node -v
echo npm version
npm -v
```

```
安装依赖
npm i
```

```
构建项目
npm run build
```

```
复制构建好的项目至Nginx目录下
cd /d "D:\Soft\Nginx\project"
rd /s/q vue_vite
md vue_vite
xcopy "D:\Soft\Jenkins\jenkins\workspace\vue_vite_free_type\dist" "D:\Soft\Nginx\project\vue_vite" /E /Y
```

**不改变nginx配置的情况下，下面的可以不需要**

```
重启nginx服务
cd /d "D:\Soft\Nginx"
nginx -s reload
nginx -s quit
tasklist | find /i "nginx.exe" >nul 2>nul && goto isAlive || goto isKilled
:isKilled
start nginx
:isAlive
taskkill /f /t /im nginx.exe
start nginx
```

**以上就是使用window批处理命令构建前端的整个流程，下面是使用pipeline构建项目并部署的流程**

### 流水线项目构建

**流水线配置和批处理命令一样，新建流水线任务，配置webhooks和token，pipeline的好处就是将每块步骤分开，直观的看到项目的构建过程**

![](https://img-blog.csdnimg.cn/8ba2bd513e6f466a9ec8503af23acf62.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/f192901dd95448898d0e4e202f288bcd.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/ebdcc6f3a2b347a2ad20299f185edcd5.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**然后就是构建流水线脚本，这里放出我配置的一段供大家参考。**

```

pipeline {
    agent any
   stages {
      stage('pull') {
         steps {
            echo 'pull code start'
            git branch: 'master',
                credentialsId: '7196d35f-xxxxxxxxxxxxxxxxxxxx-c7936ddd3dd4', 
                url: 'http://localhost:10241/xxxxxxx/vite--vue30.git'

         }
      }
      stage('build') {
         steps {
            echo "node version"
            bat "node -v"
            echo 'npm version'
            bat 'npm -v'
            echo 'install start......'
            bat "npm i"
            echo 'build start......'
            bat 'npm run build'
            echo 'build finish......'
         }
      }
      stage('deploy') {
         steps { 
            dir('d:/Soft/Nginx/project') {
                bat "rd /s/q vue_vite"
                bat "md vue_vite"
            }
            bat('xcopy "D:/Soft/Jenkins/jenkins/workspace/vue_vite_pipeline/dist" "D:/Soft/Nginx/project/vue_vite" /O /X /E /H /K')
            dir('d:/Soft/Nginx') {
                bat('start run.bat')
            }
            echo 'deploy success'
         }
         
      }
   }
}
```

**其中run.bat的内容如下：**

```
nginx -s reload
nginx -s quit
tasklist | find /i "nginx.exe" >nul 2>nul && goto isAlive || goto isKilled
:isKilled
start nginx
:isAlive
taskkill /f /t /im nginx.exe
start nginx
```

**保存完成后来到流水线列表点击运行，程序就会开始运行。运行结束后界面会变成绿色，失败会变成红色**

![](https://img-blog.csdnimg.cn/9a47f0697f6f4fdd93686cb6444dbbdb.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/3b4f03fda3e14fb1aa49239bf0727f68.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)![](https://img-blog.csdnimg.cn/db5b1e43482d4f45a22610476e058712.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

**最后输入网址就可以看到部署效果，至此，前端自动化部署就介绍这么多，有兴趣的小伙伴可以自己试试，此方法同样适用node项目部署（建议搭配[pm2](https://pm2.keymetrics.io/)管理node进程），需要把build命令去掉即可。**

![](https://img-blog.csdnimg.cn/86ba2aee1e90435bbb7e2fada3b41798.png?x-oss-processimage/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)

### **写在最后**

**gitee和github等远程仓库同样也支持webhooks或actions，有兴趣的小伙伴可以把Jenkins暴露在公网上配置远程服务，安利一波[内网穿透搭建](https://blog.csdn.net/time_____/article/details/114664920)**

**最后，感谢你阅读完这篇文章，如果这篇文章有帮助到你，请支持一下博主~你的支持就是博主分享文章的动力！**