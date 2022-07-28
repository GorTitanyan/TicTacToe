const div=document.getElementById("mainDiv")
const textDiv=document.createElement("div")
const leftDiv=document.createElement("div")
const rightDiv=document.createElement("div")
const oPl=document.createElement("p")
const xPl=document.createElement("p")
const inputX=document.createElement("input")
const submitX=document.createElement("button")
const inputO=document.createElement("input")
const submitO=document.createElement("button")
const button=document.createElement("button")
const time=document.createElement("div")
const boxes=document.getElementsByClassName("cell")
const ttt=document.createElement("p")
const forXpl=document.createElement("p")
const text=document.createElement("p")
const forOpl=document.createElement("p")
const wincomb=[ [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8] ]
let move,date1, mm, ss, clickCount,interval;
let arr=[]
let game = []
for(let i=0;i<9;i++){
    let cell=document.createElement("div")
    cell.classList.add("cell")
    leftDiv.appendChild(cell)
}
div.append(textDiv, leftDiv, rightDiv)
rightDiv.append(time, button)
forXpl.append(inputX, submitX)
forOpl.append(inputO, submitO)
textDiv.append(xPl,ttt,oPl,forXpl,text,forOpl)
button.classList.add("rightChild")
time.classList.add("rightChild")
ttt.classList.add("highPart")
xPl.classList.add("highPart")
oPl.classList.add("highPart")
forOpl.classList.add("lowPart")
forXpl.classList.add("lowPart")
inputO.classList.add("bottomPart")
inputX.classList.add("bottomPart")
submitX.classList.add("bottomPart")
submitO.classList.add("bottomPart")
time.id="time"
button.id="reset"
leftDiv.id="leftDiv"
rightDiv.id="rightDiv"
submitX.id="sub"
submitO.id="sub"
text.id="justText"
textDiv.id="textDiv"
button.innerText="RESET"
ttt.innerText="TIC TAC TOE"
xPl.innerText="X PLAYER NAME"
oPl.innerText="O PLAYER NAME"
submitX.innerText="enter your name"
submitO.innerText="enter your name"
submitX.disabled=true
submitO.disabled=true
inputX.onfocus=()=>focusing(inputX,submitX)
inputO.onfocus=()=>focusing(inputO,submitO)
submitO.onclick=()=>subClick(inputO,submitO,oPl)
submitX.onclick=()=>subClick(inputX,submitX,xPl)
leftDiv.style.visibility="hidden"

function focusing(inp,but){
    inp.addEventListener("keyup",(e)=>{
        let text=e.target.value
        if(text.trim()){
            but.disabled=false
        }
    })
}


function subClick(inpput,sub,topText){
    topText.innerText=inpput.value
    inpput.disabled=true
    inpput.value=" "
    sub.disabled=true
    arr.push(inpput.value)
    if(arr.length==2){
        leftDiv.style.visibility="visible"
    }
}



function click(){

    for(let i=0;i<boxes.length;i++){ 
        boxes[i].onclick = (e) => butclick(e,i)
        boxes[i].onmouseenter=enter
        boxes[i].onmouseleave=out
        boxes[i].innerText=""
        boxes[i].style.backgroundColor="rgb(170, 170, 170)"
        boxes[i].style.cursor="pointer"
        text.innerText=" "
        game[i]=""
    }
        move="X"
        time.innerText="TIME"
        winner=""
        clickCount = 0
        date1=0
        a=0
        oPl.innerText="O PLAYER NAME"
        xPl.innerText="X PLAYER NAME"
        inputO.value=inputX.value=""
        inputO.disabled=false
        inputX.disabled=false
        leftDiv.style.visibility="hidden"
        clearInterval(interval)
}
click()
function butclick(e,i){
    clickCount++
    
    let item = e.target
    item.innerText=move
    game[i] = move 

    if(clickCount== 1){
      interval= setInterval(()=>{
        date1++
        time.innerText=date1
        mm=Math.floor(date1/60)
        ss=Math.floor(date1%60)
        time.innerText=`${mm}:${ss}`
       },1000) 
    }
    out(e)  
let winner
    if(clickCount>=5){
        
        winner = check()
        if(clickCount==9 && winner!=move){
        winner="DRAW"
    }
        
       if(winner){
            text.innerText=`${winner}`
            
            clearInterval(interval)
        }
    }
    cursorChecking(winner,i)
     
    move= move === "X" ? "O": "X" 
    
  
}


function check(){
    
    for(let a=0; a<wincomb.length;a++){  
        const winItem = wincomb[a]
        if(game[winItem[0]] && game[winItem[0]] === game[winItem[1]] && game[winItem[2]] === game[winItem[1]]){
            setBackColor(winItem)
            return move
        }
    }
}

function setBackColor(winItem){
    for(let i = 0; i<winItem.length; i++){
        boxes[winItem[i]].style.backgroundColor="green"
    }
}

function cursorChecking(winner,i){
    if(winner && winner!="DRAW"){     
        for(let p=0; p<boxes.length;p++){
            boxes[p].style.cursor="not-allowed"
            boxes[p].onclick=null
            boxes[p].onmouseenter=null
            boxes[p].onmouseleave=null
    }
    }else {
        boxes[i].style.cursor="not-allowed"
        boxes[i].onclick=null
        boxes[i].onmouseenter=null
        boxes[i].onmouseleave=null
    }
}

function enter(e){
    e.target.style.backgroundColor="rgb(82, 82, 82)"
}
function out(e){
    e.target.style.backgroundColor="rgb(170, 170, 170)"
}

button.addEventListener("click",click,false)



