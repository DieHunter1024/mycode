import html2canvas from "../lib/html2canvas/html2canvas.esm.js"
import jsPDF from "../lib/jspdf/jspdf.es.js"
import eventBus from '../lib/eventBus/event.js'
/* 
 * 将页面导出为pdf
 * @param elem 需要导出的dom，默认document>body
 * @param scale 缩放程度，清晰度，越大越清晰，图片也越大
 * @param fileName 导出文件名称
 * @param background 导出PDF的背景色
 */
export default class Html2Pdf {
    constructor(elem, scale = 2, fileName = 'test', background = '#FFFFFF') {
        if (!elem) {
            elem = document.body
        }
        this.canvas = null
        this.init(elem, scale, fileName, background)
    }
    init(elem, scale = 2, fileName = 'test', background = '#FFFFFF') {
        eventBus.onEvent('print', async (e) => {
            this.canvas = await html2canvas(elem, { //截取标签转换为canvas
                canvas: this.createCanvas(elem, scale),
                background
            })
        })
        eventBus.onEvent('download', async (e) => {
            this.downloadPdf(this.canvas, fileName, scale)
        })

    }
    downloadPdf(canvas, fileName, scale) { //将canvas变成PDF并下载
        const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
        //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
        const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
        doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
        doc.save(fileName + ".pdf"); //保存PDF
    }

    createCanvas(target, scale) { //target是待截取的标签，我们通过target生成对应大小的canvas
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d")
        let clientRect = target.getBoundingClientRect() // 获取标签相对可视区域的偏移量
        canvas.width = target.offsetWidth * scale; // 画布实际宽度
        canvas.height = target.offsetHeight * scale; // 画布实际高度
        canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
        canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
        context.scale(scale, scale); //等比缩放
        context.translate(-clientRect?.left, -clientRect?.top); //通过translate取反位移
        return canvas
    }
}
// const {
//     jsPDF
// } = jspdf, scale = 2 //缩放程度，清晰度，越大越清晰，图片也越大
// let printEle, //截图按钮
//     pdfEle, //待截取标签
//     canvasBox //canvas显示区域


// (function init(_dom) {
//     printEle = _dom.querySelector('#printEle')
//     pdfEle = _dom.querySelector('#pdfEle')
//     canvasBox = _dom.querySelector('#canvasBox')
//     printEle.addEventListener('click', clickHandler) //点击按钮生成截屏
// })(document)

// async function clickHandler(e) {
//     if (canvasBox.children.length) return //若canvas显示区域已经有标签则退出
//     const canvas = await html2canvas(pdfEle, { //截取标签转换为canvas
//         canvas: createCanvas(pdfEle),
//         background: '#FFFFFF'
//     })
//     downloadPdf(canvas)
//     pdfEle.hidden = true //隐藏之前的元素，更好对比
//     canvasBox.appendChild(canvas) //显示效果
// }

// function downloadPdf(canvas) { //将canvas变成PDF并下载
//     const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
//     第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
//     const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
//     doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
//     doc.save("test.pdf"); //保存PDF
// }

// function createCanvas(target) { //target是待截取的标签，我们通过target生成对应大小的canvas
//     let canvas = document.createElement("canvas");
//     let context = canvas.getContext("2d")
//     let clientRect = target.getBoundingClientRect() // 获取标签相对可视区域的偏移量
//     canvas.width = target.offsetWidth * scale; // 画布实际宽度
//     canvas.height = target.offsetHeight * scale; // 画布实际高度
//     canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
//     canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
//     context.scale(scale, scale); //等比缩放
//     context.translate(-clientRect.left, -clientRect.top); //通过translate取反位移
//     return canvas
// }