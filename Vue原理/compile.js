// 指令解析器
const textRegex = /\{\{(.+?)\}\}/g //解析{{}}的正则
class Compile {
    constructor(elem, vm) {
        this.elem = this.isElemNode(elem) === '1' ? elem : document.querySelector(elem)
        this.vm = vm
        const fragment = this.createFragment(this.elem)
        this.getTemp(fragment, this.vm)
        this.elem.appendChild(fragment);
    }
    // 递归子元素，查找所有元素
    getTemp(fragment, vm) {
        const fragmentChild = Array.from(fragment.childNodes)
        fragmentChild.forEach(item => {
            this.filterElem(item, vm)
            item.childNodes && item.childNodes.length && this.getTemp(item, vm)
        })
    }
    // 创建标签碎片，将dom元素添加到标签碎片中
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
    // 渲染文本，主要解析‘{{}}’及多个‘{{}}’
    renderText(elem, vm) {
        if (!textRegex.test(elem.textContent)) return
        const content = elem.textContent
        content.replace(textRegex, (..._) => { //外面的content.replace获取所有{{}}中的属性
            new Watcher(this, vm, _[1], _ => { //里面的content.replace获取data中绑定的值
                this.compileUtils(elem, vm, content.replace(textRegex, (..._) => this.getDeepData(vm, _[1])), 'text-content')
            })
        })
    }
    // 渲染标签
    renderNode(elem, vm) {
        const attributes = Array.from(elem.attributes); //取出所有属性和值
        attributes.forEach(attr => {
            const {
                name,
                value
            } = attr;
            // 过滤‘v-’和‘@’操作，并移除标签属性
            name.startsWith('v-') ? (this.compileV_Command(elem, vm, name, value), this.removeAttr(elem, name)) : name.startsWith('@') ? (this.compileEventComment(elem, vm, name.split('@')[1], value), this.removeAttr(elem, name)) : null
        })
    }
    // v- 指令解析,指令
    compileV_Command(elem, vm, name, value) {
        const key = name.split('v-')
        const eventCommand = key[1] && key[1].split(':')[1]
        // v-model事件
        key[1] === 'model' && this.compileEventComment(elem, vm, 'input', value, e => {
            this.setDeepData(vm, value, e.target.value)
        })
        // 过滤指令是否为事件
        eventCommand ? this.compileEventComment(elem, vm, eventCommand, value) : this.compileUtils(elem, vm, value, key[1])
    }
    // @ 指令解析,事件
    compileEventComment(elem, vm, name, value, fn) {
        !fn && elem.addEventListener(name, vm.options.methods[value].bind(vm))
        fn && elem.addEventListener(name, fn.bind(vm))
    }
    // 标签中指令属性处理(后期实现bind，if)
    compileUtils(elem, vm, value, type) {
        switch (type) {
            case 'text':
                new Watcher(this, vm, value, () => {
                    elem.textContent = this.getDeepData(vm, value)
                })
                break;
            case 'text-content':
                elem.textContent = value
                break;
            case 'html':
                new Watcher(this, vm, value, () => {
                    elem.innerHTML = this.getDeepData(vm, value)
                })
                break;
            case 'model':
                new Watcher(this, vm, value, () => {
                    elem.value = this.getDeepData(vm, value)
                })
                break;
            case 'if':
                const temp = document.createTextNode('')
                elem.parentNode.insertBefore(temp, elem);
                new Watcher(this, vm, value, () => {
                    this.getDeepData(vm, value) ? temp.parentNode.insertBefore(elem, temp) : temp.parentNode.removeChild(elem)
                })
                break;
            case 'show':
                new Watcher(this, vm, value, () => {
                    elem.hidden = !this.getDeepData(vm, value)
                })
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
    // 移除属性值
    removeAttr(elem, key) {
        elem.removeAttribute(key)
    }
}