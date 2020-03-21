var Methods = (function () {//通过立即执行函数return对象的方式产生闭包，用于存放私有变量
    // 可添加私有变量
    return {
        // ajax请求方法
        AjaxTool(method, url, data, fn) {
            var xhr;
            if (window.ActiveXObject) { //ie浏览器
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) { //其他浏览器
                xhr = new XMLHttpRequest();
            }
            if (method == 'get') {
                url = this.urlJoin(url, data)
                data = null
            }
            xhr.open(method, url);
            xhr.send(data ? JSON.stringify(data) : '')
            xhr.addEventListener('load', function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    fn(this.response)
                } else {
                    fn('err')
                }

            })
        },
        //将对象拼接到url中
        urlJoin(url, obj) {
            var list = []
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    list.push(`${key}=${obj[key]}`)
                }
            }
            return `${url}?${list.join('&')}`
        }
    }
}())