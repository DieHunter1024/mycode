let index = 0 //第几条博客
let maxPage = 3 //博客总数
let page = 5 //5页停止一次，防止检测评论太快
let time = 30 * 1000 //延时评论
let speed = 3 * 1000 //评论速度
let timeTick //计时器
let elements = document.querySelector('#feedlist_id').querySelectorAll('.clearfix') //博客列表
init()

function init() {
    timeTick = setInterval(function () {
        if (index > maxPage) {
            clearInterval(timeTick)
            return
        }
        if (index && index % page == 0) {
            clearInterval(timeTick)
            pageList = clearPage(pageList)
            setTimeout(init, time)
        }
        let hrefItem = elements[index++].querySelector('a').href
        window.open(hrefItem)
    }, speed)
}

function keyDownCtrl() {
    let mockKeyboardEvent = new KeyboardEvent('keydown', {
        ctrlKey: true
    });
    document.dispatchEvent(mockKeyboardEvent);
}
document.onkeypress=function (params) {
    console.log('ctrl')
}