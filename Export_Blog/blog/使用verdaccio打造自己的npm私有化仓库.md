---
title:  使用verdaccio打造自己的npm私有化仓库 
date:  2021-12-16 19:39:1411-1706-0310-1708-1109-2703-0108-2810-1303-2003-0912-2305-0801-0305-0705-3102-2810-2604-2702-2803-17 
---
### 前言

**接着上篇文章[Gitea+Jenkins能碰撞出怎样的火花？浅谈前端自动化部署\_DieHunter1024的博客-CSDN博客](https://blog.csdn.net/time_____/article/details/121530923)**

**本文将与大家分享使用[verdaccio](https://verdaccio.org/zh-cn/)搭建私有化npm仓库以及npm包的发布**

### **准备工作**

* [Node环境](https://blog.csdn.net/time_____/article/details/114024145)
* 远程或本地服务器
* [verdaccio](https://verdaccio.org/zh-cn/)

### 安装配置verdaccio

1. **使用npm install --global verdaccio全局安装verdaccio**
2. **在服务器中新建文件夹用来存放npm数据**
3. **在新建的文件夹中运行cmd输入verdaccio，显示以下日志就可以了**![](https://img-blog.csdnimg.cn/c567b617d8954f0997b3dc9e6c0313ed.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_19,color_FFFFFF,t_70,g_se,x_16)
4. **在浏览器打开[http://localhost:4873/](http://localhost:4873/)显示以下页面就可以进行下一步了**![](https://img-blog.csdnimg.cn/71ecd3052ec446bbba2d6228740eaf89.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)
5. **通过日志可以知道verdaccio的yaml文件在C:\\Users\\用户名\\.config\\verdaccio\\config.yaml，我们可以自定义该文件并且手动启动，将yaml文件复制到新建的文件夹下并修改文件，以下是我的配置文件，仅供参考**

   ```
   # 数据缓存目录
   storage: ./storage
   # 插件目录
   plugins: ./plugins

   #开启web 服务,能够通过web 访问
   web:
     # 页面title名称
     #enable: false
     title: NPM-diehunter
   #验证信息
   auth:
     htpasswd:
       #  用户信息存储目录
       file: ./htpasswd
       # 最大注册人数，默认infinity
       #max_users: 1000

   #公有仓库配置
   uplinks:
     npmjs:
       # url: https://registry.npmjs.org/
       # taobao镜像
       url: https://registry.npmmirror.com/

   packages:
     "@*/*":
       # scoped packages
       access: $all
       publish: $authenticated
       #代理 如果本地仓库没找到会去npmjs中找，npmjs就是uplinks中的变量
       proxy: npmjs

     "**":
       # 权限：所有人,匿名用户,认证(登陆)用户
       # "$all", "$anonymous", "$authenticated"

       #是否可访问所需要的权限
       access: $all

       #发布package 的权限
       publish: $authenticated

       # 如果package 不存在,就向代理的上游服务发起请求
       proxy: npmjs

   middlewares:
     audit:
       enabled: true
   # 监听本地所有ip，配置了后可以通过公网访问
   listen: 0.0.0.0:10241
   # 日志
   logs:
     - { type: stdout, format: pretty, level: http }
     #- {type: file, path: verdaccio.log, level: info}
   ```
6. **使用cmd脚本启动文件，可以将以下命令写成bat文件并放在文件夹目录**

   ```
   verdaccio --listen 10241 --config ./config.yaml
   ```
7. **最后运行命令，打开网页**![](https://img-blog.csdnimg.cn/cfc97357023646f39f379bbaf26d9603.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_20,color_FFFFFF,t_70,g_se,x_16)
8. **此外，可以参考[Nginx常用指令，基本配置，反向代理\_DieHunter1024的博客-CSDN博客](https://blog.csdn.net/time_____/article/details/114750930)，把npm仓库反向代理到路由，不占用端口**

### 上传代码至仓库

**推荐使用[nrm](https://www.npmjs.com/package/nrm)管理npm仓库地址，切换仓库地址为**[http://localhost:10241/](http://localhost:10241/)

![](https://img-blog.csdnimg.cn/271233aa5f214e8685ffc038a03f21f4.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_14,color_FFFFFF,t_70,g_se,x_16)

**以之前写的[PubSubPattern](https://blog.csdn.net/time_____/article/details/113770950)（发布订阅）为例子，在文件夹中 npm init -y 新建package.json文件，并配置name，version等**

```javascript
{
  "name": "pub_sub_pattern",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**注册用户：使用npm adduser --registry http://localhost:10241/注册用户，输入用户名（小写），密码，邮箱**

![](https://img-blog.csdnimg.cn/a8f34de8cc4443c7b85c838cb623c072.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_11,color_FFFFFF,t_70,g_se,x_16)

**然后在index.js中写入源码**

```javascript
exports.PubSubPattern = class PubSubPattern {
  constructor() {
    this._eventList = {}; //调度中心列表
  }
  static Instance() {
    //返回当前类的实例的单例
    !PubSubPattern._instance &&
      Object.defineProperty(PubSubPattern, "_instance", {
        value: new PubSubPattern(),
      });
    return PubSubPattern._instance;
  }
  on(type, handler) {
    if (!checkArgs(type, handler)) {
      return;
    }
    //若调度中心未找到该事件的队列，则新建某个事件列表（可以对某个类型的事件注册多个回调函数）
    !isKeyInObj(this._eventList, type) && (this._eventList[type] = new Array());
    this._eventList[type].push(handler);
  }
  un(type, handler) {
    if (!type) {
      return;
    }
    const fnList = this._eventList[type];
    if (type && (!handler || typeof handler !== "function")) {
      this._eventList[type] = null;
      return;
    }
    for (let i = 0; i < fnList.length; i++) {
      fnList[i] && fnList[i] === handler && (this._eventList[type][i] = null);
    }
  }
  once(type, handler) {
    if (!checkArgs(type, handler)) {
      return;
    }
    const _handler = (args) => {
      this.un(type, _handler);
      handler(args);
    };
    this.on(type, _handler);
  }
  emit(type, module) {
    if (!type) {
      return;
    }
    const fnList = this._eventList[type];
    if (!fnList) {
      return;
    }
    isKeyInObj(this._eventList, type) && fnList.map((_) => _ && _(module));
  }
  clear() {
    this._eventList = {};
  }
}

/**
 * 检查对象是否包含该属性，除原型链
 * @param obj 被检查对象
 * @param key 被检查对象的属性
 */
function isKeyInObj(obj, key) {
  return Object.hasOwnProperty.call(obj, key);
}
/**
 * 检查参数是否符合标准
 * @param type 事件名
 * @param handler 事件钩子
 */
function checkArgs(type, handler) {
  if (!type) {
    return;
  }
  if (!handler || typeof handler !== "function") {
    throw new Error(
      "handler is not defined or not a function at arguements[1]"
    );
  }
  return true;
}
```

**完成后输入npm publish --registry http://localhost:10241/将代码发布到npm仓库**

![](https://img-blog.csdnimg.cn/15f9b61d227448259eb0661114aa1f06.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_15,color_FFFFFF,t_70,g_se,x_16)

**npm包的发布就完成了**

### **安装依赖**

**另起一个test文件夹，使用**

**npm init -y  
npm ipub\_sub\_pattern**

**下载依赖**

![](https://img-blog.csdnimg.cn/8f7a731069e74308b0bdddf317e012a8.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_18,color_FFFFFF,t_70,g_se,x_16)

**在test文件夹中新建main.js输入以下内容**

```javascript
const { PubSubPattern } = require("pub_sub_pattern");
console.log(PubSubPattern);
PubSubPattern.Instance().on("event", (data) => {
  console.log(data);
});

setTimeout(() => {
  PubSubPattern.Instance().emit("event", { name: "hunter" });
}, 1000);
```

**并且在控制台执行node main，出现以下日志就表示成功了**

![](https://img-blog.csdnimg.cn/40743e1d6f8246d7ad575cad08b98fc5.png?x-oss-processimage/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBARGllSHVudGVyMTAyNA,size_9,color_FFFFFF,t_70,g_se,x_16)

### **写在最后**

**最后，我们可以配合这篇文章**[Gitea+Jenkins能碰撞出怎样的火花？浅谈前端自动化部署\_DieHunter1024的博客-CSDN博客](https://blog.csdn.net/time_____/article/details/121530923)

**将npm publish --registry http://localhost:10241/命令放在Jenkins的命令中实现自动发布npm，这便是微前端的雏形**

**感谢你看到了这里，如果这篇文章对你有帮助，请点个赞支持一下作者！你的支持是作者创作的动力~**