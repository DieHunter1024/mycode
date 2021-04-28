var ul, img;
const count = 5;
var arr = [];
var pic = 1;
var maxList = 30
init();

function init() {
    ul = document.querySelector("ul");
    for (var i = 0; i < count; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.style.margin = "5px";
        li.style.width = (document.documentElement.clientWidth) / count - 22 + "px";
        li.style.border = "1px solid lightcoral";
        li.style.float = "left";
        arr.push(0);
    }
    img = new Image();
    img.src = "img/" + pic + ".jpg";
    img.addEventListener("load", addPic);
    document.addEventListener("scroll", move)
}

function addPic(e) {
    if (ul.children[0].children.length > maxList) return
    var copy = this.cloneNode(false);
    var min = Math.min.apply(null, arr);
    var index = arr.indexOf(min);
    ul.children[index].appendChild(copy);
    copy.style.width = "100%";
    arr[index] = copy.parentElement.offsetHeight;
    if ((document.documentElement.scrollHeight - document.documentElement.scrollTop) / document.documentElement
        .clientHeight > 4) {
        return;
    }
    pic = parseInt(Math.random() * 10 + 1);
    img.src = "img/" + pic + ".jpg";
}

function move(e) {
    if ((document.documentElement.scrollHeight - document.documentElement.scrollTop) / document.documentElement
        .clientHeight < 2) {
        pic = parseInt(Math.random() * 10 + 1);
        img.src = "img/" + pic + ".jpg";
    }
}