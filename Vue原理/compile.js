// 指令解析器

const textRegex = /\{\{(.+?)\}\}/g
class Compile {
    constructor(elem, vm) {
        this.elem = this.isElemNode(elem) === '1' ? elem : document.querySelector(elem)
        this.vm = vm
        const fragment = this.createFragment(this.elem)
        this.getTemp(fragment, this.vm)
        this.elem.appendChild(fragment);
    }
    // 递归子元素
    getTemp(fragment, vm) {
        const fragmentChild = Array.from(fragment.childNodes)
        fragmentChild.forEach(item => {
            this.filterElem(item, vm)
            item.childNodes && item.childNodes.length && this.getTemp(item, vm)
        })
    }
    // 创建标签碎片
    createFragment(elem) {
        const fragment = document.createDocumentFragment();
        while (elem.firstChild) {
            fragment.append(elem.firstChild)
        }
        return fragment
    }
    // 获取标签类型
    isElemNode(elem) {
        return elem.nodeType
    }
    // 针对不同元素节点进行分离
    filterElem(elem, vm) {
        switch (this.isElemNode(elem)) {
            case 1: //元素节点
                this.renderNode(elem, vm)
                break;
            case 3: //文本节点
                this.renderText(elem, vm)
                break;
        }
    }
    // 渲染文本主要解析‘{{}}’
    renderText(elem, vm) {
        const content = elem.textContent;
        textRegex.test(content) && this.compileUtils(elem, vm, content, 'text')
    }
    // 渲染标签
    renderNode(elem, vm) {
        const attributes = Array.from(elem.attributes);
        attributes.forEach(attr => {
            const {
                name,
                value
            } = attr;
            name.startsWith('v-') ? this.compileV_Command(elem, vm, name, value) : name.startsWith('@') ? this.compileEventComment(elem, vm, name.split('@')[1], value) : null
        })
    }
    // v- 指令解析,指令
    compileV_Command(elem, vm, name, value) {
        const key = name.split('v-')[1]
        const eventCommand = key.split(':')[1]
        // 事件
        eventCommand && this.compileEventComment(elem, vm, eventCommand, value)
        switch (name.split('v-')[1]) {
            case 'text':
                this.compileUtils(elem, vm, value, 'text-attr')
                break;
            case 'model':

                break;
            case 'if':

                break;
            case 'show':

                break;
        }
    }
    // @ 指令解析,事件
    compileEventComment(elem, vm, name, value) {
        console.log(elem, vm, name, value)
        // elem.addEventListener(name, value)
    }
    // 标签中指令属性处理
    compileUtils(elem, vm, value, type) {
        switch (type) {
            case 'text':
                elem.textContent = value.replace(textRegex, (..._) => {
                    return this.getDeepData(vm, _[1])
                })
                break;
            case 'text-attr':
                elem.textContent = this.getDeepData(vm, value)
                break;
        }
    }
    //lodash中的 _.get()，获取对象多级属性
    getDeepData(object, path, defaultValue = {}) {
        return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], object) || defaultValue;
    }
}
export default Compile