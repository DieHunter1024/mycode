import html2canvas from "../lib/html2canvas/html2canvas.esm.js"
import jsPDF from "../lib/jspdf/jspdf.es.js"
import eventBus from '../lib/eventBus/event.js'
/* 
 * 将页面多个元素导出为pdf
 * @param elem 需要导出的dom列表，默认document>body
 * @param scale 缩放程度，清晰度，越大越清晰，图片也越大
 * @param fileName 导出文件名称
 * @param background 导出PDF的背景色
 * @param direct 导出方向(pdf拼接方向)，horizontal：水平，vertical：垂直
 */
export default class Html2Pdfs {
    constructor(elems, scale = 2, fileName = 'fileName', background = '#FFFFFF', direct = 'vertical') {
        if (!elems || !elems.length) {
            elems = [document.body]
        }
        this.canvas = null
        this.init(elems, scale, fileName, background, direct)
    }
    init(elem, scale, fileName, background, direct) {
        eventBus.onEvent('print', async (e) => {
            this.canvas = await this.outputElem(elem, scale, background)
        })
        eventBus.onEvent('showEle', async (e) => {
            this.canvas && this.canvas.forEach(_ => canvasBox.appendChild(_)) //显示效果
            pdfEle.style.display = 'none'
        })
        eventBus.onEvent('download', async (e) => {
            this.canvas && this.downloadPdf(this.canvas, fileName, scale, direct)
        })
    }
    downloadPdf(canvas, fileName, scale, direct) { //将canvas变成PDF并下载
        let height, width
        if (direct === 'horizontal') {
            width = this.getSum(canvas, 'width')
            height = this.getLongestItem(canvas.filter(_ => _.height))
        } else if (direct === 'vertical') {
            height = this.getSum(canvas, 'height')
            width = this.getLongestItem(canvas.filter(_ => _.width))
        }

        console.log(width, height)
        canvas.forEach(_ => {
            const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
            //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
            const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
            doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
        })

        doc.save(fileName + ".pdf"); //保存PDF
    }

    createCanvas(target, scale) { //target是待截取的标签，我们通过target生成对应大小的canvas
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d")
        // const clientRect = target.getBoundingClientRect() // 获取标签相对可视区域的偏移量
        canvas.width = target.offsetWidth * scale; // 画布实际宽度
        canvas.height = target.offsetHeight * scale; // 画布实际高度
        canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
        canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
        context.scale(scale, scale); //等比缩放
        // context.translate(-(clientRect ?.left), -(clientRect ?.top)); //通过translate取反位移
        return canvas
    }
    outputElem(elems, scale, background) {
        return Promise.all(elems.map(_ => html2canvas(_, { //截取标签转换为canvas
            canvas: this.createCanvas(_, scale),
            background,
            scale: 1, //新版与之前的一定要设置scale，不然会导致成像缩放(重要)
        })))
    }
    getSum(list, key) {
        return list.reduce((total, item) => (total[key] || total) + item[key])
    }
    getLongestItem(list) {
        return Math.max.apply(null, list)
    }
}