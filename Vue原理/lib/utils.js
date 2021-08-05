//lodash中的 _.get()，获取对象多级属性
function getDeepData(object, path, defaultValue) {
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
function setDeepData(object, path, value) {
    const paths = path.split('.')
    const last = paths[paths.length - 1]
    let _obj = object
    for (const i of paths) {
        last === i && (_obj[last] = value)
        _obj = _obj[i]
    }
}
// 移除属性值
function removeAttr(elem, key) {
    elem.removeAttribute(key)
}
// 获取标签类型
function isElemNode(elem) {
    return elem.nodeType
}