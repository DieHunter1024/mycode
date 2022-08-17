
import { IRandomNum, IUrlSplit, IUrlJoin, IGetType, IGetTypeByList, types } from "./index.js"

export const randomNum: IRandomNum = (min, max, bool = false) => {
    return Math.floor(Math.random() * (max - min + (bool ? 1 : 0)) + min);
}
export const urlSplit: IUrlSplit = (url) => {
    const result = {};
    if (!url.includes("?")) {
        return result;
    }
    const params = url.split("?")[1].split("&");
    params.forEach((i) => {
        const key = i.split("=")[0];
        result[key] = i.split("=")[1];
    })
    return result;
}

export const urlJoin: IUrlJoin = (url, query = {}) => {
    const queryObject = Object.keys(query)
    if (queryObject.length === 0) return url
    const params = queryObject.map(i => `${i}=${query[i]}`)
    return `${url}${url.includes("?") ? "&" : '?'}${params.join("&")}`;
}

export const getType: IGetType<types> = (data) => {
    const type = typeof data;
    if (data === null) {
        return "null";
    } else if (type === "object") {
        const key = Object.prototype.toString.call(data);
        return types[key];
    }
    return type;
}

export const getTypeByList: IGetTypeByList = (data, whiteList = []) => {
    const __type = getType(data)
    return whiteList.indexOf(__type) > 0
}