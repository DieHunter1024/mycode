---
title:  Node（五）File System小案例（删除文件夹及下面的所有文件） 
date:  2018-11-28 10:32:3603-1109-0501-1708-1210-2704-0101-2412-2312-2406-1608-1505-2004-1810-1101-1312-1904-2109-0406-0202-02 
---
附上代码，注释已加上（注意：要用同步的方式写，由于文件夹数不确定，所以需要所有的文件删除后才能删除文件夹，亲身经历，就是因为这个小问题，整了很久）

```javascript
const fs = require('fs');
//封装一个立即执行函数，返回对象
let delDir = (() => {
    return {
//入口函数
        init: function (url) {
            this.del(url);
        },
//删除函数，传入当前的文件夹作为参数，注意：要用同步，不然会报错（因为当文件夹内文件数不为0时，文件夹无法被删除）
        del: function (url) {
//新建一个数组用来存放遍历到的同层文件或文件夹
            var files = [];
            files = fs.readdirSync(url);
            for (var i = 0; i < files.length; i++) {
                var path = url + '/' + files[i];
//判断遍历到的某一项是文件还是文件夹，若为文件，则将其删除，若为文件夹，再次递归删除函数（直到所有的文件删除后才对文件夹进行操作（因为用了同步））
                if (fs.statSync(path).isFile()) {
                    fs.unlinkSync(path);
                } else {
                    this.del(path);
                }
            }
            fs.rmdirSync(url);
        }
    };
})();
//抛出模块对象
module.exports = delDir;
```