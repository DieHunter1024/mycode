// 指令解析器
class Compile {
    constructor(elem, vm) {
        this.elem = this.isElemNode(elem) === '1' ? elem : document.querySelector(elem)
        this.vm = vm
        this.getTemp(this.createFragment(this.elem))
    }
    // 递归子元素
    getTemp(fragment) {
        const cloneFragment = Array.from(fragment.cloneNode(true).children)
        cloneFragment.map(item => {
            this.filterElem(item)
            item.children && item.children.length && this.getTemp(item)
        })
    }
    // 创建标签碎片
    createFragment(elem) {
        const fragment = document.createDocumentFragment();
        const elemChild = elem.children
        while (elemChild.length > 0) {
            fragment.append(elem.firstElementChild)
        }
        return fragment
    }
    // 获取标签类型
    isElemNode(elem) {
        return elem.nodeType
    }
    // 针对不同元素节点进行分离
    filterElem(elem) {
        console.log(this.isElemNode(elem))
        switch (this.isElemNode(elem)) {
            case 1:

                break;
            case 2:

                break;
        }
    }
    // 渲染文本
    renderText() {

    }
    // 渲染标签
    renderNode() {

    }
}