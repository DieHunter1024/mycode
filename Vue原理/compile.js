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
        if (!textRegex.test(elem.textContent)) return
        const content = elem.textContent.replace(textRegex, (..._) => this.getDeepData(vm, _[1]))
        new Watcher(this, vm, content, this.compileUtils.bind(this, elem, vm, content, 'text-content'))
    }
    // // 渲染文本主要解析‘{{}}’
    // renderText(elem, vm) {
    //     if (!textRegex.test(elem.textContent)) return
    //     const content = elem.textContent.replace(textRegex, (..._) => this.getDeepData(vm, _[1]))
    //     elem.textContent.replace(textRegex, (..._) => {
    //         // console.log(_)
    //         new Watcher(this, vm, _[1], this.compileUtils.bind(this, elem, vm, content, 'text-content'))
    //         return this.getDeepData(vm, _[1])
    //     })
    // }
    // 渲染标签
    renderNode(elem, vm) {
        const attributes = Array.from(elem.attributes);
        attributes.forEach(attr => {
            const {
                name,
                value
            } = attr;
            name.startsWith('v-') ? (this.compileV_Command(elem, vm, name, value), this.removeAttr(elem, name)) : name.startsWith('@') ? (this.compileEventComment(elem, vm, name.split('@')[1], value), this.removeAttr(elem, name)) : null
        })
    }
    // v- 指令解析,指令
    compileV_Command(elem, vm, name, value) {
        const key = name.split('v-')
        const eventCommand = key[1] && key[1].split(':')[1]
        // 事件
        key[1] === 'model' && this.compileEventComment(elem, vm, 'input', value, e => {
            this.setDeepData(vm, value, e.target.value)
        })
        eventCommand ? this.compileEventComment(elem, vm, eventCommand, value) : new Watcher(this, vm, value, this.compileUtils.bind(this, elem, vm, value, key[1]))
    }
    // @ 指令解析,事件
    compileEventComment(elem, vm, name, value, fn) {
        !fn && elem.addEventListener(name, vm.options.methods[value].bind(vm))
        fn && elem.addEventListener(name, fn.bind(vm))
    }
    // 单独解析model事件
    compileModel(elem, vm, value) {
        elem.addEventListener('input', _ => this.setDeepData(vm, value, _.target.value))
    }
    // 标签中指令属性处理
    compileUtils(elem, vm, value, type) {
        switch (type) {
            case 'text':
                elem.textContent = this.getDeepData(vm, value)
                break;
            case 'text-content':
                elem.textContent = value
                break;
            case 'html':
                elem.innerHTML = this.getDeepData(vm, value)
                break;
            case 'model':
                elem.value = this.getDeepData(vm, value)
                break;
            case 'if':
                // this.getDeepData(vm, value) && elem.parentNode.removeChild(elem)
                break;
            case 'show':
                elem.hidden = !this.getDeepData(vm, value)
                break;
        }
    }
    //lodash中的 _.get()，获取对象多级属性
    getDeepData(object, path, defaultValue) {
        const paths = path.split('.')
        for (const i of paths) { //逐层遍历path
            object = object[i]
            if (object === undefined) { //不能用 '!object' null，0，false等等会等于false
                return defaultValue
            }
        }
        return object
    }
    //lodash中的 _.set()，赋值对象某级属性
    setDeepData(object, path, value) {
        const paths = path.split('.')
        const last = paths[paths.length - 1]
        let _obj = object
        for (const i of paths) {
            last === i && (_obj[last] = value)
            _obj = _obj[i]
        }
    }
    removeAttr(elem, key) {
        elem.removeAttribute(key)
    }
}