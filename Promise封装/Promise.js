function MyPromise(fn) { // 主要原理就是用两个回调函数嵌套，将函数作为参数放入至异步操作中，当异步操作执行后再执行作为参数的回调
    var _this = this;
    _this.status = 'pending'; // 每层Promise的待定状态，只有当前Promise处于pending的时候，才会执行异步函数
    _this.params = null; // 传递的参数
    _this.tempResolveList = new Array() // 储存链式调用then中的函数队列
    _this.tempRejectList = new Array() // 储存链式调用catch中的函数队列

    _this.runCommandList = function (_status, _params,
        _commandList) { // 若函数状态是pending待定状态，函数执行后会有两个状态，resolve和reject
        if (_params && typeof _params === 'function' || typeof _params ===
            'object') { // 这里要判断参数是普通参数params，还是MyPromise方法，链式调用一定会产生MyPromise构造函数
            var _then = _params.then // 如果参数是MyPromise构造函数，则将上层的then放到本层继续执行后续操作
            if (typeof _then === 'function') {
                _then.call(_params, resolve); // 链式调用then
                return;
            }
        }
        if (_this.status === 'pending') {
            _this.status = _status; // 进入函数后，立即修改函数状态，防止下面的循环重复执行函数
            _this.params = _params;
            for (var i = 0; i < _commandList.length; i++) {
                _commandList[i](_this.params) // 执行所有then的链式调用的函数
            }
        }
    }
    _this.runCallBack = function (resolve, reject, finishFn) {
        return function () {
            try {
                var temp = finishFn(_this.params);
                resolve(temp);
            } catch (error) {
                reject(error);
            }
        }
    }
    _this.createPromise = function (temp, tempList) {
        var _this = this
        return new MyPromise(function (resolve, reject) {
            if (_this.status == 'pending') {
                tempList.push(_this.runCallBack(resolve, reject,
                    temp)) // 将上一层tempResolve通过参数异步传递给下一层的Promise中，每层都会异步叠加
            }
        })
    }

    function resolve(params) { // 异步操作之后才会执行该方法，执行前一直等待,通过回调返回到new Promise(fn)参数中
        _this.runCommandList('resolve', params, _this.tempResolveList)
    }

    function reject(params) { // 异步操作之后才会执行该方法，执行前一直等待,通过回调返回到new Promise(fn)参数中
        _this.runCommandList('reject', params, _this.tempRejectList)
    }
    try { //捕获异常
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    } // 将resolve通过回调返回到异步操作函数中,当resolve执行时，才是异步操作执行后
}

MyPromise.prototype.then = function (tempResolve) { // 异步操作传递参数，简言之就是连接then和resolve
    var _this = this
    var _promise = _this.createPromise(tempResolve, _this.tempResolveList)
    _promise.catch = function (tempReject) { // 异步操作传递参数，简言之就是连接then和resolve
        _this.createPromise(tempReject, _this.tempRejectList)
    }
    return _promise // 返回Promise用于链式调用
}
MyPromise.prototype.constructor = MyPromise