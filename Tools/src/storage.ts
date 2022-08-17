

export const setStorage = (key: string, val: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(val))
    }
    catch (error) {
        console.error(error)
    }
}

export const getStorage = (key: string) => {
    try {
        const str = localStorage.getItem(key)
        if (str === null || str === undefined) {
            return null
        }
        return JSON.parse(str)
    } catch (error) {
        console.error(error);
        return null
    }
}

export const clearStorage = (key: string) => {
    try {
        key && localStorage.removeItem(key);
        !key && localStorage.clear();
    } catch (error) {
        console.error(error);
    }
}