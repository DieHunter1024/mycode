export default class ShopController extends EventTarget { //控制层，处理用户交互，路由，输入，将model view controller剥离开，通过controller中的事件监听抛发进行路由传输数据
    constructor() { //继承事件对象，用于抛发自定义事件
        super();
    }
    static get instance() {  //单例写法与java中getinstance相似，new会生成一个新对象，分配内存，而这么写可以把一个已存在的引用给你使用，节省效能,若只使用get + 属性名而不用set产生只读属性，只允许调用，无法修改
        if (!ShopController._instance) {
            Object.defineProperty(ShopController, "_instance", {
                value: new ShopController()
            })
        }
        return ShopController._instance;
    }
    static dispatch(type, data) { //抛发自定义事件，传递数据
        let event = new Event(type)
        event.data = data
        ShopController.instance.dispatchEvent(event)
    }
    static runCommand(type, Command) { //观察者模式，当自定义事件触发时调用其他类中的方法，与dispatch对应,类似于addEventlistener，只不过将回调函数换成类中的动态方法
        var command = new Command()
        ShopController.instance.addEventListener(type, command.eventHandler)
    }
}