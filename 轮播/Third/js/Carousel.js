var Carousel = (function () {
    var liStyle = {
        width: "20px",
        height: "20px",
        borderRadius: "20px",
        backgroundColor: "rgba(240,137,137,0.3)",
        border: "1px solid #F08989",
        float: "left",
        lineHeight: "20px",
        textAlign: "center",
        marginLeft: "20px",
        color: "white"
    };
    var ulStyle = {
        margin: 0,
        padding: 0,
        listStyle: "none",
        position: "absolute",
        bottom: "20px"
    };
    var imgConStyle = {
        position: "absolute",
        left: "0px"
    };
    var maskDivStyle = {
        overflow: "hidden",
        position: "relative",
        margin: "auto",
        backgroundColor: "antiquewhite"
    };

    function Carousel(parent, list, btnList) {
        this.init(parent, btnList);
        this.sourse = list;
    }
    Carousel.prototype = {
        loadImg: null,
        imgList: [],
        carouselBox: null,
        _width: 0,
        _height: 0,
        _sourse: [],
        bool: false,
        index: 0,
        direct: "",
        speed: 30,
        autoPlay: false,
        dotLi: null,
        autoTime: 200,
        set sourse(value) {
            if (!value || !Array.isArray(value) || !value.length) return;
            this.widthValue = 0;
            this.heightValue = 0;
            if (this.loadImg) {
                this.loadImg.removeEventListener("load", this.loadImgHandler);
            }
            this.imgList.length = 0;
            this._sourse = value;
            this.reLoadImg(value);
        },
        get sourse() {
            return this._sourse;
        },
        set widthValue(value) {
            this._width = value;
            if (this._width === 0) return;
            this.carouselBox.style.width = value + "px";
            var ul = this.carouselBox.lastElementChild;
            ul.style.left = (value - ul.offsetWidth) / 2 + "px";
            // console.log(this.carouselBox.lastElementChild);
        },
        get widthValue() {
            return this._width;
        },
        set heightValue(value) {
            this._height = value;
            if (this._height === 0) return;
            this.carouselBox.style.height = value + "px";
            this.carouselBox.firstElementChild.style.height = value + "px";
            this.carouselBox.children[1].style.top = this.carouselBox.children[2].style.top = (this.heightValue - this.carouselBox.children[1].offsetHeight) / 2 + "px";
        },
        get heightValue() {
            return this._height;
        },
        reLoadImg: function (list) {
            var img = new Image();
            img.addEventListener("load", this.loadImgHandler);
            img.self = this;
            img.num = 0;
            img.list = list;
            img.imgList = [];
            img.src = list[img.num];
        },
        loadImgHandler: function (e) {
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if (this.num > this.list.length - 1) {
                this.self.imgLoadFinish(this.imgList);
                return;
            }
            this.src = this.list[this.num];
        },
        init: function (parent, btnList) {
            if (!this.carouselBox) {
                this.carouselBox = document.createElement("div");
                var imgBox = document.createElement("div");
                this.carouselBox.appendChild(imgBox);
                for (var i = 0; i < btnList.length; i++) {
                    var btimg = new Image();
                    btimg.addEventListener("load", this.btnLoadHandler);
                    btimg.src = btnList[i];
                    this.carouselBox.appendChild(btimg);
                    if (i === 0) {
                        btimg.style.left = "10px";
                        btimg.style.position = "absolute";
                    } else {
                        btimg.style.right = "10px";
                        btimg.style.position = "absolute";
                    }
                    btimg.self = this;
                    this.carouselBox.self = this;
                    this.carouselBox.addEventListener("mouseenter", this.isAuto);
                    this.carouselBox.addEventListener("mouseleave", this.isAuto);
                    btimg.addEventListener("click", this.changeImgHandler);
                }
                var ul = document.createElement("ul");
                Object.assign(ul.style, ulStyle);
                Object.assign(this.carouselBox.style, maskDivStyle);
                Object.assign(imgBox.style, imgConStyle);
                this.carouselBox.appendChild(ul);
                parent.appendChild(this.carouselBox);
            }
            return this.carouselBox;
        },
        imgLoadFinish: function (imgList) {
            this.imgList = imgList;
            var imgCon = this.carouselBox.firstElementChild;
            var ul = this.carouselBox.lastElementChild;
            this.clearNode(imgCon);
            this.clearNode(ul);
            for (var i = 0; i < this.imgList.length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);
                Object.assign(li.style, liStyle);
            }
            ul.style.left = (this.widthValue - ul.offsetWidth) / 2 + "px";
            imgCon.appendChild(this.imgList[0]);
            ul.self = this;
            ul.addEventListener("click", this.changeDot);
            if (this.widthValue === 0) {
                this.widthValue = this.imgList[0].width;
            } else {
                this.carouselBox.style.width = this.widthValue + "px";
                this.setSize(imgCon, this.widthValue, 0);
            }
            if (this.heightValue === 0) {
                this.heightValue = this.imgList[0].height;
            } else {
                this.carouselBox.style.height = this.heightValue + "px";
                imgCon.firstElementChild.style.height = this.heightValue + "px";
                this.setSize(imgCon, 0, this.heightValue);
            }
            this.dotColor();
            this.carouselBox.children[1].style.top = this.carouselBox.children[2].style.top = (this.heightValue - this.carouselBox.children[1].offsetHeight) / 2 + "px";
        },
        setSize: function (con, w, h) {
            for (var i = 0; i < con.children.length; i++) {
                if (w) {
                    con.children[i].style.width = w + "px";
                }
                if (h) {
                    con.children[i].style.height = h + "px";
                }
            }
        },
        clearNode: function (node) {
            var len = node.children.length;
            for (var i = 0; i < len; i++) {
                node.firstElementChild.remove();

            }
        },
        changeImgHandler: function (e) {
            if (this.self.bool) return;
            if (this.style.left === "10px") {
                this.self.direct = "right";
                this.self.index--;
                if (this.self.index < 0) {
                    this.self.index = this.self.imgList.length - 1;
                }
            } else if (this.style.right === "10px") {
                this.self.direct = "left";
                this.self.index++;
                if (this.self.index > this.self.imgList.length - 1) {
                    this.self.index = 0;
                }
            }
            this.self.creatNextPic();
        },
        creatNextPic: function () {
            if (this.direct !== "left" && this.direct !== "right") return;
            var imgCount = this.carouselBox.firstElementChild;
            if (this.direct === "left") {
                imgCount.appendChild(this.imgList[this.index]);
                imgCount.style.width = this.widthValue * 2 + "px";
                imgCount.style.left = 0;
            } else {
                imgCount.insertBefore(this.imgList[this.index], imgCount.firstElementChild);
                imgCount.style.width = this.widthValue * 2 + "px";
                imgCount.style.left = -this.widthValue + "px";
            }
            if (!this.widthValue) {
                this.imgList[this.index].style.width = this.widthValue + "px";
            }
            if (!this.heightValue) {
                this.imgList[this.index].style.height = this.heightValue + "px";
            }
            this.dotColor();
            this.bool = true;
        },
        movePic: function () {
            if (!this.bool) return;
            if (this.direct !== "left" && this.direct !== "right") {
                this.bool = false;
                return;
            }
            var imgCount = this.carouselBox.firstElementChild;
            if (this.direct === "left") {
                imgCount.style.left = imgCount.offsetLeft - this.speed + "px";
                if (imgCount.offsetLeft <= -this.widthValue) {
                    imgCount.firstElementChild.remove();
                    imgCount.style.left = 0 + "px";
                    this.direct = "";
                    this.bool = false;
                }
            } else {
                imgCount.style.left = imgCount.offsetLeft + this.speed + "px";
                if (imgCount.offsetLeft >= 0) {
                    imgCount.lastElementChild.remove();
                    imgCount.style.left = 0 + "px";
                    this.direct = "";
                    this.bool = false;
                }
            }
        },
        changeDot: function (e) {
            if (this.self.bool) return;
            if (e.target instanceof HTMLUListElement) return;
            var arr = Array.from(this.children);
            var count = arr.indexOf(e.target);
            if (count === this.self.index) return;
            if (count > this.self.index) {
                this.self.direct = "left";
            } else if (count < this.self.index) {
                this.self.direct = "right";
            }
            this.self.index = count;
            this.self.creatNextPic();
            this.self.dotColor();
        },
        dotColor: function () {
            if (this.dotLi) {
                this.dotLi.style.backgroundColor = "rgba(240,137,137,0.3)";
            }
            this.dotLi = this.carouselBox.lastElementChild.children[this.index];
            this.dotLi.style.backgroundColor = "rgba(240,137,137,1)";
        },
        isAuto: function (e) {
            if (e.type === "mouseenter") {
                this.self.autoPlay = false;
            } else {
                this.self.autoPlay = true;
            }
        },
        carouselAuto: function () {
            if (!this.autoPlay) return;
            this.autoTime--;
            if (this.autoTime > 0) return;
            this.autoTime = 200;
            this.direct = "left";
            this.index++;
            if (this.index > this.imgList.length - 1) {
                this.index = 0;
            }
            this.creatNextPic();
        },
        animate: function () {
            this.movePic();
            this.carouselAuto();
        }
    };
    Carousel.prototype.constructor = Carousel;
    return Carousel;
})();