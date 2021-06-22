// 指令解析器
class Compile {
    constructor(elem, vm) {
        this.elem = this.isElemNode(elem) === '1' ? elem : document.querySelector(elem)
        this.vm = vm
        const fragment = this.createFragment(this.elem)
        this.getTemp(fragment)
        this.elem.appendChild(fragment);
    }
    // 递归子元素
    getTemp(fragment) {
        const cloneFragment = Array.from(fragment.cloneNode(true).childNodes)
        cloneFragment.map(item => {
            this.filterElem(item)
            item.children && item.children.length && this.getTemp(item)
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
    filterElem(elem) {
        switch (this.isElemNode(elem)) {
            case 1: //元素节点
                this.renderNode(elem)
                break;
            case 3: //文本节点
                this.renderText(elem)
                break;
        }
    }
    // 渲染文本主要解析‘{{}}’
    renderText(elem) {
        const content = elem.textContent;
        (/\{\{(.+?)\}\}/.test(content)) && this.compileUtils(elem, this.vm, content, 'text')
    }
    // 渲染标签
    renderNode(elem) {
        const attributes = elem.attributes;
        console.log(attributes)
    }
    // 标签中指令属性处理
    compileUtils(elem, vm, value, type) {

    }
}
export default Compile