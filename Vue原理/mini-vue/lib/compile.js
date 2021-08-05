// 指令解析器
const textRegex = /\{\{(.+?)\}\}/g //解析{{}}的正则
class Compile {
    elem = null
    constructor(elem, vm) {
        this.elem = isElemNode(elem) === '1' ? elem : document.querySelector(elem)
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

    // 针对不同元素节点进行分离
    filterElem(elem, vm) {
        switch (isElemNode(elem)) {
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
        textRegex.test(elem.textContent) && updater(elem, vm, elem.textContent, 'text-content')
    }
    // 渲染标签
    renderNode(elem, vm) {
        //取出所有属性和值
        Array.from(elem.attributes).forEach(attr => {
            const {
                name,
                value
            } = attr;
            // 过滤‘v-’和‘@’操作，并移除标签属性
            name.startsWith('v-') ? (this.compileV_Command(elem, vm, name, value), removeAttr(elem, name)) : name.startsWith('@') ? (this.compileEventComment(elem, vm, name.split('@')[1], value), removeAttr(elem, name)) : null
        })
    }
    // v- 指令解析,指令
    compileV_Command(elem, vm, name, value) {
        const key = name.split('v-')
        const eventCommand = key[1] && key[1].split(':')[1]
        // v-model事件
        key[1] === 'model' && this.compileEventComment(elem, vm, 'input', value, e => {
            setDeepData(vm, value, e.target.value)
        })
        // 过滤指令是否为事件
        eventCommand ? this.compileEventComment(elem, vm, eventCommand, value) : updater(elem, vm, value, key[1])
    }
    // @ 指令解析,事件
    compileEventComment(elem, vm, name, value, fn) {
        !fn && elem.addEventListener(name, vm.options.methods[value].bind(vm))
        fn && elem.addEventListener(name, fn.bind(vm))
    }
}