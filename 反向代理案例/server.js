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