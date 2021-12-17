---
title:  JS案例：实现Promise 
date:  2020-11-17 17:02:0501-0403-0112-2711-3004-1407-2010-1006-2005-1403-3101-1307-0302-1103-2103-1202-0203-2311-07 
---
**说到ES6的Promise，大家并不陌生，它是JS中解决异步的方法之一  
其优点：避免回调地狱，链式调用，函数思路清晰，逻辑相对回调函数和事件发布/订阅更强  
缺点：理解性差，异步操作在promise构造函数内部**

**这段时间在整理面试题时发现，Promise的实现可以单独拿出来分享，于是自己简单实现了一下  
码云地址：[https://gitee.com/DieHunter/myCode/tree/master/Promise%E5%B0%81%E8%A3%85](https://gitee.com/DieHunter/myCode/tree/master/Promise%E5%B0%81%E8%A3%85)**

**实现完整功能之前，我们先了解一下Promise的用法，并实现一个简单的Promise和Promise.then函数**

```javascript
Promise(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void): Promise<any>
```

**上述配置提示中显示，Promise需要传入一个回调函数，函数有两个参数（resolve, reject），第一个是异步执行成功后回调，另一个是失败时的回调。Promise.then方法是执行异步函数成功，即resolve执行时，才会执行then方法中的回调，以下是Promise最简单的一个用法**

```javascript
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('success')// 传参
            }, 500)
        }).then(function (res) {
            console.log(res) // success
        })
```

**下面，我们实现一个最简单的Promise，用于解析Promise.then的原理，主要原理就是用两个回调函数嵌套，将函数作为参数放入至异步操作中，当异步操作执行后再执行作为参数的回调**

```javascript
        function MyPromise(fn) { // 主要原理就是用两个回调函数嵌套，将函数作为参数放入至异步操作中，当异步操作执行后再执行作为参数的回调
            var _this = this;
            _this.params = null; // 传递的参数
            _this.tempResolve = null // _this.tempResolve的作用是将参数传递至then方法中
            function resolve(params) { // 异步操作之后才会执行该方法，执行前一直等待
                _this.params = params
                _this.tempResolve(_this.params)
            }
            fn(resolve) // 将resolve通过回调返回到异步操作函数中,当resolve执行时，才是异步操作执行后
        }

        MyPromise.prototype.then = function (_resolve) { // 异步操作传递参数，简言之就是连接then和resolve
            var _this = this
            _this.tempResolve = function () {
                _resolve(_this.params)
            }
        }
        MyPromise.prototype.constructor = MyPromise

        new MyPromise(function (res, rej) {
                setTimeout(function () {
                    res('success')
                }, 1000)
            })
            .then(function (res) {
                console.log(res) // success
            })
```

**如果理解了上面的代码，就已经成功了一半，接下来，我们对Promise进行深入的实现，与上述代码差别是，添加then的链式调用，其实可以理解为多层Promise嵌套，但是我们需要对每层Promise做出操作，所以，我们在每层promise中添加status用于记录当前promise是否已执行，tempResolve也要改成tempResolveList，因为需要执行的函数不止一个，变成了一个队列，在上面代码的基础上，我们对resolve进行优化**

```javascript
            function resolve(params) { // 异步操作之后才会执行该方法，执行前一直等待
                if (_this.status === 'pending') {
                    _this.status = 'resolve'; // 进入函数后，立即修改函数状态，防止下面的循环重复执行函数
                    _this.params = params;
                    for (var i = 0; i < array.length; i++) {
                        _this.tempResolveList[i](_this.params) // 执行所有then的链式调用的函数
                    }
                }
            }
```

**除此之外，在then函数中，还需要添加一段代码，其目的是将Promise返回到下一层链式调用，将回调函数通过resolve传递至下一层，达到依次同步执行的目的**

```javascript
        MyPromise.prototype.then = function (tempResolve) { // 异步操作传递参数，简言之就是连接then和resolve
            var _this = this
            var _promise = new MyPromise(function (resolve, reject) {
                if (_this.status == 'pending') {
                    _this.tempResolveList.push(function () {
                        resolve(tempResolve(_this
                            .params)) // 将上一层tempResolve通过resolve的参数异步传递给下一层的Promise中，每层都会异步叠加
                    })
                }
            })
            return _promise // 返回Promise用于链式调用
        }
```

**完成之后，我们会发现一个问题，当我们通过resolve传递tempResolve执行结果时，只有一层链式调用的话，返回的是原回调函数，当到了第二层时，返回的是上一层的resolve，此时我们需要在resolve函数之前做个过滤，并且把参数中的then放在本层，直接执行**

```javascript
                if (params && typeof params === 'function' || typeof params ===
                    'object') { // 这里要判断参数是普通参数params，还是MyPromise方法，链式调用一定会产生MyPromise构造函数
                    var _then = params.then // 如果参数是MyPromise构造函数，则将上层的then放到本层继续执行后续操作
                    if (typeof _then === 'function') {
                        _then.call(params, resolve); // 链式调用then
                        return;
                    }
                }
```

**Promise.then的链式调用完整代码**

```javascript
        function MyPromise(fn) { // 主要原理就是用两个回调函数嵌套，将函数作为参数放入至异步操作中，当异步操作执行后再执行作为参数的回调
            var _this = this;
            _this.status = 'pending'; // 每层Promise的待定状态，只有当前Promise处于pending的时候，才会执行异步函数
            _this.params = null; // 传递的参数
            _this.tempResolveList = new Array() // 储存链式调用then中的函数队列
            function resolve(params) { // 异步操作之后才会执行该方法，执行前一直等待
                if (params && typeof params === 'function' || typeof params ===
                    'object') { // 这里要判断参数是普通参数params，还是MyPromise方法，链式调用一定会产生MyPromise构造函数
                    var _then = params.then // 如果参数是MyPromise构造函数，则将上层的then放到本层继续执行后续操作
                    if (typeof _then === 'function') {
                        _then.call(params, resolve); // 链式调用then
                        return;
                    }
                }
                if (_this.status === 'pending') {
                    _this.status = 'resolve'; // 进入函数后，立即修改函数状态，防止下面的循环重复执行函数
                    _this.params = params;
                    for (var i = 0; i < _this.tempResolveList.length; i++) {
                        _this.tempResolveList[i](_this.params) // 执行所有then的链式调用的函数
                    }
                }
            }
            fn(resolve) // 将resolve通过回调返回到异步操作函数中,当resolve执行时，才是异步操作执行后
        }

        MyPromise.prototype.then = function (tempResolve) { // 异步操作传递参数，简言之就是连接then和resolve
            var _this = this
            var _promise = new MyPromise(function (resolve, reject) {
                if (_this.status == 'pending') {
                    _this.tempResolveList.push(function () {
                        resolve(tempResolve(_this
                            .params)) // 将上一层tempResolve通过参数异步传递给下一层的Promise中，每层都会异步叠加
                    })
                }
            })
            return _promise // 返回Promise用于链式调用
        }
        MyPromise.prototype.constructor = MyPromise
        var count = 1
        new MyPromise(function (res, rej) {
                setTimeout(function () {
                    res('success' + count++)
                }, 1000)
            })
            .then(function (res) {
                console.log(res) // success1
                return new MyPromise(function (res, rej) {
                    setTimeout(function () {
                        res('success' + count++)
                    }, 1000)
                })
            }).then(function (res) {
                console.log(res) // success2
                return new MyPromise(function (res, rej) {
                    setTimeout(function () {
                        res('success' + count++)
                    }, 1000)
                })
            }).then(function (res) {
                console.log(res) // success3
            })
```

**实现了链式调用后，我们对reject以及catch进行一个简单的实现，其实现过程与then相似，我们对一些方法封装一下，得到以下代码（catch没有完善链式调用，导致then方法执行数量大于1时失效）**

```javascript
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
        var count = 1
        new MyPromise(function (res, rej) {
                setTimeout(function () {
                    rej('success' + count++)
                }, 1000)
                // setTimeout(function () {
                //     res('success' + count++)
                // }, 1000)
            })
            .then(function (res) {
                console.log(res) // success1
                return new MyPromise(function (res, rej) {
                    setTimeout(function () {
                        res('success' + count++)
                    }, 1000)
                })
            }).catch(function (err) {
                console.log(err) // success1
            })
```

**总结：代码可能有地方不完善，欢迎大佬指出**