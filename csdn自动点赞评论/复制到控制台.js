let index = 0
 setInterval(function(){
if(index>20){
    return
}
document.querySelector('#feedlist_id').querySelectorAll('.clearfix')[index++].querySelector('a').click() 
},5000)