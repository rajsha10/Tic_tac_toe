console.log("Welcome To Tic-Tac-Toe")
let music = new Audio("bgm.mp3")
let audioturn  = new Audio("click.wav")
let gameover  = new Audio("gameover.wav")
let isgameover = false;
let xWins = 0;
let oWins = 0;

let turn  = "X"

//funtion to change turn
const changeturn  = ()=>{
    return turn === "X"? "0" : "X"
}

//adding a winning line
const highlightWinningBoxes = (winningBoxes) => {
    winningBoxes.forEach((boxIndex) => {
        let boxes = document.getElementsByClassName("box");
        boxes[boxIndex].classList.add("winning-line");
    });
 };

//function to check for a win
const checkWin = ()=>{
    let boxtexts = document.getElementsByClassName('box-text');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText !== "")){
            if(xWins === 4 || oWins === 4){
                let victoryScreen = document.querySelector('.victory-screen');
                let victoryText = document.querySelector('.victory-text');
                victoryText.innerText = boxtexts[e[0]].innerText + " Won";
                victoryScreen.style.display = "flex";
            }
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            highlightWinningBoxes(e);
            if (boxtexts[e[0]].innerText === "X") {
                xWins++;
                document.getElementById("x-wins").innerText = xWins;
            } 
            else if (boxtexts[e[0]].innerText === "0") {
                oWins++;
                document.getElementById("o-wins").innerText = oWins;
            }
        } 
    })
}

//main game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".box-text");
    element.addEventListener("click", ()=>{
        if(!isgameover && boxtext.innerText === ""){
            boxtext.innerText = turn;
            if (turn === "X") {
                boxtext.classList.add("x-symbol");
            } 
            else {
                boxtext.classList.add("o-symbol");
            }
            turn = changeturn();
            audioturn.play();
            checkWin();
            if(!isgameover){
                document.querySelector('.info').innerHTML = "Turn for " + turn;
            }
        }
    });
})

const removeSymbolClasses = () => {
    let boxtext = document.querySelectorAll(".box-text");
    Array.from(boxtext).forEach((element) => {
      element.innerText = "";
      element.classList.remove("x-symbol", "o-symbol");
    });
};


//add onclick listner button
reset.addEventListener('click', ()=>{
    let boxtext = document.querySelectorAll(".box-text");
    Array.from(boxtext).forEach(element =>{
        element.innerText = "";
    })
    turn = "X";
    isgameover = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    // Remove the winning-line class from all boxes
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((box) => {
        box.classList.remove("winning-line");
    });
    removeSymbolClasses();
})

document.querySelector('.victory-screen').addEventListener('click', () => {
    document.querySelector('.victory-screen').style.display = "none";
    window.location.reload();
});

