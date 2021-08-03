// 数据劫持
class DataProxy {
    constructor(data, vm) {
        for (const key in data) {
            Object.defineProperty(vm, key, {
                get() {
                    return data[key];
                },
                set(val) {
                    data[key] = val;
                }
            })
        }
        return data
    }
}