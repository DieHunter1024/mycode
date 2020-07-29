import Model from './model.js';
export default class View {
    constructor() {

    }
    static initView() {
        this.createImg(Model.getInstance().imgList)
        let changePicBtn = document.querySelector('.change').children
        for (let i = 0; i < changePicBtn.length; i++) {
            if (changePicBtn[i].textContent == '<') {
                changePicBtn[i].addEventListener('click', this.prevPic)
            } else if (changePicBtn[i].textContent == '>') {
                changePicBtn[i].addEventListener('click', this.nextPic)
            }

        }
    }
    static createImg(list) {
        this.clearChild(imgTab)
        this.clearChild(imgBox)
        for (let i = 0; i < list.length; i++) {
            let tab = document.createElement('li');
            let img = document.createElement('li');
            tab.style.backgroundImage = `url(./img/${list[i]})`
            img.style.backgroundImage = `url(./img/${list[i]})`
            imgTab.appendChild(tab)
            imgBox.appendChild(img)
        }
        this.checkPic()
    }
    static clearChild(parent) {
        var len = parent.children.length
        for (var i = 0; i < len; i++) {
            parent.children[0].remove()
        }
    }
    static prevPic() {
        Model.getInstance().nowPicCount--
    }
    static nextPic() {
        Model.getInstance().nowPicCount++
    }
    static checkPic() {
        let imgList = Model.getInstance().imgList
        let nowPicCount = Model.getInstance().nowPicCount
        for (let i = 0; i < imgList.length; i++) {
            imgBox.children[i].style.display = 'none'
            imgTab.children[i].className = ''
        }
        imgTab.children[nowPicCount].className = 'select'
        imgBox.children[nowPicCount].style.display = 'block'
    }
}