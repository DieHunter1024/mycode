let Methods = (function () {
    return {
        // 随机颜色
        randomColor: function () {
            var color = '#'
            for (let i = 0; i < 6; i++) {
                var num = parseInt(Math.random().toFixed(2) * 16);
                color += num.toString(16);
            }
            return color
        },
        //产生区间随机数
        randomNum(min, max, bool) { //bool是表示是否可等于最大值
            return (Math.floor(Math.random() * (max - min + bool) + min));
        },
        //数组去重
        arrayUniq(arr) {
            var list = [];
            var leng = arr.length
            for (var i = 0; i < leng; i++) {
                if (list.indexOf(arr[i]) === -1) {
                    list.push(arr[i]);
                }
            }
            return list
        },
        //数组乱序
        arrayRandom(arr) {
            arr.sort(function () {
                return Math.random() - 0.5
            })
            return arr
        },
        //拆分url变成对象
        urlSplit(url) {
            var list = url.split('?')[1].split('&');
            var leng = list.length;
            let obj = {}
            for (let i = 0; i < leng; i++) {
                var key = list[i].split('=')[0];
                var val = list[i].split('=')[1];
                obj[key] = val
            }
            return obj
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
        },
        // 设置元素CSS样式
        setStyle(elem, style) {
            for (var str in style) {
                elem.style[str] = style[str];
            }
        },
        // Ajax请求函数
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
        //拖拽事件
        mouseMove(ele, parent) {
            ele.addEventListener('mousedown', moveHandler);
            ele.style.position = 'absolute'

            function moveHandler(e) {
                if (e.type === 'mousedown') {
                    parent.ele = this;
                    parent.point = {
                        x: e.offsetX,
                        y: e.offsetY
                    }
                    parent.addEventListener('mousemove', moveHandler);
                    parent.addEventListener('mouseup', moveHandler);
                } else if (e.type === 'mousemove') {
                    this.ele.style.left = e.x - this.point.x + "px";
                    this.ele.style.top = e.y - this.point.y + "px";
                } else if (e.type === 'mouseup') {
                    parent.removeEventListener("mousemove", moveHandler);
                    parent.ele = null;
                    parent.point = null;
                }
            }
        },
        //继承
        inherit(father, son) {
            function F() {} //使用闭包产生私有函数
            (function (father, son) { ////新建一个立即执行函数,(类似雅虎网站的继承写法)
                F.prototype = father.prototype; //私有函数取出父类的原型
                son.prototype = new F(); //实例化私有函数，并将对象赋给子类的原型
                son.prototype.superClass = father; //自定义子类的超类等于父类
                son.prototype.constructor = son; //将子类的构造函数指向自己，否则是父类(因为原型链上的constructor是父类)
            }(father, son))
        },
        //深复制
        deepCopy(org, tag) {
            var tag = tag || {}; //初始化要复制的对象
            var name = Object.getOwnPropertyNames(org); //获取该对象的属性名，以字符串数组返回
            for (var i = 0; i < name.length; i++) { //遍历对象
                var desc = Object.getOwnPropertyDescriptor(org, name[i]); //获取对象的属性描述对象，无引用关系，返回另一个对象，改变时原对象不发生变化(复制的关键)
                if (typeof desc.value === 'object' && desc.value !== null) { //若遍历的每一项非空且为对象，则为引用值，则进行下一步
                    var obj = desc.value.toString() === '[object Object]' ? {} : []; //判断是数组还是对象
                    Object.defineProperty(tag, name[i], { //设置对象属性值，前三个的值是返回true或false
                        configurable: desc.configurable, //是否可删除可替换
                        enumerable: desc.enumerable, //是否可枚举可遍历
                        writable: desc.writable, //是否可写入
                        value: obj //对象的值
                    });
                    this.deepCopy(desc.value, obj); //再次执行函数
                } else {
                    Object.defineProperty(tag, name[i], desc); //否则直接将该对象的属性值进行复制(原始值)
                }
            }
            return tag;
        },
        //获取伪元素
        pseudoEle(ele, type) {
            return window.getComputedStyle(ele, type)
        },
        //获取数据类型
        getType(data) {
            var type = typeof data;
            var obj = {
                '[object Array]': 'array',
                '[object Object]': 'object'
            }
            if (data === null) {
                return 'null'
            } else if (type === 'object') {
                var key = Object.prototype.toString.call(data);
                return obj[key];
            } else {
                return type
            }
        },
        // 在某元素（after）之后插入元素（target）
        insertAfter(parent, after, target) {
            before = after.nextElementSibling;
            console.log(before);

            if (before == null) {
                parent.appendChild(target)
            } else {
                parent.insertBefore(target, before)
            }
        },
        //浏览器事件兼容函数
        addHandler(ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false)
            } else if (ele.attachEvent) {
                ele.attachEvent('on' + type, function () {
                    handler.call(ele)
                })
            } else {
                ele['on' + type] = handler
            }
        },
        // 取消事件冒泡
        stopBubble(event) {
            event = event || window.event
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble()
            }
        },
        //取消默认事件
        stopDefault(event) {
            event = event || window.event
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 事件处理机制
        eventCtrl(ele, type, handler, fn, data) {
            switch (type) {
                case 'on':
                    this.onEvent(ele, handler, fn, data)
                    break;
                case 'remove':
                    this.removeEvent(ele, handler, fn, data);
                    break;
                case 'dispatch':
                    this.dispatchEvent(ele, handler, fn, data);
                    break;
            }
        },
        //事件处理机制（方法）
        onEvent(ele, handler, fn, data) {
            this.addHandler(ele, handler, fn)
        },
        removeEvent(ele, handler, fn, data) {
            ele.removeEventListener(handler, fn)
        },
        dispatchEvent(ele, handler, fn, data) {
            var evts = new Event(handler);
            ele.dispatchEvent(evts);
        },
        // cookie操作(time是小时)
        cookieUse(type, data, name, time = 1) {
            switch (type) {
                case 'add':
                    var date = new Date()
                    date.setHours(date.getHours() + time)
                    document.cookie = name + '=' + JSON.stringify(data) + ";expires=" + date.toString();
                    break;
                case 'del':
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    break;
                case 'find':
                    var arr = document.cookie.split(';')
                    var leng = arr.length;
                    for (let i = 0; i < leng; i++) {
                        if (arr[i].split('=')[0] === name) {
                            return JSON.parse(arr[i].split('=')[1]);
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        // 缓存storage使用
        storageUse(method, type, name, data) {
            var obj = {}
            if (method === 'session') {
                obj = sessionStorage
            } else if (method === 'local') {
                obj = localStorage
            } else {
                return;
            }
            switch (type) {
                case 'add':
                    obj.setItem(name, JSON.stringify(data))
                    break;
                case 'del':
                    obj.removeItem(name);
                    break;
                case 'delAll':
                    obj.clear();
                    break;
                case 'find':
                    return JSON.parse(obj[name])
                default:
                    break;
            }
        },
        // 复制文本(可复制元素内容,输入框的值,字符串)ele是触发事件对象，event是事件类型,target是被复制的对象
        copyText(ele, event, target) {
            // this.addHandler(ele, event, handle)
            this.addHandler(ele, event, function (e) {
                var input = document.createElement('input');
                if (typeof target == 'string') {
                    input.value = target
                } else if (target.value) {
                    input.value = target.value
                } else {
                    input.value = target.textContent
                }
                document.body.appendChild(input)
                input.select();
                document.execCommand('Copy');
                input.style.display = 'none'
            })

        },
        // 获取选中文本
        selectText(parent, event, fn) {
            this.addHandler(parent, event, function (e) {
                var str = ''
                if (window.getSelection) {
                    //Firefox、Chrome、Safari、Opera
                    str = window.getSelection().toString();
                } else if (document.selection && document.selection.createRange) { //IE 
                    str = document.selection.createRange().text;
                }
                fn(str)
            })
        },
        // checkBox全选
        checkAll(selectAll, selectItem) {
            let len = selectItem.length;
            this.addHandler(selectAll, 'change', function (e) {
                for (let i = 0; i < len; i++) {
                    selectItem[i].checked = e.target.checked
                }
            });
            for (let j = 0; j < len; j++) {
                this.addHandler(selectItem[j], 'change', function (e) {
                    let result = 1;
                    for (let k = 0; k < len; k++) {
                        result *= selectItem[k].checked;
                    }
                    selectAll.checked = result ? true : false
                })
            }
        },
        // 数组扁平化
        demoteArr(arr, list = []) {
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                if (this.getType(arr[i]) === 'array') {
                    this.demoteArr(arr[i], list)
                } else {
                    list.push(arr[i])
                }
            }
            return list
        },
        //数组升二维(num:每层的个数)
        updateArr(arr, num, list = []) {
            let count = Math.ceil(arr.length / num)
            let value = 0
            for (let i = 0; i < count; i++) {
                let initList = []
                for (let j = 0; j < num; j++) {
                    initList.push(arr[value])
                    value++
                }
                list.push(initList)
            }
            return list
        },
        // 图片转base64
        changeBlob(file, fn) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", file, true);
            xhr.responseType = "blob";
            xhr.send();
            xhr.onload = function (e) {
                if (this.status == 200) {
                    var blob = this.response;
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                        fn(base64)
                    };
                    oFileReader.readAsDataURL(blob);
                    // pic.src = window.URL.createObjectURL(blob);
                }
            }

        },
        // 三级联动
        moreSelect: function (url, elements) {
            function GetArea(url) {
                this.url = url
                this.init(elements)
            }
            GetArea.prototype = {
                num: 0,
                selections: null,
                list: [],
                createOptions(data, parent) {
                    if (!parent) return
                    if (parent.children) {
                        var leng = parent.children.length
                        for (var j = 0; j < leng; j++) {
                            parent.lastElementChild.textContent = ''
                            parent.lastElementChild.remove()
                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var option = document.createElement('option');
                        option.textContent = data[i].name || data[i]
                        parent.appendChild(option)
                    }
                    parent.addEventListener('change', this.changeHandler);
                    parent.data = data
                    parent.self = this
                },
                init(elements) {
                    this.selections = elements
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', this.loadHandler);
                    xhr.open('get', this.url)
                    xhr.send('')
                    xhr.self = this
                },
                loadHandler(e) {
                    this.self.list = JSON.parse(this.response)
                    this.self.createOptions(this.self.list, this.self.selections[this.self.num])
                },
                changeHandler(e) {
                    var list;
                    this.data.forEach((item) => {
                        if (item.name === this.value) {
                            list = item.city ? item.city : item
                        }
                    });
                    this.self.selections.forEach((item, val) => {
                        if (item.id === this.id) {
                            console.log(this.self.num)
                            this.self.num = item.id.split('select')[1] - 1
                        }
                    })
                    if (this.self.num > this.self.selections.length - 1) {
                        return
                    }
                    this.self.num++
                    this.self.createOptions(list, this.self.selections[this.self.num])
                }
            }
            return getArea = new GetArea(url);
        },
        // 函数防抖
        unShake(fn, time) {
            var count = null;
            return (function () {
                var _self = this;
                clearTimeout(count)
                var args = arguments;
                count = setTimeout(function () {
                    fn.call(_self, ...args)
                }, time)
            }())
        },
        // 函数节流
        throttle(fn, time) {
            let _timer = null
            return function () {
                if (_timer) {
                    clearTimeout(_timer)
                    _timer = null
                }
                _timer = setTimeout(fn, time)
            }
        }
    }
}())