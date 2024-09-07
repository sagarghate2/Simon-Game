let userAns = [];
let compAns = [];
let simon = ["red","green","yellow","blue"];
let level = 0;
let highest = 0;
let start = false;
let h2 = document.querySelector('h2');
let body = document.querySelector('body');
document.addEventListener("keypress",function(){
    if(start == false){
      showlevel();
      start = true;
    }
});
function showlevel(){
    userAns = [];
    level++;
    h2.innerText = `Points=  ${level}. Highest = ${highest}`;
    randomColor();
}
function compFlash(rand){
  return new Promise((resolve)=>{
    rand.classList.add("flash");
       setTimeout(()=>{
        rand.classList.remove("flash");
        resolve();
       },500);   
  });
}
function checkAns(idx){
      if(compAns[idx] === userAns[idx]){
          if(compAns.length == userAns.length){
             setTimeout(showlevel,1500);
          }
      }else{
          body.classList.add("red");
          setTimeout(()=>{
            body.classList.remove("red");
          },250);
          if(level > highest){
            highest = level;
            h2.innerHTML = ` Game over Press any key to start <br> score = ${level} Highest = ${highest}`;
          }else{
            h2.innerHTML = ` Game over Press any key to start <br>Your score = ${level} Highest = ${highest}`;
          }
          start = false;
          level = 0;
          userAns = [];
          compAns = [];
      }
}
function userFlash(idd){
     idd.classList.add("flash");
     setTimeout(()=>{
        idd.classList.remove("flash");
     },250);  
}
function userbtn(){
    let btn = this;
    userFlash(btn);
    let idd = btn.getAttribute("id");
    userAns.push(idd);
    checkAns(userAns.length-1);
}
 async function randomColor(){
    let randind = Math.floor(Math.random()*4);
    let randCol = simon[randind];
    console.log(randCol);
    let rand = document.querySelector(`.${randCol}`);
    // console.log(rand);
    compAns.push(randCol);
      await compFlash(rand);
}
let btns = document.querySelectorAll(".btn1");

for(btn of btns){
    btn.addEventListener("click",userbtn);
}
let resetgame = document.querySelector(".resetgame");
resetgame.addEventListener("click",function(){
    start = false;
          level = 0;
          userAns = [];
          compAns = [];
         h2.innerText = "Press any key to start";
});