// 更新视图,标签中指令属性处理
function updater(elem, vm, value, type) {
    switch (type) {
        case 'text':
            new Watcher(this, vm, value, _ => {
                elem.textContent = getDeepData(vm, value)
            })
            break;
        case 'text-content':
            value.replace(textRegex, (..._) => { //外面的content.replace获取所有{{}}中的属性
                new Watcher(this, vm, _[1], _ => { //里面的content.replace获取data中绑定的值
                    elem.textContent = value.replace(textRegex, (..._) => getDeepData(vm, _[1]))
                })
            })
            break;
        case 'html':
            new Watcher(this, vm, value, _ => {
                elem.innerHTML = getDeepData(vm, value)
            })
            break;
        case 'model':
            new Watcher(this, vm, value, _ => {
                elem.value = getDeepData(vm, value)
            })
            break;
        case 'if':
            const temp = document.createTextNode('')
            elem.parentNode.insertBefore(temp, elem);
            new Watcher(this, vm, value, _ => {
                getDeepData(vm, value) ? temp.parentNode.insertBefore(elem, temp) : temp.parentNode.removeChild(elem)
            })
            break;
        case 'show':
            new Watcher(this, vm, value, _ => {
                elem.hidden = !getDeepData(vm, value)
            })
            break;
    }
}