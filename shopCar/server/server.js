var http = require("http");
var server = http.createServer(function (req, res) {
    var data = ''
    req.on("data", function (d) {
        console.log(d)
    });
    req.on("end", function () {
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        res.write("11111");
        res.end();
    })
});
server.listen(1024, "192.168.0.100", function () {
    console.log("侦听开始");
})