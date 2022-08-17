import { IGetValue, ISetValue, IMixIn, ICloneDeep, ICreateObjectVariable, IEnumInversion, IInherit, ICreateObject, IGetInstance, IClassDecorator, getType, getTypeByList, IStringToJson, IJsonToString } from "./index.js"
export const getValue: IGetValue = (object, key, defaultValue = '') => {
    const paths = key.split('.')
    for (const i of paths) { //逐层遍历path
        object = object[i]
        if (object === undefined) { //不能用 '!value' null，0，false等等会等于false
            return defaultValue
        }
    }
    return object
}

export const setValue: ISetValue = (object, key, value = {}) => {
    const paths = key.split('.')
    const last = paths[paths.length - 1]//为何要在length - 1时赋值：因为object的引用关系使得我们可以一级一级赋值，而当最后一项是基本类型时，无法将引用的值赋给原始的object
    let _object: unknown = object
    for (const i of paths) {
        if (typeof _object !== "object" && _object !== undefined) {
            return object
        }
        !_object && (_object = {})
        !_object[i] && (_object[i] = {})
        last === i && (_object[last] = value)
        _object = _object[i]

    }
    return object
}
export const mixIn: IMixIn = (target, source = {}, overwrite = false) => {
    for (const k in source) {
        for (const key in source[k]) {
            const proto = target.prototype ?? target
            if (target[key] === undefined || overwrite) {
                proto[key] = source[k][key]
            }
        }
    }
    return target
}

export const enumInversion: IEnumInversion = (target) => {
    for (const key in target) {
        const _key = target[key]
        if (typeof _key === "string" && !!!target[_key]) {
            target[_key] = key
        }
    }
    return target
}

export const isNotObject = (source, type) => (typeof source !== "object" || type === 'null')

export const cloneDeep: ICloneDeep = (target) => {
    const __type = getType(target)
    if (isNotObject(target, __type)) return target
    let __init = createObjectVariable(__type, target)
    if (__type === "map") {
        target.forEach((value, key) => {
            __init.set(key, cloneDeep(value))
        })
    } else if (__type === "set") {
        target.forEach((value) => {
            __init.add(cloneDeep(value))
        })
    } else {
        Reflect.ownKeys(target).forEach(keys => {
            const desc = target[keys]
            __init[keys] = cloneDeep(desc)
        })
    }
    return __init
}

export const createObjectVariable: ICreateObjectVariable = (type, source = {}) => {
    switch (type) {
        case "array":
            return []
        case "function":
            return source
        case "set":
            return new Set()
        case "map":
            return new Map()
        case "date":
            return new Date(source)
        case "regExp":
            return new RegExp(source)
        case "math":
            return Math
        default:
            return {}
    }
}

export const createObject: ICreateObject = (source) => {
    function F() { }
    F.prototype = source
    return new F()
}

export const inherit: IInherit = (source, target = function () { }) => {
    target.prototype = createObject(source.prototype)
    target.prototype.super = source;
    target.prototype.constructor = target;
    return target
}

export const getInstance: IGetInstance = (classProto, overwrite = false, ...params) => {
    if (!classProto._instance || overwrite) {
        classProto._instance = new classProto(...params)
    }
    return classProto._instance;
}

export const classDecorator: IClassDecorator = (params): ClassDecorator => {
    return (target) => {
        for (const key in params) {
            if (!!!Reflect.has(target.prototype, key)) {
                target.prototype[key] = params[key]
            }
        }
    }
}

export const stringToJson: IStringToJson = (target: string) => {
    if (getType(target) !== "string") return {}
    try {
        return JSON.parse(target)
    } catch (error) {
        return {}
    }
}

export const jsonToString: IJsonToString = (target: any) => {
    if (!getTypeByList(target, ["array", "object", "set", "map"])) return ""
    try {
        return JSON.stringify(target)
    } catch (error) {
        return ""
    }
}