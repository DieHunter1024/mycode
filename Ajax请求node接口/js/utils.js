export default class Utils {
    /*
     * ajax请求方法
     * @param config method：请求类型 url：接口地址 data：输入参数 timeout：超时时间
     * @return Promise:Promise异步处理
     */
    myAjax (config) {
        let xhr,
            t = this;
        if(window.ActiveXObject) { //ie浏览器
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if(window.XMLHttpRequest) { //其他浏览器
            xhr = new XMLHttpRequest();
        }
        config.method === 'get' ? (function () {//判断get与post等请求方式
            config.url = t.urlJoin(config.url, config.data);
            config.data = null
        }()) : "";
        //open(请求方式|string，请求路径|string，是否异步|bool)异步一般选择true，false代表同步，选false则会使请求不堵塞,不会等待请求结果,此时的timeout也无意义ex
        xhr.open(config.method, config.url, config.async || true);
        xhr.send(config.data ? config.data : {})
        config.async ? xhr.timeout = config.timeout || 10 * 1000 : ''//ajax请求超时，默认10秒
        return new Promise((resolve, reject) => {
            xhr.addEventListener('timeout', function () {//超时抛错
                reject(this)
                throw Error('request timeout')
            })
            xhr.addEventListener('load', function () {
                if(xhr.readyState === 4 && xhr.status === 200) {//请求成功
                    resolve(JSON.parse(this.response))
                } else {
                    reject(this)
                }
            })
        })
    }

    /*
     * 将对象属性拼接到url中
     * @param url：接口地址
     * @param obj：需要操作的对象
     * @return string:拼接结果
     */
    urlJoin (url, obj) {
        let list = []
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                list.push(`${key}=${obj[key]}`)
            }
        }
        return `${url}?${list.join('&')}`
    }

    /*新增标签，设置属性及样式
     * @param {ElementObject} ele  元素
     * @param {StyleObject} style  样式
     * @param {object} attribute   属性
     * @param {object} parent   父元素
     * @return 生成的标签
     */
    createEle (ele, style, attribute, parent) {
        let element = document.createElement(ele);
        if(style) {
            for(let key in style) {
                element.style[key] = style[key];
            }
        }
        if(attribute) {
            for(let key in attribute) {
                element[key] = attribute[key];
            }
        }
        parent && parent.appendChild(element);
        return element;
    }
}