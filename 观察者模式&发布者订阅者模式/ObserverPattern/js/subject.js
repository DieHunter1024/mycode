module.exports = class Subject { //定义被观察者类，每个实例化后拥有注册的观察者回调的列表（observerList）和触发回调（fireEvent）功能
    constructor() {
        this.observerList = []
    }
    /**
     * 触发
     * @param e 被观察者传递给观察者的参数
     */
    fireEvent(e) {
        this.observerList.forEach(item => {
            item(e)
        })
    }
}