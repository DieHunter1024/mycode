export default class Utils { //工具类
	//将对象拼接到url中
	static urlJoin(url, obj) {
		var list = []
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				list.push(`${key}=${obj[key]}`)
			}
		}
		return `${url}?${list.join('&')}`
	}
	static createEle(ele, style, attribute) { //新增标签，设置属性及样式
		let element = document.createElement(ele)
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
		return element
	}
	// 函数节流
	static throttle(fn, time) {
		let _timer = null
		return function () {
			if (_timer) {
				clearTimeout(_timer)
				_timer = null
			}
			_timer = setTimeout(fn.bind(this, ...arguments), time)
		}
	}
}