

const like = document.getElementById("like");
const parent_like = document.getElementById("parent_like")
const girls = document.querySelectorAll(".girl")


var start = 0
var isMove = false

var start_girl = 0
var isMove_girl = false

var girl_index = girls.length - 1

var left = 0

const end_width = parent_like.getBoundingClientRect().width - like.getBoundingClientRect().width


girls.forEach(g=>{
    g.addEventListener("touchstart",(e)=>{
        start_girl = e.touches[0].clientY
        isMove_girl = true;
    })
    g.addEventListener("touchmove",(e)=>{
        var delta = start_girl - e.touches[0].clientY  
        if (isMove_girl && delta > 0){
            g.style.bottom = delta + "px"
        }
        console.log(delta)
        if(delta > 150){
            isMove = false
            change_girl()
        }
    })

})

like.addEventListener("touchstart", (e) => {
    start = e.touches[0].clientX
    isMove = true;
})

like.addEventListener("touchmove", (e) => {
    if (isMove) {
        left = e.touches[0].clientX - start
        if (left < 0)
            left = 0
        else if (left > end_width)
            left = end_width
        else
            like.style.left = left + "px"
    }
})

like.addEventListener("touchend", () => {
    isMove = false;
    if (left > end_width * 0.9){
        left = end_width
        change_girl()
    }
    else
        left = 0
    like.animate({
        left: left + "px", 
    }, {
        duration: 100
    })
    setTimeout(()=>{
        like.style.left = left + "px"
    },100)
    // 
})

function change_girl(){
    setTimeout(() => {
        girls[girl_index].classList.add("top_girl")
        like.animate({
            left: 0 + "px", 
        }, {
            duration: 100
        })
        girl_index -=1
        setTimeout(()=>{
            like.style.left = 0 + "px"
        },100)
    },500)
}