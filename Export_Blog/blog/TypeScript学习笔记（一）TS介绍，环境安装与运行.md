---
title:  TypeScript学习笔记（一）TS介绍，环境安装与运行 
date:  2021-02-25 15:33:5101-0605-0402-2108-0312-3107-0107-2204-2011-1606-3001-2907-1912-1412-2812-3108-0303-18 
---
### **介绍：**

**TypeScript是JavaScript的超集，扩展了JavaScript的语法，因此现有的JavaScript代码可与TypeScript一起工作无需任何修改，TypeScript通过类型注解提供编译时的静态类型检查。其源于JavaScript（JS的拓展），终于JavaScript（编译成JS）  
TypeScript 起源于使用JavaScript开发的大型项目 。由于JavaScript语言本身的局限性，难以胜任和维护大型项目开发。因此微软开发了TypeScript ，使得其能够胜任开发大型项目。**

### **环境安装：**

**首先安装node与npm，参考[这篇文章](https://blog.csdn.net/time_____/article/details/114024145)  
打开cmd，运行以下命令安装TypeScript**

```
npm install -g typescript
```

**安装完成后输入 tsc -v 查看安装是否成功，然而有时会碰上下图问题，系统禁止执行脚本**  
![](https://img-blog.csdnimg.cn/20210224220356608.png)  
**首先输入get-ExecutionPolicy来获取是否允许脚本执行状态，显示Restricted说明脚本不被允许执行，此时我们输入set-ExecutionPolicy RemoteSigned即可**  
![](https://img-blog.csdnimg.cn/2021022422055293.png)  
**网上还有一种方式是删除ts依赖下的tsc.ps1文件，亲测有效，副作用尚未发现**  
![](https://img-blog.csdnimg.cn/20210224221040298.png)

### IDE推荐：

**微软官方的Visual Studio Code（简称VS Code）:做开发以来使用的最舒服的轻量级IDE，支持ts开发，之前用的sublime和atom总感觉缺点什么，这款编辑器插件丰富，界面简洁，如今支持配置同步，让开发得心应手  
JetBrains公司旗下的WebStorm：作为一款重量级web编辑器，功能可以说是非常齐全，在编辑ts时可以配置自动编译，如果说VScode轻量简洁开发舒服，Webstorm可以说是功能强大，专为web开发而生的神器**

### **开发与运行：**

**以VS-Code为例：  
在目录下新建app.ts文件，输入以下代码**

```
class HelloWorld {
    constructor() { }
    say() {
        console.log('hello world')
    }
}
new HelloWorld().say()
```

**将cmd打开于当前目录下，输入tsc app.ts或者简写tsc app，ts会编译一个app.js文件生成在目录下，编译结果如下**

```javascript
var HelloWorld = /** @class */ (function () {
    function HelloWorld() {
    }
    HelloWorld.prototype.say = function () {
        console.log('hello world');
    };
    return HelloWorld;
}());
new HelloWorld().say();
```

**这就是我们熟悉的JS原生代码，我们使用node app.js或者简写node app执行app.js，控制台会输出hello world**  
![](https://img-blog.csdnimg.cn/20210225152057132.png)  
**然而每次都需要编译ts并在node执行调试有点麻烦，这里推荐一个插件[ts-node](https://www.npmjs.com/package/ts-node)，在cmd中全局安装依赖**

```
npm i ts-node -g
```

**安装完成之后在cmd中执行 ts-node app，会直接编译并在node中执行，打印hello world（注意：该操作不会生成app.js文件，而是直接自动编译直接执行）**  
![](https://img-blog.csdnimg.cn/20210225152709909.png)

**当然，在webstorm中，打开设置，将TS的自动编译打开，也会节省不少事**  
![](https://img-blog.csdnimg.cn/20210225153104157.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

### **总结：**

**以上就是TypeScript起步的介绍，环境安装与运行及注意事项**