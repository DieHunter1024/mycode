let index = 0 //第几条
let maxPage = 30 //总页数
let page = 5 //5页停止一次
let timeTick //计时器
init()

function init() {
    timeTick = setInterval(function () {
        if (index > maxPage) {
            clearInterval(timeTick)
            return
        }
        if (index % page == 0) {
            clearInterval(timeTick)
            setTimeout(function (params) { //暂停60秒
                init()
            }, 60 * 1000)
            return
        }
        document.querySelector('#feedlist_id').querySelectorAll('.clearfix')[index++].querySelector('a').click()
    }, 5000)
}