/*
 * @Author: Hunter
 * @Date: 2022-02-11 15:49:02
 * @LastEditTime: 2022-03-14 16:07:39
 * @LastEditors: Hunter
 * @Description: 
 * @FilePath: \import_export_excel\src\utils\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export * from './excel'
import { getCurrentInstance } from 'vue'
export function mixinGlobal(_vm: any, func: any, keyWord: string = '$') {
    for (const iterator in func) {
        _vm.config.globalProperties[keyWord + iterator] = func[iterator]
    }
}

export function getGlobal(key: string, keyWord: string = '$') {
    return getCurrentInstance()?.appContext.config.globalProperties[keyWord + key]
}
export function mixinComponent(_vm: any, components: any) {
    for (const name in components) {
        _vm.component(name, (components as any)[name])
    }
}