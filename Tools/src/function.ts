
import { ICatchAwait, IThrottle, IDebounce, IDefer } from "./index.js"

export const throttle: IThrottle = (fn, time) => {
    let _timer = null;
    return (...args) => {
        if (_timer) return;
        _timer = setTimeout(() => {
            fn.call(this, ...args);
            _timer = null;
        }, time);
    };
};

export const debounce: IDebounce = (fn, time) => {
    let _timer = null;
    return (...args) => {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        _timer = setTimeout(() => {
            fn.call(this, ...args);
        }, time);
    };
}

export const defer: IDefer = () => {
    let resolve, reject
    return {
        promise: new Promise<void>((_resolve, _reject) => {
            resolve = _resolve
            reject = _reject
        }),
        resolve, reject
    }
}

export const catchAwait: ICatchAwait<Promise<any>> = (defer) => defer.then(res => [null, res]).catch(err => [err])
