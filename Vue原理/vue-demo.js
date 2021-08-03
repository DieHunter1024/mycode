class VueDemo {
    constructor(options) {
        this.options = options //配置信息
        this.data = options.data;
        // 判断options.el是否存在
        (this.el = options.el) && Object.defineProperties(this, {
            //observer和compile的顺序不要错，否则监听不到compile中的数据
            observer: {
                value: new Observer(this.data) // 数据监听器
            },
            proxy: {
                value: new DataProxy(this.data, this) //data代理到this
            },
            compile: {
                value: new Compile(options.el, this) //指令解析器
            }
        })
    }
}