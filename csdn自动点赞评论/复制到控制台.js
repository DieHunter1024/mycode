let index = 0
 setInterval(function(){
if(index>10){
    return
}
document.querySelector('#feedlist_id').querySelectorAll('.clearfix')[index++].querySelector('a').click() 
},5000)