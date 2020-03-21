/*
 *后端采用node+express搭建一个简单的接口，通过本地数据，将商品列表传至前端
 * 
 */
const express = require('express');
const path = require('path');
const app = express();
const shopData = require('./data/shopData.js')
let serverToken = 'hello'
app.all("*", function (req, res, next) { //跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});
app.use('/getShopList', function (req, res) {
    let data = req.query
    if (!checkToken(data.token)) { //简单获取前端token，校验
        res.send({
            result: 0,
            msg: 'token fail'
        })
        return
    }
    res.send({
        result: 1,
        msg: 'success',
        type: 'getShopList',
        shopData
    })
})

function checkToken(teken) {
    return teken == serverToken
}
app.use('/img', express.static(path.join(__dirname, './img'))); //后端目录静态化，用url+img访问文件夹
app.use('/client', express.static(path.join(__dirname, '../client')));
app.listen(1024, "127.0.0.1", function () {
    console.log("服务开启，开始侦听");
});