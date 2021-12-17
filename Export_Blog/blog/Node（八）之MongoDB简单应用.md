---
title:  Node（八）之MongoDB简单应用 
date:  2018-11-30 20:38:0202-0203-1211-2804-0903-0503-1310-0811-3012-0310-1708-1704-0910-0810-0804-14 
---
## 初始：

1. 下载mongodb的安装包，[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)
2. 安装
3. 安装完成后在data文件夹下新建一个db文件夹
4. 加入环境变量：复制安装目录下bin文件夹的目录，右击我的电脑=>属性（见下图）在环境变量中粘贴bin文件路径，用分号  
   隔开环境变量![](https://img-blog.csdnimg.cn/20181130194122427.jpg?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)
5. 打开控制台输入：mongod 查看是否安装成功
6. 使用mongo命令连接至数据库

## db操作：

这里新建一个名字为User的数据库

```html
use User------数据库名称（切换当前操作的数据库，若没有则是创建新数据库）
```

```html
show dbs------显示所有数据库
```

```html
db.User.insert({"name":"abc"})-----插入name为'abc'的一项
```

## collection：集合

db.createCollection('集合名')； 创建集合

db.集合名.drop() 删除一个集合

showcollections 查看所有的集合

每个数据库都要有集合，不然创建的是临时数据

## document操作：

插入文档：

db.col.insert({  
"email" : "admin",  
"password" : "root"  
})

查找文档：

```html
db.col.find(条件，不填则查找全部)
```

更新文档：

```javascript
db.col.update({
  "email" : "admin"
}, {
  $set: {
    "email" : "admin1",
     "password" : "root1"
  }
}, {
  multi: true
})
```

寻找所有email为admin的值，并且更新值email为admin1和password为root1，`multi`设置为true时可以更新多个文档

覆盖更新：

```javascript
db.col.save({
  '_id':3,
  'email': 'abc'
})
```

根据传入的id，覆盖旧值

删除文档：

```html
db.col.remove({
  '_id':3
})
```

删除id为3的那一项

db.col.remove({})

将col全部删除

限制显示的条数：

```html
db.col.find().limit(2)   表示显示查找到的前两项
```

跳过显示的数据：

```html
db.age.find().skip(2)   表示跳过查找到的前两项
```

排序：

```html
db.col.find().sort({age:1})  根据age升序排列（-1是降序排列）
```

## 连接Node

首先下载node插件：

```html
npm install mongodb
```

然后执行以下代码：

```javascript
var MongoClient = require("mongodb").MongoClient;//获取mongo模块
var mongoDB = "mongodb://localhost:27017/";
//新建数据库连接
MongoClient.connect(
    mongoDB,
    function (err, db) {
        if (err) {
            throw err;
        }
        console.log("连接成功！");
        db.close();//断开连接
    }
);
```

## Node查询：

```javascript
var MongoClient = require("mongodb").MongoClient;
var mongoDB = "mongodb://localhost:27017/";
MongoClient.connect(
    mongoDB,{useNewUrlParser: true},
    function (err, db) {
        if (err) {
            throw err;
        }
        console.log("连接成功！");
        var dball = db.db('UserList');//数据库名
        dball.collection('allUser').find({}).toArray(function(err,result) {//查询语句
            if (err) {
                console.log(arr);//抛错
                return;
            }
            console.log(result);//打印查询结果（这里是查询所有）
            db.close();
        });
    }
);
```

## Node插入：

```javascript
var MongoClient = require("mongodb").MongoClient;
var mongoDB = "mongodb://localhost:27017/";
MongoClient.connect(
    mongoDB,{useNewUrlParser: true},
    function (err, db) {
        if (err) {
            throw err;
        }
        console.log("连接成功！");
        var dball = db.db('UserList');      
        // 添加
        dball.collection("allUser").insert([{//插入两项，放在数组中
            email: '12345',
            password:'54321'
        }, {
            email: 'root',
            password:'root'
        }], function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            console.log(result)//返回插入结果
        })
        db.close();//关闭数据库连接

    }
);
```

## Node更新：

```javascript
var MongoClient = require("mongodb").MongoClient;
var mongoDB = "mongodb://localhost:27017/";
MongoClient.connect(
    mongoDB,{useNewUrlParser: true},
    function (err, db) {
        if (err) {
            throw err;
        }
        console.log("连接成功！");
        var dball = db.db('UserList');
        // 更新数据库
        dball.collection("allUser").update({//查找email为abcde的，将email换成12345，password换成12345
            email: 'abcde'
        }, {$set:{
            email: '12345',
            password:'12345'
        }}, function (err) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
        })
        db.close();
    }
);
```

## Node删除：

```javascript
var MongoClient = require("mongodb").MongoClient;
var mongoDB = "mongodb://localhost:27017/";
MongoClient.connect(
    mongoDB,{useNewUrlParser: true},
    function (err, db) {
        if (err) {
            throw err;
        }
        console.log("连接成功！");
        var dball = db.db('UserList');
        // 删除
        dball.collection("allUser").remove({
        //删除email为12345的那项
            email: '12345'
        }, function (err) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
        })
        db.close();
    }
);
```