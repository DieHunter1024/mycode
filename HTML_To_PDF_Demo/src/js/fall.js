/* 
 * 懒加载
 * @param elem 父元素dom，默认document>body
 * @param imgList 图片列表
 * @param maxLine 最大行
 * @param background 最大列
 */
const liStyle = {
    float: 'left',
    margin: '5px',
    width: '',
    border: '1px solid lightcoral'
}
let _count, _elem, _imgList, _maxLine, _maxRow, _elemHeight
class LazyLoad {
    constructor({
        elem,
        imgList,
        maxLine,
        maxRow
    }) {
        _count = 0 //图片索引计算
        _elem = elem || document.body
        _imgList = imgList || []
        _maxLine = maxLine || 'infinity'
        _maxRow = maxRow || 4
        _elemHeight = this.initArr(_maxRow, 0) //高度容器
        this.init()
    }
    init() {
        this.createItem()
        this.createImg(_imgList[_count], this.pushImg.bind(this))
        document.addEventListener("scroll", this.move.bind(this))
    }
    initArr(length, defaultVal) {
        let arr = []
        for (let i = 0; i < length; i++) {
            arr.push(defaultVal)
        }
        return arr
    }
    createItem() {
        _elemHeight.forEach(_ => {
            createEle('li', {
                ...liStyle,
                width: (document.documentElement.clientWidth / _maxRow) - 22 + "px"
            }, {}, _elem)
        })
    }
    createImg(path, cb) {
        if (path) {
            let img = new Image();
            img.src = path;
            img.style.width = '100%'
            img.addEventListener("load", cb);
        }
    }
    move() {
        const domEle = document.documentElement
        if ((domEle.scrollHeight - domEle.scrollTop) / domEle
            .clientHeight > 2 && !(domEle.scrollHeight - domEle.scrollTop) / domEle
            .clientHeight < 1) {
            return false;
        }
        this.createImg(_imgList[++_count], this.pushImg.bind(this))


    }
    pushImg(e) {
        if (_maxLine !== 'infinity' && _elem.children[0].children.length > _maxLine) return
        const copyEle = e.target.cloneNode(false);
        const index = _elemHeight.indexOf(Math.min.apply(null, _elemHeight));
        _elem.children[index].appendChild(copyEle);
        _elemHeight[index] = _elem.children[index].offsetHeight;
        this.move()
    }
}
/*新增标签，设置属性及样式
 * @param {ElementObject} ele  元素
 * @param {StyleObject} style  样式
 * @param {object} attribute   属性
 * @param {object} parent   父元素
 * @return 生成的标签
 */
function createEle(ele, style, attribute, parent) {
    let element = document.createElement(ele);
    if (style) {
        for (let key in style) {
            element.style[key] = style[key];
        }
    }
    if (attribute) {
        for (let key in attribute) {
            element[key] = attribute[key];
        }
    }
    parent && parent.appendChild(element);
    return element;
}
export default LazyLoad