---
title:  JS案例：将前端页面导出为PDF 
date:  2021-04-28 11:16:1508-1701-0407-2402-0306-3009-1203-0204-2404-2004-1902-2308-2505-1704-1608-2608-25 
---
**前言：  
记录一下最近的一个需求，产品需要打印表单凭证，需要实现将选中页面的元素或者是组件导出为PDF，方便打印  
使用到的JS库：[html2canvas](http://html2canvas.hertzen.com/)（截取页面生成canvas），[jsPDF](https://github.com/MrRio/jsPDF)（使用JS生成PDF）**

**下面我针对该需求实现一个简单的Demo，并且分享一下遇到的问题**

**首先，我选择了[懒加载](https://gitee.com/DieHunter/myCode/tree/master/%E7%80%91%E5%B8%83%E6%B5%81&%E6%87%92%E5%8A%A0%E8%BD%BD/First)的案例作为测试对象，因为图片可以检测截图效果，并且有滚动加载长页面  
我们把整个demo分为两部分，分别是使用上述两个插件实现基本功能**

**使用html2canvas截屏生成canvas**

```javascript
        let printEle, //截图按钮
            pdfEle, //待截取标签
            canvasBox //canvas显示区域

        (function init(_win, _dom) {
            printEle = _dom.querySelector('#printEle')
            pdfEle = _dom.querySelector('#pdfEle')
            canvasBox = _dom.querySelector('#canvasBox')
            printEle.addEventListener('click', clickHandler) //点击按钮生成截屏
        })(window, document)

        async function clickHandler(e) {
            if (canvasBox.children.length) return //若canvas显示区域已经有标签则退出
            const canvas = await html2canvas(pdfEle, { //截取标签转换为canvas
                background: '#FFFFFF',
            })
            pdfEle.hidden = true //隐藏之前的元素，更好对比
            canvasBox.appendChild(canvas) //显示效果
        }
```

**原图 截图**

![](https://img-blog.csdnimg.cn/20210427184301420.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210427184345303.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)  
**二者清晰度差距看上去好像不是很大，但是放大图片后会发现截图结果很模糊**  
![](https://img-blog.csdnimg.cn/20210427184648498.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)![](https://img-blog.csdnimg.cn/20210427184545121.png?x-oss-processimage/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpbWVfX19fXw,size_16,color_FFFFFF,t_70)

**在网上找了一些方法，但是都不尽人意，用到最多的方法是修改配置项，在html2canvas异步函数中新增dpi和scale，但是在源码里搜索dpi字段并未找到，不知道是不是官方取消了，于是我找到另一种方法对canvas进行缩放，缓解失真**

**好在html2canvas提供了自定义canvas的属性，用户可以自定义canvas属性达到效果**  
![](https://img-blog.csdnimg.cn/20210427190052751.png)

**于是我们写一个新建canvas方法，对其进行缩放**

```javascript
        function createCanvas(target) { 
            //target是待截取的标签，我们通过target生成对应大小的canvas
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d")
            canvas.width = target.offsetWidth * scale; // 画布实际宽度
            canvas.height = target.offsetHeight * scale; // 画布实际高度
            canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
            canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
            context.scale(scale, scale); //等比缩放
            return canvas
        }
```

**在新建截图时调用**

```javascript
            const canvas = await html2canvas(pdfEle, { //截取标签转换为canvas
                canvas: createCanvas(pdfEle),
                background: '#FFFFFF',
            })
```

**效果是这样的，清晰度的问题已经解决，但是打印canvas时会有Y轴上的距离偏移，由于本人对canvas不是很熟练，猜测是由于按钮的高度影响的，因为修改按钮高度（不超过待截屏的元素高度），偏移量相对应也发生同样长度的偏移**  
![](https://img-blog.csdnimg.cn/20210428090339296.gif)  
**此时我们使用getBoundingClientRect()的方法获取待截取标签的位置相对于浏览器可视范围的偏移量，然后通过canvas的translate方式取反位移，即可解决该问题**

```javascript
        function createCanvas(target) { 
            //target是待截取的标签，我们通过target生成对应大小的canvas
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d")
            let clientRect = target.getBoundingClientRect()// 获取标签相对可视区域的偏移量
            canvas.width = target.offsetWidth * scale; // 画布实际宽度
            canvas.height = target.offsetHeight * scale; // 画布实际高度
            canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
            canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
            context.scale(scale, scale); //等比缩放
            context.translate(-clientRect.left, -clientRect.top);//通过translate取反位移
            return canvas
        }
```

**效果如下，生成的图片要比之前的清晰很多，我们还可以通过修改scale来控制图片清晰度**

![](https://img-blog.csdnimg.cn/202104280948238.gif)

**实现了将HTML页面通过canvas显示后，下一步我们就需要使用jsPDF生成PDF文件并下载了**

```javascript
        function downloadPdf(canvas) { //将canvas变成PDF并下载
            const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
            //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
            const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
            doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
            doc.save("test.pdf"); //保存PDF
        }
```

**我们试试长截屏**  
![](https://img-blog.csdnimg.cn/20210428110835544.gif)  
**最后附上完整代码，界面和样式可以直接在[仓库](https://gitee.com/DieHunter/myCode/tree/master/HTML_To_PDF_Demo)中找到**

```javascript
        const {
            jsPDF
        } = jspdf, scale = 2 //缩放程度，清晰度，越大越清晰，图片也越大
        let printEle, //截图按钮
            pdfEle, //待截取标签
            canvasBox //canvas显示区域


        (function init(_dom) {
            printEle = _dom.querySelector('#printEle')
            pdfEle = _dom.querySelector('#pdfEle')
            canvasBox = _dom.querySelector('#canvasBox')
            printEle.addEventListener('click', clickHandler) //点击按钮生成截屏
        })(document)

        async function clickHandler(e) {
            if (canvasBox.children.length) return //若canvas显示区域已经有标签则退出
            const canvas = await html2canvas(pdfEle, { //截取标签转换为canvas
                canvas: createCanvas(pdfEle),
                background: '#FFFFFF'
            })
            downloadPdf(canvas)
            pdfEle.hidden = true //隐藏之前的元素，更好对比
            canvasBox.appendChild(canvas) //显示效果
        }

        function downloadPdf(canvas) { //将canvas变成PDF并下载
            const size = [canvas.width / scale, canvas.height / scale] //pdf真实宽高
            //第一个参数表示横向与纵向，具体可看文档，我这里做了一个适配，宽比高长则是横向反之则是纵向
            const doc = new jsPDF(size[0] / size[1] > 1 ? 'l' : 'p', 'px', size)
            doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, ...size) //将canvas转换为图片并添加到jsPDF中
            doc.save("test.pdf"); //保存PDF
        }

        function createCanvas(target) { //target是待截取的标签，我们通过target生成对应大小的canvas
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d")
            let clientRect = target.getBoundingClientRect() // 获取标签相对可视区域的偏移量
            canvas.width = target.offsetWidth * scale; // 画布实际宽度
            canvas.height = target.offsetHeight * scale; // 画布实际高度
            canvas.style.width = target.offsetWidth + 'px' // 浏览器上显示的宽度
            canvas.style.height = target.offsetHeight + 'px' //浏览器上显示的高度
            context.scale(scale, scale); //等比缩放
            context.translate(-clientRect.left, -clientRect.top); //通过translate取反位移
            return canvas
        }
```

**希望这篇文章对你有帮助，欢迎提出建议与优化，谢谢！**