function ShopCar() {

}
ShopCar.prototype = (function () {
    //闭包存放私有变量
    return {
        shopList: null, //商品详情列表
        shoppingList: null, //购物车中的商品
        table: null, //购物车列表容器
        ADD_ITEM_EVENT: "add_item_event", //添加单个商品自定义事件
        REDUCE_ITEM_EVENT: "reduce_item_event", //减少单个商品自定义事件
        DDELETE_ITEM_EVENT: "delete_item_event", //删除单个商品自定义事件
        INPUT_ITEM_EVENT: "input_item_event", //修改商品数量自定义事件
        CHECK_ITEM_EVENT: "check_item_event", //全选自定义事件
        /*
         *    初始化函数
         *    1、获取存储中的商品列表数据
         *    2、如果商品购物车列表在存储器中存在，那么就将这个数据获取赋值给购物车列表
         *      如果不存在，创建一个空数组
         *    3、侦听添加商品事件，侦听删除商品事件，侦听修改商品数量事件，侦听选中商品事件
         *    4、循环商品列表，创建所有的商品标签
         *    5、根据购物车列表创建表格
         * */
        init(shopList, parentEle) {
            if (localStorage.shoppingList) { //获取本地缓存中已加入购物车的数据
                this.shoppingList = JSON.parse(localStorage.shoppingList);
            } else {
                this.shoppingList = [];
            }
            if (!this.shopList) {
                this.shopList = shopList
                this.createShopList(parentEle)
            }
            // 以下均为操作时的事件监听，采取自定义事件接收document的事件抛发，分别是：加入购物车(增加某一个商品)，减少一个商品，删除某商品，输入商品数量，全选/取消全选
            document.addEventListener(this.ADD_ITEM_EVENT, this.addItemEventHandler)
            document.addEventListener(this.REDUCE_ITEM_EVENT, this.reduceItemEventHandler)
            document.addEventListener(this.DDELETE_ITEM_EVENT, this.deleteItemEventHandler)
            document.addEventListener(this.INPUT_ITEM_EVENT, this.inputItemEventHandler)
            document.addEventListener(this.CHECK_ITEM_EVENT, this.checkItemEventHandler)
        },
        createShopList(parentEle) { //创建商品详情列表
            var data = this.shopList
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                li.className = "liItem";
                var img = new Image();
                img.src = data[i].icon;
                li.appendChild(img);
                var title = document.createElement("div");
                title.textContent = data[i].name;
                li.appendChild(title);
                var price = document.createElement("span");
                price.textContent = data[i].price + "元";
                li.appendChild(price);
                li.that = this //将全局this存至元素中，方便后续调用
                li.data = data[i]; //与上句同理，方便后续调用
                li.addEventListener("click", this.addItemEvent);
                parentEle.appendChild(li);
            }
            this.createTable()
        },
        createTable() { //当数据发生变化时重新渲染购物车列表初始化购物车
            if (this.table) { //初始化购物车
                this.table.remove()
                this.table = null;
            }
            if (this.shoppingList.length === 0) return;
            this.table = document.createElement("table");
            document.body.appendChild(this.table);
            var thr = document.createElement("tr");
            this.table.appendChild(thr);
            for (var prop in this.shoppingList[0]) { //创建表头，如果属性名是select，就创建全选按钮
                var th = document.createElement("th");
                if (prop === "select") {
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.className = 'checkbox'
                    input.checked = this.checkAll(); //由于当数据修改时绑定了createTable方法，每次数据改变就会刷新全选状态
                    input.that = this //将全局this存至元素中，方便后续调用
                    input.addEventListener("change", this.checkEvent);
                    th.appendChild(input);
                } else {
                    th.textContent = prop;
                }
                thr.appendChild(th)
            }
            for (var i = 0; i < this.shoppingList.length; i++) {
                var tr = document.createElement("tr");
                this.table.appendChild(tr);
                for (var str in this.shoppingList[i]) {
                    var td = document.createElement("td");
                    td.data = this.shoppingList[i]; //将每一行数据存至td元素中，方便后续调用
                    this.selectTdType(td, this.shoppingList[i], str);
                    tr.appendChild(td);
                }
            }
            localStorage.shoppingList = JSON.stringify(this.shoppingList) //当表格渲染完毕就将数据存至本地缓存，浏览器关闭或刷新不会清除数据
        },
        selectTdType(td, data, type) { //将表格中的元素通过属性分类
            switch (type) {
                case 'select':
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.checked = data.select;
                    input.className = 'checkbox'
                    input.that = this
                    input.addEventListener("change", this.checkEvent);
                    td.appendChild(input);
                    break;
                case 'icon':
                    var img = new Image();
                    img.src = data.icon;
                    td.appendChild(img);
                    break;
                case 'num':
                    var countNum = this.createCountNum(td, data);
                    countNum.input.value = data.num;
                    break;
                case 'deleted':
                    var btn = document.createElement("button");
                    btn.textContent = "删除";
                    td.appendChild(btn);
                    btn.that = this
                    btn.data = data;
                    btn.addEventListener("click", this.deleteItemEvent);
                    break;
                default:
                    td.textContent = data[type];
                    break;
            }
        },
        createCountNum(ele, data) { //创建数量计数器
            var div = document.createElement("div"); //这个父元素用于储存单个商品信息
            ele.appendChild(div);
            div.className = "numBox";
            var leftBtn = this.createMark(div, 'reduce') //减少商品按钮
            var input = document.createElement("input");
            input.type = "text";
            input.value = "1"; //商品初始数量
            div.appendChild(input);
            var rightBtn = this.createMark(div, 'add') //新增商品按钮
            div.input = input;
            div.data = data;
            div.that = this
            rightBtn.that = this
            rightBtn.data = data;
            leftBtn.addEventListener("click", this.reduceItemEvent);
            rightBtn.addEventListener("click", this.addItemEvent);
            input.addEventListener("input", this.inputItemEvent);
            input.addEventListener("blur", this.inputItemEvent);
            return div;
        },
        createMark(parentEle, type) { //判断增加或减少键
            var markBtn = document.createElement("button");
            markBtn.textContent = type == "add" ? '+' : '-';
            parentEle.appendChild(markBtn);
            return markBtn
        },
        addItemEvent() { //第一个事件抛发（当用户点击列表商品或点击增加键时，抛发事件给document触发addItemEventHandler方法，用于参数传递，参数通过event对象进行传递）
            var _this = this.that
            var event = new Event(_this.ADD_ITEM_EVENT);
            event.data = this.data;
            event._this = _this;
            document.dispatchEvent(event);
        },
        addItemEventHandler(e) { //当用户点击列表商品或点击增加键时执行函数
            var _this = e._this
            var obj = { //这里遵循对象顺序，先定义的属性排在前面，所以将选择框放在最前定义，总价和删除键放在最后
                select: false
            };
            for (var str in e.data) {
                obj[str] = e.data[str];
            }
            obj.sum = obj.num * obj.price;
            obj.deleted = false;
            _this.searchItemById(obj.id, _this.shoppingList, obj, 'add')
            _this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
        },
        reduceItemEvent() { //第二个事件抛发（当用户点击减少键时，抛发事件给document触发reduceItemEventHandler方法，用于参数传递，参数通过event对象进行传递）
            var _this = this.parentElement.that
            var event = new Event(_this.REDUCE_ITEM_EVENT);
            event.data = this.parentElement.data;
            event._this = _this;
            document.dispatchEvent(event);
        },
        reduceItemEventHandler(e) { //与增加同理
            var _this = e._this
            e.data.sum = e.data.num * e.data.price;
            _this.searchItemById(e.data.id, _this.shoppingList, e.data, 'reduce')
            _this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
        },
        deleteItemEvent() { //第三个事件抛发（当用户点击删除键时，抛发事件给document触发deleteItemEventHandler方法，用于参数传递，参数通过event对象进行传递）
            var _this = this.that
            var event = new Event(_this.DDELETE_ITEM_EVENT);
            event.data = this.data;
            event._this = _this;
            document.dispatchEvent(event);
        },
        deleteItemEventHandler(e) {
            var _this = e._this
            _this.shoppingList = _this.shoppingList.filter(function (item) { //数组过滤函数，返回id属性不等于当前id的数组，即删除当前选中的对象，并重新赋值
                return item.id !== e.data.id;
            });
            _this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
            localStorage.shoppingList = JSON.stringify(_this.shoppingList) //这里为了考虑，若删除到0条时，无法重新初始化表格（shoppingList.length==0,无法进入createTable函数）
        },
        inputItemEvent(e) { //第四个事件抛发（当用户输入数值或处于失焦时，过滤数据，并抛发事件给document触发inputItemEventHandler方法，用于参数传递，参数通过event对象进行传递）
            var _this = this.parentElement.that
            if (e.type === "input") {
                this.value = this.value.replace(/[^0-9]/g, ""); //只允许输入数字
                if (this.value === "0") { // 如果=0，就设为1
                    this.value = "1";
                }
                if (this.value.length > 2) { // 如果输入的内容大于2位，让这个值为99（最大99个）
                    this.value = "99";
                }
            } else if (e.type === "blur") {
                if (this.value.length === 0) { //  失焦时，如果什么都没有输入，也设为1
                    this.value = "1";
                }
                // 当失焦时才将事件抛发到document
                var event = new Event(_this.INPUT_ITEM_EVENT);
                event.num = this.value
                event.data = this.parentElement.data;
                event._this = _this;
                document.dispatchEvent(event);
            }
        },
        inputItemEventHandler(e) {
            var _this = e._this
            _this.shoppingList.map(function (item) { //遍历查询被修改的对象
                if (item.id === e.data.id) {
                    item.num = e.num;
                    item.sum = item.price * item.num;
                }
            });
            _this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
        },
        checkAll() { //初始化表格时执行，查找所有选项是否都选中（全选框随其他选项框状态修改而修改）
            return this.shoppingList.filter(function (item) {
                return !item.select;
            }).length === 0; //返回true或false
        },
        checkEvent() { //第五个事件抛发（当用户选中或取消任意选项框时，抛发事件给document触发checkItemEventHandler方法，用于参数传递，参数通过event对象进行传递）
            var _this = this.that
            var data = this.parentElement.data;
            var event = new Event(_this.CHECK_ITEM_EVENT);
            event.all = !data; //若没有data，说明是全选框
            event.select = this.checked; //赋值给select属性
            event._this = _this;
            event.data = data;
            document.dispatchEvent(event);
        },
        checkItemEventHandler(e) {
            var _this = e._this
            if (e.all) { //若e.all为true说明该选项框是全选框
                _this.shoppingList.map(function (item) {
                    item.select = e.select; //其他选项框与全选框状态一致
                })
            } else {
                _this.shoppingList.map(function (item) { //单选，选中某一个（在表格初始化时执行checkAll判断是否全选）
                    if (item.id === e.data.id) {
                        item.select = e.select;
                    }
                })
            }
            _this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
        },
        searchItemById(id, list, data, type) { //遍历查询某项商品增加或减少
            var arr = list.filter(function (item) {
                return item.id === id;
            }); //若有返回值则对某项商品操作（在1-99区间，若为0则直接删除）
            switch (type) {
                case "add":
                    if (arr.length == 0) {
                        list.push(data);
                    } else if (arr[0].num < 99) {
                        arr[0].num++;
                        arr[0].sum = arr[0].num * arr[0].price;
                    }
                    break;
                case "reduce":
                    if (arr[0].num > 1) {
                        arr[0].num--;
                        arr[0].sum = arr[0].num * arr[0].price;
                    } else {
                        this.shoppingList = list.filter(function (item) {
                            return item.id !== id;
                        });
                        this.createTable() //当数据发生变化时重新渲染购物车列表初始化购物车
                        localStorage.shoppingList = JSON.stringify(this.shoppingList)
                    }
                    break;
            }
        }
    }
}())
ShopCar.prototype.constructor = ShopCar;