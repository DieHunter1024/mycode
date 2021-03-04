import Utils
    from './utils.js';

let utils = new Utils()
export default class LoadPic {
    //静态资源路径
    set baseUrl (val) {
        this._baseUrl = val
    }

    get baseUrl () {
        return this._baseUrl
    }

    //根据数据渲染图片
    create (ele, data) {
        for(let i = 0; i < data.length; i ++) {
            let liBox = utils.createEle('li', {listStyle: 'none'}, {}, ele)
            utils.createEle('img', null, {
                src: `${this.baseUrl}${data[i]}`
            }, liBox)
        }
    }
}