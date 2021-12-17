---
title:  Node（四）内置模块之File System 
date:  2018-11-28 09:06:0005-2908-3102-0203-1211-2804-0903-0503-1310-0811-3012-0310-1708-1704-0910-0810-0804-14 
---
# **文件和文件夹的操作（fs模块）**

下面是fs的几种功能：  
首先在js文件最上方引入模块

```javascript
const fs = require("fs");
```

## 对文件夹操作：

### 1.新建文件夹

```javascript
//mkdirSync里的参数是文件路径和回调函数，Sync表示同步执行，若无Sync，则表示异步执行（下同）
fs.mkdirSync('./files/third',(err)=>{
//参数是报错内容，若无错误则没有
  if (err) {
    console.log("Error");
  } else {
    console.log("OK");
  }
});
```

### 2.删除文件夹

```javascript
fs.rmdirSync('./files',(err)=>{
  if (err) {
    console.log("Error");
  } else {
    console.log("OK");
  }
});
```

### 3.读取文件夹

```javascript
fs.readdir('./files',(err,file)=>{
  if (err) {
    console.log("Error");
  } else {
    console.log(file);
  }
});
```

### 4.查看文件夹的属性及状态

```javascript
//stats是返回的文件夹的属性
fs.stat('./files',(err,stats)=>{
  if (err) {
    console.log("Error");
  } else {
  //stats.isDirectory（）判断是否是文件夹；stats.isFile（）判断是否是文件
    console.log(stats);
    console.log(stats.isDirectory());
    console.log(stats.isFile());
  }
});
```

## 对文件操作：

### 1.新建文件

```javascript
//参数是新建文件的路径，文件内容，成功后回调函数
fs.writeFile('./files/second/e.txt','Hello_World',(OK)=>{
    console.log("OK");
});
```

### 2.读取文件内容

```javascript
fs.readFile('./files/second/e.txt',(OK,data)=>{
    // 转换的是buffer，要用toString转换
        console.log(data.toString());
});

//或用下面的
fs.readFile('./files/a.txt','utf8',(OK,data)=>{
    // 转换的是buffer，或者用utf8转换
        console.log(data);
});
```

### 3.在文件后插入内容

```javascript
fs.appendFile('./files/b.txt','hello~',(OK)=>{
        console.log('ok');
});
```

### 4.删除文件

```javascript
const fs = require("fs");
fs.unlink('./files/f.txt',(OK)=>{
        console.log('ok');
});
```