class VueDemo {
  constructor(vmEle, options) {
    this.options = options; //配置信息
    this.$data = new Observer(options.data);
    // 判断options.el是否存在
    (this.el = options.el) &&
      Object.defineProperties(this, {
        proxy: {
          value: new DataProxy(this.$data, this), //data代理到this
        },
        compile: {
          value: new Compile(vmEle, this.options.el, this), //指令解析器
        },
      });
  }
}
