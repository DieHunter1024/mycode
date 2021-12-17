---
title:  Node（十二）加密解密 
date:  2018-12-05 18:00:3302-1303-0705-1310-2507-2112-0101-1109-1812-2404-1811-2603-1502-2309-1908-1906-2810-2509-26 
---
### token：（引入jsonwebtoken模块）

### 对称加密，一个秘钥进行加密解密

```javascript
const crypto = require('crypto');

// 产生token

let obj = {

    a: 1,

    b: 2,

};

let sec = 'HelloWorld'

let res = jwt.sign(obj, sec,{ algorithm: 'RS256'});//传入加密的对象，秘钥，加密方式

console.log(res);

//解析token

let sec2 = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoxLCJiIjoyLCJpYXQiOjE1NDM5ODA0NTF9.ORMQa_LBbDCd7XEEHgVGN2EnccL2kTOyDidE-b4ANMY', sec);

console.log(sec2);
```

### 非对称加密，通过私钥进行加密，公钥解密

产生私钥 openssl genrsa -out private\_key.pem 1024

由私钥产生公钥 openssl rsa -in private\_key.pem -pubout -out public\_key.pem

```javascript
var selfkey = fs.readFileSync(path.join(__dirname, 'key.pem'));//读取私钥路径
var jwtset = jwt.sign({
    a: 1,
    b: 2,
    c: 3
}, selfkey, {
    algorithm: 'RS256'
});
console.log(jwtset);

var otherkey = fs.readFileSync(path.join(__dirname, 'public_key.pem'));//读取公钥路径
var jwtget = jwt.verify(jwtset, otherkey, {
    algorithm: 'RS256'
});
console.log(jwtget);
```

### crypto和bcrypt

```javascript
// 数据库密码加密
// 内置crypto
// MD5
const hash = crypto.createHash('md5');
hash.update('HelloWorld');
console.log(hash.digest('hex'));
// Hmac
const hmac = crypto.createHmac('sha256', '12345');
hmac.update('HelloWorld');
console.log(hmac.digest('hex'));
// 第三方bcrypt
const pass = 'qazwsx123';
const saltRounds = 10;
bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
        let result= bcrypt.compareSync('qazwsx123', hash);
        console.log(result);
    });
});
```