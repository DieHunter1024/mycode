---
title:  NodeJs（前端面试题整合） 
date:  2020-11-28 16:48:1706-2112-0212-0709-1703-1203-1103-1607-2808-2211-2112-0606-2108-0411-0611-3003-0502-0204-09 
---
**谈谈对Node的理解**

**Node.js 在浏览器外运行V8 JavaScript引擎，单线程 非阻塞I/O 事件驱动,适应于数据高并发,适合多请求,但不适合高运算,有权限读取操作系统级别的API，****无法直接渲染静态页面，提供静态服务，没有根目录的概念，必须通过路由程序指定文件才能渲染文件，比其他服务端性能更好，速度更快，npm 仓库，常用框架：Express，koa，Socket.io，AdonisJs，NestJS**

**什么是gulp？作用？机制是什么？常用命令有哪些？**

**gulp是基于node的自动化构建工具**

**作用：**

**1 自动压缩JS文件**

**2 自动压缩CSS文件**

**3 自动合并文件**

**4 自动编译sass**

**5 自动压缩图片**

**6 自动刷新浏览器**

**机制：**

**Unix操作系统的管道（pipe）思想 前一级输出 后一级输入**

**常用命令：**

**.src 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。  
.watch 监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。  
.dest 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。  
.pipe 传入方法的是一个function，这个function作用无非是接受上一个流（stream）的结果，并返回一个处理后流的结果(返回值应该是一个stream对象)。  
.task 定义一个使用 Orchestrator 实现的任务（task）**

**如何判断当前脚本运行在浏览器还是node环境中？**

**this === window ? 'browser' : 'node'，通过判断Global对象是否为window，如果不为window，当前脚本没有运行在浏览器中**

**node.js有哪些常用模块？**

**util是node 里面一个工具模块，node里面几乎所有的模块都会用到这个模块  
功能：**  
**1：实现继承这是主要功能**  
**2：实现对象的完整输出**  
**3：实现判断数据类型**

**path模块  
功能：格式规范化路径**

**fs模块  
功能：  
1：操作文件  
2：操作目录**

**http模块：用于搭建HTTP服务端和客户端**

**url模块：用户解析和处理URL字符串  
url.parse(将url字符串解析并返回一个url的对象)  
url.format(将url对象编程一个url字符串并返回)  
url.resolve(将url中的参数用/进行拼接)**

**zlib模块：提供了用Gzip和Deflate/Inflate实现的压缩功能**

**socket.io: 实现客服端与服务端之间的实时通信方式**

**uglify-js: 用来压缩合并js文件**

**child\_process：新建子进程。**

**querystring：解析URL中的查询字符串。**

**crypto：提供加密和解密功能。**

**Express框架的核心特性是什么**

**1.可以设置中间件来响应http请求  
2.定义了路由表用于执行不同的HTTP请求动作  
3.可以通过向模板传递参数来动态渲染html页面**

**对Node的思想一切皆异步的理解**

**node本身就是非阻塞I/O，与其他后端编程思想不同，虽然php, python, java中也有异步方法，但是编程人员的思想是同步的，node的思想目的是可以让开发者轻松编写高性能的web服务端，而不会通过同步思想api阻塞了服务器从而影响性能。而且node.js大部分api都是异步的，只有小量同步api，这与其他大部分语言刚好相反。**

**node如何实现异步非阻塞（I/O）**

**在node中，I/O（输入输出）是异步非堵塞的关键，I/O操作通常比较耗时但不会独占CPU，典型的I/O比如文件读写，远程数据库读写，网络请求等，如果用同步API来进行I/O操作，在返回结果之前就只能等待，此时阻塞代码会霸占cpu，导致本进程所有代码都等待，而node.js里面的I/O API都是不会霸占CPU的（原因：node中的核心库libuv会将建立的所有I/O操作内容绑定到单个线程上。只要每个事件循环在不同的线程中，就可以运行多个事件循环，libuv为Node.js提供了跨平台、线程池、事件池、异步I/O等能力），所以是非阻塞的。拿JS中的setTimeout来打比方，当用户使用setTimeout时，JS会开辟出一个异步线程池，与主线程分开执行，结果就是之前的代码继续执行，setTimeout的代码延时执行，等成功后再调用主线程的方法**

**node中的exports如何实现的，它和module.exports有什么关系**

**exports实现：exports = module.exports = {};就好像是var a = { } var b = a，看上去没有太大区别，但使用起来却又不同**

**module是一个对象，当我们在控制台输入node并执行，在node中执行module或者执行js文件打印module时会发现以下log**

```javascript
Module {
  id: '<repl>',
  path: '.',
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [
    ...
  ]
}
```

**不难发现，module是Module的实例，exports是其中一个属性，也就是说当你在node中执行一个js文件或者使用require引入模块时，nodejs都会新建一个varmodule = new Module（），并执行exports = module.exports，这也就是为什么直接打印exports和exports时，控制台不会报错，如果在node中执行以下代码，就能清楚的看出这二者的引用关系了**

```javascript
console.log(module.exports) // {}
console.log(exports) // {}
module.exports.name = '张三'
exports.age = 22
console.log(module.exports) // { name: '张三', age: 22 }
console.log(exports) // { name: '张三', age: 22 }
```

**谈谈Node.js加载模块机制**

**node.js中模块有两种类型：核心模块和文件模块**

**核心模块直接使用名称获取，文件模块只能按照路径加载（可以省略默认的.js拓展名，不是js文件的话需要显示声明书写）**

**模块加载规则：**

* **核心模块优先级最高，直接使用名字加载，在有命名冲突的时候首先加载核心模块**
* **可通过绝对路径和相对路径查找**
* **查找node\_modules目录，我们知道在调用 npm install <name> 命令的时候会在当前目录下创建node\_module目录(如果不存在) 安装模块，当 require 遇到一个既不是核心模块,又不是以路径形式表示的模块名称时,会试图 在当前目录下的 node\_modules 目录中来查找是不是有这样一个模块。如果没有找到,则会 在当前目录的上一层中的 node\_modules 目录中继续查找,反复执行这一过程,直到遇到根 目录为止**

**对Node的优点和缺点提出了自己的看法**

**优点：因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求， 因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。 此外，与Node代理服务器交互的客户端代码是由javascript语言编写的， 因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。**

**缺点：Node是一个相对新的开源项目，所以不太稳定，它总是一直在变， 而且缺少足够多的第三方库支持（第三方库现在已经很丰富了，所以这个缺点可以说不存在了）。看起来，就像是Ruby/Rails当年的样子。**

**Node.js的适用场景**

* **实时应用：如在线聊天，实时通知推送等等（如socket.io）**
* **分布式应用：通过高效的并行I/O使用已有的数据**
* **工具类应用：海量的工具，小到前端压缩部署（如grunt），大到桌面图形界面应用程序**
* **游戏类应用：游戏领域对实时和并发有很高的要求（如网易的pomelo框架）**
* **利用稳定接口提升Web渲染能力**
* **前后端编程语言环境统一：前端开发人员可以非常快速地切入到服务器端的开发（如著名的纯Javascript全栈式MEAN架构）**

**原生Node如何解决跨域**

```javascript
const http = require('http');

http.createServer((req, res) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
 res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
}).listen(8080);
```

**反向代理是什么，如何实现**

**反向代理是指代理服务器来接受客户端的网络访问连接请求，然后服务器将请求有策略的转发给网络中实际工作的业务服务器，并将从业务服务器处理的结果，返回给网络上发起连接请求的客户端**

**实现过程（这里的目标服务器是用getman产生的假数据）：**

```html
前端部分：
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>

<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $.post('http://127.0.0.1:1024', {// 访问代理服务端，获取目标服务器的数据
            token: '1234'
        }, function (res) {
            console.log(JSON.parse(res))
        })
    </script>
</body>

</html>
```

```javascript
//服务端
const http = require('http');
const https = require('https')
const reqOption = { // getman产生的虚拟数据的请求地址
    protocol: 'https:',
    host: 'getman.cn',
    path: '/mock/shopList',
    method: 'POST',
    headers: {
        "content-type": "application/json",
    }
}
let server = http.createServer((req, res) => {
    // 写请求头，解决跨域
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // 若允许所有域名和ip，则设置成*
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    let _data = ''
    req.on('data', data => _data += data)
    req.on('end', () => {
        proxyApi(_data).then((_res) => { // 服务端收到前端请求后，请求目标服务器，将结果返回至前端
            res.write(_res)
            res.end()
        })
    })
})

function proxyApi(_data) {
    return new Promise((resolve, reject) => {
        let req = https.request(reqOption, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data)
            });
        })
        req.write(_data)
        req.end();
    })
}
server.listen(1024, () => console.log("1024服务开启，开始侦听"));
```

**Node事件循环的流程是什么，在事件循环中，如何判断是否有事件需要处理呢**

**事件循环的流程：在进程启动时，node会生成一个循环（类似于while（true）），每执行一次循环被称为一次Tick，每次的循环体Tick的过程会对事件进行判断，若发现存在事件，则执行相关操作，并进入下一个Tick，如果不再有事件，则退出进程**

**判断Tick是否有事件：node中的Tick通过观察者判断是否有需要处理的事件，主要来源于网络请求的网络I/O观察者，和文件操作的文件I/O观察者，事件循环从观察者中取出事件并处理**

**webSocket相对http的优势**

* **客户端与服务器只需要一个TCP连接，比http长轮询使用更少的连接**
* **webSocket服务端可以推送数据到客户端**
* **更轻量的协议头，减少数据传输量**

**简述明文、密文、密码、密钥、对称加密、非对称加密、摘要、数字签名、数字证书的概念**

* **明文（plaintext）是加密之前的原始数据**
* **密文是通过密码（cipher）运算后得到的结果成为密文（ciphertext）**
* **密码学中的密码（cipher）和我们日常生活中所说的密码不太一样，计算机术语 ' 密码 cipher ' 是一种用于加密或者解密的算法，而我们日常所使用的 密码 (password)是一种口令，它是用于认证用途的一组文本字符串，这里我们要讨论的是前者：cipher。**
* **密钥(key)是一种参数，它是在明文转换为密文或将密文转换为明文的算法中输入的参数。密钥分为对称密钥与非对称密钥，分别应用在对称加密和非对称加密上。**
* **对称密钥（Symmetric-key algorithm）又叫做私钥加密，即信息的发送方和接收方使用同一个密钥去加密和解密数据。对称加密的特点是算法公开、加密和解密速度快，适合于对大数据量进行加密，常见的对称加密算法有DES、3DES、TDEA、Blowfish、RC5和IDEA。**
* **非对称密钥（public-key cryptography）也叫做公钥加密。非对称加密与对称加密相比，其安全性更好。对称加密的通信双方使用相同的密钥，如果一方的密钥遭泄露，那么整个通信就会被破解。而非对称加密使用一对密钥，即公钥和私钥，且二者成对出现。私钥被自己保存，不能对外泄露。公钥指的是公共的密钥，任何人都可以获得该密钥。用公钥或私钥中的任何一个进行加密，用另一个进行解密。**
* **摘要算法又称哈希/散列算法。它通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用16进制的字符串表示）。算法不可逆。**
* **数据在浏览器和服务器之间传输时，有可能在传输过程中被冒充的盗贼把内容替换了，那么如何保证数据是真实服务器发送的而不被调包呢，同时如何保证传输的数据没有被人篡改呢，要解决这两个问题就必须用到数字签名，数字签名就如同日常生活的中的签名一样，一旦在合同书上落下了你的大名，从法律意义上就确定是你本人签的字儿，这是任何人都没法仿造的，因为这是你专有的手迹，任何人是造不出来的。那么在计算机中的数字签名怎么回事呢？数字签名就是用于验证传输的内容是不是真实服务器发送的数据，发送的数据有没有被篡改过，它就干这两件事，是非对称加密的一种应用场景。不过他是反过来用私钥来加密，通过与之配对的公钥来解密。**
* **数字证书是指在互联网通讯中标志通讯各方身份信息的一个数字认证，人们可以在网上用它来识别对方的身份。因此数字证书又称为数字标识。数字证书对网络用户在计算机网络交流中的信息和数据等以加密或解密的形式保证了信息和数据的完整性和安全性。**

**什么是中间件，好处是什么**

**中间件是一类连接软件组件和应用的计算机软件，它包括一组服务。以便于运行在一台或多台机器上的多个软件通过网络进行交互。使用node作为中间件更好提升了性能。**

**好处：**

* **代理，处理前端产生的访问接口跨域，通过node反向代理，访问目标服务器**
* **缓存，用户触发数据更新时，使用node作为暂时缓存，节省后端资源**
* **限流，针对接口和路由做出响应路由**
* **监控，高并发请求特点**
* **鉴权，对页面路由权限做出判断**
* **渲染，使用node对前端页面进行预渲染**
* **等等...**

**node中的Connect模块是什么，Koa与Express的中间件有什么区别**

**Connect是一个node中间件（middleware）框架，每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能**

**Koa与Express中间件的****区别：**

**Express主要基于Connect中间件框架，中间件一个接一个的顺序执行，通常会将 response 响应写在最后一个中间件中**

**而koa主要基于co中间件框架，它的中间件是通过`async await`实现的，中间件执行顺序是“洋葱圈”模型。执行效果类似于Promise.all**